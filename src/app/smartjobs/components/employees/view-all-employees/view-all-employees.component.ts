import { Contracts } from './../../../../shared/interface/contract';
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
  selector: 'app-view-all-employees',
  templateUrl: './view-all-employees.component.html',
  styleUrls: ['./view-all-employees.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewAllEmployeesComponent implements OnInit {

  companyId: any;
  userId: any;
  jobId: any;
  contractUserId: any;
  applicationId: any;
  jobApplicationData = {};
  ELEMENT_DATA = [];
  isLoading: boolean;
  shortlisted = false;

  // dataSource: any;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'startdate', 'enddate', 'action'];
  dataSource: MatTableDataSource<Contracts>;
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
  ) { }

  ngOnInit() {
    this.userId = this.prof.loggedInUserId();
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(res => {
      this.companyId = res.id;
      // console.log(this.companyId);
      this.jobs.getAllContractByCompanyID(this.companyId).subscribe(res => {
        console.log(res);
        if (res.length > 0) {
          res.forEach((element) => {
            this.prof.getUser(element.userId).subscribe(
                    success => {
                      // console.log(success);
                      element.email = success.email;
                      this.prof.getUserprofile(element.userId).subscribe(
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
                          element.rating = profile.rating;
                          element.ratingComment = profile.ratingComment;
                          element.blacklisted = profile.blacklisted;
                          element.blacklistedComment = profile.blacklistedComment;
                        },
                        error => {
                          console.error(error);
                        });
                    },
                    error => {
                      console.error(error);
                    }
                  );
            console.log(element.company);
            this.jobs.getAllEmployeesByContractID(element.id).subscribe(employee => {
              console.log(employee);
              element.staff_id_number = employee[0].staff_id_number;
              element.kra_pin = employee[0].kra_pin;
              element.next_of_kinPhoneNumber = employee[0].next_of_kinPhoneNumber;
              element.next_of_kinAddress = employee[0].next_of_kinAddress;
              element.next_of_kin = employee[0].next_of_kin;
              element.dependants = employee[0].dependants;
            },
            error => {
              console.error(error);
            });
      });
          this.ELEMENT_DATA = res;
          console.log(this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        /* Sort */
          this.dataSource.sort = this.sort;
      /* Pagination */
          setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    }
      });
    },
    error => {
      console.error(error);
    });
  }

}
