import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevationmapComponent } from './elevationmap.component';

const routes: Routes = [
  {
    path: '',
    component: ElevationmapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElevationmapRoutingModule {}
