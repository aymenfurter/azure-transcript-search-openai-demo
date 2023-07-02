import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  userMessage = '';
  messages: { role: string; content: string; videos?: string[] }[] = [];

  isLoading = false;

  sampleQueries = environment.sampleQueries;

  constructor(private chatService: ChatService) {}

  async submitMessage(): Promise<void> {
    if (this.userMessage.trim()) {
      this.isLoading = true;

      const data = await this.chatService.sendMessage(this.userMessage, this.messages);

      this.messages = data.messages;
      this.userMessage = '';

      this.isLoading = false;
    }
  }

  startConversation(query: string): void {
    this.userMessage = query;
    this.submitMessage();
  }
}