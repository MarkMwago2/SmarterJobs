import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  error: any;
  isLoading: boolean;
  companyId: any;
  userId: any;
  jobId: any;
  jobsList = [];
  
  // current = 0;
  // img_list = [
  //   'https://picsum.photos/600/400/?image=0',
  //   'https://picsum.photos/600/400/?image=1',
  //   'https://picsum.photos/600/400/?image=2',
  // ];
  constructor(
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobs: JobsService,
    private actRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobs.getAllJobs().subscribe(
      res => {
        this.jobsList[0] = res[0];
        this.jobsList[1] = res[1];
        this.jobsList[2] = res[2];
        this.jobsList[3] = res[3];
        console.log(this.jobsList);
      },
      error => {
        console.error(error);
      }
    );
  }

}
