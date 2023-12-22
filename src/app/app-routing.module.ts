import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('../app/oneprudct/oneprudct-routing.module').then(
        (m) => m.OneprudctRoutingModule
      ),
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('../app/aboutus/aboutus.module').then((m) => m.AboutusModule),
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'toDolist',
    loadChildren: () =>
      import('../app/todolist/todolist.module').then((m) => m.TodolistModule),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('../app/appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('../app/map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'elevationmap',
    loadChildren: () =>
      import('../app/elevationmap/elevationmap.module').then(
        (m) => m.ElevationmapModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
