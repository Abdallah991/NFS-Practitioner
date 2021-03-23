import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
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
  //patterns for input validation
  stringPattern = "[a-zA-Z ]*";
  numberPattern = /\-?\d*\.?\d{1,2}/;
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  registerPractitioner!: FormGroup;
  constructor(public fb: FormBuilder, private DrS: DropzoneService) {}

  submitted = false;

  filesAvailable: boolean = false;
  titles = TITLES;
  genders = GENDERS;
  countryCodes = COUNTRY_CODES;
  specialties = SPECIALTIES;
  subCategories = SUB_CATEGORIES;
  Languages = LANGUAGES;
  private files!: File;

  ngOnInit(): void {
    this.DrS.image = "uploadicon.png";
    this.DrS.size = "150px";
    this.registerPractitioner = this.fb.group({
      specialty: [""],
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern(this.stringPattern),
      ]),
      lastName: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl("", [
        Validators.required,
        // Validators.pattern(this.numberPattern),
      ]),
      locationName: new FormControl(""),
      gender: new FormControl(""),
      experience: new FormControl("", [
        Validators.required,
        // Validators.pattern(this.stringPattern),
      ]),
      about: new FormControl("", [
        Validators.required,
        // Validators.pattern(this.stringPattern),
      ]),
      education: new FormControl("", [
        Validators.required,
        // Validators.pattern(this.stringPattern),
      ]),
      pricePerSession: new FormControl("", [
        Validators.required,
        // Validators.pattern(this.numberPattern),
      ]),
      title: [""],
      subCategory: [""],
    });
  }

  get firstName() {
    return this.registerPractitioner.get("firstName");
  }

  async submitHandler() {
    console.log(this.registerPractitioner.value);
  }

  onSubmit() {
    this.submitted = true;
  }

  setfile(event: any) {
    this.files = event;
    this.filesAvailable = true;
    console.log(this.filesAvailable);
  }
}
