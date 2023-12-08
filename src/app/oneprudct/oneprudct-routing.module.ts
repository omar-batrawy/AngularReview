import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneprudctComponent } from './oneprudct.component';

const routes: Routes = [
  {
    path: '',
    component: OneprudctComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneprudctRoutingModule {}
