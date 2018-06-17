import * as firebase from 'firebase';


export class AuthService {
  token: string;
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log(error)
    );
  }
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( response => {
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
  }


  private updateToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
  }

}
