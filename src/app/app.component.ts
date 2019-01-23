import { Component, OnInit, TemplateRef, HostListener  } from '@angular/core';

import { Movie } from "./model/movie";
import { MovieService } from './movie.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public movies:Movie[];   
  public search="";
  public searchShow=false;
  public scrollCounter:number=0;
  constructor(private movieService:MovieService){

  }
  @HostListener("window:scroll",[])
  onScroll():void{
    if((window.innerHeight+window.scrollY)>=document.body.offsetHeight){

      this.scrollCounter++;
      if(this.searchShow==true){
        this.searchMoviesOnScroll();
      }else{
        this.getAllMovies();
      }
      
      console.log("you are at end");
      
    }
  }

  ngOnInit(){
    this.getAllMovies();
  }
  getAllMovies(){
    this.movieService.getAllMovies(this.scrollCounter).subscribe(data=>{
      if(this.movies==null){
        this.movies=data;
      }else{
        data.forEach(element => {
          this.movies.push(element);
        });;
      }
      
    });
  }
  searchMovies(){
    this.scrollCounter=0;
    this.movies=null;
    this.movieService.searchMovies(this.scrollCounter,this.search).subscribe(data=>{
      if(this.movies==null){
        this.movies=data;
      }else{
        data.forEach(element => {
          this.movies.push(element);
        });;
      }
    });
    
  }
  searchMoviesOnScroll(){
    this.movieService.searchMovies(this.scrollCounter,this.search).subscribe(data=>{
      if(this.movies==null){
        this.movies=data;
      }else{
        data.forEach(element => {
          this.movies.push(element);
        });;
      }
    });
  }
  getImageSrc(movie:Movie){
    let url="assets/images/";
    let furl= url +movie.poster_image
    return furl;
    
  }
}
