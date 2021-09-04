import { EventEmitter } from "@angular/core";

export class CustomAction {
    title: string;
    icon: string;
    color: string;
    constructor(title: string, icon: string = null, color: string = null) {
        this.title = title;
        this.color = color ?? 'primary';
        this.icon = icon ?? 'build';
    }
}
