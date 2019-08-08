import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Router } from '@angular/router';
import { slideInOutAnimation } from 'src/app/services/slide-io.animation';
import { Location } from '@angular/common';
import { Crime } from 'src/app/stores/crime.store';
import { DataService } from 'src/app/services/data.service';
import { Geo } from 'src/app/stores/geo.store';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-crime-transfer',
  templateUrl: './crime-transfer.component.html',
  styleUrls: ['./crime-transfer.component.scss'],
  host: { "[@slideInOutAnimation]": "" },
  animations: [slideInOutAnimation],
})
export class CrimeTransferComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;

  form: FormGroup;
  province: AbstractControl;
  district: AbstractControl;
  commune: AbstractControl;

  province_to: AbstractControl;
  district_to: AbstractControl;
  commune_to: AbstractControl;
  crime_transfer: AbstractControl;

  filteredStatesProvince: any;
  filteredStatesDistrict: any;
  filteredStatesCommune: any;

  filteredStatesProvinceTo: any;
  filteredStatesDistrictTo: any;
  filteredStatesCommuneTo: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public env: Environment,
    public store: Crime,
    private ds: DataService,
    private router: Router,
    private locationRoute: Location,
    public geo: Geo,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.geo.fetchProvinceToArray(list => {
      this.filteredStatesProvince = MappingService.autoComplete(
        this.province,
        list,
        "name"
      );
    });

    this.geo.fetchProvinceToArray(list => {
      this.filteredStatesProvinceTo = MappingService.autoComplete(
        this.province_to,
        list,
        "name"
      );
    });
  }

  _onSelectedProvince(event) {
    const { value } = event.option;
    if (value) {
      this.district.enable();
      this.geo.fetchDistrictsToArray(value.key, list => {
        this.filteredStatesDistrict = MappingService.autoComplete(
          this.district,
          list,
          "name"
        );
      });
    } else {
      this.district.disable();
    }
  }

  _onSelectedDistrict(event) {
    const { value } = event.option;
    if (value) {
      this.commune.enable();
      this.geo.fetchCommunesToArray(value.key, list => {
        this.filteredStatesCommune = MappingService.autoComplete(
          this.commune,
          list,
          "name"
        );
      });
    } else {
      this.commune.disable();
    }
  }

  villageList = [];
  _onSelectedCommune(event) {
    const { value } = event.option;
    if (value) {
      this.geo.fetchVillagesToArray(value.key, list => {
        this.villageList = list;
      });
    } 
  }

  _onSelectedProvinceTo(event) {
    const { value } = event.option;
    if (value) {
      this.district.enable();
      this.geo.fetchDistrictsToArray(value.key, list => {
        this.filteredStatesDistrictTo = MappingService.autoComplete(
          this.district_to,
          list,
          "name"
        );
      });
    } else {
      this.district_to.disable();
    }
  }

  _onSelectedDistrictTo(event) {
    const { value } = event.option;
    if (value) {
      this.commune.enable();
      this.geo.fetchCommunesToArray(value.key, list => {
        this.filteredStatesCommuneTo = MappingService.autoComplete(
          this.commune_to,
          list,
          "name"
        );
      });
    } else {
      this.commune_to.disable();
    }
  }

  _onSelectedCrimeTo(event) {
    const { value } = event.option;
    this.store.fetchCrimeCommune(value.key);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  _goBack() {
    this.locationRoute.back();
  }

  buildForm(): void {
    this.form = this.fb.group({
      province: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      district: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      commune: [null, [Validators.required, MappingService.validSelected.bind(this)]],

      province_to: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      district_to: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      commune_to: [null, [Validators.required, MappingService.validSelected.bind(this)]],

      crime_transfer: [50,
        Validators.compose([
          Validators.max(100),
          Validators.min(1)
        ])],
    });

    this.province = this.form.controls["province"];
    this.district = this.form.controls["district"];
    this.commune = this.form.controls["commune"];

    this.province_to = this.form.controls["province_to"];
    this.district_to = this.form.controls["district_to"];
    this.commune_to = this.form.controls["commune_to"];

    this.crime_transfer = this.form.controls["crime_transfer"];
  }

  public validMaxStudent(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    if (value !== undefined && value !== null && value !== "") {
      if (value < 0 || value > 50) {
        return { validAmount: true }
      }
    }
  }

  _validStudentInClass(i) {
    const { crime_transfer } = this.form.value;
    if (i < crime_transfer) return true;
    return false
  }

  create(f: any, list: any) {
    const { selected } = list.selectedOptions;
    if (this.form.valid && selected.length > 0) {
      this.form.disable();

      const items = selected.map(m => {
        return { ...m.value };
      });

      this.store.transferCrime(f, items, this.villageList,(success, error) => {
        if (success) {
          this.form.enable();
          this.snackBar.open('ផ្ទេរឧក្រិដ្ឋកម្មបញ្ចប់', 'ដោយជោគជ័យ', { duration: 2000 });
          this.form.reset();
          const { province, district, commune, province_to, district_to, commune_to } = f;
          this.form.patchValue({
            province: province,
            district: district,
            commune: commune,
            province_to: province_to,
            district_to: district_to,
            commune_to: commune_to,
          })
        } else {
          this.form.enable();
          this.snackBar.open(error, 'Error');
        }
      })
    }
  }

}
