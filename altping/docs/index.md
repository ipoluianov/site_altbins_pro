# AltPing Docs

Source: https://altbins.pro/altping/docs/

How to use the app

## Quick start

1. Press `A` to add a host. Type a name or an IP address.
2. The app pings every host once per second. You can change it for each host.
3. Press `D` to see the history chart of the selected host.

To add many hosts at once, put them in the Host field and separate them with commas or spaces: `8.8.8.8, 1.1.1.1 example.com`

For each host you can also set:

- **TCP port**: some servers do not answer ping. Check "Check instead of ping" and enter a port, for example 443. The app then connects to this port and shows how long it takes.
- **Ping every**: how often to ping. 1000 ms by default.
- **Timeout**: how long to wait for a reply. 1000 ms by default.
- **Slow above**: show the host in yellow when its average time is above this number. 0 is off.
- **Notify**: beep when the host goes down or comes back. Down means 3 failed pings in a row. The window title shows how many of these hosts are down, for example "(2 down)".

## Table columns

|  |  |
|---|---|
| Name | Your name for the host. If it is empty, the address is shown. |
| IP | The address that replied. |
| Time ms | Time of the last ping. |
| Loss % | Pings without a reply in the last 5 minutes. |
| Avg ms | Average ping time in the last 5 minutes. |
| Max ms | Longest ping time in the last 5 minutes. |
| Details | OK, TIMEOUT (no reply), PORT CLOSED, or an error, for example when the name cannot be found. |

You can turn on more columns in Settings:

|  |  |
|---|---|
| Min ms | Shortest ping time in the last 5 minutes. |
| Jitter ms | How much the ping time changes from one ping to the next. Important for calls and games. |
| Since | How long the host has been up (or down). |

Click a column title to sort the table. Click again to sort in the other direction.

## Colors

- Green: the host replies.
- Yellow: the host is slow (if you set "Slow above" for it).
- Orange: the last ping failed.
- Gray: no pings yet.

## History chart

- Select one or more hosts (up to 4) to see them on the chart.
- Buttons **5m**, **1h** and **24h** change the time range.
- Red striped areas mean there was no reply.
- A break in the line means pinging was stopped.
- Mouse wheel: zoom. Drag: move. Double-click: zoom out.
- Drag the line between the table and the chart to change their size.

The app keeps 24 hours of history. It is saved on disk, so it is still there after a restart.

## Host lists

You can have many host lists, for example "Home" and "Office". Press `O` to open the list window:

- **New** makes an empty list.
- **Save As** makes a copy of the open list.
- **Remove** deletes a list. You cannot delete the open list.
- Double-click a list or press **OK** to open it.

## Right-click menu

- **Edit** and **Remove** the host.
- **Downtime** shows when the host did not reply in the last 24 hours, and for how long.
- **Export history** saves the last 24 hours of pings to a CSV file. You can open it in Excel.
- **Change selected** changes all selected hosts at once: turn the beep on or off, check a TCP port or go back to ping, set Ping every, Timeout or Slow above.

## Settings

Click **Settings** at the bottom of the window. Everything here is off by default.

- **Extra columns**: Min, Jitter and Since.
- **Always on top**: keep the window above other windows.

## Keyboard shortcuts

|  |  |
|---|---|
| `A` | Add hosts |
| `E` or `Enter` | Edit the selected host (or double-click it) |
| `Del` | Remove the selected hosts |
| `Ctrl`+`A` | Select all hosts |
| `D` | Show or hide the chart |
| `O` | Host lists |
| `F1` | Open this help |
| `Ctrl`+`M` | Maximize or restore the window |
| `Ctrl`+`H` | Minimize the window |
| `Alt`+`X` | Exit |

## Good to know

- The status bar shows the ping mode. Without admin rights on Linux and macOS the app uses UDP mode. It works the same way.
- IPv4 and IPv6 are supported. If a name has both, IPv4 is used.
- Settings, lists and history are in the `.altbins/.altping` folder in your home folder.
- The app remembers the window size and the chart panel.
