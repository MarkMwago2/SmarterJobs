import { Talentpools } from '../../../shared/interface/talentpool';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ProfileService
} from '../../services/profile.service';
import {
  JobsService
} from '../../services/jobs.service';
import {
  AuthService
} from '../../services/auth.service';
import {
  Router, ActivatedRoute
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import { COMMA, TAB, SPACE, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
export interface SearchItem {
  name: string;
}
export interface Rating {
  value: number;
  viewValue: number;
}
export interface Gender {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-talentpool',
  templateUrl: './talentpool.component.html',
  styleUrls: ['./talentpool.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TalentpoolComponent implements OnInit {
  filteredList = [];
  ELEMENT_DATA = [];
  isLoading: boolean;
  shortlisted = false;
  userId: any;
  // dataSource: any;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'profession', 'gender', 'rating'];
  dataSource: MatTableDataSource<Talentpools>;
  professionFilter = new FormControl();
  genderFilter = new FormControl();
  ratingFilter = new FormControl();
  nameFilter = new FormControl();
  private filterValues = { profession: '', gender: '', rating: '', name: ''  };

  filteredValues = {
    profession: '', gender: '', rating: '', name: ''
  };
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [COMMA, TAB, ENTER];
  searchItems: SearchItem[] = [];

  ratings: Rating[] = [
    {value: 0, viewValue: 0},
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
  ];
  genders: Gender[] = [
    {value: 'Female', viewValue: 'Female'},
    {value: 'Male', viewValue: 'Male'},
    // {value: 'Rather Not Say', viewValue: 'Rather Not Say'},
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(
    private router: Router,
    private prof: ProfileService,
    private toastr: ToastrService,
    private jobs: JobsService,
    private actRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    this.prof.getAllUserprofiles().subscribe(res => {
      if (res.length > 0) {
        this.filteredList = res.filter((hero) => {
          return hero.IDnumber > 1;
        });
        this.filteredList.forEach((element) => {
          this.userId = element.user;
          element.workexperience = JSON.parse(JSON.parse(element.workexperience));
          element.academicQualification = JSON.parse(JSON.parse(element.academicQualification));
          element.referees = JSON.parse(JSON.parse(element.referees));
          this.prof.getUser(this.userId).subscribe(
            success => {
              // console.log(success);
              element.email = success.email;
            },
            error => {
              console.error(error);
            }
          );
        });
      }
      this.ELEMENT_DATA = this.filteredList;
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      /* Sort */
      this.dataSource.sort = this.sort;
      /* Pagination */
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      // console.log(this.filteredList);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.professionFilter.valueChanges.subscribe((positionFilterValue) => {
      console.log(positionFilterValue);

      this.filteredValues.profession = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      // this.filteredValues.topFilter = false;
    });
    this.genderFilter.valueChanges
      .subscribe(value => {
        this.filterValues.gender = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.ratingFilter.valueChanges
      .subscribe(value => {
        this.filterValues.rating = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.nameFilter.valueChanges
      .subscribe(value => {
        this.filterValues.name = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.dataSource.filterPredicate = this.createFilter();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log('event', event);

    // Add our fruit
    if ((value || '').trim()) {
      this.searchItems.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: SearchItem): void {
    const index = this.searchItems.indexOf(item);

    if (index >= 0) {
      this.searchItems.splice(index, 1);
    }
  }


  applyFilter(filterValue: string) {
    const filter = {
      profession: filterValue.trim().toLowerCase(),
      gender: filterValue.trim().toLowerCase(),
      rating: filterValue,
      name: filterValue.trim().toLowerCase(),
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  createFilter() {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const ratingSearch = data.rating.toString().indexOf(searchTerms.rating) !== -1;
      const nameSearch = () => {
        let found = false;
        searchTerms.name.trim().toLowerCase().split(' ').forEach(word => {
          if (data.firstname.toLowerCase().indexOf(word) !== -1 && data.lastname.toLowerCase().indexOf(word) !== -1) { found = true; }
        });
        return found;
      };
      const professionSearch = () => {
        let found = false;
        searchTerms.profession.trim().toLowerCase().split(' ').forEach(word => {
          if (data.profession.toLowerCase().indexOf(word) !== -1) { found = true; }
        });
        return found;
      };
      const genderSearch = () => {
        let found = false;
        searchTerms.gender.trim().toLowerCase().split(' ').forEach(word => {
          if (data.gender.toLowerCase().indexOf(word) !== -1) { found = true; }
        });
        return found;
      };
      return professionSearch();
    };
    return filterFunction;
  }
}
