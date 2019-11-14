import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowFormService } from './show-form.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { Show } from '../models/show';
import { container } from '@angular/core/src/render3';
import { $ } from 'protractor';

const URL = 'http://localhost:8000/upload';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})

/**
 * Component that manages the "Add New Show" form
 * Form consisting of a title, description, image (not currently working),
 * link, and airing date/interval
 */
export class ShowFormComponent {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(public router: Router, private showFormService: ShowFormService) { }

  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  // Corresponding ngshow for the HTML of this component
  show = new Show(1, '', '', false, 'assets/noImage.jpg', '')

  months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hours = [];
  days = [];
  years = [];
  date = {};

  airingChecked = false;
  intervalChecked = false;
  popup = false;

  // error checking
  error: boolean = false;
  errorMsg: string;

  // var to bind file to
  selectedFile: File;


  /**
   * Initializes the form information
   */
  ngOnInit() {
    if(this.currentUser == null){
      this.router.navigate(['/grid']);
    } else{
      this.show.approved = this.currentUser.is_admin;
    }

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    for (let i = 0; i < 24; i++) {
      this.hours[i] = i;
    }

    for (let i = 1; i <= 31; i++) {
      this.days[i] = i;
    }

    for (let i = 0; i < 30; i++) {
      this.years[i] = (currentYear - 15) + i;
    }

    this.date["hour"] = this.hours[currentDate.getHours()];
    this.date["day"] = currentDate.getDate();
    this.date["month"] = this.months[currentDate.getMonth()];
    this.date["year"] = currentYear;

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.show.img= `assets/${file.file.name}`;
     };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        if(status == 200){
          this.addNewShow();
          this.router.navigate(['/grid']);
        } else{
          alert('Image file failed, try agian')
        }
     };
  }

  /**
   * Adds the newly-added show to the sessionStorage, and increments numShows
   * Displays a successful notification when submitted
   */
  addNewShow() {
    this.setAirDate();
    console.log(this.show)
    this.showFormService.addShow(this.show).subscribe((response)=>{
        this.error = false;
        this.popup = true;
        setTimeout(() => {
          this.router.navigate(['/grid']);
        }, 1000);
      },
      error => {
        this.error = true;
        this.errorMsg = error.error.message;
      }

    );
  }

  /**
 * Sets the date object once submit is clicked.
 */
  setAirDate() {
    let airDate = new Date();
    
    airDate.setFullYear(this.date["year"]);
    airDate.setMonth(this.months.indexOf(this.date["month"]));
    airDate.setDate(this.date["day"]);
    airDate.setHours(this.date["hour"]);
    airDate.setMinutes(0);
    airDate.setSeconds(0);
    airDate.setMilliseconds(0);

    // NaN if date is invalid, which would fail this
    if (airDate.getTime() === airDate.getTime()) {
      this.show.airDate = airDate.toISOString();
    }

    else {
      this.show.airDate = undefined;
    }
  }
}
