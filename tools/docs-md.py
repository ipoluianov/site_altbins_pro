#!/usr/bin/env python3
"""Make Markdown copies of the docs pages for AI agents, and llms-full.txt.

Run from the site root after changing a docs page:

    python3 tools/docs-md.py

Writes <page>/index.md next to each docs page and llms-full.txt
(llms.txt followed by every docs page). Needs BeautifulSoup (python3-bs4).
"""
import re
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

SITE = 'https://altbins.pro'
ROOT = Path(__file__).resolve().parent.parent
PAGES = [
    'altping/docs',
    'althex/docs',
    'althex/docs/templates',
    'althex/docs/api',
]


def inline(node):
    """Inline Markdown for the children of node."""
    out = []
    for child in node.children:
        if isinstance(child, NavigableString):
            out.append(re.sub(r'\s+', ' ', str(child)))
            continue
        if not isinstance(child, Tag):
            continue
        name = child.name
        if name in ('svg', 'img', 'script', 'style'):
            continue
        if name == 'br':
            out.append('  \n')
        elif name in ('code', 'kbd'):
            text = child.get_text()
            tick = '``' if '`' in text else '`'
            out.append(f'{tick}{text}{tick}')
        elif name in ('b', 'strong'):
            text = inline(child).strip()
            out.append(f'**{text}**' if text else '')
        elif name in ('i', 'em'):
            text = inline(child).strip()
            out.append(f'*{text}*' if text else '')
        elif name == 'a':
            text = inline(child).strip()
            href = child.get('href', '')
            if href.startswith('/'):
                href = SITE + href
            out.append(f'[{text}]({href})' if href else text)
        else:
            out.append(inline(child))
    return ''.join(out)


def cell(td):
    return inline(td).strip().replace('|', '\\|')


def table(node):
    rows = node.find_all('tr')
    if not rows:
        return ''
    head = rows[0].find_all('th')
    if head:
        header = [cell(c) for c in head]
        body = rows[1:]
    else:
        width = len(rows[0].find_all(['td', 'th']))
        header = [''] * width
        body = rows
    lines = ['| ' + ' | '.join(header) + ' |', '|' + '---|' * len(header)]
    for tr in body:
        lines.append('| ' + ' | '.join(cell(c) for c in tr.find_all(['td', 'th'])) + ' |')
    return '\n'.join(lines)


def listing(node, depth=0):
    lines = []
    ordered = node.name == 'ol'
    for i, li in enumerate(node.find_all('li', recursive=False), 1):
        nested = [c for c in li.children if isinstance(c, Tag) and c.name in ('ul', 'ol')]
        for n in nested:
            n.extract()
        mark = f'{i}.' if ordered else '-'
        lines.append('   ' * depth + f'{mark} ' + inline(li).strip())
        for n in nested:
            lines.append(listing(n, depth + 1))
    return '\n'.join(lines)


def blocks(node):
    """Block-level Markdown for the children of node, as a list of chunks."""
    out = []
    for child in node.children:
        if isinstance(child, NavigableString):
            text = str(child).strip()
            if text:
                out.append(re.sub(r'\s+', ' ', text))
            continue
        if not isinstance(child, Tag):
            continue
        name = child.name
        if name in ('nav', 'script', 'style', 'svg', 'img', 'footer'):
            continue
        if name in ('h1', 'h2', 'h3', 'h4'):
            out.append('#' * int(name[1]) + ' ' + inline(child).strip())
        elif name == 'p':
            text = inline(child).strip()
            if text:
                out.append(text)
        elif name in ('ul', 'ol'):
            out.append(listing(child))
        elif name == 'pre':
            out.append('```\n' + child.get_text().rstrip('\n') + '\n```')
        elif name == 'table':
            out.append(table(child))
        else:
            out.extend(blocks(child))
    return out


def page_md(path):
    soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    main = soup.find('main')
    for crumbs in main.select('.crumbs, .docs-nav, .tags'):
        crumbs.decompose()
    url = SITE + '/' + path.parent.relative_to(ROOT).as_posix() + '/'
    md = '\n\n'.join(b for b in blocks(main) if b.strip())
    title, _, rest = md.partition('\n\n')
    return f'{title}\n\nSource: {url}\n\n{rest}\n'


def main():
    full = [(ROOT / 'llms.txt').read_text(encoding='utf-8').rstrip('\n')]
    for page in PAGES:
        md = page_md(ROOT / page / 'index.html')
        (ROOT / page / 'index.md').write_text(md, encoding='utf-8')
        full.append(md.rstrip('\n'))
        print('wrote', page + '/index.md')
    (ROOT / 'llms-full.txt').write_text('\n\n---\n\n'.join(full) + '\n', encoding='utf-8')
    print('wrote llms-full.txt')


if __name__ == '__main__':
    main()
