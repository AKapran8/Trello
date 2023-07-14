import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/components/home/home.component';
import { UserAuthComponent } from './components/auth/user-auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/:key', component: UserAuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
