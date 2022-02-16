import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { BookCoversComponent } from './book-covers/book-covers.component';
import { PremadesComponent } from './premades/premades.component';
import { GenresComponent } from './genres/genres.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
  ],
  declarations: [
    PagesComponent,
    BookCoversComponent,
    PremadesComponent,
    GenresComponent,
  ],
})
export class PagesModule {
}
