import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TITLES,
  GENDERS,
  COUNTRY_CODES,
  LANGUAGES,
} from 'src/app/constants/constants';
import { SPECIALTIES, SUB_CATEGORIES_ALTERNATIVE, SUB_CATEGORIES_BEHAVRIORAL } from 'src/app/constants/specialties';
import { Applicant } from 'src/app/models/applicant.model';
import { DropzoneService } from 'src/app/services/dropzone.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-register-practitioner',
  templateUrl: './register-practitioner.component.html',
  styleUrls: ['./register-practitioner.component.css'],
})
export class RegisterPractitionerComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;
  mapType = 'satellite';

  //patterns for input validation
  stringPattern = '[a-zA-Z ]*';
  numberPattern = /\-?\d*\.?\d{1,2}/;
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  //  urls for certifications
  urls: any[] = [];
  //  certifications fie names
  fileNames: string[] = [];
  //  form group declaration
  registerPractitioner: FormGroup;
  constructor(
    public fb: FormBuilder,
    private DrS: DropzoneService,
    private PS: PractitionerService
  ) {}

  submitted = false;

  //  drop downs content
  titles = TITLES;
  genders = GENDERS;
  countryCodes = COUNTRY_CODES;
  specialties = SPECIALTIES;
  subCategories = SUB_CATEGORIES_ALTERNATIVE;
  showSubCategories = false;
   applicant: Applicant;

  Languages = LANGUAGES;
  //  uploading file variable
  private files: File | undefined;
  filesAvailable: boolean = false;

  ngOnInit(): void {
    this.DrS.image = '';
    this.DrS.size = '150px';
    //  form group initialization
    
    this.registerPractitioner = this.fb.group({
      specialty: ['', [Validators.required]],
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.stringPattern),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.stringPattern),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      locationName: new FormControl(''),
      gender: new FormControl('', Validators.required),
      experience: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      pricePerSession: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      title: ['', [Validators.required]],
      subCategory: ['', 
      // [Validators.required]
    ],
    });
  }

  get title() {
    return this.registerPractitioner.get('title');
  }
  get firstName() {
    return this.registerPractitioner.get('firstName');
  }
  get lastName() {
    return this.registerPractitioner.get('lastName');
  }

  get email() {
    return this.registerPractitioner.get('email');
  }

  get phone() {
    return this.registerPractitioner.get('phone');
  }
  get locationName() {
    return this.registerPractitioner.get('locationName');
  }
  get experience() {
    return this.registerPractitioner.get('experience');
  }
  get about() {
    return this.registerPractitioner.get('about');
  }
  get education() {
    return this.registerPractitioner.get('education');
  }
  get pricePerSession() {
    return this.registerPractitioner.get('pricePerSession');
  }
  get subCategory() {
    return this.registerPractitioner.get('subCategory');
  }
  get specialty() {
    return this.registerPractitioner.get('specialty');
  }

  async submitHandler() {
    this.loadApplicantData();
    if (this.registerPractitioner.valid) {
    console.log('The button was clicked onhandler');
    console.log(this.registerPractitioner.value);
   

  } else {

  }
  }

  onSubmit() {
    console.log('The button was clicked onsubmit');
    this.submitted = true;
  }

  setfile(event: any) {
    this.PS.file = event;
    console.log(this.PS.file);
    console.log(event);
    this.filesAvailable = true;
    console.log(this.filesAvailable);
  }

  selectFiles(event: any) {
    if (event.target.files) {
      for (let i = 0; i < File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        this.fileNames.push(event.target.files[i].name);
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          console.log(this.urls);
        };
      }

      console.log(this.fileNames);
    }
  }

  changeTitle(e) {
    this.title.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeSpecialty(e) {
    this.specialty.setValue(e.target.value, {
      onlySelf: true,
    });

    console.log(e.target.value);
    switch(e.target.value) {
  
  case SPECIALTIES[2]:
  this.subCategories = SUB_CATEGORIES_BEHAVRIORAL;
  this.showSubCategories = true;
  break;
  case SPECIALTIES[3]:
    this.subCategories = SUB_CATEGORIES_ALTERNATIVE;
    this.showSubCategories = true;
    break;
    default:
    this.showSubCategories = false;
    break;

    }
    
  }

  changeSubCategory(e) {
    this.subCategory.setValue(e.target.value, {
      onlySelf: true,
    });

  }

  // upload applicant
  loadApplicantData() {
    console.log(this.title.value, 'hello');
  }

  
}
