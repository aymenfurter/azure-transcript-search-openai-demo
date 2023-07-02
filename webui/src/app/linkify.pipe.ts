import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
  transform(value: string): string {
    let newVal = value;

    // Replace URLs in Markdown format
    const markdownUrlPattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)(?<![^\s][.,!?:;\/\|{}[\]()])\)/g;
    newVal = newVal.replace(markdownUrlPattern, '<a class="link" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Replace plain URLs
    //const urlPattern = /(https?:\/\/[^\s]+)(?<![^\s][.,!?:;\/\|{}[\]()])/g;
    //newVal = newVal.replace(urlPattern, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

    // Replace email addresses
    const emailPattern = /(\S+@\S+\.\S+)/g;
    
    newVal = newVal.replace(/\(|\)/g, '');
    newVal = newVal.replace(emailPattern, '<a class="link" href="https://teams.microsoft.com/l/chat/0/0?users=$1" target="_blank" rel="noopener noreferrer">💬 $1</a>');

    return newVal;
  }
}