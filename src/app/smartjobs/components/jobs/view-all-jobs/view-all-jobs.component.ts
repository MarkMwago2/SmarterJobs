import { Jobs } from './../../../../shared/interface/jobs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  JobsService
} from '../../../services/jobs.service';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewAllJobsComponent implements OnInit {

  companyId: any;
  userId: any;
  ELEMENT_DATA = [];
  // dataSource: any;
  displayedColumns: string[] = ['id', 'job_title', 'industry', 'time_posted', 'application_deadline', 'action'];
  dataSource: MatTableDataSource<Jobs>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');


  constructor(private router: Router,
              private prof: ProfileService,
              private toastr: ToastrService,
              private jobs: JobsService) {
                this.userId = this.prof.loggedInUserId();
                this.prof.getcompanyprofileByUserId(this.userId).subscribe(
                  res => {
                    this.companyId = res.id;
                    this.jobs.getAllJobsByCompanyID(this.companyId).subscribe(
                      success => {
                        this.ELEMENT_DATA.push(success);
                        console.log(this.ELEMENT_DATA);
                        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA[0]);
                         /* Sort */
                        this.dataSource.sort = this.sort;
                        /* Pagination */
                        setTimeout(() => {
                          this.dataSource.paginator = this.paginator;
                        }, 0);
                      },
                      error => {
                        console.error(error);
                      }
                    );
                  },
                  error => {
                    console.error(error);
                  }
                );
                // this.jobs.getAllJobsByCompanyID(this.companyId).subscribe(
                //   res => {
                //     this.ELEMENT_DATA.push(res);
                //     console.log(this.ELEMENT_DATA);
                //     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                //   },
                //   error => {
                //     console.error(error);
                //   }
                // );
               }

  ngOnInit() {
    // this.getCompany();
    // this.dataSource.sort = this.sort;
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getCompany() {
    this.userId = this.prof.loggedInUserId();
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(
      res => {
        this.companyId = res.id;
        console.log(this.companyId);
        this.getJobsByCompany(this.companyId);
      },
      error => {
        console.error(error);
      }
    );
  }

  getJobsByCompany(companyID) {
    this.jobs.getAllJobsByCompanyID(companyID).subscribe(
      res => {
        this.ELEMENT_DATA.push(res);
        // console.log(this.ELEMENT_DATA);
      },
      error => {
        console.error(error);
      }
    );
  }
}
