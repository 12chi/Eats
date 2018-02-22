import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAll(){
    console.log('Getting All')
    return this._http.get('/rests');
  }

  getOneRest(id) {
    console.log("Getting rest details");
    let pStr = "/rests/" + id
    console.log("str: ", pStr)
    return this._http.get(pStr);
    // tmpObs.subscribe(data => console.log('Got one task', data));   
  }

  createRest(newRest) {
    return this._http.post('/rests', newRest)
  }

  updateRest(newRest) {
    console.log('updating rest: ', newRest)
    let pStr = "/rests/" + newRest['id']
    console.log("str: ", pStr)
    return this._http.put(pStr, newRest);
  }

  deleteRest(id) {
    let pStr = "/rests/" + id
    console.log("str: ", pStr)
    return this._http.delete(pStr);
  }

}
