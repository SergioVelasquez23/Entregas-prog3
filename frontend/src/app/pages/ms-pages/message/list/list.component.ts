// message/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/messageService/message.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-message',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMessageComponent implements OnInit {

  messages: Message[] = []; // Array to store messages

  // Inject the MessageService and Router (if needed)
  constructor(private messageService: MessageService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of messages
    this.messageService.list().subscribe(data => {
      this.messages = data; // Assign data to the messages array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Message model)
  edit(id: number) {
    console.log('Editing Message ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/message/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Message ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.messageService.delete(id).subscribe(() => {
    //   console.log('Message deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}