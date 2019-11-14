import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditShowService } from './edit-show.service';
import { switchMap } from 'rxjs/operators';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { Show } from '../models/show';

const URL = 'http://localhost:8000/upload';

@Component({
  selector: 'app-edit-show',
  templateUrl: './edit-show.component.html',
  styleUrls: ['./edit-show.component.css']
})
export class EditShowComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  // Global Variables that will store data from the sessionStorage on ngInit()
  user: any = {}
  show: Show

  // Corresponding model for the html
  updateShow = new Show(-1, '', '', false, 'assets/noImage.jpg', '')

  months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hours = [];
  days = [];
  years = [];
  date = {};

  airingChecked = false;
  intervalChecked = false;
  popup = false;

  // boolean for form errors
  error:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private editShowService: EditShowService,
    private router: Router) { }

  /**
   * Initializes the airing date form information and the global variables
   */
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.user == null){
      this.router.navigate(['/login']);
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

    const showId = this.route.snapshot.paramMap.get('id');

    this.editShowService.getShowbyId(showId).subscribe((response: Show) => {
      this.show = response;
      this.copyShowAttributes(this.updateShow, this.show);
      this.updateShow.updating = this.show._id;
    }, (error) => {
      this.error = true;
    });

    // for image upload
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.updateShow.img = `assets/${file.file.name}`;
     };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        if (status == 200) {

        } else {
          alert('Image file failed, try again')
        }
     };
  }

  /**
   * Sets the airing-date for the corresponding show
   */
  setAirDate() {
    if (this.airingChecked) {
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
        this.updateShow.airDate = airDate.toISOString();

      } else {
        this.updateShow.airDate = undefined;
      }
    }
  }

  /**
   * Returns whether the session storage current user is an admin
   */
  getCheckAdmin() {
    if(this.user == null){
      this.router.navigate(['/grid']);
    } else{
      return this.user.is_admin;
    }
    return false

  }

  /**
   * Corresponding function for the on-click of the "submit" button
   * Sets the air date of the currently edited show and updates the show
   * information in the sessionStorage
   */
  submitEdits() {
    this.setAirDate();

    // Automatically edits the show if the user is an admin
    if (this.getCheckAdmin()) {
      this.updateShow.approved = true;
      this.updateShow.updating = null;

      // updates this.show directly
      this.editShowService.editShow(this.show._id, this.updateShow).subscribe((response: Show) => {
        //
      }, (error) => {
        this.error = true;
        if (error.status == '401'){
          alert("your session has expired")
          this.router.navigate(['/login']);
        }
      });

    // otherwise, add this.updateShow to shows (it will be unapproved)
    } else {
      this.editShowService.addShow(this.updateShow).subscribe((response: Show) => {
        //
      }, (error) => {
        this.error = true;
        if (error.status == '401'){
          alert("your session has expired")
          this.router.navigate(['/login']);
        }
      });
    }

    // Creates successful notification and redirects user to the grid
    this.popup = true;
    setTimeout(() => {
      this.router.navigate(['/grid']);
    }, 2000);
  }

  /**
   * Corresponding action for the 'discard changes' button
   */
  resetEdits() {
    this.copyShowAttributes(this.updateShow, this.show);
  }

  /**
   * Helper function that copies the attributes of showToCopy to show
   */
  copyShowAttributes(show, showToCopy) {
    show.title = showToCopy.title;
    show.img = showToCopy.img;
    show.description = showToCopy.description;
    show.link = showToCopy.link;

    if (showToCopy.airDate) {
      show.airDate = showToCopy.airDate;
    }
    if (showToCopy.airInterval) {
      show.airInterval = showToCopy.airInterval;
    }
  }
}
