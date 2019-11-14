/**
 * Displays information about the current user, and shows fields
 * for changing them.
 *
 */
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8000/upload';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

   
    // stores a local copy of the current user
    user: any = {};

    // contains the values from the user forms.
    updatedInfo: any = {};

    //boolean for registration errors
    error: boolean = false;
    errorMsg: string;

    // boolean for success
    success: boolean = false;
    successMsg: string;

    constructor(private accountService: AccountService) { }

    /**
     * Populates the page with filler data if not found, sets
     * up uploader
     */
    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!this.user.bio) {
          this.user.bio = "Bio not found";
        }
        if (!this.user.img) {
          this.user.img = "../../assets/noImage.jpg";
        }

        this.uploader.onAfterAddingFile = (file) => {
          file.withCredentials = false;
          this.updatedInfo.img = `assets/${file.file.name}`;
         };

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status == 200) {
              this.updateUserInfo();
            } else {
              alert('Image file failed, try again')
            }
         };
    }

  /**
   * Updates the list of users and the current user with
   * the new information from the user forms.
   */
  updateUserInfo() {
    let validEmail: boolean = true; // for email verification
    const modifiedUser = this.user;

    if (this.updatedInfo.email){
        if (this.updatedInfo.email.match("^[^@]+@[^@]+\.[^@]+$")) {
            modifiedUser.email = this.updatedInfo.email;
        } else {
            validEmail = false;
        }
    }

    if (validEmail) {
        if (this.updatedInfo.img){ modifiedUser.img = this.updatedInfo.img; }
        if (this.updatedInfo.password){ modifiedUser.password = this.updatedInfo.password; }
        if (this.updatedInfo.bio){ modifiedUser.bio = this.updatedInfo.bio; }

        this.accountService.editUser(modifiedUser).subscribe((response)=> {
            sessionStorage.setItem('currentUser', JSON.stringify(response));

            this.error = false;
            this.success = true;
            this.successMsg = "Changes saved."

        }, error => {
            this.error = true;
            this.errorMsg = error.error.message;
            }
        );

    } else {
        this.error = true;
        this.errorMsg = "Invalid email address.";
    }
  }
}
