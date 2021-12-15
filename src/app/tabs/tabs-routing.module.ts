import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService as AuthGuard } from "../../services/auth-guard/auth-guard.service";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '', loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
          }
        ]
      },
      {
        path: 'wish-list',
        children: [
          {
            canActivate: [AuthGuard],
            path: '', loadChildren: () => import('../wish-list/wish-list.module').then(m => m.WishListPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
