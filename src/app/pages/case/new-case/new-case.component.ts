import { DataService } from './../../../services/data.service';
import { Crime } from './../../../stores/crime.store';
import { MappingService } from './../../../services/mapping.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Router } from '@angular/router';
import { slideInOutAnimation } from 'src/app/services/slide-io.animation';
import { Observable } from 'rxjs';
import { ConvertService } from 'src/app/services/convert.service';
import { ICrime } from 'src/app/interfaces/crime';
import { recordStatus, crimeStatus } from 'src/app/dummy/stauts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss'],
  host: { "[@slideInOutAnimation]": "" },
  animations: [slideInOutAnimation],
})
export class NewCaseComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  filteredCategoriesStates: Observable<any[]>;
  filteredSubCategoriesStates: Observable<any[]>;
  filteredLocationsStates: Observable<any[]>;
  filteredLocationScenesStates: Observable<any[]>;
  filteredCaseReasonsStates: Observable<any[]>;
  filteredTransportationStates: Observable<any[]>;
  filteredVillageStates: Observable<any[]>;

  form: FormGroup;
  crime_commune_no: AbstractControl;
  crime_year_no: AbstractControl;
  crime_index: AbstractControl;
  category: AbstractControl;
  sub_category: AbstractControl;
  case_happen_date: AbstractControl;
  case_happen_date_time: AbstractControl;
  case_receive_date: AbstractControl;
  case_receive_date_time: AbstractControl;
  case_receive_from: AbstractControl;
  province: AbstractControl;
  district: AbstractControl;
  commune: AbstractControl;
  village: AbstractControl;
  road: AbstractControl;
  house_no: AbstractControl;
  location: AbstractControl;
  location_scene: AbstractControl;
  location_name: AbstractControl;
  case_reason: AbstractControl;
  case_reason_other: AbstractControl;
  weapon: AbstractControl;
  weapon_other: AbstractControl;
  transportation: AbstractControl;
  transportation_other: AbstractControl;
  victim_total: AbstractControl;
  victim_female_total: AbstractControl;
  suspect_total: AbstractControl;
  suspect_female_total: AbstractControl;
  suspect_arrested_total: AbstractControl;
  suspect_arrested_female_total: AbstractControl;

  weaponList: any = [];
  weaponOtherList: any = [];

  protected map: any;
  latitude: AbstractControl;
  longitude: AbstractControl;
  currentLat: any;
  currentLong: any;
  public zoom: number;

  villageLists: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public env: Environment,
    public store: Crime,
    private ds: DataService,
    private router: Router,
    private locationRoute: Location,
  ) { }

  ngOnInit() {
    this.buildForm();

    this.store.fetchCategories((list) => {
      this.filteredCategoriesStates = MappingService.autoComplete(this.category, list, "name");
    });

    this.store.fetchSubCategories((list) => {
      this.filteredSubCategoriesStates = MappingService.autoComplete(this.sub_category, list, "name");
    });

    this.store.fetchLocations((list) => {
      this.filteredLocationsStates = MappingService.autoComplete(this.location, list, "name");
    });

    this.store.fetchLocationScenes((list) => {
      this.filteredLocationScenesStates = MappingService.autoComplete(this.location_scene, list, "name");
    });

    this.store.fetchCaseReason((list) => {
      this.filteredCaseReasonsStates = MappingService.autoComplete(this.case_reason, list, "name");
    });

    this.store.fetchTransportation((list) => {
      this.filteredTransportationStates = MappingService.autoComplete(this.transportation, list, "name");
    });

    this.store.fetchWeapon((list) => {
      this.weaponList = list;
    });

    this.store.fetchOtherTransportation((list) => {
      this.weaponOtherList = list;
    });

    this.env.fetchUserDoc((user) => {
      const { commune } = this.env.user;

      this.store.fetchVillagesByCommune(commune.key, (list) => {
        this.villageLists = list;
        this.env.fetchUserDoc((user) => {
          this.env.fetchEnvironmentArray((env) => {

            const { code, key } = this.env.user.commune;
            const { crime_index } = this.env.option;
            const crimeIndex = MappingService.genCrimeIndex(crime_index + 1);

            const villageByCommune = this.villageLists.filter(m => m.commune.key === key);
            this.filteredVillageStates = MappingService.autoComplete(this.village, villageByCommune, "name");

            this.form.patchValue({
              crime_commune_no: code,
              crime_year_no: ConvertService.yearKey(),
              crime_index: crimeIndex,
              village: villageByCommune[0],
            })
          })
        })
      });
    })
  }

  compareByKey(f1: any, f2: any) {
    return f1 && f2 && f1.key === f2.key;
  }

  displayName(item: any) {
    return item ? item.name : item;
  }

  categorySelected(event) {
    if (event) {
      const subCategoriesItems = this.store.subCategories.filter(d => d.category.key === event.option.value.key);
      this.filteredSubCategoriesStates = MappingService.autoComplete(this.sub_category, subCategoriesItems, "name");
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position, true);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position, isCenter) {
    if (this.map) {
      if (isCenter) {
        this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      }
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
      this.form.patchValue({
        latitude: this.currentLat,
        longitude: this.currentLong
      })
      this.zoom = 18;
    }
  }

  onMaker($event) {
    const { lat, lng } = $event.coords;
    const position = {
      coords: { latitude: lat, longitude: lng }
    }
    this.form.patchValue({
      latitude: lat,
      longitude: lng
    })
    this.showPosition(position, false);
  }

  mapReady($event: any) {
    this.map = $event;
    this.findMe()
  }

  onShowLocation(f: any) {
    if (this.form.valid) {
      const { latitude, longitude } = f;
      const position = {
        coords: { latitude: latitude, longitude: longitude }
      }
      this.showPosition(position, true);
    }
  }

  _goBack() {
    this.locationRoute.back();
  }

  buildForm(): void {
    this.form = this.fb.group({
      crime_commune_no: [{ value: null, disabled: true },],
      crime_year_no: [{ value: null, disabled: true },],
      crime_index: [{ value: null, disabled: true },],
      category: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      sub_category: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      case_happen_date: [new Date('2017-10-30'), [Validators.required]],
      case_happen_date_time: [null],
      case_receive_date: [new Date(), [Validators.required]],
      case_receive_date_time: [null,],
      case_receive_from: [null,],
      village: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      road: [null,],
      house_no: [null,],
      location: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      location_scene: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      location_name: [null,],
      case_reason: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      case_reason_other: [null,],
      weapon: [null,],
      weapon_other: [null,],
      transportation: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      transportation_other: [null,],
      victim_total: [null,],
      victim_female_total: [null,],
      suspect_total: [null,],
      suspect_female_total: [null,],
      suspect_arrested_total: [null,],
      suspect_arrested_female_total: [null,],

      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });

    this.latitude = this.form.controls['longitude'];
    this.longitude = this.form.controls['latitude'];

    this.crime_commune_no = this.form.controls['crime_commune_no'];
    this.crime_year_no = this.form.controls['crime_year_no'];
    this.crime_index = this.form.controls['crime_index'];
    this.category = this.form.controls['category'];
    this.sub_category = this.form.controls['sub_category'];
    this.case_happen_date = this.form.controls['case_happen_date'];
    this.case_happen_date_time = this.form.controls['case_happen_date_time'];
    this.case_receive_date = this.form.controls['case_receive_date'];
    this.case_receive_date_time = this.form.controls['case_receive_date_time'];
    this.case_receive_from = this.form.controls['case_receive_from'];
    this.village = this.form.controls['village'];
    this.road = this.form.controls['road'];
    this.house_no = this.form.controls['house_no'];
    this.location = this.form.controls['location'];
    this.location_scene = this.form.controls['location_scene'];
    this.location_name = this.form.controls['location_name'];
    this.case_reason = this.form.controls['case_reason'];
    this.case_reason_other = this.form.controls['case_reason_other'];
    this.weapon = this.form.controls['weapon'];
    this.weapon_other = this.form.controls['weapon_other'];
    this.transportation = this.form.controls['transportation'];
    this.transportation_other = this.form.controls['transportation_other'];
    this.victim_total = this.form.controls['victim_total'];
    this.victim_female_total = this.form.controls['victim_female_total'];
    this.suspect_total = this.form.controls['suspect_total'];
    this.suspect_female_total = this.form.controls['suspect_female_total'];
    this.suspect_arrested_total = this.form.controls['suspect_arrested_total'];
    this.suspect_arrested_female_total = this.form.controls['suspect_arrested_female_total'];
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      this.store.updateCrimeIndex((success, option) => {
        if (success) {
          const { code } = this.env.user.commune;
          const { crime_index } = option;
          const crimeIndex = MappingService.genCrimeIndex(crime_index + 1);
          const crimeYear = ConvertService.yearKey();
          const crimeNo = code.toString() + crimeYear.toString() + crimeIndex.toString();

          const item: ICrime = {
            key: this.ds.createId(),
            crime_no: crimeNo,
            crime_commune_no: ConvertService.toNumber(code),
            crime_year_no: ConvertService.toNumber(crimeYear),
            crime_index: ConvertService.toNumber(crimeIndex),
            category: f.category,
            sub_category: f.sub_category,
            case_happen_date: f.case_happen_date,
            case_happen_date_key: ConvertService.toDateKey(f.case_happen_date),
            case_happen_date_time: ConvertService.toNull(f.case_happen_date_time),
            case_receive_date: f.case_receive_date,
            case_receive_date_key: ConvertService.toDateKey(f.case_receive_date),
            case_receive_date_time: ConvertService.toNull(f.case_receive_date_time),
            case_receive_from: f.case_receive_from,
            village: f.village,
            province: f.village.province,
            district: f.village.district,
            commune: f.village.commune,
            map: { latitude: f.latitude, longitude: f.longitude },
            road: f.road,
            house_no: f.house_no,
            location: f.location,
            location_scene: f.location_scene,
            location_name: f.location_name,
            case_reason: f.case_reason,
            case_reason_other: f.case_reason_other,
            weapon: f.weapon,
            weapon_other: f.weapon_other,
            transportation: f.transportation,
            transportation_other: f.transportation_other,
            victim_total: f.victim_total,
            victim_female_total: f.victim_female_total,
            suspect_total: f.suspect_total,
            suspect_female_total: f.suspect_female_total,
            suspect_arrested_total: f.suspect_arrested_total,
            suspect_arrested_female_total: f.suspect_arrested_female_total,
            status: recordStatus.active,
            crime_status: crimeStatus.pending,
            page_key: ConvertService.pageKey(),
            create_date: f.case_happen_date,
            create_date_key: ConvertService.toDateKey(f.case_happen_date),
            create_date_month: ConvertService.toMonthKey(f.case_happen_date),
            create_date_year: ConvertService.toYearKey(f.case_happen_date),
            create_by: this.env.user,
            notifications: MappingService.fieldArrayValues([], this.env.user),
            tags: MappingService.fieldArrayValues([], this.env.user),
          }

          this.store.addNew(item, (success, error) => {
            if (success) {
              this.form.enable();
              this.snackBar.open('Crime has been created.', 'done', { duration: 2000 });
              this.form.reset();
              const { code, key } = this.env.user.commune;
              const { crime_index } = this.env.option;
              const crimeIndex = MappingService.genCrimeIndex(crime_index + 1);

              const villageByCommune = this.villageLists.filter(m => m.commune.key === key);
              this.filteredVillageStates = MappingService.autoComplete(this.village, villageByCommune, "name");

              this.form.patchValue({
                crime_commune_no: code,
                crime_year_no: ConvertService.yearKey(),
                crime_index: crimeIndex,
                village: villageByCommune[0],
              })
            } else {
              this.form.enable();
              this.snackBar.open(error, 'Error');
            }
          })
        } else {
          this.snackBar.open(option, 'Error');
        }
      })
    }
  }

}
