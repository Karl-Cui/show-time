import {
  Component
} from '@angular/core';
import {
  Show
} from './ui/models/show';
import {
  MyShow
} from './ui/models/my_show';
import {
  User
} from './ui/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: Array<User> = [];

  loadDummyUsers() {
    this.users = [{
      "email": "george@gmail.com",
      "username": "george",
      "password": "hellogeorge",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [{
        "_id": 1,
        "review": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
        "rating": 5,
        "status": 2, /* Completed = 1
                            Planning = 2
                            Current = 3
                            Dropped = 4
                            Paused = 5
                         */
      },
      {
        "_id": 2,
        "review": "Aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        "rating": 2,
        "status": 5,
      }
      ]
    },
    {
      "email": "nick@gmail.com",
      "username": "nick",
      "password": "hellonick",
      "is_admin": false,
      "is_banned": false,
      "my_shows": [{
        "_id": 1,
        "review": "At vero eos et accusamus et iusto odio dignissimos ducimus,",
        "rating": 4,
        "status": 2,
      }]
    },
    {
      "email": "bob@gmail.com",
      "username": "bob",
      "password": "hellobob",
      "is_admin": true,
      "is_banned": false,
      "my_shows": [{
        "_id": 2,
        "review": "Et harum quidem rerum facilis est et expedita distinctio?",
        "rating": 5,
        "status": 1,
      },
      {
        "_id": 1,
        "review": "Nam libero tempore, cum soluta nobis est eligendi optio cumque!",
        "rating": 4,
        "status": 1,
      }
      ]
    },
    {
      "email": "sam@gmail.com",
      "username": "sam",
      "password": "hellosam",
      "is_admin": false,
      "is_banned": false,
      "my_shows": [{
        "_id": 2,
        "review": "Reiciendis voluptatibus maiores alias consequatur.",
        "rating": 5,
        "status": 1,
      }]
    },
    {
      "email": "tom@gmail.com",
      "username": "tom",
      "password": "hellotom",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [{
        "_id": 1,
        "review": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
        "rating": 5,
        "status": 1,
      }]
    },
    {
      "email": "tim@gmail.com",
      "username": "tim",
      "password": "hellotim",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [{
        "_id": 1,
        "review": "Wow!",
        "rating": 5,
        "status": 4,
      }]
    },
    {
      "email": "harry@gmail.com",
      "username": "harry",
      "password": "helloharry",
      "is_admin": false,
      "is_banned": false,
      "my_shows": [
        {
          "_id": 2,
          "review": "Sed ut perspiciatis.",
          "rating": 4,
          "status": 3,
        },
        {
          "_id": 1,
          "review": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
          "rating": 5,
          "status": 1,
        }
      ]
    },
    {
      "email": "peter@gmail.com",
      "username": "peter",
      "password": "hellopeter",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [
        {
          "_id": 1,
          "review": "Voluptatem sequi nesciunt.",
          "rating": 1,
          "status": 5,
        },
        {
          "_id": 2,
          "review": "Excepteur sint occaecat cupidatat non proident.",
          "rating": 1,
          "status": 3,
        }
      ]
    },
    {
      "email": "rick@gmail.com",
      "username": "rick",
      "password": "hellorick",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [
        {
          "_id": 1,
          "review": "Voluptatem sequi nesciunt.",
          "rating": 3,
          "status": 5,
        },
        {
          "_id": 2,
          "review": "Nemo enim ipsam voluptatem quia voluptas.",
          "rating": 1,
          "status": 3,
        }
      ]
    },
    {
      "email": "jimmy@gmail.com",
      "username": "jimmy",
      "password": "hellojimmy",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [
        {
          "_id": 2,
          "review": "Ut enim ad minima veniam, quis nostrum exercitationem.",
          "rating": 5,
          "status": 1,
        }
      ]
    },
    {
      "email": "mike@gmail.com",
      "username": "mike",
      "password": "hellomike",
      "is_admin": false,
      "is_banned": true,
      "my_shows": [
        {
          "_id": 1,
          "review": "Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.",
          "rating": 4,
          "status": 4,
        }
      ]
    },
    {
      "email": "jane@gmail.com",
      "username": "jane",
      "password": "hellojane",
      "is_admin": true,
      "is_banned": false,
      "my_shows": [
        {
          "_id": 1,
          "review": "Ut enim ad minima veniam, quis nostrum exercitationem.",
          "rating": 5,
          "status": 2,
        }
      ]
    }
    ]
  }

  shows: Array<Show> = [];

  loadDummyShows() {
    this.shows = [{
      _id: 1,
      title: "WestWorld",
      description: "Season 1",
      link: "https://www.hbo.com/westworld",
      img: "assets/ww.jpg",
      approved: true,
      airDate: "2018-11-20T01:00:00.000Z",
      airInterval: 7
    },
    {
      _id: 2,
      title: "Riverdale",
      description: "Season 2",
      link: "https://www.imdb.com/title/tt5420376/",
      img: "assets/rd.jpg",
      approved: true,
      airDate: "2018-10-09T00:00:00.000Z",
      airInterval: 7
    },
    {
      _id: 3,
      title: "Silicon Valley",
      description: "Season 3",
      link: "https://www.hbo.com/silicon-valley",
      img: "assets/sv.jpg",
      approved: false,
      airDate: "2018-10-09T00:00:00.000Z",
      airInterval: 7
    },
    {
      _id: 4,
      title: "Better Call Saul",
      description: "Season 4",
      link: "https://www.amc.com/shows/better-call-saul",
      img: "assets/bcs.jpg",
      approved: false,
      airDate: "2018-12-09T00:00:00.000Z",
      airInterval: 7
    }
    ]
  }



  ngOnInit() {

  }
}
