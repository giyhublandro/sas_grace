import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){

  }

  canActivate( route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot):boolean{
   
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['login']);
      return true 
    }

    return this.auth.isLoggedIn();

  }
  
}
