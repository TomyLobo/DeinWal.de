import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class QuestiondataService {

	constructor(public http:Http) { }
	
	cachedData = {};
	
	getData(vote="bundestagswal2017") {
		if (this.cachedData.hasOwnProperty(vote)) {
      //console.log('using cached votes:', this.cachedData);
      return Observable.of(this.cachedData[vote]);
    } else {
      //console.log('votes not cached yet');
      return this.http.get("/assets/votes_" + vote + ".json")
            .map(res => res.json())
            .do((data) => {
              this.cachedData[vote] = data;
            });
    }
		//return this.http.get("/assets/votes.json")
		//.map((res:Response) => res.json());
	}

}
