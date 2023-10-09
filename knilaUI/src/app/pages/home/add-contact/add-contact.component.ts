import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})



export class AddContactComponent {
@Input() data: any;

}
