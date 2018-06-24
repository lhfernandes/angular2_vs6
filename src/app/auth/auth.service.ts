import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
  token: string;
  constructor(private route: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( response => {
      this.route.navigate(['/receita']);
      this.updateToken();
    } )
    .catch(
      error => console.log(error)
    );
  }
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( response => {
      this.route.navigate(['/receita']);
      this.updateToken();
    } )
    .catch( erros => console.log(erros));
  }
  getToken() {
   this.updateToken();
   return this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }
  logOut() {
    firebase.auth().signOut();
    this.token = null;
    this.route.navigate(['/singin']);
  }


  private updateToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
  }

}
