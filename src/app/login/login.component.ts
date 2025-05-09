import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    Toast,
    ButtonModule,
    CommonModule,
  ],
  providers: [MessageService],
  standalone: true,
})
export class LoginComponent implements OnInit {
  email?: string;
  senha?: string;
  nome?: string;
  repitaSenha?: string;
  loading: boolean | undefined;
  mensagem: string | undefined;
  isRegister?: boolean = false;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.messageService.clear();
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      // Aqui você pode exibir um alerta ou redirecionar:
      this.router.navigate(['']);
    };
  }

  entrarRegistrar() {
    if (this.isRegister) {
      this.registrar();
    } else {
      this.entrar();
    }
  }

  entrar() {
    this.authService
      .login(this.email!, this.senha!)
      .then((userCredential) => {
        // Registro feito com sucesso!
        const user = userCredential.user;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Bem-vindo(a)!',
          life: 3000,
        });
        sessionStorage.setItem('uid', user.uid);
        console.log(user.uid);
        // Aqui você pode redirecionar, por exemplo:
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${error.message}`,
        });
      });
  }

  registrar() {
    this.authService
      .register(this.email!, this.senha!)
      .then(() => {
        // Registro feito com sucesso!
        onAuthStateChanged(this.authService.auth, (user) => {
          if (user) {
            this.adicionarUsuario(this.nome!, this.email!, user.uid);
          }
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cadastro realizado com sucesso!',
          life: 3000,
        });
        this.toggleIsRegister();
        this.email = '';
        this.senha = '';
      })
      .catch((error) => {
        console.error('Erro ao registrar:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${error.message}`,
        });
        this.mensagem = `Erro: ${error.message}`;
      });
  }

  async adicionarUsuario(nome: string, email: string, uid: string) {
    const usuarioRef = doc(this.firestore, `usuarios/${uid}`);
    await setDoc(usuarioRef, {
      nome: nome,
      email: email,
      criadoEm: new Date(),
      uidUser: uid,
    });
  }

  toggleIsRegister() {
    this.isRegister! = !this.isRegister;
  }

  verificaUsuario() {
    this.authService.currentUser$.subscribe((user) => {
      console.log(user);
    });
  }
}
