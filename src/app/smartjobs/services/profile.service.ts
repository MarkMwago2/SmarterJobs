import {
  Injectable
} from '@angular/core';
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
export class ProfileService {

  private apiRoot = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  loggedInUserId() {
    const token = localStorage.getItem('token');
    const payload = jwtDecode(token);
    const userId = payload['user_id'];
    return userId;
  }

  user(): Observable < any > {
    return this.http.get(this.apiRoot.concat('user/') + this.loggedInUserId() + '/');
  }

  userprofile(): Observable < any > {
    return this.http.get(this.apiRoot.concat('profile/') + this.loggedInUserId() + '/');
  }

  updateProfile(profile): Observable < any > {
    return this.http.patch(this.apiRoot.concat('profile/') + this.loggedInUserId() + '/', profile);
  }

  getcompanyprofile(id): Observable < any > {
    return this.http.get(this.apiRoot.concat('company/') + id + '/');
  }

  getcompanyprofileByUserId(id): Observable < any > {
    return this.http.get(this.apiRoot.concat('agency/') + id + '/');
  }

  createcompanyprofile(company): Observable < any > {
    return this.http.post(this.apiRoot.concat('companies/'), company);
  }

  getAllCompanies(): Observable < any > {
    return this.http.get(this.apiRoot.concat('companies/'));
  }

  updatecompanyprofile(id, profile): Observable < any > {
    return this.http.patch(this.apiRoot.concat('agency/') + id + '/', profile);
  }
}
