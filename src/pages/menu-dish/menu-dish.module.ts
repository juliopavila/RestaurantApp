import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuDishPage } from './menu-dish';

@NgModule({
  declarations: [
    MenuDishPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuDishPage),
  ],
})
export class MenuDishPageModule {}
