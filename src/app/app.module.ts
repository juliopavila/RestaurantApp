import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { SignupPage } from './../pages/signup/signup';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../components/menu/menu';
import { UrlProvider } from '../providers/url/url';
import { SessionProvider } from '../providers/session/session';
import { DishPage } from '../pages/dish/dish';
import { DishHttpProvider } from '../providers/dish-http/dish-http';
import { MenuDishPage } from '../pages/menu-dish/menu-dish';
import { RecipePage } from '../pages/recipe/recipe';
import { IngredientsPage } from '../pages/ingredients/ingredients';
import { PopoverComponent } from '../components/popover/popover';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    DashboardPage,
    MenuComponent,
    DishPage,
    MenuDishPage,
    RecipePage,
    IngredientsPage,
    PopoverComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    DashboardPage,
    DishPage,
    MenuDishPage,
    RecipePage,
    PopoverComponent,
    IngredientsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    UrlProvider,
    SessionProvider,
    DishHttpProvider
  ]
})
export class AppModule {}
