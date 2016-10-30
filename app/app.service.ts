import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { apiUrl, apiKey, defaultLang, searchMovieUrl } from './app.config';

@Injectable()
export class AppService {
  
  private _url = apiUrl; 
  
  constructor(private http: Http) { }
  

  getMovieList(search_term?: string, lang?: string, page?:number): Promise<any>{
    let url: string= "";
    if(search_term)
      url = searchMovieUrl+'?api_key='+apiKey+'&language='+((lang)?lang:defaultLang)+'&query='+encodeURIComponent(search_term);
    else
      url = this._url+'popular?api_key='+apiKey+'&language='+((lang)?lang:defaultLang)+
          '&page='+((page)?page:1);
        
        return this.getRequest(url);
  }

  getMovieDetails(id:number, lang?:string): Promise<any>{
    return this.getRequest(this._url+id+'?api_key='+apiKey+'&language='+((lang)?lang:defaultLang));
  }

  getMovieCasts(id:number, lang?:string): Promise<any>{
    return this.getRequest(this._url+id+'/casts?api_key='+apiKey+'&language='+((lang)?lang:defaultLang));
  }

  getRequest(url: string){
    return this.http.get(url).toPromise()
                    .then(res => res.json() as any)
                    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
