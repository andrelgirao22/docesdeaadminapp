import { Camera } from '@ionic-native/camera';
import { CategoryService } from './../services/model/category.service';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { AuthInterceptorProvider } from './interceptors/auth.interceptors';
import { LocalStorageService } from './../services/model/local-storage.service';
import { AuthService } from './../services/model/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CategoryService,
    LocalStorageService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    Camera
  ]
})
export class AppModule {}
