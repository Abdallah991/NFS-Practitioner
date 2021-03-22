import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import {
  COUNTRY_CODES,
  GENDERS,
  LANGUAGES,
  TITLES,
} from "src/app/constants/constants";
import { SPECIALTIES, SUB_CATEGORIES } from "src/app/constants/specialities";
import { DropzoneService } from "src/app/services/dropzone.service";

@Component({
  selector: "app-register-practitioner",
  templateUrl: "./register-practitioner.component.html",
  styleUrls: ["./register-practitioner.component.css"],
})
export class RegisterPractitionerComponent implements OnInit {
  // @ViewChild("fe")
  // editDoctorForm!: NgForm;
  RegisterPractitioner: FormGroup;
  constructor(public fb: FormBuilder, private DrS: DropzoneService) {
    this.RegisterPractitioner = this.fb.group({
      specialty: [""],
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      phone: new FormControl("",Validators.required),
      locationName: new FormControl("",Validators.required),
      gender: new FormControl("",Validators.required),
      experience: new FormControl("",Validators.required),
      about: new FormControl("",Validators.required),
      education: new FormControl("",Validators.required),
      pricePerSession: new FormControl("",Validators.required),
      title: [""],
      subCategory: [""],
    });
  }



  submitted = false;


  filesAvailable: boolean = false;
  titles = TITLES;
  genders = GENDERS;
  countryCodes = COUNTRY_CODES;
  specialties = SPECIALTIES;
  subCategories = SUB_CATEGORIES;
  Languages = LANGUAGES;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{15}$";

  ngOnInit(): void {
    this.DrS.image = "uploadicon.png";
    this.DrS.size = "150px";
  }

  async submitHandler() {
    console.log(this.RegisterPractitioner.value);
  }

  onSubmit(){
    this.submitted = true;

  }

  setfile(event?: any) {
    this.filesAvailable = true;
    console.log(this.filesAvailable);
  }
}
