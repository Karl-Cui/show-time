# 📺 ShowTime Community Driven TV Guide 📺

A sample workflow that will take you through the major features of our application is located at the bottom.

## Get started

`Note:` There exists a node folder in the project root that is not being used for this deliverable

`Note:` The typescript files for each component have been documented.

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called npm for installing NodeJS applications and libraries.


### Install Angular Globally

```shell
npm install -g @angular/cli

```

### Clone the repo

```shell
git clone https://github.com/csc309-fall-2018/team17.git

```

## Build project (automatically opens)

Install the `npm` packages described in the `package.json`:

```shell
cd public

npm install

```

Build and open the project

```shell
ng serve --open
```

## Sample Workflow:

### Home Page Interactions:

1. Login as a **regular** user: ie.

   - Username: `nick`
   - Password: `hellonick`

2. Hit the profile page (`nick`) in the top right corner, to the left of the `Log out` button

   - Can change any info you’d like and then hit `Confirm changes`
   - **note**: currently we cannot change the display picture as we are unable to save the images in a backend server

3. Head back to the `Home` page

   a) You can click the `edit` button on a show to change its title, description, URL link, or its airing date

   b) You can click on the show’s poster image and view a detailed description of each show

   - From here, you can directly head to the show’s  
   - You can add <u>new ratings</u> at the bottom (⭐to⭐⭐⭐⭐⭐) and the status of your <u>progress</u> with the show (`Completed, Planning, Current, Dropped, Paused`)
   - You can add a review to the show as well which you can view after expanding with the `+` button

4. Back on the home page, you can additionally add shows to the user’s associated `My Shows`, which can be viewable by clicking the `My Shows tab` near the top of the page

5. You can also search for the show on each tab using the `Search bar`

### Editing/Adding a show:

1. You can edit a show by hitting `edit`, and likewise, `add a show` by hitting the button next to the search bar.
   - As a **regular user**, any submitted edits or new shows will place the show in an **Unapproved Show tab**, only viewable by **admins**
2. Log out of `nick` and access an **admin account** such as:
   - Username: `bob`
   - Password: `hellobob`

1. As an **admin**, you can view the **Unapproved Shows tab** and approve or reject any shows (2 dummy shows, and any additional shows created from any **regular** accounts)
   - Note: admins can directly `edit` or `add` shows without needing an approval

### User List: (as an admin)

1. As an `admin`, you can:

   - View the list of all users and promote **regular users** to **admins**

   - Ban users, that will not allow them to login