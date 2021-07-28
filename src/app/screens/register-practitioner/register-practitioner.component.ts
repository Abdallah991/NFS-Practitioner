import { MapsAPILoader } from "@agm/core";
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";

import {} from "googlemaps";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as sendgrid from "@sendgrid/mail";
import { AppComponent } from "src/app/app.component";
import {
  TITLES,
  GENDERS,
  COUNTRY_CODES,
  LANGUAGES,
  SENDGRID_API_KEY,
} from "src/app/constants/constants";
import {
  SPECIALTIES,
  SUB_CATEGORIES_ALTERNATIVE,
  SUB_CATEGORIES_BEHAVRIORAL,
} from "src/app/constants/specialties";
import { DropzoneService } from "src/app/services/dropzone.service";
import { PractitionerService } from "src/app/services/practitioner.service";
import { MatDialog } from "@angular/material/dialog";
import { LocationPickerComponent } from "src/app/components/location-picker/location-picker.component";
import { expressionType } from "@angular/compiler/src/output/output_ast";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-register-practitioner",
  templateUrl: "./register-practitioner.component.html",
  styleUrls: ["./register-practitioner.component.css"],
})
export class RegisterPractitionerComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  address: string;

  //  app = express()
  // app.use(cors());

  msg;
  //patterns for input validation
  stringPattern = "[a-zA-Z ]*";
  numberPattern = /\-?\d*\.?\d{1,2}/;
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  //  urls for certifications
  urls: any[] = [];
  //  certifications file names
  fileNames: string[] = [];
  attachements: any[] = [];
  //  form group declaration
  registerPractitioner: FormGroup;
  constructor(
    public fb: FormBuilder,
    private DrS: DropzoneService,
    private PS: PractitionerService,
    private appComponent: AppComponent,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private http: HttpClient,
    private practitionerService: PractitionerService
  ) {}

  submitted = false;

  //  drop downs content
  titles = TITLES;
  genders = GENDERS;
  countryCodes = COUNTRY_CODES;
  specialties = SPECIALTIES;
  subCategories = SUB_CATEGORIES_ALTERNATIVE;
  showSubCategories = false;
  Languages = LANGUAGES;
  filesAvailable: boolean = false;
  // Send Grid code
  sgMail = require("@sendgrid/mail");
  fs = require("fs");

  async ngOnInit() {
    this.DrS.image = "";
    this.DrS.size = "150px";
    //  form group initialization

    // testing API calls
    //  let httpcall = await this.http.get('https://www.passwordrandom.com/query?command=password').subscribe(val => {
    //   console.log(val, 'this is the resposne ');

    //  });
    //  console.log(httpcall, 'this is the resposne ');

    this.registerPractitioner = this.fb.group({
      specialty: [this.specialties[0], [Validators.required]],
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern(this.stringPattern),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern(this.stringPattern),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      locationName: new FormControl(""),
      gender: new FormControl(this.genders[0], Validators.required),
      experience: new FormControl("", [Validators.required]),
      about: new FormControl("", [Validators.required]),
      education: new FormControl("", [Validators.required]),
      pricePerSession: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      title: [this.titles[0], [Validators.required]],
      countryCode: [this.countryCodes[0], [Validators.required]],
      languages: [this.Languages[0], [Validators.required]],
      subCategory: [""],
    });
  }

  // getters for from
  get title() {
    return this.registerPractitioner.get("title");
  }
  get firstName() {
    return this.registerPractitioner.get("firstName");
  }
  get lastName() {
    return this.registerPractitioner.get("lastName");
  }

  get email() {
    return this.registerPractitioner.get("email");
  }

  get gender() {
    return this.registerPractitioner.get("gender");
  }
  get phone() {
    return this.registerPractitioner.get("phone");
  }
  get countryCode() {
    return this.registerPractitioner.get("countryCode");
  }
  get locationName() {
    return this.registerPractitioner.get("locationName");
  }
  get experience() {
    return this.registerPractitioner.get("experience");
  }
  get about() {
    return this.registerPractitioner.get("about");
  }
  get education() {
    return this.registerPractitioner.get("education");
  }
  get pricePerSession() {
    return this.registerPractitioner.get("pricePerSession");
  }
  get subCategory() {
    return this.registerPractitioner.get("subCategory");
  }
  get specialty() {
    return this.registerPractitioner.get("specialty");
  }
  get languages() {
    return this.registerPractitioner.get("languages");
  }

  async submitHandler() {}

  // submit button implementation
  /**
   * @module checkout
   * @author Abdallah Alathamneh
   * @description Adding the information needed to complete the orders (address, date, time, payment method)
   * Payment integration
   * sending the order to the backend
   * @date 24/12/2020
   * @version 1.0.0
   * @date 26/04/2021
   * @version 2.0.0
   */
  onSubmit() {
    console.log(
      "The button was clicked onsubmit",
      this.registerPractitioner.value
    );
    this.submitted = true;
    this.loadApplicantData();
    // log out the form and if its valid
    console.log(
      this.registerPractitioner.value,
      this.registerPractitioner.valid
    );
    if (this.registerPractitioner.valid) {
      this.PS.uploadApplicant();
      console.log("The button was clicked onhandler");
    } else {
      this.appComponent.openFailureSnackBar(
        "Please fill the missing information"
      );
    }
    this.sendEmail(this.attachements);
  }

  // upload practitioner image
  setfile(event: any) {
    this.PS.file = event;
    console.log(this.PS.file);
    console.log(event);
    this.filesAvailable = true;
    console.log(this.filesAvailable);
  }

  // upload certificates
  selectFiles(event: any) {
    console.log(event.target.files.length);
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[i]);
        this.fileNames.push(event.target.files[i].name);
        let name = event.target.files[i].name;

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          let attch = event.target.result;
          this.attachements.push({
            content: attch.replace(/^data:application\/pdf;base64,/, ""),
            filename: name,
            type: "application/pdf",
            disposition: "attachment",
          });
        };
      }
      console.log(this.attachements);
      setTimeout(() => this.sendEmail(this.attachements), 5000);
      console.log(this.fileNames);
    }

    // calling the cloud function from the app

    let url = `https://us-central1-nhsc-edd5c.cloudfunctions.net/proceedOrder`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    this.http
      .post(
        "https://us-central1-nfsapp-390d4.cloudfunctions.net/sendCertificates",
        { data: "test" },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log("data", data);
      });
  }

  // select title
  changeTitle(e) {
    this.title.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // select country code
  changeCountryCode(e) {
    console.log(e.target.value);
    this.countryCode.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // select specialty
  changeSpecialty(e) {
    this.specialty.setValue(e.target.value, {
      onlySelf: true,
    });

    console.log(e.target.value);
    switch (e.target.value) {
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

  //  select sub-category
  changeSubCategory(e) {
    this.subCategory.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //  select language
  changeLanguage(e) {
    this.languages.setValue(e.target.value, {
      onlySelf: true,
      //
    });
  }

  // upload applicant data into the service
  loadApplicantData() {
    this.PS.title = this.title.value;
    this.PS.practitionerFirstName = this.firstName.value;
    this.PS.practitionerLastName = this.lastName.value;
    this.PS.gender = this.gender.value;
    this.PS.email = this.email.value;
    this.PS.phone = this.phone.value;
    this.PS.countryCode = this.countryCode.value;
    this.PS.specialty = this.specialty.value;
    this.PS.subCategory = this.subCategory.value;
    this.PS.about = this.about.value;
    this.PS.education = this.education.value;
    this.PS.experience = this.experience.value;
    this.PS.pricePerSession = this.pricePerSession.value;
    this.PS.languages = this.languages.value;
    this.PS.locationName = this.locationName.value;
    this.PS.certificateNames = this.fileNames;
  }

  // send email implementation
  sendEmail(attachements) {
    // body of the message
    let htmlSendEmail =
      "<h3> Hello NFS team,</h3>" +
      "<br>" +
      "<p> Please find my certificates attaches below</p>";
    // subject and sender email
    let subject =
      "Certificates and licenses for " +
      this.title.value +
      " " +
      this.firstName.value +
      " " +
      this.lastName.value;
    let senderEmail = this.email.value;

    this.msg = {
      to: "abdallah@fthm.me",
      from: "abdallah@fthm.me",
      subject: "test",
      text: "body",
      html: "<h1> this is a test</h1>",
      attachments: attachements,
    };

    this.sgMail = sendgrid.setApiKey(
      "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"
    );

    // send gird send email code
    // this.sgMail
    //   .send(this.msg)
    //   .then((response) => {
    //     console.log(response);
    //     console.log("the header are", response[0].headers);
    //   })
    //   .catch((error) => {
    //     // console.error(error);
    //   });
  }

  lat = 0;
  openLocationDialog() {
    this.dialog
      .open(LocationPickerComponent, {
        maxHeight: "90vh",
        width: "80vw",
        maxWidth: "700px",
      })
      .afterClosed()
      .subscribe(() => {
        this.lat = this.practitionerService.lat;
      });
  }

  loadAttachements() {}
}
