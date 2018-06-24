import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes =
[
  {path: 'compras', component: ShoppingListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})

export class ShoppingListRouteModule {}

