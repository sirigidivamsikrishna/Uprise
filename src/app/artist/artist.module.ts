import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistRoutingModule } from './artist-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { ArtistComponent } from './artist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongsmanagementComponent } from './songsmanagement/songsmanagement.component';
import { EventmanagementComponent } from './eventmanagement/eventmanagement.component';
import { BandprofileComponent } from './bandprofile/bandprofile.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    SidenavComponent,
    ArtistComponent,
    HeaderComponent,
    SongsmanagementComponent,
    EventmanagementComponent,
    BandprofileComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PrimengModule,
  ],
})
export class ArtistModule {}
