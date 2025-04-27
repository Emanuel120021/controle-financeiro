import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(public auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  // 🔐 Login com email e senha
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // ✍️ Cadastro de novo usuário
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 🚪 Logout
  logout() {
    return signOut(this.auth);
  }

  // 🔎 Verifica se usuário está logado
  isLoggedIn(): Observable<boolean> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(!!user);
      });
    });
  }

  // 👤 Pega usuário atual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
