import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule], // se ele usar ngIf, ngFor, etc.
  standalone: true,
})
export class HeaderComponent implements OnInit {
  usuarioLogado = signal<string>('');
  sidebarAberta = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  verificaUsuario() {
    this.auth.isLoggedIn().subscribe((status) => {
      console.log(status);
    });
  }

  logout() {
    sessionStorage.removeItem('uid');
    this.auth.logout();
    this.router.navigate(['']);
  }

  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
  }
}
