# node-pty-custom-prompt

## Reproduction repository for the custom prompt bug in node-pty

The bug I'm trying to illustrate here is that, with a custom prompt, xterm and node-pty produce a weird behavior by
default.
To build the reproduction app, you can run `docker compose up -d`. The application will launch on port 3001.

Then, try typing a very long command, you will see your current line being overwritten when you exceed a certain number
of characters.
If you now comment the custom prompt line (l5 of back/Dockerfile, don't forget to remove the backward slash on l4),
rebuild and run the app with `docker compose up --build -d`, you'll see that everything works fine.