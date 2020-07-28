import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: {
          animation: 'home',
        },
        loadChildren: () =>
          import('./components/home-page/home-page.module').then(
            (m) => m.HomePageModule,
          ),
      },
      {
        path: 'login',
        data: {
          animation: 'login',
        },
        loadChildren: () =>
          import('./components/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'registration',
        data: {
          animation: 'registration',
        },
        loadChildren: () =>
          import('./components/registration/registration.module').then(
            (m) => m.RegistrationModule,
          ),
      },
      {
        path: 'todos',
        canActivate: [AuthGuard],
        data: {
          archive: false,
          title: "all ToDo's",
          animation: 'todos',
        },
        loadChildren: () =>
          import('./components/todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'todos/active',
        canActivate: [AuthGuard],
        data: {
          active: true,
          archive: false,
          title: "active ToDo's",
          animation: 'active',
        },
        loadChildren: () =>
          import('./components/todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'todos/archive',
        canActivate: [AuthGuard],
        data: {
          archive: true,
          title: "archive ToDo's",
          animation: 'archive',
        },
        loadChildren: () =>
          import('./components/todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'todos/done',
        canActivate: [AuthGuard],
        data: {
          active: false,
          archive: false,
          title: "done ToDo's",
          animation: 'done',
        },
        loadChildren: () =>
          import('./components/todos/todos.module').then((m) => m.TodosModule),
      },
      {
        path: 'error/:code',
        loadChildren: () =>
          import('./components/error/error.module').then((m) => m.ErrorModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
