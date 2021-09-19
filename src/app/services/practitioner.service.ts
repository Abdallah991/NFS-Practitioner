import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { BehaviorSubject } from "rxjs";
import { Applicant } from "../models/applicant.model";

@Injectable({
  providedIn: "root",
})
export class PractitionerService {
  // loading sub
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // files to be updated (image + certificates)
  file: File;
  task: AngularFireUploadTask;
  certificates: File[];
  // values of applicant data
  certificateNames = [];
  title = "";
  practitionerFirstName = "";
  practitionerLastName = "";
  email = "";
  about = "";
  education = "";
  experience = "";
  gender: string = "";
  phone = "";
  countryCode = "";
  specialty = "";
  subCategory = "";
  pricePerSession: number = 0;
  lat: number = 0;
  longt: number = 0;
  locationDescription: string = "";
  rating: number = 0;
  practitionerId: string = "";
  locationName: string = "";
  languages: string = "";
  imagePath: string = "";
  linkedIn: string = ""; 

  constructor(
    private storage: AngularFireStorage,
    private fireStore: AngularFirestore
  ) {}

  // uplaod applicant to firestore
  async uploadApplicant() {
    try {
      await this.fireStore
        .collection("Applicants")
        .add({
          title: this.title,
          practitionerFirstName: this.practitionerFirstName,
          practitionerLastName: this.practitionerLastName,
          gender: this.gender,
          email: this.email,
          phone: this.phone,
          countryCode: this.countryCode,
          specialty: this.specialty,
          subCategory: this.subCategory,
          experience: this.experience,
          education: this.education,
          about: this.about,
          pricePerSession: this.pricePerSession,
          languages: this.languages,
          certificates: this.certificateNames,
          lat: this.lat,
          longt: this.longt,
          locationName: this.locationName,
          id: "",
          imagePath: this.imagePath,
          linkedIn: this.linkedIn
        })
        .then(async (res) => {
          console.log("the result from Firebase", res.id);
          // set the image path
          this.imagePath = res.id + ".jpg";
          // update the id and image path of the applicant
          await this.fireStore
            .collection("Applicants")
            .doc(res.id)
            .update({ id: res.id, imagePath: this.imagePath });
        })
        .then((res) => {
          console.log("result formt the update", res);
          // upload the applicant image
          this.uploadPractitionerImage();
        });
    } catch (err) {
      console.log(err);
    }
  }
  // upload applicant image implementation
  uploadPractitionerImage() {
    const path = this.imagePath;
    try {
      this.task = this.storage.upload(this.imagePath, this.file);
    } catch (err) {}
  }
}
