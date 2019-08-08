import { APP_ENTRY_COMPONENTS } from './dialog/app-entry';
import { APP_STORES } from './stores/app.store';
import { ConvertService } from './services/convert.service';
import { MaterialModule } from './module/material.module';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FireValidatorsService } from './services/fire-validators.service';
import { DataService } from './services/data.service';
import { MessageComponent } from './components/message/message.component';
import { NetInfoComponent } from './components/net-info/net-info.component';
import { MobxAngularModule } from 'mobx-angular';
import { FireStoreService } from './services/utils.lib';
import { ModalWarningComponent } from './components/modal-warning/modal-warning.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { LoadingGridComponent } from './components/loading-grid/loading-grid.component';
import { EmptyComponent } from './components/empty/empty.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as firebase from 'firebase/app';
import "firebase/firestore"
import { MoreButtonComponent } from './components/more-button/more-button.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { PaginationLoaderComponent } from './components/pagination-loader/pagination-loader.component';
import { LoginShellComponent } from './components/login-shell/login-shell.component';
import { PrintService } from './services/print.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterTermPipe } from './pipes/filter-term.pipe';
import { DateMediumPipe } from './pipes/date-medium.pipe';
import { AlphaGradePipe } from './pipes/alpha-grade.pipe';
import { AlphaPointPipe } from './pipes/alpha-point.pipe';
import { DaysSchedulePipe } from './pipes/days-schedule.pipe';
import { DaysSmallPipe } from './pipes/days-small.pipe';
import { FilterSchedulePipe } from './pipes/filter-schedule.pipe';

import { AgmCoreModule } from '@agm/core';
firebase.initializeApp(environment.firebase);
const fdb = firebase.firestore();
// fdb.settings({ timestampsInSnapshots: true });


import { DeleteComponent } from './components/delete/delete.component';
import { CreditEarnedPipe } from './pipes/credit-earned.pipe';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { MajorBagPipe } from './pipes/major-bag.pipe';
import { HeaderTabsComponent } from './components/header-tabs/header-tabs.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { GroupByProgramPipe } from './pipes/group-by-program.pipe';
import { GroupByCoursesPipe } from './pipes/group-by-courses.pipe';
import { ConfirmSuccessComponent } from './components/confirm-success/confirm-success.component';
import { ConfirmWarningComponent } from './components/confirm-warning/confirm-warning.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TabLayoutComponent } from './shared/tab-layout/tab-layout.component';
import { LoaderTableComponent } from './components/loader-table/loader-table.component';
import { GeoDataComponent } from './pages/geo-data/geo-data.component';
import { AddProvinceComponent } from './dialog/add-province/add-province.component';
import { GeoDataDistrictComponent } from './pages/geo-data/geo-data-district/geo-data-district.component';
import { AddDistrictComponent } from './dialog/add-district/add-district.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GeoDataCommuneComponent } from './pages/geo-data/geo-data-commune/geo-data-commune.component';
import { AddCommuneComponent } from './dialog/add-commune/add-commune.component';
import { GeoDataVillageComponent } from './pages/geo-data/geo-data-village/geo-data-village.component';
import { AddVillageComponent } from './dialog/add-village/add-village.component';
import { MapsComponent } from './pages/maps/maps.component';
import { CaseCategoryComponent } from './pages/case-category/case-category.component';
import { CaseSubCategoryComponent } from './pages/case-category/case-sub-category/case-sub-category.component';
import { AddSubCategoryComponent } from './dialog/add-sub-category/add-sub-category.component';
import { LocationSceneComponent } from './pages/management/location-scene/location-scene.component';
import { OfficerComponent } from './pages/management/officer/officer.component';
import { AddDataManagementComponent } from './dialog/add-data-management/add-data-management.component';
import { CaseComponent } from './pages/case/case.component';
import { NewCaseComponent } from './pages/case/new-case/new-case.component';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { MarkerLabelPipe } from './pipes/marker-label.pipe';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { VictimComponent } from './pages/victim/victim.component';
import { SuspectComponent } from './pages/suspect/suspect.component';
import { SuspectArrestedComponent } from './pages/suspect-arrested/suspect-arrested.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { JudgeComponent } from './pages/judge/judge.component';
import { JudgmentWriterComponent } from './pages/judgment-writer/judgment-writer.component';
import { VerdictDeclarationComponent } from './pages/verdict-declaration/verdict-declaration.component';
import { AddVerdictComponent } from './components/add-verdict/add-verdict.component';
import { EditVerdictComponent } from './components/edit-verdict/edit-verdict.component';
import { AddCaseDetailComponent } from './pages/case/add-case-detail/add-case-detail.component';
import { UploadService } from './services/upload.service';
import { EditDataManagementComponent } from './dialog/edit-data-management/edit-data-management.component';
import { EditUserComponent } from './dialog/edit-user/edit-user.component';
import { EditProvinceComponent } from './dialog/edit-province/edit-province.component';
import { EditDistrictComponent } from './dialog/edit-district/edit-district.component';
import { EditCommuneComponent } from './dialog/edit-commune/edit-commune.component';
import { EditVillageComponent } from './dialog/edit-village/edit-village.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CaseSummaryComponent } from './pages/case-summary/case-summary.component';
import { CrimeProfileComponent } from './pages/crime-profile/crime-profile.component';
import { CrimeProfileNavComponent } from './shared/crime-profile-nav/crime-profile-nav.component';
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
import { AddVehiclesVictimsComponent } from './pages/crime-profile/add-vehicles-victims/add-vehicles-victims.component';
import { AddWeaponsVictimsComponent } from './pages/crime-profile/add-weapons-victims/add-weapons-victims.component';
import { WeaponsExhibitsComponent } from './pages/crime-profile/weapons-exhibits/weapons-exhibits.component';
import { OtherExhibitsComponent } from './pages/crime-profile/other-exhibits/other-exhibits.component';
import { VehiclesExhibitsComponent } from './pages/crime-profile/vehicles-exhibits/vehicles-exhibits.component';
import { AddVehiclesExhibitsComponent } from './pages/crime-profile/add-vehicles-exhibits/add-vehicles-exhibits.component';
import { AddWeaponsExhibitsComponent } from './pages/crime-profile/add-weapons-exhibits/add-weapons-exhibits.component';
import { AddMaterialLostComponent } from './pages/crime-profile/add-material-lost/add-material-lost.component';
import { MaterialLostComponent } from './pages/crime-profile/material-lost/material-lost.component';
import { InvestigationComponent } from './pages/crime-profile/investigation/investigation.component';
import { AddInvestigationComponent } from './pages/crime-profile/add-investigation/add-investigation.component';
import { AddVictimsComponent } from './pages/crime-profile/add-victims/add-victims.component';
import { SuspectListsComponent } from './pages/crime-profile/suspect-lists/suspect-lists.component';
import { AccountUsersComponent } from './pages/account-users/account-users.component';
import { AddAccountUserComponent } from './dialog/add-account-user/add-account-user.component';
import { EditAccountUserComponent } from './dialog/edit-account-user/edit-account-user.component';
import { SelectedItemByKeyPipe } from './pipes/selected-item-by-key.pipe';
import { TransferCaseComponent } from './components/transfer-case/transfer-case.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { TitlesComponent } from './pages/titles/titles.component';
import { EditInvestigationComponent } from './pages/crime-profile/edit-investigation/edit-investigation.component';
import { EditMaterialLostComponent } from './pages/crime-profile/edit-material-lost/edit-material-lost.component';
import { EditVehiclesExhibitsComponent } from './pages/crime-profile/edit-vehicles-exhibits/edit-vehicles-exhibits.component';
import { EditVictimsComponent } from './pages/crime-profile/edit-victims/edit-victims.component';
import { PersonFileComponent } from './pages/crime-profile/person-file/person-file.component';
import { CrimeGeneralComponent } from './components/crime-general/crime-general.component';
import { CrimeOverviewComponent } from './pages/crime-profile/crime-overview/crime-overview.component';
import { CrimeOverviewListingComponent } from './pages/crime-profile/crime-overview/crime-overview-listing/crime-overview-listing.component';
import { GetAgePipe } from './pipes/get-age.pipe';
import { CrimeJudgmentComponent } from './pages/crime-profile/crime-judgment/crime-judgment.component';
import { CrimeJudgmentListingComponent } from './pages/crime-profile/crime-judgment/crime-judgment-listing/crime-judgment-listing.component';
import { CrimePersonComponent } from './components/crime-person/crime-person.component';
import { CrimeJudgmentDisplayComponent } from './components/crime-judgment-display/crime-judgment-display.component';
import { VerdictFileComponent } from './components/verdict-file/verdict-file.component';
import { CloseCrimeCaseComponent } from './components/close-crime-case/close-crime-case.component';
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
import { DisableModalComponent } from './components/disable-modal/disable-modal.component';

import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { AddNewCrimeComponent } from './components/add-new-crime/add-new-crime.component';
import { StatisticPeriodComponent } from './components/statistic-period/statistic-period.component';
import { StatisticProvinceComponent } from './components/statistic-province/statistic-province.component';
import { StatisticCategoryComponent } from './components/statistic-category/statistic-category.component';
import { StatisticSubCategoryComponent } from './components/statistic-sub-category/statistic-sub-category.component';
import { CrimeComponent } from './pages/crime/crime.component';
import { CrimeFilterPeriodComponent } from './components/crime-filter-period/crime-filter-period.component';
import { CrimeFilterProvinceComponent } from './components/crime-filter-province/crime-filter-province.component';
import { CrimeFilterCategoryComponent } from './components/crime-filter-category/crime-filter-category.component';
import { DateStringPipe } from './pipes/date-string.pipe';
import { DateResolveDatePipe } from './pipes/date-resolve-date.pipe';
import { NewCrimeRecordComponent } from './pages/crime/new-crime-record/new-crime-record.component';
import { OpenCrimeComponent } from './pages/crime/open-crime/open-crime.component';
import { CrimePropertyComponent } from './pages/crime/crime-property/crime-property.component';

@NgModule({
  declarations: [
    CrimialSiuationComponent,
    AppComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    AppLayoutComponent,
    SpinnerComponent,
    MessageComponent,
    NetInfoComponent,
    ModalWarningComponent,
    LoadingComponent,
    DashboardNavComponent,
    LoadingGridComponent,
    EmptyComponent,
    MoreButtonComponent,
    FooterDashboardComponent,
    PaginationLoaderComponent,
    LoginShellComponent,
    DateFormatPipe,
    FilterTermPipe,
    DateMediumPipe,
    AlphaGradePipe,
    AlphaPointPipe,
    DaysSchedulePipe,
    DaysSmallPipe,
    FilterSchedulePipe,
    DeleteComponent,
    CreditEarnedPipe,
    PrimaryButtonComponent,
    MajorBagPipe,
    HeaderTabsComponent,
    EmptyDataComponent,
    GroupByProgramPipe,
    GroupByCoursesPipe,
    ConfirmSuccessComponent,
    ConfirmWarningComponent,
    ForgotPasswordComponent,
    TabLayoutComponent,
    LoaderTableComponent,
    GeoDataComponent,
    AddProvinceComponent,
    GeoDataDistrictComponent,
    AddDistrictComponent,
    NotFoundComponent,
    GeoDataCommuneComponent,
    AddCommuneComponent,
    GeoDataVillageComponent,
    AddVillageComponent,
    MapsComponent,
    CaseCategoryComponent,
    CaseSubCategoryComponent,
    AddSubCategoryComponent,
    LocationSceneComponent,
    OfficerComponent,
    AddDataManagementComponent,
    CaseComponent,
    NewCaseComponent,
    ToNumberPipe,
    MarkerLabelPipe,
    UserComponent,
    AddUserComponent,
    VictimComponent,
    SuspectComponent,
    SuspectArrestedComponent,
    AddPersonComponent,
    EditPersonComponent,
    JudgeComponent,
    JudgmentWriterComponent,
    VerdictDeclarationComponent,
    AddVerdictComponent,
    EditVerdictComponent,
    AddCaseDetailComponent,
    EditDataManagementComponent,
    EditUserComponent,
    EditProvinceComponent,
    EditDistrictComponent,
    EditCommuneComponent,
    EditVillageComponent,
    CaseSummaryComponent,
    CrimeProfileComponent,
    CrimeProfileNavComponent,
    OverviewCrimeComponent,
    OverviewCrimeHomeComponent,
    OverviewCrimeAboutComponent,
    ProfileVictimsComponent,
    ProfileSuspectComponent,
    ProfileMateriallostComponent,
    ProfileExhibitsComponent,
    ProfileInvestigationComponent,
    VehiclesVictimsComponent,
    WeaponsVictimsComponent,
    OtherExhibitsVictimsComponent,
    AddVehiclesVictimsComponent,
    AddWeaponsVictimsComponent,
    WeaponsExhibitsComponent,
    OtherExhibitsComponent,
    VehiclesExhibitsComponent,
    AddVehiclesExhibitsComponent,
    AddWeaponsExhibitsComponent,
    AddMaterialLostComponent,
    MaterialLostComponent,
    InvestigationComponent,
    AddInvestigationComponent,
    AddVictimsComponent,
    SuspectListsComponent,
    AccountUsersComponent,
    AddAccountUserComponent,
    EditAccountUserComponent,
    SelectedItemByKeyPipe,
    TransferCaseComponent,
    PositionsComponent,
    TitlesComponent,
    EditInvestigationComponent,
    EditMaterialLostComponent,
    EditVehiclesExhibitsComponent,
    EditVictimsComponent,
    PersonFileComponent,
    CrimeOverviewComponent,
    CrimeOverviewListingComponent,
    CrimeGeneralComponent,
    GetAgePipe,
    CrimeJudgmentComponent,
    CrimeJudgmentListingComponent,
    CrimePersonComponent,
    CrimeJudgmentDisplayComponent,
    VerdictFileComponent,
    CloseCrimeCaseComponent,
    CrVehicleComponent,
    CrExhibitComponent,
    CrVictimComponent,
    CrSuspectComponent,
    CrAddInformationComponent,
    CrCrimeUpdateComponent,
    CrSuspectDetetionUpdateComponent,
    CrimeFormComponent,
    CrimeTransferComponent,
    DisableModalComponent,
    AddNewCrimeComponent,
    StatisticPeriodComponent,
    StatisticProvinceComponent,
    StatisticCategoryComponent,
    StatisticSubCategoryComponent,
    CrimeComponent,
    CrimeFilterPeriodComponent,
    CrimeFilterProvinceComponent,
    CrimeFilterCategoryComponent,
    DateStringPipe,
    DateResolveDatePipe,
    NewCrimeRecordComponent,
    OpenCrimeComponent,
    CrimePropertyComponent,
  ],
  entryComponents: [
    EditInvestigationComponent,
    EditMaterialLostComponent,
    EditVictimsComponent,
    AddVictimsComponent,
    AddInvestigationComponent,
    AddMaterialLostComponent,
    AddVehiclesExhibitsComponent,
    AddWeaponsExhibitsComponent,
    AddVehiclesVictimsComponent,
    EditProvinceComponent,
    ModalWarningComponent,
    EditCommuneComponent,
    EditVillageComponent,
    EditDistrictComponent,
    EditDataManagementComponent,
    EditUserComponent,
    DeleteComponent,
    ConfirmSuccessComponent,
    ConfirmWarningComponent,
    ForgotPasswordComponent,
    APP_ENTRY_COMPONENTS,
    AddPersonComponent,
    EditPersonComponent,
    AddVerdictComponent,
    EditVerdictComponent,
    AddAccountUserComponent,
    EditAccountUserComponent,
    TransferCaseComponent,
    CloseCrimeCaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MobxAngularModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'PUC-CLOUD'),
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
    InfiniteScrollModule,
    NgxCaptchaModule,
    NgxChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    FireValidatorsService,
    DataService,
    ConvertService,
    APP_STORES,
    FireStoreService,
    PrintService,
    UploadService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
