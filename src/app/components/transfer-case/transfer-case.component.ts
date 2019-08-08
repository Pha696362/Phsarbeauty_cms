import { MappingService } from "./../../services/mapping.service";
import { Geo } from "./../../stores/geo.store";
import { Environment } from "./../../stores/environment.store";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../../auth/auth.service";
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { ConvertService } from 'src/app/services/convert.service';
import { ICrimeTransfer } from 'src/app/interfaces/crime';
import { Crime } from 'src/app/stores/crime.store';
import { status } from 'src/app/dummy/stauts';

@Component({
  selector: 'app-transfer-case',
  templateUrl: './transfer-case.component.html',
  styleUrls: ['./transfer-case.component.scss']
})
export class TransferCaseComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;

  province: AbstractControl;
  district: AbstractControl;
  commune: AbstractControl;
  village: AbstractControl;
  user: AbstractControl;
  transfer_date: AbstractControl;
  note: AbstractControl;

  filteredStatesProvince: any;
  filteredStatesDistrict: any;
  filteredStatesCommune: any;
  filteredStatesVillage: any;
  filteredStatesUser: any;

  constructor(
    public dialogRef: MatDialogRef<TransferCaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Crime,
    public geo: Geo,
    public env: Environment
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      province: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      district: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      commune: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      village: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      user: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      transfer_date: [new Date(), Validators.required],
      note: [null,],
    });

    this.province = this.form.controls["province"];
    this.district = this.form.controls["district"];
    this.commune = this.form.controls["commune"];
    this.village = this.form.controls["village"];
    this.user = this.form.controls["user"];
    this.transfer_date = this.form.controls["transfer_date"];
    this.note = this.form.controls["note"];
  }

  ngOnInit() {
    this.buildForm();
    this.geo.fetchProvinceToArray(list => {
      this.filteredStatesProvince = MappingService.autoComplete(
        this.province,
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
      this.geo.fetchUsersToArray(value.key, users => {
        this.filteredStatesUser = MappingService.autoComplete(
          this.user,
          users,
          "displayName"
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

  _onSelectedCommune(event) {
    const { value } = event.option;
    if (value) {
      this.village.enable();
      this.geo.fetchVillagesToArray(value.key, list => {
        this.filteredStatesVillage = MappingService.autoComplete(
          this.village,
          list,
          "name"
        );
      });
    } else {
      this.village.disable();
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  displayNameItem(item: any): string {
    return item ? item.displayName : item;
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { province, district, commune, village, note, transfer_date, user } = f;

      const formData: ICrimeTransfer = {
        key: this.afs.createId(),
        province: province,
        district: district,
        commune: commune,
        village: village,
        note: note,
        transfer_to: user,
        transfer_by: this.env.user,
        transfer_date: transfer_date,
        transfer_date_key: ConvertService.toDateKey(transfer_date),

        status: status[0],
        page_key: ConvertService.pageKey(),
        create_date: new Date(),
        create_by: this.env.user,
      }

      this.store.transfer(this.data, formData, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('ផ្ទេរឧក្រិដ្ឋកម្ម', 'ដោយជោគជ័យ', { duration: 3000 });
          this.form.reset();
          this.form.enable();
        }
        else {
          alert(error)
        }
      })
    }
  }
}
