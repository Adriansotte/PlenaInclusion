import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor() {
    const storedRole = sessionStorage.getItem('Rol');
    if (storedRole) {
      this.roleSubject.next(storedRole);
    }
  }

  setRole(role: string) {
    sessionStorage.setItem('Rol', role);
    this.roleSubject.next(role);
  }

  getRole(): string | null {
    return sessionStorage.getItem('Rol');
  }

}
