import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, NgForm, Validators } from "@angular/forms";
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

  constructor(public fb: FormBuilder, private DrS: DropzoneService) {}

  RegisterPractitioner = this.fb.group({
    specialty: [""],
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    locationName: new FormControl(""),
    gender: new FormControl(""),
    experience: new FormControl(""),
    about: new FormControl(""),
    education: new FormControl(""),
    pricePerSession: new FormControl(""),
    title: [""],
    subCategory: [""],
  });

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

  setfile(event?: any) {
    this.filesAvailable = true;
    console.log(this.filesAvailable);
  }
}
