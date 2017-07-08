import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { User, CurrentUserService } from "angular-highfieldauth";

@Component({
    selector: "login-page",
    styleUrls: ["../Styles/login.component.css"],
    templateUrl: "../Templates/login.component.html",
})

export class LoginPageComponent implements OnInit {

    private sub: any;

    constructor(private currentUserService: CurrentUserService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    public ngOnInit() {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.currentUserService.dispatcher.subscribe((user) => {
                    this.currentUserChanged(user.User);
                });
            }
        });
    }

    private currentUserChanged(user: User) {
        if (user !== null) {
            this.router.navigate([this.route.snapshot.queryParams["returnUrl"] || ""]);
        }
    }
}