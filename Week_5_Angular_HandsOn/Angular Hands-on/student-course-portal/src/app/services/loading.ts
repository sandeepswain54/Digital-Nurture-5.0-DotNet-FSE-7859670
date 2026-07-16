import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // BehaviorSubject holds current loading state
  private isLoadingSubject =
    new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  isLoading$ = this.isLoadingSubject.asObservable();

  show() {
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.isLoadingSubject.next(false);
  }
}
