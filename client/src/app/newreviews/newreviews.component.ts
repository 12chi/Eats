import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newreviews',
  templateUrl: './newreviews.component.html',
  styleUrls: ['./newreviews.component.css']
})
export class NewreviewsComponent implements OnInit {
  id = "";
  name = "";
  cuisine = "";
  reviews = [];
  newReview = {user: "", stars: 1, desc: ""}

  constructor(private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("newReview init id: ", this.id);
      let Obs = this._httpService.getOneRest(this.id);
      Obs.subscribe(data => {
        if (data['message'] == 'Success') {
          this.name = data['data']['name'];
          this.cuisine = data['data']['cuisine'];
          if (data['data']['reviews']) 
            this.reviews = data['data']['reviews'];
          console.log("create review getting reviews: ", data)
        } else {
          console.log('Error: Create Review', data['error']);
        }
      });
    });
  }

  createReview(): void {
    if (this.newReview.user.length < 3 || this.newReview.desc.length < 3) {
      alert('User and review must be more than three characters.  Try again');
    } else if (this.newReview.stars < 1 || this.newReview.stars > 5 ) {
      alert('Invalid Star');
    } else  {
      console.log("newReview to be insert: ", this.newReview)
      this.reviews.push(this.newReview);
      let rest = {id: this.id, 
        name: this.name, 
        cuisine: this.cuisine,
        reviews: this.reviews}
      let Obs = this._httpService.updateRest(rest);
      Obs.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log('Successfully create review', data);
          let pStr = '/reviews/' + this.id
          this._router.navigate([pStr])
        } else {
          console.log('Error: Create Author', data['error']);
        }
      });
    }
  }

}
