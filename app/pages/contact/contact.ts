import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  successMessage = signal('');

  sendMessage(): void {
    this.successMessage.set(
      'Thank you! Your message has been received successfully.'
    );

    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}