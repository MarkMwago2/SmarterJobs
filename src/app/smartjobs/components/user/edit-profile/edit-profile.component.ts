import {
  Component,
  OnInit,
  Input,
  forwardRef,
  NgZone, ViewChild
} from '@angular/core';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  AuthService
} from '../../../services/auth.service';
import {
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  CanActivate,
  Router
} from '@angular/router';

import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {
  environment
} from '../../../../../environments/environment';
import {
  CloudinaryOptions,
  CloudinaryUploader
} from 'ng2-cloudinary';
import { MatPaginator } from '@angular/material';

export interface FormData {
  name: string;
  page: number;
  display: boolean;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator;
  length: number;
  pageSize = 4;
  pageSizeOptions: number[] = [2, 3, 4, 5];
  hidePageSize = true;
  showFirstLastButtons = false;
  pageIndex = 0;
  pageName: string;
  @Input() item;

  formData: FormData[] = [];
  isLastPage = false;

  formValues = {
    dataValue0: 'field0',
    dataValue1: 'field1',
    dataValue2: 'field2',
    dataValue3: 'field3',
    dataValue4: 'field4',
    dataValue5: 'field5',
    dataValue6: 'field6',
    dataValue7: 'field7',
    dataValue8: 'field8',
    dataValue9: 'field9',
    dataValue10: 'field10'
  };


  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group(this.formValues);
  }


  ngOnInit() {
    let indexNo = 0;
    let pageNo = 0;
    let i = 0;

    for (const prop in this.formValues) {
      this.formData.push(this.createFormData(prop, pageNo));
      indexNo++;
      i++;
       // increment page number
      if (indexNo >= this.pageSize) {
          indexNo = 0;
          pageNo++;
        }
      }
    this.length = i;
    this.setPageFormFieldPaging(this.pageIndex, this.pageSize);
  }

  createFormData(prop: string, pageNumber: number): FormData {
    const item: FormData = { name: prop, page: pageNumber, display: true };
    return item;
  }

  setPageFormFieldPaging(pageIndex: number, pageSize: number) {
    const lowerBound: number = ((pageIndex + 1) * pageSize) - pageSize;
    const upperBound: number = ((pageIndex + 1) * pageSize) - 1;
    this.formData.forEach((item, index) => {
    item.display = true;
    if (index >= lowerBound && index <= upperBound) {
        item.display = false;
      }
    });
    console.log(pageIndex);
    this.changePageName(pageIndex);
  }

  changePageName(pageIndex) {
    if (pageIndex === 0) {
      this.pageName = 'Personal Bio-Data';
    } else if ( pageIndex === 1) {
      this.pageName = 'Work Experience';
    } else if ( pageIndex === 2) {
      this.pageName = 'Academic Qualification';
    } else if ( pageIndex === 3) {
      this.pageName = 'Professional Qualification';
    } else if ( pageIndex === 4) {
      this.pageName = 'Special Skills And Talent';
    } else if ( pageIndex === 5) {
      this.pageName = 'Membership';
    } else if ( pageIndex === 1) {
      this.pageName = 'Availability Status';
    } else {
      this.pageName = 'Referees';
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  pageEvent($event) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.setPageFormFieldPaging(this.pageIndex, this.pageSize);
    this.isLastPage = !this.paginator.hasNextPage();
  }

  submitExecuted() {
    console.log('submit executed ' + this.isLastPage);
}

}
