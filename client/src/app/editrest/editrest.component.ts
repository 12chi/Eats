import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';


@Component({
  selector: 'app-editrest',
  templateUrl: './editrest.component.html',
  styleUrls: ['./editrest.component.css']
})
export class EditrestComponent implements OnInit {
  reqRest = {id: "", name: "", cuisine: ""}
  id = "";

constructor(private _httpService: HttpService,
            private _router: Router,
            private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("id: ", this.id)
      let rest = this._httpService.getOneRest(this.id);
      rest.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log('Successfully update restaurant', data);
          this.reqRest.name=data['data']['name'];
          this.reqRest.cuisine=data['data']['cuisine'];
          this.reqRest.id = data['data']['_id'];
          console.log(this.reqRest)
          // this._router.navigate(['/home'])
        } else {
          console.log('Error: Create Restaurant', data['error']);
        }
      });
    });
  }

  updateRest(): void {
    if (this.reqRest.name.length < 3 || this.reqRest.cuisine.length < 3) {
        alert('Restaurant name and cuisine must be more than three characters.  Try again');
    } else {
      let Obs = this._httpService.updateRest(this.reqRest);
      Obs.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log('Successfully update restaurant', data);
          this.reqRest.name="";
          this.reqRest.cuisine="";
          this._router.navigate(['/home'])
        } else {
          alert(data['error']);
          console.log('Error: Edit Restaurant', data['error']);
        }
      });
    }
  }
}
