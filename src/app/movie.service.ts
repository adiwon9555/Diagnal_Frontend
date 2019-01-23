import { Injectable } from '@angular/core';

import { Movie } from "./model/movie";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
	//URL='http://localhost:9001/';
  //  URL='http://localhost:3000/';
  URL="ec2-3-17-158-58.us-east-2.compute.amazonaws.com:80/";
  constructor(private http:HttpClient) { }
  
  getAllMovies(pageNo):Observable<any>{
    let params=new HttpParams();
    params=params.append('pageNo',pageNo);
    return this.http.get<any>(this.URL+'movies',{params:params});
  }
  searchMovies(pageNo,search:String):Observable<any>{
    let params=new HttpParams();
    params=params.append('pageNo',pageNo);
    return this.http.get<any>(this.URL+'movies/'+search,{params:params});
  }
}
