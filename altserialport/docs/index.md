# AltSerialPort Docs

Source: https://altbins.pro/altserialport/docs/

How to use the app

## Quick start

1. Choose a port in the toolbar. Each port shows its chip, for example `ttyUSB0 · CH340` or `COM5 · CP2102`.
2. Choose the baud rate and the frame (8N1 by default) and press **Connect** or `F5`.
3. Read the data in the terminal. Type in the terminal to send keys at once, or type a command in the send line below and press `Enter`.

Everything else is in the ☰ menu and in the right-click menus of the terminal, the send line and the status bar.

## The window

|  |  |
|---|---|
| Toolbar | ☰ menu; port, baud, frame, Connect; Text / Hex / Mixed; timestamps, pause, record, find, clear. |
| Terminal | The data. Right-click: copy, timestamps, line breaks, encoding, packet gap, hex width, wrap, sent data, echo. |
| Send line | Command, Text/Hex, line ending, Send. Right-click: checksum, repeat, send file, escapes. |
| Status bar | State, port, RX/TX counters, log, lines. Click DTR or RTS to switch it; right-click: reset board, BREAK, counters. |

## Ports

- A device you plug in appears in the list by itself, marked as new. It is selected when no port is open.
- A port that is not in the list, such as a pseudo terminal or a udev link, is opened by its path in **Other port…**.
- **Reconnect.** When the board resets, is re-flashed or its cable is pulled, AltSerialPort waits and opens the port again when it is back, even under another name. The log keeps a note of the gap.
- **Any speed and frame.** Any baud rate (74880, 250000, 2000000…), 5 to 8 data bits, none, even, odd, mark or space parity, 1, 1.5 or 2 stop bits, RTS/CTS and XON/XOFF flow control. The speed and the frame change on the open port.
- **Network ports.** Type `tcp://host:port`, `tcp-listen://:5000` or `rfc2217://host:port` (a serial port of a network server) in **Other port…**.
- **RS-485 mode** on Linux.
- **Busy port.** When another program holds the port, AltSerialPort tells which one.
- **Per device.** The speed, the view, the line ending and the command history are remembered for each device and applied when it is chosen.
- **Several windows.** Each copy of the program is a window for one port. A port is opened exclusively, so two windows never read one port.

## Views and timestamps

|  |  |
|---|---|
| Text | The data as text, with ANSI colors. |
| Hex | Rows of bytes. A pause starts a new packet; long packets show offsets. |
| Mixed | Text with every control byte shown as `\r`, `\n`, `\x00`. |

Switching the view lays out all the data again and keeps your place. Timestamps show the time of day, the time with microseconds, the time since the previous row or since the connection.

The terminal keeps a million rows by default; drawing, scrolling and search stay instant.

## Sending

- **In the terminal** keys go to the device at once, as in a console: `Ctrl`+`A`…`Z` send control codes, the arrows and `Home`/`End` send VT100 sequences. `Ctrl`+`C` copies when text is selected and sends 0x03 otherwise.
- **In the send line** you type whole commands, with history. Text may have `\r`, `\n` and `\xHH` escapes; in Hex mode type bytes like `01 03 00 0A`.
- **Line ending**: none, CR, LF or CR LF.
- **Checksum** (right-click the send line): CRC-16 Modbus, CCITT, XMODEM, CRC-8, CRC-32, XOR, Sum or LRC is added to each command.
- **Repeat** sends the command again by a timer.

## Lines

- Click **DTR** or **RTS** in the status bar to switch it. CTS, DSR, DCD and RI are shown live.
- Right-click the status bar to send BREAK or to reset an Arduino or ESP32 board with its DTR/RTS sequence.

## Logs and saving

- **Record** (`Ctrl`+`Shift`+`R`) writes the data to a text file with timestamps or to a raw binary file. It is written from the reader of the port, so nothing is lost while the window is busy.
- **Automatic logs** record each connection of a device, starting a new file past a set size.
- Save the screen as text, HTML with colors, a hex dump or raw bytes. Copy a selection as text, hex or a C array.
- Open a saved log or any file, also by dropping it on the window.

## Tools

These are in the ☰ menu.

|  |  |
|---|---|
| Plot | Numbers in the received lines (`23.4`, `t=23.4 h=41`, `temp:23.4`) become live chart series with no setup. |
| Macros | Named commands in a side panel, run with `Shift`+`F1`…`F12`. A macro may have several lines with `#wait 100` between them. |
| Highlight and triggers | A text, a regular expression or hex bytes colors its lines, beeps, shows a notification, answers the device, pauses the screen or stops the log. Log levels (ERROR, WARN…) come preset. |
| Find with a filter | Shows only the rows that match, by text or a regular expression. |
| Second port | The data of two adapters on one time line (to sniff both sides of a link) or side by side, and a bridge that passes the data between them, also to a TCP port. |
| Statistics | Speed, lines a second, line load, framing, parity and overrun errors where the driver reports them, response times. |
| Tests | Response time after each sent command, a loopback test, and baud rate detection from the data of the device. |
| File transfer | Send a file as it is, line by line with delays, or by XMODEM, XMODEM-1K or YMODEM. Receive by XMODEM or YMODEM. |
| Profiles | Save the settings under a name, export and import them. |

## Keyboard shortcuts

|  |  |
|---|---|
| `F5` | Connect or disconnect |
| `Ctrl`+`1`, `2`, `3` | Text, Hex, Mixed view |
| `Ctrl`+`Shift`+`T` | Timestamps |
| `Ctrl`+`Shift`+`P` | Pause |
| `Ctrl`+`Shift`+`R` | Record to a file |
| `Ctrl`+`Shift`+`L` | Clear |
| `Ctrl`+`F`, `F3` | Find, find next |
| `F6` | Switch between the terminal and the send line |
| `Ctrl`+`=` / `Ctrl`+`-` / `Ctrl`+`0` | Font size |
| `Ctrl`+`Shift`+`G` | Plot |
| `Ctrl`+`Shift`+`M` | Macros |
| `Shift`+`F1`…`F12` | Run a macro |
| `Ctrl`+`Shift`+`C` | Copy |
| `Ctrl`+`Shift`+`V` | Paste to the device |
| `Shift`+`PgUp` / `PgDn`, `Ctrl`+`Home` / `End` | Scroll |
| `F1` | The list of shortcuts |

On macOS use `Cmd` instead of `Ctrl` for the window shortcuts. In the terminal `Ctrl` with a letter is sent to the device.

## Command line

```
altserialport list
altserialport /dev/ttyUSB0 -b 115200 --timestamp --log session.log   # Ctrl+] quits
altserialport send COM5 "AT\r" --expect OK --timeout 2s
altserialport mcp
```

|  |  |
|---|---|
| `list` | The ports with their descriptions and USB IDs. |
| `<port>` | A terminal in the console; `Ctrl`+`]` exits. Options: `--hex`, `--timestamp`, `--echo`, `--crlf`. |
| `send` | Writes the data, then prints what comes. `--expect RE` waits for a regular expression and exits with 0 on a match and 1 on timeout, for scripts. |
| `mcp` | An MCP server on stdin/stdout for AI agents. |

Common options: `-b` baud rate (115200), `-f` frame (8N1), `--flow` none, rtscts or xonxoff, `--log FILE`. Ports: `/dev/ttyUSB0`, `COM5`, `tcp://host:port`, `rfc2217://host:port`, `tcp-listen://:port`.

When a window has the port open, the command line attaches to it, and the window shows what is sent and received.

## AI agents (MCP)

An MCP client such as Claude Code or Claude Desktop runs `altserialport mcp`. For Claude Code:

```
claude mcp add altserialport -- altserialport mcp
```

The agent then works with a real board: `list_ports`, `open_port`, `close_port`, `write`, `read`, `wait_for` a pattern, `set_lines`, `get_signals`, `send_break`, `reset_board` (ESP32, Arduino) and `status`. If a window has the port open, the agent works through it and you see every byte.

## Good to know

- On Linux the serial ports belong to the group `dialout` (`uucp` on Arch). If a port cannot be opened, run `sudo usermod -aG dialout $USER`, then log out and in again.
- Settings, profiles and logs are in the `.altbins/.altserialport` folder in your home folder.
- English and Russian, with a light or dark theme.
