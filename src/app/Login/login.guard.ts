import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from '../../Services/Login.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private service: LoginService,
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let logged = this.service.isLogin;
        if (localStorage.getItem("session") != null) {
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }
}
