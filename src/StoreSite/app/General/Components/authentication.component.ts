import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { User, AuthenticationService, CurrentUserService, UserService } from "angular-highfieldauth";
import { APIService, EasyXDMService, StoredSettingService } from "angular-highfieldwebapi";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DefaultComponent } from "./default.component";

@Component({
    providers: [],
    selector: "auth-component",
    styleUrls: ["../Styles/authentication.component.css"],
    templateUrl: "../Templates/authentication.component.html",
})

export class AuthenticationComponent implements OnInit {

    public currentuser: User;

    public isLoginVisible: boolean;
    public isLoginActive: boolean;

    private userWatcher: Subscription = null;

    constructor(private currentUserService: CurrentUserService,
                private route : ActivatedRoute,
                private router : Router,
                private userService: UserService,
                private authService: AuthenticationService) {
    }

    public ngOnInit() {
        this.userWatcher = this.currentUserService.dispatcher.subscribe((user) => {
            this.currentuser = user.User;
        });
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {
        return this.checkCurrentUser(url);
    }

    private checkCurrentUser(url: string): boolean {
        if (this.currentUserService.getCurrentUser().User !== null) { return true; }
        this.router.navigate(['/welcome'], { queryParams: { returnUrl: url !== "/" ? url : null } });
        return false;
    }

    public logoutClick() {
        this.authService.logOut()
            .subscribe((res) => {
                this.currentUserService.setCurrentUser(null);
            });
        return false;
    }
}
