import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Applicant } from '../models/applicant.model';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  file: File;
  certificates: File[];

  constructor(private storage: AngularFireStorage,
    private fireStore: AngularFirestore) {}



    async uploadApplicant(practitioner: Applicant) {
      try {
      await this.fireStore
        .collection("Applicants")
        .doc('applicant1')
        .set({ 
          title: practitioner.title,
          practitionerFirstName: practitioner.practitionerFirstName,
          practitionerLastName: practitioner.practitionerLastName,
          gender: practitioner.gender,
          email: practitioner.email,
          phone: practitioner.phone,
          countryCode: practitioner.countryCode,
          specialty: practitioner.specialty,
          subCategory: practitioner.subCategory,
          experience: practitioner.experience,
          education:practitioner.education,
          about: practitioner.about,
          pricePerSession: practitioner.pricePerSession,
          languages: practitioner.languages,
          certificates: practitioner.certificates,
          lat: practitioner.lat,
          longt: practitioner.longt,
          locationName: practitioner.locationName

        
        
        });
      } catch(err) {
        console.log(err)
      }
    }
}
