import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogedIn: boolean = true;
  public signInEventEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public get isLogedIn(): boolean {
    return this._isLogedIn;
  }
  public set isLogedIn(value: boolean) {
    this._isLogedIn = value;
  }


  login() {
    this._isLogedIn = true;
  }
  logout() {
    this._isLogedIn = false;
    this.signInEventEmitter.emit(this._isLogedIn);
  }

  isAuthenticated(): Promise<boolean> {

    const promise: Promise<boolean> = new Promise(
      (resolve, reject) => {
        this.signInEventEmitter.emit(this._isLogedIn);
        //console.log("in Auth.service ==> isLogin: " + this._isLogedIn)
        resolve(this._isLogedIn);
      }
    )
    return promise;

  }
}
