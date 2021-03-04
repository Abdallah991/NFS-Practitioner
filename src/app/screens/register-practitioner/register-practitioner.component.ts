import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-practitioner',
  templateUrl: './register-practitioner.component.html',
  styleUrls: ['./register-practitioner.component.css'],
})
export class RegisterPractitionerComponent implements OnInit {
  @ViewChild('fe')
  editDoctorForm!: NgForm;

  constructor(public fb: FormBuilder) {}
  firstName: any;
  lastName: any;
  email: any;
  phone: any;
  specialty: any;
  experience: any;
  education: any;
  price: any;
  languages: any;
  filesAvailable: boolean = false;

  ngOnInit(): void {}

  // registerPractitioner = this.fb.group({
  //   firstName: new FormControl('', [Validators.required]),
  //   lastName: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required]),
  //   phoneNumber: ['', [Validators.required]],
  //   gender: ['', [Validators.required]],
  //   speciality: ['', [Validators.required]],
  //   subCategories: ['', [Validators.required]],
  //   experience: ['', [Validators.required]],
  //   about: ['', [Validators.required]],
  //   education: ['', [Validators.required]],
  //   pricePerSession: [''],
  //   languages: ['', [Validators.required]],
  //   locationName: [''],
  // });

  async onSubmit() {}

  setfile(event?: any) {
    // this.DS.files = event;
    this.filesAvailable = true;
  }
}
