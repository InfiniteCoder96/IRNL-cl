import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/pages/home/home.component';
import {AboutComponent} from './component/pages/about/about.component';
import {BlogComponent} from './component/pages/blog/blog.component';
import {CartComponent} from './component/pages/cart/cart.component';
import {CheckoutComponent} from './component/pages/checkout/checkout.component';
import {ContactComponent} from './component/pages/contact/contact.component';
import {ProfileComponent} from './component/pages/profile/profile.component';
import {ServiceComponent} from './component/pages/service/service.component';
import {ShopComponent} from './component/pages/shop/shop.component';
import {ChatComponent} from './component/pages/chat/chat.component';
import { DetailComponent } from './component/pages/detail/detail.component';
import { InformationRetrievalComponent } from './component/pages/information-retrieval/information-retrieval.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'knowlege', component: InformationRetrievalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
