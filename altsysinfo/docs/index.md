# AltSysInfo Docs

Source: https://altbins.pro/altsysinfo/docs/

How to use the app

## Quick start

1. Start AltSysInfo. It opens on **Common**: the CPU, the number of cores, the memory, the drives and the graphics.
2. Click a category on the left to see more about one part of the computer.
3. Click the copy button after a value to put it into the clipboard.
4. Press `Ctrl`+`S` to save the main facts as a PDF report.

The information of a category is read when you open it for the first time. Press `F5` to read it again, for example after you plug in a USB device.

## Categories

|  |  |
|---|---|
| Common | The main facts: CPU model and cores, memory, every drive with its type and size, every graphics adapter with its driver. |
| RAM | The memory modules: model, size and speed of each one. |
| System | The operating system, its version and kernel, the host name, boot time and uptime, the computer, motherboard and BIOS / firmware. |
| CPU | The processor model and vendor, family, model and stepping, cores and logical processors, frequencies, cache and instruction set extensions. |
| Storage | Physical drives with model, type and size. Volumes with mount point, file system, size, used and free space. |
| Graphics & Displays | Graphics adapters with model, ID, video memory and driver. Displays with manufacturer, model, size and year. |
| Network | Network interfaces with status, MAC, IPv4 and IPv6 addresses, speed and driver. |
| PCI Devices | Every PCI device with its class, vendor, name, ID and driver. |
| USB Devices | Every USB device with its manufacturer, name, ID and speed or driver. |
| Audio | Sound cards and sound devices. |
| Sensors | Temperatures and other values the system reports. |
| Battery | The battery state and charge, and the AC adapter. Empty on a desktop computer. |
| PCI Vendor/Device | A search in the built-in PCI ID database, see [below](#pci-lookup). |

What a category shows depends on the system: some values are only known on Linux, Windows or macOS. Empty values and columns are not shown. On Apple Silicon, memory speed and PCI IDs of the graphics are not known.

## Copying values

Every value has a small copy button after it. Click it and the value is in the clipboard, ready to paste into a forum post, a support request or a search. A short “Copied” message confirms it.

## PDF report

Click the report button in the toolbar or press `Ctrl`+`S`. Choose where to save the file; its name is `sysinfo-report-` with today’s date. The report has four parts:

- **Common**: the host name, the operating system, the CPU and the memory (total, used and free).
- **Memory Modules**: each module with its size and speed.
- **Drives**: each drive with its model, type and size.
- **Graphics**: each graphics adapter with its ID and driver.

Attach it to a support request, or keep it with the papers of the computer. On Linux without `zenity` or `kdialog` there is no save dialog, so the report is saved to your home folder.

## PCI ID lookup

The **PCI Vendor/Device** category finds a vendor or device in the PCI ID database built into the app, so it works without the internet. Type into any of the fields, the list is filtered as you type:

- **VEN**: the vendor ID, for example `8086` for Intel or `10de` for NVIDIA.
- **DEV**: the device ID.
- **Vendor/Device Name**: a part of the vendor or device name, for example `RTX`.

This helps with an unknown device in Windows Device Manager: its hardware ID looks like `PCI\VEN_8086&DEV_0412`. Type the numbers after VEN_ and DEV_ to see what it is.

## Tray and one copy

- The tray button in the toolbar (`Ctrl`+`T`) hides the window and leaves an icon in the system tray. Click the icon or choose **Show** in its menu to bring the window back, or **Quit** to close the app.
- Only one copy of AltSysInfo runs at a time. Starting it again brings the running window to the front, even from the tray.

## Settings

Click **Settings** at the bottom of the window.

- **Always on top**: keep the window above other windows. Off by default.
- **Language**: one of 31 languages, or as in the system.
- **Theme**: dark or light.

## Keyboard shortcuts

|  |  |
|---|---|
| `F5` | Read the information of the category again |
| `Ctrl`+`S` | Save a PDF report |
| `Ctrl`+`T` | Minimize to tray |
| `F1` | Open this help |
| `Ctrl`+`M` | Maximize or restore the window |
| `Ctrl`+`H` | Minimize the window |
| `Alt`+`X` | Exit |

On macOS use `Cmd` instead of `Ctrl` for `S` and `T`.

## Good to know

- AltSysInfo only reads information. It changes nothing in the system and sends nothing anywhere.
- On Linux it works without root. Only the memory modules may need root: where the udev database has no data about them, they are read from the SMBIOS table, which only root can read.
- Settings are in the `.altbins/.altsysinfo` folder in your home folder.
- The app remembers the window size and position, the width of the category list and the last category.
