import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookCoversComponent } from './book-covers/book-covers.component';
import { PremadesComponent } from './premades/premades.component';
import { GenresComponent } from './genres/genres.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'book-covers',
      component: BookCoversComponent,
    },
    {
      path: 'premades',
      component: PremadesComponent,
    },
    {
      path: 'genres',
      component: GenresComponent,
      canActivate: [AuthGuard]
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
