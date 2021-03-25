import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropzoneService } from '../services/dropzone.service';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
})
export class DropZoneComponent implements OnInit {
  @Output() fileEmmitor = new EventEmitter<string>();

  size = '170px';

  Image = '../../assets/uploadicon.png';

  urlRead;

  constructor(private DS: DropzoneService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setBackground();
    }, 3000);
  }

  setBackground() {
    this.Image = this.DS.image;
    this.size = this.DS.size;
  }

  files: any = [];

  ab = '';
  ac;

  element;

  uploadFile(event) {
    this.element = event[0];

    if (this.element.size < 2000000) {
      console.log(this.element.size + ' image size');
      this.ab = this.element.name;
      this.files = this.element;
      this.fileEmmitor.emit(this.element);
      // this.Image = element.name;

      var reader = new FileReader();
      reader.readAsDataURL(event[0]);

      reader.onload = (_event) => {
        this.urlRead = reader.result;
        this.Image = this.urlRead;
        this.size = 'cover';
      };
      console.log(this.Image);
    } else {
      let snackbarRef = this._snackBar.open(
        'Image size is too large',
        'Dismiss',
        {
          duration: 5000,
          panelClass: ['snackbarError'],
        }
      );

      snackbarRef.onAction().subscribe(() => {});
    }
  }
}
