import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-receitas',
  imports: [HeaderComponent, TableModule, CommonModule],
  standalone: true,
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss',
})
export class ReceitasComponent {
  dadosMock = [
    { nome: 'Item 1', valor: 100, tipo: 'alimentacao', dataCad: '22/01/2001' },
    { nome: 'Item 2', valor: 200, tipo: 'gasolina', dataCad: '22/01/2001' },
    { nome: 'Item 3', valor: 50, tipo: 'uber', dataCad: '22/01/2001' },
    {
      nome: 'Item 4',
      valor: 150,
      tipo: 'entretenimento',
      dataCad: '22/01/2001',
    },
  ];

  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
}
