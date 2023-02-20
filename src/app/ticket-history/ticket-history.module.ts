import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketHistoryPageRoutingModule } from './ticket-history-routing.module';

import { TicketHistoryPage } from './ticket-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketHistoryPageRoutingModule
  ],
  declarations: [TicketHistoryPage]
})
export class TicketHistoryPageModule {}
