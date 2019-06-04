import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { PopoverComponent } from './popover/popover';
@NgModule({
	declarations: [MenuComponent,
    PopoverComponent],
	imports: [],
	exports: [MenuComponent,
    PopoverComponent]
})
export class ComponentsModule {}
