import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AsyncPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'student-course-portal';

  // Bind to loading service observable
  isLoading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
