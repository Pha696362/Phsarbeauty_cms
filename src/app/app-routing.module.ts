import { MapsComponent } from './pages/maps/maps.component';
import { HomeComponent } from "./pages/home/home.component";
import { AppLayoutComponent } from "./shared/app-layout/app-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { LayoutComponent } from "./shared/layout/layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { TabLayoutComponent } from "./shared/tab-layout/tab-layout.component";
import { UserComponent } from './pages/user/user.component';
import { AccountUsersComponent } from './pages/account-users/account-users.component';
const routes: Routes = [
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [{ path: "", component: SigninComponent }]
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "home", component: DashboardComponent },
      { path: ":fromDate/:toDate/:provinceId/:categoryId/:subCategoryId", component: DashboardComponent },
    ]
  },
  {
    path: "maps",
    canActivate: [AuthGuard],
    component: TabLayoutComponent,
    children: [
      { path: "", redirectTo: "listing", pathMatch: "full" },
      { path: "listing", component: MapsComponent },
    ]
  },
  {
    path: "app",
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      { path: "overview", component: HomeComponent },
      {
        path: "cases",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "category", pathMatch: "full" },
        ]
      },
      {
        path: "users",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: UserComponent },
        ]
      },
      {
        path: "account-users",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: AccountUsersComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
