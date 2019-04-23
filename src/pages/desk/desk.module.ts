import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeskPage } from './desk';

@NgModule({
  declarations: [
    DeskPage,
  ],
  imports: [
    IonicPageModule.forChild(DeskPage),
  ],
})
export class DeskPageModule {}
