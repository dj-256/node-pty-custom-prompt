import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgTerminal, NgTerminalModule} from 'ng-terminal';
import {Terminal} from "xterm";
import {io} from "socket.io-client";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, NgTerminalModule],
  template: `
    <div class="terminal-container"><ng-terminal #term></ng-terminal></div>
  `,
    styles: ['.terminal-container {max-width: 50rem; margin: 0 auto;}'],
})
export class AppComponent implements AfterViewInit {
    @ViewChild('term', {static: false}) ngTerminal: NgTerminal
    terminal: Terminal
  title = 'front';

    ngAfterViewInit() {
        this.terminal = this.ngTerminal.underlying!
        const socket = io('http://localhost:6060')
        socket.on('connect', () => {
            socket.emit("resize", {cols: this.terminal.cols, rows: this.terminal.rows})
            this.ngTerminal.onData().subscribe(input => socket.emit('data', input))
            socket.on('response', (response) => {
                this.ngTerminal.write(response)
            })
            this.terminal.onResize((dims) => socket.emit("resize", dims))
        })
    }
}
