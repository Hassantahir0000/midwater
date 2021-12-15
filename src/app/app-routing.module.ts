import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
  },
  {
    path: 'products/:id/:type',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
  },

  {
    path: 'products/:id/:type/:search',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
  },

  {
    path: 'product-detail/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
  },

  {
    path: 'shipping-address',
    loadChildren: () => import('./address-pages/shipping-address/shipping-address.module').then(m => m.ShippingAddressPageModule),
    canActivate: [AuthGuard],
    data: {
      hideGuestLogin: false
    }
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'categories/:parent',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'add-review/:id',
    loadChildren: () => import('./add-review/add-review.module').then(m => m.AddReviewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews/:id',
    loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'addresses',
    loadChildren: () => import('./address-pages/addresses/addresses.module').then(m => m.AddressesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
 
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'thank-you',
    loadChildren: () => import('./thank-you/thank-you.module').then(m => m.ThankYouPageModule),
    data: {
      hideGuestLogin: false
    }
  },

  {
    path: 'my-order-detail/:id',
    loadChildren: () => import('./my-order-detail/my-order-detail.module').then(m => m.MyOrderDetailPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-us-content',
    loadChildren: () => import('./modals/contact-us-content/contact-us-content.module').then( m => m.ContactUsContentPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
