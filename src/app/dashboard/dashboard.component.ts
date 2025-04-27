import {
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { Usuario } from '../../interfaces/usuario';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [HeaderComponent, ChartModule],
})
export class DashboardComponent implements OnInit {
  usuarios: WritableSignal<Usuario[]> = signal<Usuario[]>([]);
  dataGraficoUm: any;
  optionGraficoUm: any;
  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        const uid = user.uid;

        const userDocRef = doc(this.firestore, `usuarios/${uid}`);
        console.log(userDocRef);
        docData(userDocRef).subscribe((usuario) => {
          this.usuarios.set([usuario as Usuario]);
        });
        console.log(this.usuarios());
      } else {
        console.warn('Usuário não está autenticado');
      }
    });
    this.initGraficoUm();
    this.initGraficoDois();
  }

  initGraficoUm() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.dataGraficoUm = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Sales',
            data: [540, 325, 702, 620],
            backgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)',
              'rgba(139, 92, 246, 0.2)',
            ],
            borderColor: [
              'rgb(249, 115, 22)',
              'rgb(6, 182, 212)',
              'rgb(107, 114, 128)',
              'rgb(139, 92, 246)',
            ],
            borderWidth: 1,
          },
        ],
      };

      this.optionGraficoUm = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }

  initGraficoDois() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.data = {
        datasets: [
          {
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-pink-500'),
              documentStyle.getPropertyValue('--p-gray-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-purple-500'),
              documentStyle.getPropertyValue('--p-cyan-500'),
            ],
            label: 'My dataset',
          },
        ],
        labels: ['Pink', 'Gray', 'Orange', 'Purple', 'Cyan'],
      };

      this.options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          r: {
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
