import { DeleteComponent } from './../../components/delete/delete.component';
import { personLabels } from './../../dummy/label';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Router } from '@angular/router';
import { Crime } from 'src/app/stores/crime.store';
import { ConfirmSuccessComponent } from 'src/app/components/confirm-success/confirm-success.component';
import { TransferCaseComponent } from 'src/app/components/transfer-case/transfer-case.component';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MappingService } from 'src/app/services/mapping.service';
import { Geo } from 'src/app/stores/geo.store';
import { Observable } from 'rxjs';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  tabs = tabs.crime;
  labels = personLabels;
  form: FormGroup;
  province: AbstractControl;
  district: AbstractControl;
  commune: AbstractControl;
  category: AbstractControl;
  sub_category: AbstractControl;
  from_date: AbstractControl;
  to_date: AbstractControl;
  search_all: AbstractControl;

  filteredStatesProvince: any;
  filteredStatesDistrict: any;
  filteredStatesCommune: any;

  issearch_all = false;
  filteredCategoriesStates: Observable<any[]>;
  filteredSubCategoriesStates: Observable<any[]>;

  constructor(
    public router: Router,
    public env: Environment,
    public store: Crime,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public geo: Geo,
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      province: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      district: [null, MappingService.validSelected.bind(this)],
      commune: [null, MappingService.validSelected.bind(this)],
      category: [null],
      sub_category: [null],
      from_date: [null],
      to_date: [null],
      search_all: [false],
    });

    this.search_all = this.form.controls["search_all"];
    this.province = this.form.controls["province"];
    this.district = this.form.controls["district"];
    this.commune = this.form.controls["commune"];
    this.category = this.form.controls["category"];
    this.sub_category = this.form.controls["sub_category"];
    this.from_date = this.form.controls["from_date"];
    this.to_date = this.form.controls["to_date"];
    this.form.controls['commune'].disable();
    this.form.controls['search_all'].valueChanges.subscribe(val => {
      if (val == true) {
        this.issearch_all = true;
        this.form.controls["province"].disable();
        this.form.controls["district"].disable();
        this.form.controls["commune"].disable();
        this.form.controls["category"].disable();
        this.form.controls["sub_category"].disable();
        this.form.controls["from_date"].disable();
        this.form.controls["to_date"].disable();
      } else {
        this.issearch_all = false;
        this.form.controls["province"].enable();
        this.form.controls["district"].enable();
        this.form.controls["commune"].enable();
        this.form.controls["category"].enable();
        this.form.controls["sub_category"].enable();
        this.form.controls["from_date"].enable();
        this.form.controls["to_date"].enable();
      }
    })
  }

  ngOnInit() {
    this.buildForm();
    this.env.fetchUserDoc(user => {
      this.form.controls['province'].patchValue(user.province);
      if (!this.env.isAdmin) {
        this.province.disable();
      }

      this.geo.fetchDistrictsToArray(user.province.key, list => {
        this.filteredStatesDistrict = MappingService.autoComplete(
          this.district,
          list,
          "name"
        );
      });

      // this.store.fetchData(this.env.user);
      // this.store.fetchFailData();
      // this.store.fetchStatistic();
    })
    this.store.fetchCategories((list) => {
      this.filteredCategoriesStates = MappingService.autoComplete(this.category, list, "name");
    });

    this.store.fetchSubCategories((list) => {
      this.filteredSubCategoriesStates = MappingService.autoComplete(this.sub_category, list, "name");
    });
    this.geo.fetchProvinceToArray(list => {
      this.filteredStatesProvince = MappingService.autoComplete(
        this.province,
        list,
        "name"
      );
    });

    this.form.controls['district'].valueChanges.subscribe(val => {
      if (val === '') {
        this.form.controls['commune'].reset();
        this.form.controls['commune'].disable();

      } else {
        this.form.controls['commune'].enable();
      }
    })
  }
  _onSearch(f) {
    if (this.form.valid) {
      // this.store.fetchStatistic(0, ConvertService.toDateSting(f.from_date), ConvertService.toDateSting(f.to_date));
      if (this.issearch_all === true) {
        this.store.fetchData(this.env.user);
      } else {
        this.store.fetchFitlterData(
          this.env.user,
          f.province ? f.province : this.env.user.province,
          f.district ? f.district : null,
          f.commune ? f.commune : null,
          f.category ? f.category : null,
          f.sub_category ? f.sub_category : null,
          f.from_date ? ConvertService.toDateKey(f.from_date) : null,
          f.to_date ? ConvertService.toDateKey(f.to_date) : null,
        );
      }
    }
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
    this.form.controls['commune'].reset();

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

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }
  _transfer(item) {
    let dialogRef = this.dialog.open(TransferCaseComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  confirmDone(item) {
    let dialogRef = this.dialog.open(ConfirmSuccessComponent, {
      data: { title: "បញ្ជាក់បទល្មើស លេខករណី " + item.crime_no, subtitle: " បទល្មើសនេះបានបង្ក្រាប", },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.updateComplete(item, this.env.user, (success, error) => {
          if (success) {
            this.snackBar.open('បញ្ជាក់បទល្មើសផ្តូរទៅបានបង្ក្រាប', 'ជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }

  delete(item) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'លុបទិន្នន័យ', memo: 'ដំណើរការនេះនឹងលុបទិន្នន័យចេញពីប្រព័ន្ធ', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(item, (success, error) => {
          if (success) {
            this.snackBar.open('ទិន្នន័យត្រូវបានលុប', 'ជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }

  resolve(item) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Resolve', memo: 'Resolve Statistics', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.updateFailData(item, (success, error) => {
          if (success) {
            this.snackBar.open('Resolve Successful', 'ជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }

}
