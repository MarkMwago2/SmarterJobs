import { Component, OnInit, ViewEncapsulation, ViewChild, Output, HostListener, ElementRef } from '@angular/core';
import {
  JobsService
} from '../../services/jobs.service';
import {
  ProfileService
} from '../../services/profile.service';
import {
  Router, ActivatedRoute
} from '@angular/router';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatPaginator, MatToolbarModule } from '@angular/material';
import {MatTooltipModule, MatTooltip} from '@angular/material/tooltip';
import {MatSelect} from '@angular/material/select';
import {
  ToastrService
} from 'ngx-toastr';
import { MnFullpageOptions } from 'ngx-fullpage';
import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobs: JobsService,
    private actRoute: ActivatedRoute,
    private location: Location,
  ) { }

  error: any;
  isLoading: boolean;
  companyId: any;
  userId: any;
  jobId: any;
  jobsList = [];
  defaultElevation = 2;
  raisedElevation = 8;

  mySlideImages = [ 
    {image: 'assets/Carousel/woman-standing-on-the-center-table-with-four-people-on-the-1367271.jpg', header: 'We Can Be Your Guide', text: 'In The World Of Recruitment',top: '70', left: '50', }, 
    {image: 'assets/Carousel/woman-sitting-in-front-on-brown-wooden-table-1181401.jpg', header: 'We Know What It Takes' , text: 'To Find the Right Employees', top: '70', left: '50',},
    {image: 'assets/Carousel/woman-standing-on-the-center-table-with-four-people-on-the-1367271.jpg', header: 'Need An Employee?' , text: 'Find Your Perfect Candidates', top: '70', left: '50', }
  ];
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions = {items: 1, dots: true, nav: false, autoplay: true, loop: true};
  myCarouselOptions = {items: 3, dots: true, nav: true};

  ngOnInit() {
    // this.getJobs();
  }

  // getJobs() {
  //   this.jobs.getAllJobs().subscribe(
  //     res => {
  //       this.jobsList[0] = res[0];
  //       this.jobsList[1] = res[1];
  //       this.jobsList[2] = res[2];
  //       this.jobsList[3] = res[3];
  //       console.log(this.jobsList);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }
  // navigateJobs() {
  //   this.router.navigate(['view-jobs']);
  // }
  // navigateCreateCompany() {
  //   this.router.navigate(['create-companyprofile']);
  // }

}
