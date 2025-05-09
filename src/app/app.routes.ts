import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { ReceitasComponent } from './receitas/receitas.component';
import { DespesasComponent } from './despesas/despesas.component';
import { MetasComponent } from './metas/metas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'receitas',
    component: ReceitasComponent,
  },
  {
    path: 'despesas',
    component: DespesasComponent,
  },
  {
    path: 'metas',
    component: MetasComponent,
  },
  {
    path: 'relatorios',
    component: RelatoriosComponent,
  },
];
