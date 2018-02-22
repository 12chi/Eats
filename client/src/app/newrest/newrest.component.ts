import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newrest',
  templateUrl: './newrest.component.html',
  styleUrls: ['./newrest.component.css']
})
export class NewrestComponent implements OnInit {
  newRest = {name: "", cuisine: ""}

  constructor(private _httpService: HttpService,
            private _router: Router) { }

  ngOnInit() {
  }

  createRest(): void {
    console.log(this.newRest)
    let Obs = this._httpService.createRest(this.newRest);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log('Successfully create restaurant', data);
        this.newRest.name="";
        this._router.navigate(['/home'])
      } else {
        if (data['error']['code'] == 11000) {
          alert('Restaurant already exists.  Try again');
        } else if (data['error']['name'] == 'ValidationError') {
          alert('Restaurant name and cuisine must be more than three characters.  Try again');
        } else {
          alert(data['error']);
        }
        console.log('Error: Create Restaurant', data['error']);
      }
    })
  }
}
