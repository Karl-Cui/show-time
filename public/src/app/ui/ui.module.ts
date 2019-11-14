import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { GridComponent } from './grid/grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShowFormComponent } from './show-form/show-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AccountComponent } from './account/account.component';
import { ShowComponent } from './show/show.component';
import { EditShowComponent } from './edit-show/edit-show.component';
import { CountdownModule } from 'ngx-countdown';
import { FileSelectDirective } from 'ng2-file-upload';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CountdownModule
  ],
  declarations: [LayoutComponent, HeaderComponent, GridComponent, LoginComponent, RegisterComponent, RegisterAdminComponent, ShowFormComponent, AccountComponent, ShowComponent, EditShowComponent, FileSelectDirective, NotFoundComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
