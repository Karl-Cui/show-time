import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Show } from '../models/show';
import { MyShow } from '../models/my_show';
import { User } from '../models/user';
import { ShowService } from './show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  show: any = {};
  user: any = {};
  myShow: any ={};
  inMyShows: boolean = false;
  updatedTimeout: boolean = false;
  ratingData: Array<MyShow> = [];
  reviews: Array<object> = [];
  rating: number = 0;
  numberOfRatings: number = 0;
  status: Array<number> = [];
  show_reviews: boolean = false;

  error: boolean = false;
  errorMsg: string;

  currShowId: string;



  constructor(public route: ActivatedRoute, public router: Router, private showService: ShowService) { }

  ngOnInit() {
    this.currShowId = this.route.snapshot.paramMap.get('id')

    this.showService.getSessionUser().subscribe((response)=>{
      sessionStorage.setItem('currentUser', JSON.stringify(response));
      this.getShow(this.currShowId);
      this.getUser()
      this.getRatingData(this.currShowId)
    }, (error) => {
      sessionStorage.removeItem('currentUser');
      this.getShow(this.currShowId);
      this.getUser()
      this.getRatingData(this.currShowId)
    });
  }

  /**
  * Returns the next episode to air of a given show.
  *
  * @param {Show} show
  * Show we want to get info about
  */
  getNextEpisode(show: Show) {
    if (show.airDate != undefined && show.airInterval != undefined) {
      let airDate = new Date(show.airDate);
      let current = new Date();

      let timeSinceAir = Math.abs(current.getTime() - airDate.getTime());

      // int is number of ms in a day
      let intervalTime = 86400000 * show.airInterval;
      let nextEpisode;

      if (airDate > current) {
        nextEpisode = 1;
      }
      else {
        nextEpisode = Math.ceil(timeSinceAir / intervalTime) + 1
      }
      return nextEpisode;
    }
  }

  /**
   * Returns the number of seconds remaining until the
   * next episode of the given show.
   *
   * @param {Show} show
   * Show we want to get info about
   */
  getTimeRemaining(show: Show) {
    if (show.airDate != undefined && show.airInterval != undefined) {
      let airDate = new Date(show.airDate);
      let current = new Date();

      let timeSinceAir = Math.abs(current.getTime() - airDate.getTime());

      // int is number of ms in a day
      let intervalTime = 86400000 * show.airInterval;
      let remaining;

      if (airDate > current) {
        remaining = timeSinceAir;
      }
      else {
        let nextEpisode = Math.ceil(timeSinceAir / intervalTime) + 1
        let timeFromFirstAir = (nextEpisode - 1) * intervalTime;
        remaining = (airDate.getTime() + timeFromFirstAir) - current.getTime();
      }

      let remainingInSeconds = Math.floor(remaining / 1000);
      return remainingInSeconds;
    }
  }

  /**
   * Returns show with id specified
   *
   * @param {number} id
   */
  getShow(id) {
    this.showService.getShow(id).subscribe((response)=>{
        this.error = false;
        this.show = response;
      },
      error => {
        this.error = true;
        this.errorMsg = error.error.message;
      }
    );
  }

  /**
   * Returns true if there is user currently logged in
   */
  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  /**
   * Sets this.user to 'currentUser' in session storage if it exists.
   * Returns true if this is successful ('currentUser' exists in session
   * storage) and false otherwise.
   */
  getUser() {
    if (sessionStorage.getItem('currentUser') != null) {
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.isMyShow()
      this.getMyRating()
      return true;
    }
    return false;
  }

  /**
   * Checks whether this.show is in the user's list of shows.
   */
  isMyShow() {
    this.showService.isMyShow(this.user._id, this.currShowId).subscribe((response: boolean)=>{
        this.inMyShows = response;
      },
      error => {
        this.inMyShows = false;
      }
    );

  }

  /**
   * Sets rating of show to rating given
   *
   * @param {number} stars
   */
  setRating(stars) {
    this.myShow.rating = stars;
  }

  /**
   * Sets status of show to status given
   *
   * @param {String} status
   */
  setStatus(status) {
    this.myShow.status = status;
  }


  /**
   * Removes show from user's list of shows and updates session storage
   */
  RemoveFromMyShows(id) {
    let i = 0;
    for (i; i < this.user.my_shows.length; i++) {
      if (this.user.my_shows[i].id == id) {
        break;
      }
    }
    this.user.my_shows.splice(i, 1);
  }


  /**
   * Retrieves number of ratings, status, reviews and average rating of show
   */
  getRatingData(id) {
    let statusArr = [0, 0, 0, 0, 0];

    this.showService.getShowReviews(id).subscribe((response: Array<object>)=>{
        this.error = false;
        this.reviews = response;
      },
      error => {
        this.error = true;
        this.errorMsg = error.error.message;
      }
    );

    this.showService.getShowAvg(id).subscribe((response: Array<any>)=>{
        this.error = false;
        if(response.length != 0){
          this.rating = response[0].avg;
          this.numberOfRatings = response[0].count
        }
      },
      error => {
        this.error = true;
        this.errorMsg = error.error.message;
      }
    );

    this.showService.getShowStatus(id).subscribe((response: Array<any>)=>{
        this.error = false;
        if(response.length != 0){
          response.forEach(status => {
            statusArr[status._id.status -1] = status.count
          });
        }

      },
      error => {
        this.error = true;
        this.errorMsg = error.error.message;
      }
    );

    this.status = statusArr;
  }

  /**
   * toggles dsiplaying the show reviews
   */
  showReviews() {
    if (this.show_reviews) {
      this.show_reviews = false;
    } else {
      this.show_reviews = true;
    }
  }

  getMyRating(){
    this.showService.getMyRating(this.user._id, this.currShowId).subscribe((response: Array<any>)=>{
        this.error = false;
        if(response.length != 0){
          this.myShow =response[0];
        }

      },
      error => {
        this.error = true;
        this.errorMsg = error.error.message;
      }
    );

  }

  /**
   * Adds the show with ID id to the current user's shows
   *
   * @param {number} id
   * The ID of the show we want to add to the
   * current user's shows
   */
  addToMyShows(id){
    const userId = this.user._id;
    const reqBody = {showId: id};


    // add show to user with userId in database
    // note: the update has to be performed after we receive a response
    this.showService.userAddShow(userId, reqBody).subscribe((response)=>{
      this.isMyShow();
    }, (error) => {
      this.error = true;
    });

  }

  /**
   * Removes the show with the ID id from the
   * current user's show
   *
   * @param {number} id
   * The ID of the show we want to remove from the
   * current user's shows
   */
  removeFromMyShows(id){
    const userId = this.user._id;
    const reqBody = {showId: id};


    // remove show from user with userId in database
    // note: the update has to be performed after we receive a response
    this.showService.userRemoveShow(userId, reqBody).subscribe((response)=>{
      //
      this.isMyShow();
    }, (error) => {
      this.error = true;
    });
  }

  /**
   * Adds the a rating for the current show
   *
   */
  addRating(){
    const reqBody = {
       show_id: this.currShowId,
       user_id: this.user._id,
       rating: this.myShow.rating,
       status: this.myShow.status,
       review: this.myShow.review
     };

    if(reqBody.status === undefined || reqBody.status < 1 || reqBody.status > 5 ){

      this.error = true;
      this.errorMsg = "Status is Invalid or Unset"
      setTimeout(() => {
        this.error = false;
        this.errorMsg = ""
      }, 2000);
      return
    }

    if(reqBody.rating === undefined || reqBody.rating < 1 || reqBody.rating > 5 ){
      this.error = true;
      this.errorMsg = "Rating is Invalid or Unset"

      setTimeout(() => {
        this.error = false;
        this.errorMsg = ""
      }, 2000);
      return
    }
    this.showService.addRating(reqBody).subscribe((response)=>{
      this.updatedTimeout = true
      setTimeout(() => {
        this.updatedTimeout = false
      }, 1000);
      this.getRatingData(this.currShowId);
    }, (error) => {
      this.error = true;
      this.errorMsg = error.error.message;
    });

  }

  /**
   * convert status
   *
   */
   convertStatus(index){
     if(index == 1){
       return "Completed"
     }
     else if(index == 2){
       return "Planning"
     }
     else if(index == 3){
       return "Current"
     }
     else if(index == 4){
       return "Dropped"
     }
     return "Paused"

   }

}
