# CMPT 225, Summer 2026 (SFU Surrey)

- Textbook: [Data Structures and Algorithms in C++, 2nd Edition](DSA2nd.pdf).

- [Planned topics and dates for the course](https://1sfu-my.sharepoint.com/:x:/g/personal/tjd_sfu_ca/IQAMB0cxlTYlR6FqjTY8HIEGAbhh3mXfGRtQ_PyX2pJpMwk?e=3cE3bl). It's possible
that some topics may take more/less time, so the topics are not exact.

- [Notes from lectures are posted here](lectures).

## Notes Organizer (Fall 2026)

A small offline notes app for organizing CMPT 225 study notes by topic
(OOP in Java, ADTs, data structures, algorithms, algorithm efficiency).
No install needed — see [`notes-organizer/`](notes-organizer) and open
`notes-organizer/index.html` in a browser.

## Problem Sets

- [Quiz 1 problem set (markdown)](quiz1_problemset.md)
- [Quiz 2 problem set (PDF)](quiz2_problemset.pdf)
- [Quiz 3 problem set (PDF)](quiz3_problemset.pdf)
- [Quiz 4 problem set (PDF)](quiz4_problemset.pdf)
- [Quiz 5 problem set (PDF)](quiz5_problemset.pdf)
- [(Mostly) OOP problem set (PDF)](oop_problemset.pdf)

## Quiz Sample Solutions

- [Quiz 1 sample solutions (PDF)](quiz1_sol.pdf)
- [Quiz 2 sample solutions (PDF)](quiz2_sol.pdf)
- [Quiz 3 sample solutions (PDF)](quiz3_sample_solutions.pdf)
- [Quiz 4 sample solutions (PDF)](quiz4_sol.pdf)
- [Quiz 5 sample solutions (PDF)](quiz5_sol.pdf)

## Using C++

This course uses C++ (C++17). Here are some links to help you get started:

**On Windows**, a good way to use C++ is to use the Windows Subsystem for Linux (WSL):

- **Step 1**: [Install the Windows Terminal through the Microsoft Store](https://aka.ms/terminal). 
  This will give you a nice modern command-line for using WSL.

- **Step 2**: Follow the instructions here: [Installing WSL on Windows 10/11](https://docs.microsoft.com/en-us/windows/wsl/install).

- **Step 3**: Using WSL
  - On Windows, the name of the main disk drive is usually "C:", and in WSL the
    C: drive is in the folder `/mnt/c`.  Your desktop folder should be in
    `/mnt/c/Users/<loginname>`.

    For example, if your Windows login name is `bgates`, then the terminal
    command `cd /mnt/c/Users/bgates` should take you to your desktop folder. 

    Any other disks you have can be accessed similarly, e.g. if you have a D:
    drive it's at `/mnt/d`.

  - For editing your files and running C++ programs, the [VS
    Code](https://code.visualstudio.com/) is an excellent (and free!)
    programming editor that also has direct support for WSL.

**On Mac**, you can use the C++ compiler that comes with the standard Terminal
program . You can install other tools (like `make`) using [the Homebrew package
manager](https://brew.sh).


### Getting Your C++ Environment Up and Running

To compile and run C++ programs, you'll want at least these programs installed
on your computer:

- `g++` (for Linux) or `c++` (for macOS) are the compilers we're using in this
  course. A compilers converts C++ source code files into an executable program.
- `make` is a "build tool" that simplifies calling the compiler with the correct
  options.
- A memory checking tool to check for  [[memory leak|memory leaks]]. On Linux,
  `valgrind` is a good choice (you can install it using the `apt` command given
  below), and on macOS `leaks` is good (it should come already installed), e.g.
  `leaks -atExit -- ./prog` will run `prog` and check for leaks.
- `git` is used for version control, and, while not strictly needed for this
  course, it is a standard development tool that makes it easy to upload/download
  code on websites like [Github](https://githib.com/).
- A coding editor, such as the popular (and free!) [VS Code](https://code.visualstudio.com/). 

For Ubuntu Linux (e.g. on Windows WSL), you can install most of the needed
software by typing this command into a terminal:

```bash
sudo apt-get install git g++ make valgrind
```

For macOS, check out [the Homebrew package manager](https://brew.sh) as a way to
install any missing software.

You should can test that your environment is working by typing this command
(make sure you have the file [hello_world.cpp](hello_world.cpp) and
[makefile](makefile) in the same folder):

```bash
$ make hello_world
$ ./hello_world
Hello, world!
```

Generally, searching the web for "how do I install X on Windows" or "how do I
install X on Mac" will lead you to instructions for installing X. 

Also, AI and the web can be very helpful when dealing with error messages, or
figuring out how to install or uses particular software.
