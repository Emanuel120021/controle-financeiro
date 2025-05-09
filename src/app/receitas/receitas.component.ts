import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-receitas',
  imports: [
    HeaderComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    Dialog,
    ColorPickerModule,
    FormsModule,
    FloatLabel,
  ],
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

  visible: boolean = false;

  isMobile = false;

  color: any;

  tipo_despesa: any;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  showDialog() {
    this.visible = true;
  }
}
