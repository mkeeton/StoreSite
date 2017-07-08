import { Component, OnInit } from "@angular/core";
import { User, AuthenticationService, AuthenticatedService, CurrentUserService, UserService } from "angular-highfieldauth";
import { APIService, EasyXDMService, StoredSettingService } from "angular-highfieldwebapi";

@Component({
    selector: "my-app",
    styleUrls: ["../Styles/app.component.css"],
    templateUrl: "../Templates/app.component.html",
})

export class AppComponent implements OnInit {

    public currentuser: User;

    constructor(private userService: UserService) {
    }

    public ngOnInit() {

    }

}
