import { CONFIGS, Help } from './../../dummy/stauts';
import { Pages } from "./../../dummy/pages";
import { Search } from "./../../stores/search.store";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit } from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from "@angular/animations";
import { Environment } from "../../stores/environment.store";
import { MappingService } from "../../services/mapping.service";
import { searchFilterBy } from "../../services/data.service";
import { switchMap, debounceTime, tap } from "rxjs/operators";
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { roleObj } from 'src/app/dummy/roles';
import { Statistic } from 'src/app/stores/statistic.store';
import { ConvertService } from 'src/app/services/convert.service';
import { AuthStore } from 'src/app/stores/auth.store';
import { toNumber } from 'functions/src/mapping';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [
    trigger("explainerAnim", [
      transition("* => *", [
        query(".ani-col", style({ opacity: 0, transform: "translateY(40px)" })),
        query(
          ".ani-col",
          stagger("200ms", [
            animate(
              "500ms .3s ease-out",
              style({ opacity: 1, transform: "translateY(0)" })
            )
          ])
        ),
        query(".ani-col", [animate(1000, style("*"))])
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  formFocus: boolean;
  form: FormGroup;
  search: AbstractControl;
  searchType: AbstractControl;
  filterBy = searchFilterBy;
  loading: boolean = false;
  CONFIG = CONFIGS
  HELPER = Help
  endDayOfMonth: any;
  user: any;
  barChart = [
    {
      "name": "បន្ទាយមានជ័យ",
      "value": 3
    },
    {
      "name": "បាត់ដំបង",
      "value": 18
    },
    {
      "name": "កំពង់ចាម",
      "value": 29
    },
    {
      "name": "កំពង់ឆ្នាំង",
      "value": 39
    },
    {
      "name": "កំពង់ស្ពឺ",
      "value": 5
    },
    {
      "name": "កំពង់ធំ",
      "value": 10
    },
    {
      "name": "កំពត",
      "value": 200
    },
    {
      "name": "កណ្ដាល",
      "value": 50
    },
    {
      "name": "កោះកុង",
      "value": 40
    }
    ,
    {
      "name": "ក្រចេះ",
      "value": 0
    }
    ,
    {
      "name": "មណ្ឌលគិរី",
      "value": 40
    }
    ,
    {
      "name": "ភ្នំពេញ",
      "value": 20
    }
    ,
    {
      "name": "ព្រះវិហារ",
      "value": 100
    }
    ,
    {
      "name": "ព្រៃវែង",
      "value": 130
    }
  ];

  pipeChart = [
    {
      "name": "លួចមានស្ថានទម្ងន់ (ឆក់):  4 ករណី",
      "value": 4
    },
    {
      "name": "ជំរិតទារប្រាក់:  7 ករណី",
      "value": 7
    },
    {
      "name": "បង្ខាំងមនុស្សខុសច្បាប់: 2 ករណី",
      "value": 2
    },
    {
      "name": "រំលោភសម្លាប់: 1 ករណី",
      "value": 1
    },
    {
      "name": "រំលោភសេពសន្ថវៈ: 38 ករណី",
      "value": 38
    },
    {
      "name": "ឃាតកម្ម: 31 ករណី",
      "value": 31
    },
    {
      "name": "លួចមានស្ថានទម្ងន់ (មធ្យោបាយផ្សេងៗ): 48 ករណី",
      "value": 48
    },
    {
      "name": "លួចមានស្ថានទម្ងន់ (អាវុធ): 3 ករណី",
      "value": 3
    },
    {
      "name": "ប្រើអាវុធខុសច្បាប់: 3 ករណី",
      "value": 3
    },
    {
      "name": "បំពានខាងផ្លូវភេទដទៃទៀត: 6 ករណី",
      "value": 6
    },
    {
      "name": "អំពើហឹង្សាក្នុងគ្រួសារ: 28 ករណី",
      "value": 28
    },
    {
      "name": "អំពើហឹង្សាដោយចេតនា: 85 ករណី",
      "value": 85
    },
    {
      "name": "ឆបោក.រំលោភទំនុកចិត្ត: 14 ករណី",
      "value": 14
    },
    {
      "name": "លួច: 170 ករណី",
      "value": 170
    },
    {
      "name": "មនុស្សឃាតអចេតនា: 2 ករណី",
      "value": 2
    },
  ];

  multi = [
    {
      "name": "By Percentage",
      "series": [
        {
          "name": "2016",
          "value": 30
        },
        {
          "name": "2017",
          "value": 50
        }
      ]
    },
  ];


  view: any[] = [];
  view1: any[] = [];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showLegends = true;
  explodeSlices = false;
  showLabels = true;
  doughnut = true;
  showLegendPipe = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = false;
  showDataLabel = true;
  legend = false;
  roundDomains = true;
  legendTitle = '';
  yAxisLabel = '';
  trimLabels = false;
  showGridLines = true;
  showYAxisLabel1 = false;
  showYAxis1 = false;
  colorScheme = {
    domain: [
      '#124CDA', '#14B9D9', '#673ab7', '#CD7891',
      '#8DDF8A', '#ff8f00', '#C01F8B', '#BF3D65',
      '#B956C8', '#EB8D23', '#22B0CC', '#8AD160',
      '#9E0FB1', '#098D8A', '#6ACAD5', '#B53DC1',
      '#C83D95', '#1a73e8', '#81248E', '#30e5d0',
      '#3F7FE4', '#BF3D65', '#8DDF8A', '#30e5d0',
      '#C83D95', '#E8BBBE', '#81248E', '#30e5d0',
      '#C83D95', '#432E8C', '#81248E', '#30e5d0',
      '#C83D95', '#432E8C', '#81248E', '#30e5d0',
    ]
  };
  colorSchemeJustice = {
    domain: [
      '#FBAAB7', '#BF3D65']
  };
  colorSchemeAllJustice = {
    domain: [
      '#1BDCB3', '#007869']
  };
  colorSchemeAllCrime = {
    domain: [
      '#78c257', '#FECB06']
  };

  colorSchemeApple = {
    domain: [
      '#8DDF8A']
  };
  colorSchemeVictim = {
    domain: [
      '#1F3BB3']
  };
  constructor(
    private auth: AuthStore,
    private router: Router,
    public env: Environment,
    public store: Statistic,
    private fb: FormBuilder,
    public route: ActivatedRoute,
  ) { }

  logout() {
    this.auth.signOut();
  }

  _newCrime() {
    // if (this.env.user && this.env.user.role.key === roleObj.readWrite.key) {
    this.router.navigate(["/new-case"]);
    // }
  }

  currentDate = new Date()
  yearKey = ConvertService.toYearKey(this.currentDate);
  monthKey = ConvertService.toMonthKey(this.currentDate);

  async getList() {
    this.env.fetchSysConfig((res) => {
      const { endDayOfMonth } = this.env.sysConfig;
      this.endDayOfMonth = endDayOfMonth;
      this.route.params.forEach(param => {
        if (param && param.fromDate && param.toDate) {
          const { provinceId, categoryId, subCategoryId, fromDate, toDate } = param;
          this.store.provinceFilter = toNumber(provinceId);
          this.store.categoryFilter = toNumber(categoryId);
          this.store.subCategoryFilter = toNumber(subCategoryId);
          this.store.fromDateFilter = fromDate;
          this.store.toDateFilter = toDate;
        }
        else {
          this.store.provinceFilter = 0;
          this.store.categoryFilter = 0;
          this.store.subCategoryFilter = 0;
          this.store.fromDateFilter = ConvertService.getDefaultDateReport(endDayOfMonth).form_date;
          this.store.toDateFilter = ConvertService.getDefaultDateReport(endDayOfMonth).to_date;
        }
        this.store.fetchStatisticApi();
        this.store.fetchRecent();
      })
    })
    // await this.store.fetchStatistic(CONFIGS.YEAR, CONFIGS.FROM_YEAR, CONFIGS.TO_YEAR);
  }

  filterData() {
    this.store.fetchStatistic(CONFIGS.YEAR, CONFIGS.FROM_YEAR, CONFIGS.TO_YEAR);
  }

  ngOnInit() {
    this.getList();
    this.form = this.fb.group({
      searchType: [this.filterBy[0], [Validators.required]],
      search: [null]
    });
    this.search = this.form.controls["search"];
    this.searchType = this.form.controls["searchType"];
  }

  displayItem(item: any): string {
    if (this.searchType) {
      const { key } = this.searchType.value;
      return item ? item[key] : item;
    }
    return item ? item.puc_id : item;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.text === o2.text;
    }
  }

  _onFocus(yes) {
    this.formFocus = yes;
  }

  // _onSearch(item: any) {
  //   const { search, searchType } = item;
  //   if (search.key) {
  //     this.router.navigate(["/transcript/" + search.key + "/preview"]);
  //   }
  //   else {
  //     const students = MappingService.filter(this.store.data, searchType.key, search);
  //     if (students.length > 0) {
  //       const s = students[0];
  //       this.router.navigate(["/transcript/" + s.key + "/preview"]);
  //     }
  //   }
  // }
  // _selectionChange(event) {
  //   const { value } = event;
  //   this.store.filterType = value;
  // }
  // _optionSelected(item: any) {
  //   this.router.navigate(["/transcript/" + item.key + "/preview"]);
  // }


}
