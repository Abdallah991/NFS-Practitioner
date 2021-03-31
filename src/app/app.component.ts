import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "NFSPractioner3";

  constructor(private snackBar: MatSnackBar) {}

  openSuccessSnackBar(message) {
    this.snackBar.open(message, "Dismiss", {
      duration: 3000,
      panelClass: ["snackbar"],
    });
  }
  // failure snack bar
  openFailureSnackBar(message) {
    this.snackBar.open(message, "Dismiss", {
      duration: 3000,
      panelClass: ["snackbar"],
    });
  }
}
