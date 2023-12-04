import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('../app/aboutus/aboutus.module').then((m) => m.AboutusModule),
  },
  {
    path: '/auth/login',
    loadChildren: () =>
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '/toDolist',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
