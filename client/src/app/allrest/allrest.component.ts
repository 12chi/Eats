import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';


@Component({
  selector: 'app-allrest',
  templateUrl: './allrest.component.html',
  styleUrls: ['./allrest.component.css']
})
export class AllrestComponent implements OnInit {
  rests = [];
  restId ="";

  constructor(private _httpService: HttpService,
            private _router: Router,) { }

  ngOnInit() {
    this.getAllRests()
  }

  getAllRests(): void {
    console.log("get all rests")
    let auths = this._httpService.getAll();
    auths.subscribe(data => {
      this.rests = data['data'];
      console.log("restaurants: ", this.rests)
    });
  }

  deleteRest(event): void {
    console.log(event)
    this.restId = event.target.value;
    let Obs = this._httpService.deleteRest(this.restId);
    Obs.subscribe(data => {
    if (data['message'] == 'Success') {
      console.log("Successfully deleted Restaurant", this.restId);
    } else {
      console.log("Error: deleting Restaurant", data['error']);
    }
    });
    this.getAllRests();        
    this._router.navigate(['/home'])
  }
}
