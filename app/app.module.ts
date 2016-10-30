import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

    import { FormsModule }   from '@angular/forms';
    import { HttpModule }    from '@angular/http';
    import { AppComponent }         from './app.component';
    import { AppService }          from './app.service';
    
    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [ AppService ],
      bootstrap: [ AppComponent ]
    })

    export class AppModule { }
