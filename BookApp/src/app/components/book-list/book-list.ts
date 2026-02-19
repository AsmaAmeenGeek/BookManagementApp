import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent implements OnInit {

  books = signal<Book[]>([]);
  bookForm = signal<Book>({
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  });

  editingId: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books.set(data));
  }

  submitForm() {
    if (this.editingId) {
      // update book
      const updatedBook = { ...this.bookForm()!, id: this.editingId };
      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.editingId = null;
        this.resetForm();
        this.loadBooks();
      });
    } else {
      // add new book
      this.bookService.addBook(this.bookForm()!).subscribe(() => {
        this.resetForm();
        this.loadBooks();
      });
    }
  }

  editBook(book: Book) {
    this.bookForm.set({ ...book });
    this.editingId = book.id;
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }

  resetForm() {
    this.bookForm.set({
      id: 0,
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    });
  }
}
