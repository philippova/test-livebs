import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Movie } from './models/movie';
import { AppService } from './app.service';
import { defaultLang, imgUrl, availableLanguages } from './app.config';
import {lang_str} from './app.lang';

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/movies.html',
  	styleUrls: ['app/css/movies.css']
})

export class AppComponent implements OnInit  { 
	
	lang:string = defaultLang;							//application language
	movies: Movie[] = [];								//movies store
	total_pages: number = 1;	
	currentPage: number = 1;
	total_results: number = 0;
	page_size: number = 20;
	img_path:string = imgUrl;							//path to movie image
	movie_details: {};									//movie details store
	movie_casts: {};									//movie casts store
	available_languages: any[] = availableLanguages; 	//available application languages
	search_term: string = "";							//search query string

	constructor(private _service: AppService, private modalService: NgbModal) {}

	ngOnInit(): void {
		this.getMovies();
	}

	//get all popular movies or search in movies by search string
    getMovies(){
  		this._service.getMovieList(this.search_term, this.lang, this.currentPage)
  			.then(res => this.setData(res));
  	}

  	//update pages and results data after the search
  	setData(res: any){
    	this.movies = res.results;
    	this.total_pages = res.total_pages;
    	this.total_results = res.total_results;
    	this.page_size = Math.ceil(this.total_results/this.total_pages);
  	}

	//open modal window and load details by movie ID
    open(content: any, movieID: number) {
    	this._service.getMovieDetails(movieID, this.lang).then(
                res => this.movie_details = res);
    	this._service.getMovieCasts(movieID, this.lang).then(
                res => this.movie_casts = res);
    
    	this.modalService.open(content).result.then((result) => {}, 
    		(reason) => {
      			this.movie_details = {};	//clear movie_details on close
      			this.movie_casts = {};
    		});
  	}

	//get gui strings depends on selected language
	langString(tpl:string){
  		let tmp = lang_str.find(function(item){ 
                return item.tpl == tpl 
            }, tpl);
  		if(tmp && tmp[this.lang])
  			return tmp[this.lang];
  		return tpl;
  	}
}
