/**
 * @file
 * Component that displays the shows in the site's database.
 * Users can get information about the shows and add shows to their
 * personal list. Admins can accept new shows, edit existing shows,
 * or delete them.
 *
 */

import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { Show } from '../models/show';
import { MyShow } from '../models/my_show';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  //list of all shows (that are approved)
  shows: Array<Show>=[];
  //list of all unapproved shows
  unapprovedShows:  Array<Show>=[];
  // list of all shows in the session storage
  sessionShows: Array<Show>=[];
  // list of all shows that the current user follows and (that are approved)
  myShows: Array<Show>=[];
  // boolean for form errors
  error: boolean = false;
  // user object to bind current user
  user: any = {};
  // arry to bind all users from session storage
  allUsers: Array<User> = [];
  // toggle for all shows tab
  all: boolean = true;
  // toggle for my shows tab
  my_shows: boolean = false;
  // toggle for unapproved shows tab
  unapproved_shows: boolean = false;
  // string to bind search input
  search: string ='';

  constructor(private gridService: GridService, public router: Router) { }

  ngOnInit() {
    this.gridService.getSessionUser().subscribe((response)=>{
      sessionStorage.setItem('currentUser', JSON.stringify(response));
      this.getUser();
      this.getShows();
    }, (error) => {
      sessionStorage.removeItem('currentUser');
      this.getUser();
      this.getShows();
    });

  }

  /**
   * Checks if there is a user logged in.
   */
  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  /**
   * Retrieves the current user info if a user is logged in.
   */
  getUser(){
    if(sessionStorage.getItem('currentUser') != null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      return true;
    }
    return false;
  }

  /**
   * Adds the list of shows into the correct list.
   */
  getShows(){
    if (this.getCheckUser()) {
      this.gridService.getMyShows(this.user._id).subscribe((response: Array<Show>) => {
        this.myShows = response;
      }, (error) => {
        this.error = true;
      });

      this.gridService.getNotMyShows(this.user._id).subscribe((response: Array<Show>) => {
        this.shows = response;
      }, (error) => {
        this.error = true;
      });

      if (this.user.is_admin) {
        this.gridService.getUnapprovedShows().subscribe((response: Array<Show>) => {
          this.unapprovedShows = response;
        }, (error) => {
          this.error = true;
        });
      }

    } else {
      this.gridService.getApprovedShows().subscribe((response: Array<Show>) => {
        this.shows = response;
      }, (error) => {
        this.error = true;
      });
    }

  }

  /**
   * Returns the next episode to air of a given show.
   *
   * @param {Show} show
   * Show we want to get info about
   */
  getNextEpisode(show: Show) {
    if(show.airDate != undefined && show.airInterval != undefined) {
      let airDate = new Date(show.airDate);
      let current = new Date();

      let timeSinceAir = Math.abs(current.getTime() - airDate.getTime());

      // int is number of ms in a day
      let intervalTime = 86400000 * show.airInterval;
      let nextEpisode;

      if(airDate > current) {
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
    if(show.airDate != undefined && show.airInterval != undefined) {
      let airDate = new Date(show.airDate);
      let current = new Date();

      let timeSinceAir = Math.abs(current.getTime() - airDate.getTime());

      // int is number of ms in a day
      let intervalTime = 86400000 * show.airInterval;
      let remaining;

      if(airDate > current) {
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
   * Checks if the show with id id is in the
   * current user's shows
   *
   * @param {number} id
   * ID of the show we are looking for
   */
  inMyShows(id) {
    for (let my_show of this.user.my_shows) {
      if (my_show == id) {
        return true;
      }
    }
    return false;
  }

  /**
   * Sets the current tab to be "All Shows"
   */
  selectAll(){
    this.all = true;
    this.my_shows = false;
    this.unapproved_shows = false;
  }

  /**
   * Sets the current tab to be "My Shows"
   */
  selectMy(){
    this.all = false;
    this.my_shows = true;
    this.unapproved_shows = false;
  }

  /**
   * Sets the current tab to be "Unapproved Shows"
   */
  selectUn(){
    this.all = false;
    this.my_shows = false;
    this.unapproved_shows = true;
  }

  /**
   * Sets the show with id id to be approved. Also adds
   * the show to the right lists.
   *
   * @param {number} id
   * ID of the show we want to approve
   */
  approve(id) {
    // checks current list of approved shows for unapproved show to be accepted
    const approvedIndex = this.shows.findIndex(show => show._id == id);

    // approvedIndex is not -1: show is already in approved, so remove that first
    if (approvedIndex >= 0) {
      const removeShowBody = {showId: id};
      this.gridService.removeShow(removeShowBody).subscribe((response) => {
        //
      }, (error) => {
        this.error = true;
        if (error.status == '401'){
          alert("your session has expired")
          this.router.navigate(['/login']);
        }
      });
    }

    const unapproved = this.unapprovedShows.find(show => show._id == id);

    // if approved show was an edit
    if (unapproved.updating) {

      // approve show and delete copy in unapprovedShows
      const approveAndDeleteBody = {showId: id}
      this.gridService.approveAndDeleteShow(approveAndDeleteBody).subscribe((response: Show) => {
        this.getShows();
      }, (error) => {
        this.error = true;
        if (error.status == '401'){
          alert("your session has expired")
          this.router.navigate(['/login']);
        }
      });

    } else {
      // approve show by adding it to shows
      const approveShowBody = {showId: id};
      this.gridService.approveShow(approveShowBody).subscribe((response) => {
        this.getShows();
      }, (error) => {
        this.error = true;
        if (error.status == '401'){
          alert("your session has expired")
          this.router.navigate(['/login']);
        }
      });
    }

  }

  /**
   * Copies the attributes of shows to showToCopy
   *
   * @param {Show} show
   * The show we want to push attributes to
   * @param {Show} showToCopy
   * The show we want to copy attributes from
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
    return show;
  }

  /**
   * Removes a show from the list of unapproved shows.
   *
   * @param {number} id
   * The ID of the show we want to remove
   */
  reject(id){

    // remove show from backend
    const reqBody = {showId: id}
    this.gridService.removeShow(reqBody).subscribe((response) => {
      this.getShows();
    }, (error) => {
      this.error = true;
      if (error.status == '401'){
        alert("your session has expired")
        this.router.navigate(['/login']);
      }
    });

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

    // add show to currentUser's shows in session storage
    this.user.my_shows.push(id);
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));

    // add show to user with userId in database
    // note: the update has to be performed after we receive a response
    this.gridService.userAddShow(userId, reqBody).subscribe((response)=>{
      this.getShows();
    }, (error) => {
      this.error = true;
      if (error.status == '401'){
        alert("your session has expired")
        this.router.navigate(['/login']);
      }
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

    // remove show from currentUser in session storage
    this.user.my_shows = this.user.my_shows.filter(show => show != id)
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));

    // remove show from user with userId in database
    // note: the update has to be performed after we receive a response
    this.gridService.userRemoveShow(userId, reqBody).subscribe((response)=>{
      //
      this.getShows();
    }, (error) => {
      this.error = true;
      if (error.status == '401'){
        alert("your session has expired")
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Removes all shows that don't match a search query from
   * the local lists of shows.
   */
  getRegxShows(){
    let words = this.search.trim().split(' ')
    console.log(words)

    let reg = RegExp(`${this.search.trim()}`, 'i');
    reg.ignoreCase;

    this.gridService.getApprovedShows().subscribe((response: Array<Show>) => {
      let data:Array<Show> = response;

      this.shows = [];
      this.myShows = [];
      this.unapprovedShows = [];
      this.getUser();

      for (let show of data) {
        // if (show.approved == true && reg.test(show.title)) {

        if (show.approved == true && (() => {
          console.log("HELLO?")
          for (let word of words) {
            let reg = RegExp(`${word}`, 'i');

            console.log(word)
            if(!reg.test(show.title)) {
              console.log("Failed", word)
              return false
            }
          }
          return true
        })()) {
          if (this.getCheckUser() && this.inMyShows(show._id)) {
            this.myShows.push(show);
          } else {
            this.shows.push(show);
          }
        } else {
          if (reg.test(show.title)) {
            this.unapprovedShows.push(show);
          }
        }
      }
    }, (error) => {
      this.error = true;
    });
  }
}
