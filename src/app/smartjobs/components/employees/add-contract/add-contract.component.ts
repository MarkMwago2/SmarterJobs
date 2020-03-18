import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ContractInfo } from '../../../../shared/models/contractInfo';
import Docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import PizZip from 'pizzip';
import * as fs from 'fs-extra/lib/fs';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  JobsService
} from '../../../services/jobs.service';
import {
  Router, ActivatedRoute
} from '@angular/router';
import { DatePipe } from '@angular/common';
import {ImageModule} from 'open-docxtemplater-image-module';

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
export interface Contracttype {
  value: string;
  viewValue: string;
}
export interface Salary {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddContractComponent implements OnInit {

  @ViewChild('resetAddEmployeeForm', {static: false}) myNgForm;
  error: any;
  isLoading: boolean;
  AddContractForm: FormGroup;
  companyId: any;
  userId: any;
  userProfile: any;

  @ViewChild('fileInput', {static: false}) fileInput: File;
  fileUrl: any;
  info: ContractInfo;
  fileInputEvent: any;
  contractSelect: any;

  addContractMessages = {
    contractType: [{
        type: 'required',
        message: 'Job title is required'
      },
    ],
  };
  contracts: Contracttype[] = [
    {value: 'Fixed Term', viewValue: 'Fixed Term'},
    {value: 'Internship', viewValue: 'Internship'},
    {value: 'Casual', viewValue: 'Casual'},
    {value: 'Permanent & Pensionable', viewValue: 'Permanent & Pensionable'},
  ];
  salary: Salary[] = [
    {value: 'quarterly', viewValue: 'quarterly'},
    {value: 'bi-yearly', viewValue: 'bi-yearly'},
    {value: 'annual', viewValue: 'annual'}
  ];
  base64File: string = null;
  filename: string = null;

  constructor(
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobs: JobsService,
    private actRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.createForms();
    this.showCreate();
    this.info = new ContractInfo();
  }
  createForms() {
    // user links form validations
    this.AddContractForm = this.fb.group({
      contractType: new FormControl('', Validators.compose([
        Validators.required
      ])),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
    });
  }


  onSubmitAddContract(value) {
    value.userId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.userId = this.prof.loggedInUserId();
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(res => {
      this.companyId = res.id;
    },
    error => {
      console.error(error);
    });
    this.isLoading = true;
    console.log(value);
    value.company = this.companyId;
    this.jobs.createContract(value).subscribe(
      res => {
        console.log(value);
        this.showSuccess();
        // this.router.navigate(['agency-jobs']);
      }, err => {
        this.showFailure();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Contract has been created' , 'Add Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about the contract', 'Add contract', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Contract has not been created' + 'Check the details and try again', 'Add Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
   /* Reset form */
   resetForm() {
    this.AddContractForm.reset();
    Object.keys(this.AddContractForm.controls).forEach(key => {
      this.AddContractForm.controls[key].setErrors(null);
    });
  }

  setContractA() {
    this.contractSelect = false;
  }

  setContractB() {
    this.contractSelect = true;
  }

  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader();
      fReader.readAsDataURL(file);
      fReader.onloadend = (event: any) => {
        this.filename = file.name;
        this.base64File = event.target.result;
      };
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }


  // Contract generator
  selectTemplate(value) {
    this.fileUrl = value;
  }

  selectCustomUrl() {
    // Call fileChange so that it retrieves the file already uploaded
    // Only relevant if if the user uses the file input AFTER selecting the radio button
    if (this.fileInputEvent !== undefined) {
      this.fileChange(this.fileInputEvent);
    }
  }

  fileChange(event) {
    this.fileInputEvent = event;

    // Ensure file was given
    if (event.target.files.length === 0) { return; }

    // Ensure correct type
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/application\/vnd.openxmlformats-officedocument.wordprocessingml.document\/*/) == null) {
      throw new TypeError('File must be *.docx');
    }

    // Retrieve file URL
    const reader = new FileReader();
    this.fileUrl = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => this.fileUrl = reader.result;
  }

  loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  }

  onSubmit() {
    this.isLoading = true;
    this.userId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.prof.getUser(this.userId).subscribe( res => {
      this.prof.getUserprofile(this.userId).subscribe(profile => {
        const userid = this.prof.loggedInUserId();
        this.prof.getcompanyprofileByUserId(userid).subscribe(company => {
          this.userProfile = {...res, ...profile, ...company};
          // console.log(this.userProfile);
          const d = Date();
          const a = d.toString();
          this.info.dateNow = this.datePipe.transform(a, 'yyyy-MM-dd');
          this.info.companyName = this.userProfile.companyname;
          this.info.companyLocation =  this.userProfile.physicaladdress;
          this.info.postalAddress = this.userProfile.address;
          this.info.userContractFname = this.userProfile.firstname;
          this.info.userContractLname = this.userProfile.lastname;
          this.info.startingDate = this.datePipe.transform(this.info.startingDate, 'yyyy-MM-dd');
          // console.log(this.userProfile);
          // const tagValue = this.userProfile.logo;

          // DOcx templater free image
          const opts = {
            centered: true,
            fileType: 'docx',
            getImage: null ,
            getSize: null
          };

          opts.getImage = (tagValue, tagName) => {
            tagValue = '/home/gkarumba/Documents/Python Projects/smarterjobs/' + this.userProfile.logo;
            tagName = 'image';
            return fs.readFileSync(tagValue);
          };

          opts.getSize = (img, tagValue, tagName) => {
            // img is the image returned by opts.getImage()
            // tagValue is 'examples/image.png'
            // tagName is 'image'
            // tip: you can use node module 'image-size' here
            return [150, 150];
          };

          const imageModule = new ImageModule(opts);


          this.loadFile(this.fileUrl, (error, content) => {
            if (error) { throw error; }
            const zip = new PizZip(content);
            // zip.file(content);
            const doc = new Docxtemplater().attachModule(imageModule);
            doc.loadZip(zip);
            doc.setData(this.info);
            try {
              // Replace placeholders with info values
              doc.render();
            } catch (error) {
              const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
              };
              console.log(JSON.stringify({ error: e }));
              throw error;
            }

            const out = doc.getZip().generate({
              type: 'blob',
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            // Save the generated document
            saveAs(out, `${this.info.userContractFname} Contract - ${this.info.companyName}.docx`);
            this.showSuccess();
          });
        });
      });
    });
  }

}
