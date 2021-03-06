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
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  private apiRoot = 'https://smarterjobs.herokuapp.com/api/';
  constructor(private http: HttpClient, private router: Router) { }

  industries(): Observable < any > {
    return this.http.get(this.apiRoot.concat('industries/'));
  }

  getindustry(id): Observable < any > {
    return this.http.get(this.apiRoot.concat('industry/') + id + '/');
  }
}
