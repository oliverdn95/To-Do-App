import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StickyComponent } from './components/sticky/sticky.component';
// import { StickyFormComponent } from './components/sticky-form/sticky-form.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StickyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To Do';   
}
