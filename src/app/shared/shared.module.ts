import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { PrimengModule } from './primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { InputLocationComponent } from './components/input-location/input-location.component';
import { LocationService } from './services/location.service';
import { AuthService } from './services/auth service/auth.service';
import { ArtistService } from './services/artist service/artist.service';
import { DatePipe } from './pipes/date.pipe';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { MinutesPipe } from './pipes/minutes.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
// import { HttpConfigInterceptor } from '../interceptor/http-config.interceptor';
@NgModule({
  declarations: [
    InputTextComponent,
    ButtonComponent,
    InputLocationComponent,
    DatePipe,
    AutocompleteComponent,
    MinutesPipe,
    DatepickerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, PrimengModule, HttpClientModule],
  exports: [
    InputTextComponent,
    ButtonComponent,
    InputLocationComponent,
    AutocompleteComponent,
    MinutesPipe,
    DatepickerComponent,
  ],
  providers: [LocationService, AuthService, ArtistService],
})
export class SharedModule {}
