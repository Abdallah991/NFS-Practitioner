export class Applicant {
    title: string;
    about: String;
    practitionerFirstName: String;
    practitionerLastName: String;
    education: String;
    email: String;
    experience: String;
    gender: String;
    imageUrl: number;
    phone: string;
    countryCode: string;
    specialty: String;
    longt: String;
    lat: String;
    locationDescription: String;
    practitionerID: string;
    imagePath: string;
    subCategory?: String;
    pricePerSession: number;
    languages: String;
    locationName: String;
    certificates: String[];

  
    constructor(
        title: string,
      about: String,
      practitionerFirstName: String,
      practitionerLastName: String,
      education: String,
      email: String,
      experience: String,
      gender: String,
      phone: string,
      countryCode: string,
      specialty: String,
      longt: String,
      lat: String,
      locationName: String,
      locationDescription: String,
      practitionerID: string,
      imagePath: string, 
      pricePerSession: number,
      languages: String,
      certificates: String[]
    ) {
    this.title = title;
    this.practitionerFirstName = practitionerFirstName;
    this.practitionerLastName = practitionerLastName;
      this.about = about;
      this.education = education;
      this.email = email;
      this.experience = experience;
      this.gender = gender;
      this.imageUrl = 0;
      this.phone = phone;
      this.countryCode = countryCode;
      this.specialty = specialty;
      this.longt = longt;
      this.lat = lat;
      this.locationName= locationName;
      this.locationDescription = locationDescription;
      this.practitionerID = practitionerID;
      this.imagePath = imagePath;
      this.pricePerSession = pricePerSession;
      this.languages = languages;
      this.certificates = certificates;
    }
  }
  