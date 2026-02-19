import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { BookListComponent } from './components/book-list/book-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    BookListComponent
  ]
})
export class App {
  protected readonly title = signal('Welcome!');
}

// Bootstrap the application
bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});

