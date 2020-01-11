import { Applications } from './../../../../shared/interface/Applications';
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
  AuthService
} from '../../../services/auth.service';
import {
  Router, ActivatedRoute
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewApplicationsComponent implements OnInit {

  companyId: any;
  userId: any;
  jobId: any;
  applicationId: any;
  jobApplicationData = {};
  ELEMENT_DATA = [];
  isLoading: boolean;
  shortlisted = false;

  // dataSource: any;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'profession', 'time_applied', 'action'];
  dataSource: MatTableDataSource<Applications>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(private router: Router,
              private prof: ProfileService,
              private toastr: ToastrService,
              private jobs: JobsService,
              private actRoute: ActivatedRoute,
              private auth: AuthService) {
                this.jobId = this.actRoute.snapshot.paramMap.get('id');
                this.jobs.getAllApplicationsByJobID(this.jobId).subscribe( res => {
                                this.jobApplicationData = res;
                                console.log(res);
                                if (res.length > 0) {
                                  res.forEach((element) => {
                                    this.userId = element.applicant;
                                    // console.log(this.userId);
                                    this.prof.getUser(this.userId).subscribe(
                                      success => {
                                        // console.log(success);
                                        element.email = success.email;
                                      },
                                      error => {
                                        console.error(error);
                                      }
                                    );
                                    this.prof.getUserprofile(this.userId).subscribe(
                                      profile => {
                                        element.firstname = profile.firstname;
                                        element.lastname = profile.lastname;
                                        element.dateofbirth = profile.dateofbirth;
                                        element.profession = profile.profession;
                                        element.phonenumber = profile.phonenumber;
                                        element.IDnumber = profile.IDnumber;
                                        element.pqualification = profile.pqualification;
                                        element.address = profile.address;
                                        element.gender = profile.gender;
                                        element.skills = profile.skills;
                                        element.membership = profile.membership;
                                        element.workexperience = JSON.parse(JSON.parse(profile.workexperience));
                                        element.academicQualification = JSON.parse(JSON.parse(profile.academicQualification));
                                        element.referees = JSON.parse(JSON.parse(profile.referees));
                                      },
                                      error => {
                                        console.error(error);
                                      });
                                    // console.log(res);
                                  });
                                }
                                this.ELEMENT_DATA = res;
                                console.log(this.ELEMENT_DATA);
                                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                                  /* Sort */
                                this.dataSource.sort = this.sort;
                                /* Pagination */
                                setTimeout(() => {
                                  this.dataSource.paginator = this.paginator;
                                }, 0);
                              },
                              error => {
                                console.error(error);
                              });
    }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addShortlist(applicationId, firstname, lastname) {
    this.isLoading = true;
    const value = { 'application': applicationId};
    this.jobs.createshortlist(value).subscribe( res => {
      this.showSuccess(firstname, lastname);
      this.shortlisted = true;
    },
    error => {
      this.showFailure();
    });
  }
  showSuccess(firstname, lastname) {
    this.toastr.success( firstname + lastname + 'has been shortlisted' , 'Add Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about the job', 'Add job', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('User had already been shortlisted', 'Add Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
}
