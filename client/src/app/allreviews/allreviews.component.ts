import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-allreviews',
  templateUrl: './allreviews.component.html',
  styleUrls: ['./allreviews.component.css']
})
export class AllreviewsComponent implements OnInit {
  id = "";
  reviews = [];
  name = "";
  cuisine = "";

  constructor(private _httpService: HttpService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("id: ", this.id)
      let rev = this._httpService.getOneRest(this.id);
      rev.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log('Successfully retrieve reviews', data);
          this.id = data['data']['_id'];
          this.name = data['data']['name'];
          this.cuisine = data['data']['cuisine'];
          if ( data['data']['reviews']) {
            this.reviews=data['data']['reviews'];
            this.reviews.sort(this.compare);
          }
          console.log(data)
          console.log('reviews: ', this.reviews)
          // this._router.navigate(['/home'])
        } else {
          console.log('Error: Retrieving Review', data['error']);
        }
      });
    });
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    let star1 = a.stars;
    let star2 = b.stars;
  
    let comparison = 0;
    if (star1 > star2) {
      comparison = -1;
    } else if (star1 < star2) {
      comparison = 1;
    }
    return comparison;
  }

}

