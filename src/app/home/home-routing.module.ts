import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'buy',
        loadChildren: () => import('../buy-ticket/buy-ticket.module').then( m => m.BuyTicketPageModule)
      },
      {
        path: 'view',
        loadChildren: () => import('../ticket-history/ticket-history.module').then( m => m.TicketHistoryPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
      },
      {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
