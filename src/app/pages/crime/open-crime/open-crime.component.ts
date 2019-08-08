import { Component, OnInit, ViewChild } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';
import { ActivatedRoute } from '@angular/router';
import { AddCrimeStore } from 'src/app/stores/add-crime.store';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange, MatSnackBar, MatSelectionList, MatSelectionListChange } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { ConvertService, toClassDate } from 'src/app/services/convert.service';
import { days, monthOfYear } from 'src/app/dummy/report';
import { Location } from '@angular/common';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-open-crime',
  templateUrl: './open-crime.component.html',
  styleUrls: ['./open-crime.component.scss'],
  providers: [NgbTimepickerConfig] 
})
export class OpenCrimeComponent implements OnInit {
  @ViewChild('matCase1') matCase1: MatSelectionList;
  @ViewChild('matCase2') matCase2: MatSelectionList;
  @ViewChild('crimeLocation') crimeLocation: MatSelectionList;
  @ViewChild('happenedLocation') happenedLocation: MatSelectionList;
  @ViewChild('crimeCause') crimeCause: MatSelectionList;
  @ViewChild('crimeWeapon') crimeWeapon: MatSelectionList;
  @ViewChild('crimeToolbox') crimeToolbox: MatSelectionList;
  @ViewChild('crimeOtherTransport') crimeOtherTransport: MatSelectionList;

  id: string = '';
  form: FormGroup;
  case1: AbstractControl;
  case2: AbstractControl;
  offence1: AbstractControl;
  offence2: AbstractControl;

  cause: AbstractControl;
  location: AbstractControl;
  weapon: AbstractControl;
  toolbox: AbstractControl;
  transportType: AbstractControl;

  crime_commune_no: AbstractControl;
  crime_year_no: AbstractControl;
  crime_index: AbstractControl;

  police_commissariat: AbstractControl;
  police_inspectorate: AbstractControl;
  police_station: AbstractControl;

  happen_day: AbstractControl;
  happen_location: AbstractControl;
  happen_month: AbstractControl;
  happen_year: AbstractControl;
  happen_hour: AbstractControl;

  receive_day: AbstractControl;
  receive_month: AbstractControl;
  receive_year: AbstractControl;
  receive_hour: AbstractControl;
  receive_from: AbstractControl;

  village: AbstractControl;
  home_no: AbstractControl;
  street_no: AbstractControl;
  location_other: AbstractControl;
  location_name: AbstractControl;

  cause_other: AbstractControl;
  weapon_other: AbstractControl;
  weapon_other_check: AbstractControl;
  toolbox_other: AbstractControl;
  transport_other: AbstractControl;
  transport: AbstractControl;
  transport_other_check:AbstractControl;
  toolbox_other_check:AbstractControl;

  victim_total: AbstractControl;
  victim_female_total: AbstractControl;
  suspect_total: AbstractControl;
  suspect_female_total: AbstractControl;
  arrested_total: AbstractControl;
  arrested_female_total: AbstractControl;

  data = {
    case: null,
    place: null,
    location: null,
    cause: null,
    haveWeapon: null,
    weapon: null,
    haveToolbox: null,
    toolbox: null,
    haveTransportType: null,
    transportType: null,
    haveMaterialLost: null,
    haveTransport: null,
  }

  villageList = [];

  happenDays = days;
  happenMonths = monthOfYear;
  happenYears = [];

  receiveDays = days;
  receiveMonths = monthOfYear;
  receiveYears = [];

  isMiddle = null;
  commune_no = null;
  year_no = null;
  currentDate=toClassDate(new Date());
  happen_time={hour: this.currentDate.hour, minute:  this.currentDate.minute};
  constructor(
    public ps: PrintService,
    public store: AddCrimeStore,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public env: Environment,
    private locationRoute: Location,
    private snackBar: MatSnackBar,
    private config: NgbTimepickerConfig
  ) { }

  ngOnInit() {
    this.config.spinners=false;
    for (let index = 2000; index < 2050; index++) { this.happenYears.push({ key: `${index}`, name: `${index}` }) };
    for (let index = 2000; index < 2050; index++) { this.receiveYears.push({ key: `${index}`, name: `${index}` }) };
    this.buildForm();
    this.route.parent.params.subscribe(param => {
      this.id = param.id;
      this.store.addCrimeConfig((res) => { });
      this.env.fetchUserDoc((user) => {
        const { commune } = this.env.user;
        this.store.fetchVillageByCommune(commune.key, (res) => {
          this.villageList = res;
          this.commune_no = commune.id;
          this.year_no = ConvertService.yearNumberKey(new Date());
          this.form.patchValue({
            crime_commune_no: this.commune_no,
            crime_year_no: this.year_no,
            crime_index: null,
            village: this.villageList[0],
          })
          this.crime_commune_no.disable();
          this.crime_year_no.disable();
        });
      })
    })
  }

  ngAfterViewInit() {
    this.matCase1.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.matCase1.deselectAll();
      s.option.selected = selected;
    })
    this.matCase2.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.matCase2.deselectAll();
      s.option.selected = selected;
    })
    this.crimeLocation.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.crimeLocation.deselectAll();
      s.option.selected = selected
    })
    this.happenedLocation.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.happenedLocation.deselectAll();
      s.option.selected = selected
    })
    this.crimeCause.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.crimeCause.deselectAll();
      s.option.selected = selected
    })
    this.crimeWeapon.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.crimeWeapon.deselectAll();
      s.option.selected = selected
    })
    this.crimeToolbox.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.crimeToolbox.deselectAll();
      s.option.selected = selected
    })
    this.crimeOtherTransport.selectionChange.subscribe((s: MatSelectionListChange) => {
      const {selected}=s.option;
      this.crimeOtherTransport.deselectAll();
      s.option.selected = selected
    })
  }

  checkOffence(isMiddle) {
    this.isMiddle = isMiddle;
    if (isMiddle) this.case1.disable();
    if (!isMiddle) this.case2.disable();
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  _goBack() {
    this.locationRoute.back();
  }

  buildForm(): void {
    this.form = this.fb.group({
      case1: [{ value: null, disabled: true }, Validators.required],
      case2: [{ value: null, disabled: true }, Validators.required],
      offence1: [false, Validators.required],
      offence2: [false, Validators.required],

      cause: [null,Validators.required],
      weapon: [null,Validators.required],
      toolbox: [null,Validators.required],
      transportType: [null,Validators.required],
      crime_commune_no: [null,Validators.required],
      crime_year_no: [null,Validators.required],
      crime_index: [null, [Validators.required]],

      police_commissariat: [null,],
      police_inspectorate: [null,],
      police_station: [null,],

      happen_day: [ this.happenDays.filter(m=>m.key===`${this.currentDate.day}`)[0], [Validators.required]],
      happen_month: [ this.happenMonths.filter(m=>m.key===`${this.currentDate.month}`)[0], [Validators.required]],
      happen_year: [ this.happenYears.filter(m=>m.key===`${this.currentDate.year}`)[0], [Validators.required]],
      happen_hour: [this.currentDate ,[Validators.required]],
      transport_other_check:[false],
      receive_day: [ this.happenDays.filter(m=>m.key===`${this.currentDate.day}`)[0], [Validators.required]],
      receive_month: [ this.happenMonths.filter(m=>m.key===`${this.currentDate.month}`)[0], [Validators.required]],
      receive_year:[ this.happenYears.filter(m=>m.key===`${this.currentDate.year}`)[0], [Validators.required]],
      receive_hour: [this.currentDate,[Validators.required]],
      receive_from: [null],
      location: [null,Validators.required],
      happen_location:[null,Validators.required],
      village: [null,Validators.required],
      home_no: [null,],
      street_no: [null,],
      location_name: [null,Validators.required],
      transport:[null,Validators.required],
      location_other: [{ value: null, disabled: true },],
      cause_other: [{ value: null, disabled: true },],
      weapon_other: [{ value: null, disabled: true },],
      toolbox_other: [{ value: null, disabled: true },],
      transport_other: [{ value: null, disabled: true },],
      weapon_other_check:[false],
      victim_total: [null,],
      victim_female_total: [null,],
      suspect_total: [null,],
      suspect_female_total: [null,],
      arrested_total: [null,],
      arrested_female_total: [null,],
      toolbox_other_check:[false]
    })
    this.offence1 = this.form.controls['offence1'];
    this.offence2 = this.form.controls['offence2'];
    this.case1 = this.form.controls['case1'];
    this.case2 = this.form.controls['case2'];
    this.cause = this.form.controls['cause'];
    this.location = this.form.controls['location'];
    this.weapon = this.form.controls['weapon'];
    this.toolbox = this.form.controls['toolbox'];
    this.transportType = this.form.controls['transportType'];

    this.crime_commune_no = this.form.controls['crime_commune_no'];
    this.crime_year_no = this.form.controls['crime_year_no'];
    this.crime_index = this.form.controls['crime_index'];
    this.toolbox_other_check=this.form.controls["toolbox_other_check"];
    this.police_commissariat = this.form.controls['police_commissariat'];
    this.police_inspectorate = this.form.controls['police_inspectorate'];
    this.police_station = this.form.controls['police_station'];

    this.happen_day = this.form.controls['happen_day'];
    this.happen_month = this.form.controls['happen_month'];
    this.happen_year = this.form.controls['happen_year'];
    this.happen_hour = this.form.controls['happen_hour'];
    this.receive_day = this.form.controls['receive_day'];
    this.receive_month = this.form.controls['receive_month'];
    this.receive_year = this.form.controls['receive_year'];
    this.receive_hour = this.form.controls['receive_hour'];
    this.receive_from = this.form.controls['receive_from'];
    this.happen_location=this.form.controls["happen_location"];
    this.village = this.form.controls['village'];
    this.home_no = this.form.controls['home_no'];
    this.street_no = this.form.controls['street_no'];
    this.location_name = this.form.controls['location_name'];
    this.location_other = this.form.controls['location_other'];
    this.cause_other = this.form.controls['cause_other'];
    this.weapon_other = this.form.controls['weapon_other'];
    this.toolbox_other = this.form.controls['toolbox_other'];
    this.transport_other = this.form.controls['transport_other'];

    this.victim_total = this.form.controls['victim_total'];
    this.victim_female_total = this.form.controls['victim_female_total'];
    this.suspect_total = this.form.controls['suspect_total'];
    this.suspect_female_total = this.form.controls['suspect_female_total'];
    this.arrested_total = this.form.controls['arrested_total'];
    this.arrested_female_total = this.form.controls['arrested_female_total'];
    this.weapon_other_check=this.form.controls["weapon_other_check"];
    this.transport=this.form.controls["transport"];
    this.transport_other_check=this.form.controls["transport_other_check"];
    this.weaponHaveStatus=true;
    this.toolboxHaveStatus=true;
    this.transportTypeHaveStatus=true;
    this.transportTypeHaveStatus=true;
    this.transportHaveStatus=true;
    this.materialLostHaveStatus=true;
  }

  cate1Status = false;
  cate2Status = false;

  case1Disable = true;
  case2Disable = true;

  weaponNoStatus = false;
  weaponHaveStatus = false;
  weaponDisable = true;

  toolboxNoStatus = false;
  toolboxHaveStatus = false;
  toolboxDisable = true;

  transportTypeNoStatus = false;
  transportTypeHaveStatus = false;
  transportTypeDisable = true;

  materialLostNoStatus = false;
  materialLostHaveStatus = false;

  transportNoStatus = false;
  transportHaveStatus = false;

  case1CheckedIndex = -1;
  case2CheckedIndex = -1;
  placeCheckedIndex = -1;
  locationCheckedIndex = -1;
  causeCheckedIndex = -1;
  weaponCheckedIndex = -1;
  toolboxCheckedIndex = -1;
  transportTypeCheckedIndex = -1;

  onSelectedOffence(event: MatCheckboxChange, offenceId: number) {
    this.case1.disable()
    this.case2.disable();
    this.matCase1.deselectAll();
    this.matCase2.deselectAll();
    const { checked } = event;
    switch (offenceId) {
      case 1:
        if (checked)
          this.case1.enable();
        if(this.offence2.value===true){
          this.offence2.patchValue(false)
        }
        break;
      default:
        if (checked)
          this.case2.enable();
        if(this.offence1.value===true){
          this.offence1.patchValue(false)
        }
        break;
    }
  }


  noWeapon(event: MatCheckboxChange) {
    const { checked } = event;
    this.weaponNoStatus = checked;
    this.weaponHaveStatus=!checked;
    if (checked==false) {
      this.weapon.enable();
      this.weapon_other.enable();
      this.weapon_other_check.enable();
    } else {
      this.weapon.disable();
      this.weapon_other.disable();
      this.weapon_other_check.disable();
    }
  }

  haveWeapon(event: MatCheckboxChange) {
    const { checked } = event;
    this.weaponNoStatus = !checked;
    this.weaponHaveStatus=checked;
    if (checked === true) {
      this.weapon.enable();
      this.weapon_other.enable();
      this.weapon_other_check.enable();
    } else {
      this.weapon.disable();
      this.weapon_other.disable();
      this.weapon_other_check.disable();
    }
  }

  noToolbox(event: MatCheckboxChange) {
    const { checked } = event;
    this.crimeToolbox.deselectAll();
    this.toolboxNoStatus = checked;
    this.toolboxHaveStatus = !checked;
    if (checked === true) {
      this.toolbox_other.disable();
      this.toolbox_other_check.disable()
      this.toolbox.disable();
    } else {
      this.toolbox_other.enable();
      this.toolbox_other_check.enable();
      this.toolbox.enable();
    }
  }

  isHaveToolbox(event: MatCheckboxChange) {
    const { checked } = event;
    this.toolboxNoStatus = !checked;
    this.toolboxHaveStatus = checked;
    if (checked === true) {
      this.toolbox_other.enable();
      this.toolbox_other_check.enable();
      this.toolbox.enable();
    } else {
      this.crimeToolbox.deselectAll();
      this.toolbox_other.disable();
      this.toolbox_other_check.disable()
      this.toolbox.disable();
    }
  }

  noTransportType(event: MatCheckboxChange) {
    const { checked } = event;
    this.transportTypeHaveStatus=!checked;
    this.transportTypeNoStatus=checked;
    if (checked === false) {
      this.transport.enable();
      this.transport_other.enable();
      this.transport_other_check.enable();
    } else {
      this.transport.disable();
      this.transport_other.disable();
      this.transport_other_check.disable();
    }
  }

  isHaveTransportType(event: MatCheckboxChange) {
    const { checked } = event;
    this.transportTypeHaveStatus=checked;
    this.transportTypeNoStatus=!checked;
    if (checked === true) {
      this.transport.enable();
      this.transport_other.enable();
      this.transport_other_check.enable();
    } else {
      this.transport.disable();
      this.transport_other.disable();
      this.transport_other_check.disable();
    }
  }

  noMaterialLost(event: MatCheckboxChange) {
    const { checked } = event;
    this.materialLostNoStatus = checked;
    this.materialLostHaveStatus = !checked;
  }

  isHaveMaterialLost(event: MatCheckboxChange) {
    const { checked } = event;
    this.materialLostNoStatus = !checked;
    this.materialLostHaveStatus = checked;
  }

  noTransport(event: MatCheckboxChange) {
    const { checked } = event;
    this.transportNoStatus = checked;
    this.transportHaveStatus = !checked;
  }

  isHaveTransport(event: MatCheckboxChange) {
    const { checked } = event;
    this.transportNoStatus = !checked;
    this.transportHaveStatus = checked;
  }

  case1CheckboxChange(event: MatCheckboxChange, index: number) {
    this.case1CheckedIndex = event.checked ? index : -1;
    this.data.case = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.case = source.value;
    }
  }

  case2CheckboxChange(event: MatCheckboxChange, index: number) {
    this.case2CheckedIndex = event.checked ? index : -1;
    this.data.case = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.case = source.value;
    }
  }

  placeCheckboxChange(event: MatCheckboxChange, index: number) {
    this.placeCheckedIndex = event.checked ? index : -1;
    this.data.place = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.place = source.value;
    }
  }

  causeCheckboxChange(event: MatCheckboxChange, index: number) {
    this.isCauseOther = false;
    this.cause_other.patchValue(null);
    this.cause_other.disable();
    this.causeCheckedIndex = event.checked ? index : -1;
    this.data.cause = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.cause = source.value;
    }
  }

  weaponCheckboxChange(event: MatCheckboxChange, index: number) {
    this.isWeaponOther = false;
    this.weapon_other.patchValue(null);
    this.weapon_other.disable();
    this.weaponCheckedIndex = event.checked ? index : -1;
    this.data.weapon = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.weapon = source.value;
    }
  }

  toolBoxCheckboxChange(event: MatCheckboxChange, index: number) {
    this.isToolboxOther = false;
    this.toolbox_other.patchValue(null);
    this.toolbox_other.disable();
    this.toolboxCheckedIndex = event.checked ? index : -1;
    this.data.toolbox = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.toolbox = source.value;
    }
  }

  transportTypeCheckboxChange(event: MatCheckboxChange, index: number) {
    this.isTransportOther = false;
    this.transport_other.patchValue(null);
    this.transport_other.disable();
    this.transportTypeCheckedIndex = event.checked ? index : -1;
    this.data.toolbox = null;
    const { checked, source } = event;
    if (checked === true) {
      this.data.transportType = source.value;
    }
  }

  isLocationOther = false;
  locationOther(event: MatCheckboxChange) {
    this.data.location = null;
    this.happenedLocation.deselectAll();
    const { checked } = event;
    this.isLocationOther = checked;
    if (checked === true) {
      this.location_other.enable();
      this.happen_location.disable();
    } else {
      this.location_other.disable();
      this.happen_location.enable();
      this.data.location = null;
    }
  }

  isCauseOther = false;
  causeOther(event: MatCheckboxChange) {
    const { checked } = event;
    this.isCauseOther = checked;
    if (checked === true) {
      this.cause_other.enable();
      this.crimeCause.deselectAll();
      this.cause.disable();
    } else {
      this.isCauseOther = false;
      this.cause_other.disable();
      this.cause.enable();
    }
  }

  isWeaponOther = false;
  weaponOtherDisable = true;
  weaponOther(event: MatCheckboxChange) {
    const { checked } = event;
    this.isWeaponOther = checked;
    this.crimeWeapon.deselectAll();
    if (checked === true) {
      this.weapon.disable();
      this.weapon_other.enable();
    } else {
      this.weapon.enable();
      this.weapon_other.disable();
    }
  }

  isToolboxOther = false;
  toolboxOtherDisable = true;
  toolboxOther(event: MatCheckboxChange) {
    const { checked } = event;
    this.crimeToolbox.deselectAll();
    this.isToolboxOther = checked;
    if (checked === true) {
      this.toolbox.disable();
      this.toolbox_other.enable();
    } else {
      this.toolbox_other.disable();
      this.toolbox.enable();
    }
  }

  isTransportOther = false;
  transportOtherDisable = true;
  transportOther(event: MatCheckboxChange) {
    const { checked } = event;
    if (checked === true) {
      this.transport.disable();
      this.transport_other.enable();
    } else {
      this.transport.enable();
      this.transport_other.disable();
    }
  }

  print() {
    this.ps.print('#print', 'a4l')
  }

  save(f: any) {
    if (this.form.valid) {
      const { happen_day, happen_month, happen_year, happen_hour, receive_day, receive_month, receive_year, receive_hour, receive_from, village,
        home_no, street_no, location_other, location_name, cause_other, weapon_other, toolbox_other, transport_other, crime_index,
        victim_total, victim_female_total, suspect_total, suspect_female_total, arrested_total, arrested_female_total,
        police_commissariat, police_inspectorate, police_station,
      } = f;

      const happenDate = ConvertService.dateThreeOneKey(happen_day.key, happen_month.key, happen_year.key);
      const receiveDate = ConvertService.dateThreeOneKey(receive_day.key, receive_month.key, receive_year.key);

      const crime_no = `${this.commune_no}/${this.year_no}/${crime_index}`;


      // @CaseNr nvarchar(15)
      //      ,@ReportDate datetime
      //      ,@ReportTime nvarchar(5)
      //      ,@IncidentDate datetime
      //      ,@IncidentTime nvarchar(5)
      //      ,@VillageId bigint
      //      ,@CaseId bigint
      //      ,@PlaceId bigint
      //      ,@PlaceOther nvarchar(60)
      //      ,@LocationId bigint
      //      ,@LocationOther nvarchar(80)
      //      ,@CauseId bigint
      //      ,@CauseOther nvarchar(60)
      //      ,@Street nvarchar(60)
      //      ,@TransportTypeId bigint
      //      ,@TransportationOther nvarchar(60)
      //      ,@VictimNr int
      //      ,@SuspectNr int
      //      ,@Arrested int
      //      ,@HasEvident bit
      //      ,@HasLostProperty bit
      //      ,@Summary nvarchar(1000)
      //      ,@CloseDate datetime
      //      ,@EvidentNote nvarchar(1000)
      //      ,@LostNote nvarchar(1000)
      //      ,@Justification nvarchar(500)
      //      ,@CreatedBy nvarchar(65)
      //      ,@ResolvedDate datetime
      //      ,@ResolvedType int
      //      ,@VictimNrFemale int
      //      ,@SuspectNrFemale int
      //      ,@ArrestedFemale int
      //      ,@ReportSource nvarchar(200)
      //      ,@ProvinceId bigint
      //      ,@DistrictId bigint
      //      ,@CommuneId bigint
      //      ,@OffenceId bigint

      const form = {
        CaseNr: crime_no,
        ReportDate: receiveDate,
        ReportTime: receive_hour,
        IncidentDate: happenDate,
        IncidentTime: happen_hour,
        VillageId: village.id,
        ProvinceId: village.province.id,
        DistrictId: village.district.id,
        CommuneId: village.commune.id,
        CaseId: this.data.case ? this.data.case.Id : null,
        OffenceId: this.data.case ? this.data.case.OffenceId : null,
        PlaceId: this.data.place ? this.data.place.Id : null,
        PlaceOther: null,
        LocationId: this.data.location ? this.data.location.Id : null,
        LocationOther: ConvertService.toNull(location_other),
        CauseId: this.data.cause.Id,
        CauseOther: ConvertService.toNull(cause_other),
        Street: street_no,
        TransportTypeId: this.data.transportType ? this.data.transportType.Id : null,
        TransportationOther: ConvertService.toNull(transport_other),
        VictimNr: victim_total,
        SuspectNr: suspect_total,
        Arrested: arrested_total,
        VictimNrFemale: victim_female_total,
        SuspectNrFemale: suspect_female_total,
        ArrestedFemale: arrested_female_total,
        HasEvident: false,
        HasLostProperty: false,
        Summary: null,
        CloseDate: receiveDate,
        EvidentNote: null,
        LostNote: null,
        Justification: null,
        CreatedBy: "test", // user
        ResolvedDate: receiveDate,
        ResolvedType: null,
        ReportSource: receive_from,

        home_no: home_no,
        location_name: ConvertService.toNull(location_name),

        police_commissariat: police_commissariat,
        police_inspectorate: police_inspectorate,
        police_station: police_station,

        // happen_date: happenDate,
        // happen_day: happen_day,
        // happen_month: happen_month,
        // happen_year: happen_year,
        // happen_hour: happen_hour,
        // receive_date: receiveDate,
        // receive_day: receive_day,
        // receive_month: receive_month,
        // receive_year: receive_year,
        // receive_hour: receive_hour,
        // receive_from: receive_from,
        // village: village,
        // street_no: street_no,
        // // home_no: home_no,

        // location_other: ConvertService.toNull(location_other),
        // // location_name: ConvertService.toNull(location_name),
        // cause_other: ConvertService.toNull(cause_other),
        // weapon_other: ConvertService.toNull(weapon_other),
        // toolbox_other: ConvertService.toNull(toolbox_other),
        // transport_other: ConvertService.toNull(transport_other),

        // victim_total: victim_total,
        // victim_female_total: victim_female_total,
        // suspect_total: suspect_total,
        // suspect_female_total: suspect_female_total,
        // arrested_total: arrested_total,
        // arrested_female_total: arrested_female_total,

        ...this.data,

      }

      console.log(form)
      this.store.addCrime(form, (success, error) => {
        if (success) {
          this.snackBar.open('ទិន្នន័យត្រូវបានបង្កើត', 'ជោគជ័យ', { duration: 5000 });
        }
        else {
          alert(error)
        }
      })
    }
  }

}

