import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './template/header/header.component';
import {FooterComponent} from './template/footer/footer.component';
import {BannerComponent} from './template/banner/banner.component';
import {LoginComponent} from './component/pages/login/login.component';
import {RegisterComponent} from './component/pages/register/register.component';
import {HomeComponent} from './component/pages/home/home.component';
import {ForgotpwdComponent} from './component/pages/forgotpwd/forgotpwd.component';
import {AboutComponent} from './component/pages/about/about.component';
import {ShopComponent} from './component/pages/shop/shop.component';
import {ServiceComponent} from './component/pages/service/service.component';
import {BlogComponent} from './component/pages/blog/blog.component';
import {CartComponent} from './component/pages/cart/cart.component';
import {CheckoutComponent} from './component/pages/checkout/checkout.component';
import {ProfileComponent} from './component/pages/profile/profile.component';
import {ContactComponent} from './component/pages/contact/contact.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {EDBSInterceptor} from './interceptor/EDBS_Interceptor';
import {FormsModule} from '@angular/forms';
import {ChatSafePipe} from './pipes/safepipe/chatsafepipe';
import {ChatRelativeTime} from './directives/chatrelativetime.directive';
import {SearchPipe} from './pipes/safepipe/searchpipe';
import {ChatComponent} from './component/pages/chat/chat.component';
import { DetailComponent } from './component/pages/detail/detail.component';
import { InformationRetrievalComponent } from './component/pages/information-retrieval/information-retrieval.component';
import { SearchBannerComponent } from './template/search-banner/search-banner.component';

const INTERCEPTORS = [{
  provide: HTTP_INTERCEPTORS,
  useClass: EDBSInterceptor,
  multi: true
}];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotpwdComponent,
    AboutComponent,
    ShopComponent,
    ServiceComponent,
    BlogComponent,
    CartComponent,
    CheckoutComponent,
    ProfileComponent,
    ContactComponent,
    ChatComponent,
    ChatSafePipe,
    ChatRelativeTime,
    SearchPipe,
    DetailComponent,
    InformationRetrievalComponent,
    SearchBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ...INTERCEPTORS,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
