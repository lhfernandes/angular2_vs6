import { Component, OnInit } from '@angular/core';
import { ShareEvents } from './shared/shared.event';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private shEvents: ShareEvents) {}

  tabSelected: string;

  ngOnInit() {
    this.tabSelected = 'receita';
    this.shEvents.tabHeaderChange.subscribe(
      (tabSelect) => this.onNavigate(tabSelect)
    );

    firebase.initializeApp( {
      apiKey: 'AIzaSyCH3GcyoAUMX2LJDYt8oGEGI4h7_feMnXI',
      authDomain: 'ng-livro-receita.firebaseapp.com'
    });
  }
  onNavigate(tabSelected: string) {
    this.tabSelected = tabSelected;
  }
}
