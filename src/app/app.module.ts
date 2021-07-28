import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DropZoneComponent } from "./drop-zone/drop-zone.component";
import { RegisterPractitionerComponent } from "./screens/register-practitioner/register-practitioner.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { AgmCoreModule } from "@agm/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationPickerComponent } from "./components/location-picker/location-picker.component";
import { HttpClientModule } from "@angular/common/http";

var firebaseConfig = {
  apiKey: "AIzaSyDpZ8iww9uPG0gnqA0yHO9gZlBP6nttXuc",
  authDomain: "nfsapp-390d4.firebaseapp.com",
  databaseURL: "https://nfsapp-390d4.firebaseio.com",
  projectId: "nfsapp-390d4",
  storageBucket: "nfsapp-390d4.appspot.com",
  messagingSenderId: "1013389679732",
  appId: "1:1013389679732:web:594ecaed7f210b13e5c521",
  measurementId: "G-7HFYE6799H",
};
// var firebaseConfig = {
//   apiKey: "AIzaSyCSAlM97c2AG4OXMtBmUNuSjecONPoUUlY",
//   authDomain: "angularfire-20b5b.firebaseapp.com",
//   databaseURL: "https://angularfire-20b5b.firebaseio.com",
//   projectId: "angularfire-20b5b",
//   storageBucket: "angularfire-20b5b.appspot.com",
//   messagingSenderId: "652878430680",
//   appId: "1:652878430680:web:538e31872a6f7d909032ad",
// };

@NgModule({
  declarations: [
    AppComponent,
    RegisterPractitionerComponent,
    DropZoneComponent,
    LocationPickerComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDpZ8iww9uPG0gnqA0yHO9gZlBP6nttXuc",
      // AIzaSyCcLZGjrULCMhRZLkRHAD-mO92j06Vidyk
      libraries: ["places"],
    }),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
