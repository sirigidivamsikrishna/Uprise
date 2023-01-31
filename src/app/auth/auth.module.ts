import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthRoutingModule } from './auth.routing.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistermessageComponent } from './registermessage/registermessage.component';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotComponent,
    ChangepasswordComponent,
    RegistermessageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimengModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
  ],
})
export class AuthModule {}
