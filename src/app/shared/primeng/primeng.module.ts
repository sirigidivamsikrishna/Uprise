import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GalleriaModule } from 'primeng/galleria';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    NgxSpinnerModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
    GalleriaModule,
    CheckboxModule,
    TooltipModule,
    DialogModule,
    AutoCompleteModule,
    PaginatorModule,
    OverlayPanelModule,
    InputNumberModule,
    TableModule,
    InputSwitchModule,
    GooglePlaceModule,
    DropdownModule,
    FileUploadModule,
    MultiSelectModule,
    InputTextareaModule,
  ],
  providers: [],
})
export class PrimengModule {}
