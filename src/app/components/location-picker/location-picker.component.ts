import { MapsAPILoader } from "@agm/core";
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PractitionerService } from "src/app/services/practitioner.service";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.css"],
})
export class LocationPickerComponent implements OnInit {
  // location picker
  lat: number = 26.233974552113157;
  lng: number = 50.57565070202837;
  zoom: number = 16;
  searchable: boolean = true;
  private geoCoder;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  address: string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private practitionerService: PractitionerService
  ) {}

  ngOnInit(): void {
    // agm component

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      if (this.searchable) {
        let autocomplete = new google.maps.places.Autocomplete(
          this.searchElementRef.nativeElement
        );

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            //set latitude, longitude and zoom
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 16;

            this.practitionerService.lat = this.lat;
            this.practitionerService.longt = this.lng;
          });
        });
      }
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
        this.practitionerService.lat = this.lat;
        this.practitionerService.longt = this.lng;
        console.log("Latitude", this.lat);
        console.log("Longitude", this.lng);
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  markerDragEnd($event) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    console.log("Latitude", this.lat);
    console.log("Longitude", this.lng);
    this.practitionerService.lat = this.lat;
    this.practitionerService.longt = this.lng;
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 16;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  cancelDialog() {
    this.dialog.closeAll();
  }

  ConfirmSelection() {}
}
