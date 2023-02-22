import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist.component';
import { BandprofileComponent } from './bandprofile/bandprofile.component';
import { EventmanagementComponent } from './eventmanagement/eventmanagement.component';
import { ProfileComponent } from './profile/profile.component';
import { SongsmanagementComponent } from './songsmanagement/songsmanagement.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    children: [
      { path: '', redirectTo: 'songs', pathMatch: 'full' },
      { path: 'songs', component: SongsmanagementComponent },
      { path: 'events', component: EventmanagementComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bandprofile', component: BandprofileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
