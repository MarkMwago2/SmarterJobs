import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiRoot = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient, private router: Router) { }

  createJob(jobs): Observable < any > {
    return this.http.post(this.apiRoot.concat('jobs/'), jobs);
  }

  getAllJobs(): Observable < any > {
    return this.http.get(this.apiRoot.concat('jobs/'));
  }

  getAllJobsByCompanyID(compID): Observable < any > {
    return this.http.get(this.apiRoot.concat('cjob/') + compID + '/');
  }

  getJobByID(jobID): Observable < any > {
    return this.http.get(this.apiRoot.concat('job/') + jobID + '/');
  }

  editJobByID(jobID, job): Observable < any > {
    return this.http.patch(this.apiRoot.concat('job/') + jobID + '/', job);
  }

  deleteJobByID(jobID): Observable < any > {
    return this.http.delete(this.apiRoot.concat('job/') + jobID + '/');
  }
}