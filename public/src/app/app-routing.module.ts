import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { GridComponent } from './ui/grid/grid.component';
import { RegisterComponent } from './ui/register/register.component';
import { RegisterAdminComponent } from './ui/register-admin/register-admin.component';
import { ShowComponent } from './ui/show/show.component';
import { ShowFormComponent } from './ui/show-form/show-form.component';
import { AdminUserListComponent } from './ui/admin-user-list/admin-user-list.component';
import { AccountComponent } from './ui/account/account.component';
import { EditShowComponent } from './ui/edit-show/edit-show.component';
import { AuthGuardService } from './auth-guard.service';
import { NotFoundComponent } from './ui/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: GridComponent },
  { path: 'grid', component: GridComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/admin', component: RegisterAdminComponent },
  { path: 'addNewShow', component: ShowFormComponent , canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
  { path: 'adminuserlist', component: AdminUserListComponent , canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
  { path: 'account', component: AccountComponent , canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
  { path: 'grid/show/:id', component: ShowComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'editShow/:id', component: EditShowComponent , canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  { path: 'grid/editShow/:id', component: EditShowComponent , canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
  { path: 'show/:id/editShow', component: EditShowComponent , canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
  { path: 'grid/show/:id/editShow', component: EditShowComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
