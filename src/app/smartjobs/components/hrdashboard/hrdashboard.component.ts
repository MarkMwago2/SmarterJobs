import { Component, OnInit } from '@angular/core';
import {
  Router, ActivatedRoute
} from '@angular/router';
export interface Tile {
  cols: number;
  rows: number;
  text: string;
  border: string;
  img: string;
  title: string;
  onClick: string;
 }
@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.css']
})
export class HrdashboardComponent implements OnInit {

  tiles: Tile[] = [
    // tslint:disable-next-line: max-line-length
    {text: 'agency-jobs', cols: 2, rows: 1 , border: '3px double purple', img: '/assets/images/jobs2.png', title: 'Jobs', onClick: 'jobsRoute()'},
    // tslint:disable-next-line: max-line-length
    {text: 'view-employee', cols: 2, rows: 1 , border: '3px double maroon', img: '/assets/images/number-of-employees-icon.png', title: 'Employees', onClick: 'employeesRoute()'},
    // tslint:disable-next-line: max-line-length
    {text: 'talentpool', cols: 2, rows: 1 , border: '3px double maroon', img: '/assets/images/talentpool.png', title: 'Talent Pool', onClick: 'talentPoolRoute()'},
    // tslint:disable-next-line: max-line-length
    {text: 'view-reports', cols: 2, rows: 1 , border: '3px double purple', img: '/assets/images/report-2.png', title: 'Reports', onClick: 'reportsRoute()'},
    ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  employeesRoute() {
    this.router.navigate(['agency-jobs']);
  }
  talentPoolRoute() {
    this.router.navigate(['agency-jobs']);
  }
  jobsRoute() {
    this.router.navigate(['agency-jobs']);
  }
  reportsRoute() {
    this.router.navigate(['agency-jobs']);
  }
}
