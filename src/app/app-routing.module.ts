import { CrimeComponent } from './pages/crime/crime.component';
import { CrimeOverviewListingComponent } from './pages/crime-profile/crime-overview/crime-overview-listing/crime-overview-listing.component';
import { CaseSummaryComponent } from './pages/case-summary/case-summary.component';
import { NewCaseComponent } from './pages/case/new-case/new-case.component';
import { CaseSubCategoryComponent } from './pages/case-category/case-sub-category/case-sub-category.component';
import { MapsComponent } from './pages/maps/maps.component';
import { GeoDataVillageComponent } from './pages/geo-data/geo-data-village/geo-data-village.component';
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
import { GeoDataComponent } from './pages/geo-data/geo-data.component';
import { GeoDataDistrictComponent } from './pages/geo-data/geo-data-district/geo-data-district.component';
import { GeoDataCommuneComponent } from './pages/geo-data/geo-data-commune/geo-data-commune.component';
import { CaseCategoryComponent } from './pages/case-category/case-category.component';
import { LocationSceneComponent } from './pages/management/location-scene/location-scene.component';
import { OfficerComponent } from './pages/management/officer/officer.component';
import { UserComponent } from './pages/user/user.component';
import { VictimComponent } from './pages/victim/victim.component';
import { SuspectComponent } from './pages/suspect/suspect.component';
import { SuspectArrestedComponent } from './pages/suspect-arrested/suspect-arrested.component';
import { JudgeComponent } from './pages/judge/judge.component';
import { JudgmentWriterComponent } from './pages/judgment-writer/judgment-writer.component';
import { CaseComponent } from './pages/case/case.component';
import { VerdictDeclarationComponent } from './pages/verdict-declaration/verdict-declaration.component';
import { AddCaseDetailComponent } from './pages/case/add-case-detail/add-case-detail.component';
import { CrimeProfileComponent } from './pages/crime-profile/crime-profile.component';
import { OverviewCrimeComponent } from './pages/crime-profile/overview-crime/overview-crime.component';
import { OverviewCrimeHomeComponent } from './pages/crime-profile/overview-crime-home/overview-crime-home.component';
import { OverviewCrimeAboutComponent } from './pages/crime-profile/overview-crime-about/overview-crime-about.component';
import { ProfileVictimsComponent } from './pages/crime-profile/profile-victims/profile-victims.component';
import { ProfileSuspectComponent } from './pages/crime-profile/profile-suspect/profile-suspect.component';
import { ProfileMateriallostComponent } from './pages/crime-profile/profile-materiallost/profile-materiallost.component';
import { ProfileExhibitsComponent } from './pages/crime-profile/profile-exhibits/profile-exhibits.component';
import { ProfileInvestigationComponent } from './pages/crime-profile/profile-investigation/profile-investigation.component';
import { VehiclesVictimsComponent } from './pages/crime-profile/vehicles-victims/vehicles-victims.component';
import { WeaponsVictimsComponent } from './pages/crime-profile/weapons-victims/weapons-victims.component';
import { OtherExhibitsVictimsComponent } from './pages/crime-profile/other-exhibits-victims/other-exhibits-victims.component';
import { VehiclesExhibitsComponent } from './pages/crime-profile/vehicles-exhibits/vehicles-exhibits.component';
import { WeaponsExhibitsComponent } from './pages/crime-profile/weapons-exhibits/weapons-exhibits.component';
import { OtherExhibitsComponent } from './pages/crime-profile/other-exhibits/other-exhibits.component';
import { MaterialLostComponent } from './pages/crime-profile/material-lost/material-lost.component';
import { InvestigationComponent } from './pages/crime-profile/investigation/investigation.component';
import { SuspectListsComponent } from './pages/crime-profile/suspect-lists/suspect-lists.component';
import { AccountUsersComponent } from './pages/account-users/account-users.component';
import { CrimeOverviewComponent } from './pages/crime-profile/crime-overview/crime-overview.component';
import { CrimeJudgmentListingComponent } from './pages/crime-profile/crime-judgment/crime-judgment-listing/crime-judgment-listing.component';
import { CrimeJudgmentComponent } from './pages/crime-profile/crime-judgment/crime-judgment.component';
import { CrimialSiuationComponent } from './pages/crimial-siuation/crimial-siuation.component';
import { CrVehicleComponent } from './pages/cr-vehicle/cr-vehicle.component';
import { CrExhibitComponent } from './pages/cr-exhibit/cr-exhibit.component';
import { CrVictimComponent } from './pages/cr-victim/cr-victim.component';
import { CrSuspectComponent } from './pages/cr-suspect/cr-suspect.component';
import { CrAddInformationComponent } from './pages/cr-add-information/cr-add-information.component';
import { CrCrimeUpdateComponent } from './pages/cr-crime-update/cr-crime-update.component';
import { CrSuspectDetetionUpdateComponent } from './pages/cr-suspect-detetion-update/cr-suspect-detetion-update.component';
import { CrimeFormComponent } from './pages/crime-form/crime-form.component';
import { CrimeTransferComponent } from './pages/crime-transfer/crime-transfer.component';
import { AddNewCrimeComponent } from './components/add-new-crime/add-new-crime.component';
import { NewCrimeRecordComponent } from './pages/crime/new-crime-record/new-crime-record.component';
import { OpenCrimeComponent } from './pages/crime/open-crime/open-crime.component';
import { CrimePropertyComponent } from './pages/crime/crime-property/crime-property.component';

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
      { path: "crime", component: CrimeComponent},
      { path: "crime/:id/:cid", component: NewCrimeRecordComponent,children:[
        { path: "", redirectTo: "general", pathMatch: "full" },
        { path: "general", component: OpenCrimeComponent },
        { path: "properties", component: CrimePropertyComponent },
        { path: "exhibit", component: CrExhibitComponent },
        { path: "victim", component: CrVictimComponent },
        { path: "suspect", component: CrSuspectComponent },
        { path: "additional-information", component: CrAddInformationComponent },
        { path: "crime-status", component: CrimePropertyComponent },
        { path: "suspect-status", component: CrimePropertyComponent },
        { path: "print", component: CrimePropertyComponent },
      ]},
      { path: "case-summary", component: CaseSummaryComponent }
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
    path: "new-case",
    canActivate: [AuthGuard],
    component: TabLayoutComponent,
    children: [
      { path: "", redirectTo: "hold", pathMatch: "full" },
      { path: "hold", component: NewCaseComponent },
      { path: "hold/:id", component: AddCaseDetailComponent },
    ]
  },

  {
    path: "case",
    canActivate: [AuthGuard],
    component: TabLayoutComponent,
    children: [
      { path: "", redirectTo: "transfer", pathMatch: "full" },
      { path: "transfer", component: CrimeTransferComponent },
    ]
  },

  {
    path: "crime-profile/:id",
    component: CrimeProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "overview", component: CrimeOverviewComponent, children: [
          { path: "", redirectTo: "lists", pathMatch: "full" },
          { path: "lists", component: CrimeOverviewListingComponent },
        ]
      },
      {
        path: "judgment", component: CrimeJudgmentComponent, children: [
          { path: "", redirectTo: "lists", pathMatch: "full" },
          { path: "lists", component: CrimeJudgmentListingComponent },
        ]
      },
      {
        path: "victims", component: ProfileVictimsComponent, children: [
          { path: "", redirectTo: "lists", pathMatch: "full" },
          { path: "lists", component: VehiclesVictimsComponent },

        ]
      },
      {
        path: "suspect", component: ProfileSuspectComponent, children: [
          { path: "", redirectTo: "lists", pathMatch: "full" },
          { path: "lists", component: SuspectListsComponent },

        ]
      },
      {
        path: "material-lost", component: ProfileMateriallostComponent, children: [
          { path: "", redirectTo: "vehicles", pathMatch: "full" },
          { path: ":tid", component: MaterialLostComponent },

        ]
      },
      {
        path: "exhibits", component: ProfileExhibitsComponent, children: [
          { path: "", redirectTo: "vehicles", pathMatch: "full" },
          { path: ":tid", component: VehiclesExhibitsComponent },
        ]
      },
      {
        path: "investigation", component: ProfileInvestigationComponent, children: [
          { path: "", redirectTo: "summary-case", pathMatch: "full" },
          { path: ":tid", component: InvestigationComponent },
        ]
      },
    ],
    // children: [
    //   {
    //     path: "overview", component: CrimeOverviewComponent, children: [
    //       { path: "", redirectTo: "lists", pathMatch: "full" },
    //       { path: "lists", component: CrimeOverviewListingComponent },
    //     ]
    //   },
    //   {
    //     path: "victims", component: ProfileVictimsComponent, children: [
    //       { path: "", redirectTo: "lists", pathMatch: "full" },
    //       { path: "lists", component: VehiclesVictimsComponent },
    //     ]
    //   },
    //   {
    //     path: "suspect", component: ProfileSuspectComponent, children: [
    //       { path: "", redirectTo: "lists", pathMatch: "full" },
    //       { path: "lists", component: SuspectListsComponent },
    //     ]
    //   },
    //   {
    //     path: "material-lost", component: ProfileMateriallostComponent, children: [
    //       { path: "", redirectTo: "vehicles", pathMatch: "full" },
    //       { path: ":tid", component: MaterialLostComponent },
    //     ]
    //   },
    //   {
    //     path: "exhibits", component: ProfileExhibitsComponent, children: [
    //       { path: "", redirectTo: "vehicles", pathMatch: "full" },
    //       { path: ":tid", component: VehiclesExhibitsComponent },
    //     ]
    //   },
    //   {
    //     path: "investigation", component: ProfileInvestigationComponent, children: [
    //       { path: "", redirectTo: "vehicles", pathMatch: "full" },
    //       { path: ":tid", component: InvestigationComponent },
    //     ]
    //   },
    // ]
  },

  {
    path: "crime-form/:id", component: CrimeFormComponent,
    children: [
      { path: "", redirectTo: "cr-siuation", pathMatch: "full" },
      { path: "cr-siuation", component: CrimialSiuationComponent },
      { path: "cr-vehicle", component: CrVehicleComponent },
      { path: "cr-exhibit", component: CrExhibitComponent },
      { path: "cr-victim", component: CrVictimComponent },
      { path: "cr-suspect", component: CrSuspectComponent },
      { path: "cr-add-information", component: CrAddInformationComponent },
      { path: "cr-crime-update", component: CrCrimeUpdateComponent },
      { path: "cr-suspect-detetion-update", component: CrSuspectDetetionUpdateComponent },
    ]
  },

  {
    path: "crime", component: CrimeFormComponent,
    children: [
      { path: "", redirectTo: "new/:id", pathMatch: "full" },
      { path: "new/:id", component: AddNewCrimeComponent },
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
        path: "geo",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "provinces", pathMatch: "full" },
          { path: "provinces", component: GeoDataComponent },
          { path: ":id/districts", component: GeoDataDistrictComponent },
          { path: ":id/communes", component: GeoDataCommuneComponent },
          { path: ":id/villages", component: GeoDataVillageComponent },
        ]
      },
      {
        path: "cases",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "category", pathMatch: "full" },
          { path: "category", component: CaseCategoryComponent },
          { path: "category/:id", component: CaseSubCategoryComponent },
        ]
      },
      {
        path: "data",
        component: TabLayoutComponent,
        children: [
          { path: ":id", component: LocationSceneComponent },
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
      {
        path: "officer",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "data", pathMatch: "full" },
          { path: "data", component: OfficerComponent },
        ]
      },
      {
        path: "victim",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: VictimComponent },
        ]
      },
      {
        path: "suspect",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: SuspectComponent },
        ]
      },
      {
        path: "suspect-arrested",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: SuspectArrestedComponent },
        ]
      },
      {
        path: "judge",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: JudgeComponent },
        ]
      },
      {
        path: "judgment-writer",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: JudgmentWriterComponent },
        ]
      },
      {
        path: "crime",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: CaseComponent },
        ]
      },
      {
        path: "verdict-declaration",
        component: TabLayoutComponent,
        children: [
          { path: "", redirectTo: "all", pathMatch: "full" },
          { path: "all", component: VerdictDeclarationComponent },
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
