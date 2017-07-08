import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'angular-highfieldauth';
import { SCORMAPIFactory } from '../Factories/scormAPI.factory';
import { LMSApiService } from "../Services/lmsAPI.service";

@Component({
    selector: "SCORMPlayer-component",
    styleUrls: ["../Styles/scormPlayer.component.css"],
    encapsulation: ViewEncapsulation.None,
    templateUrl: "../Templates/scormPlayer.component.html",
})

export class SCORMPlayerComponent implements OnInit {

    constructor(private router: Router, private scormFactory: SCORMAPIFactory, private lmsService: LMSApiService) {
    }

    public ngOnInit() {
    }

    public registerSCORMAPI() {
        window["API_1484_11"] = this.scormFactory.build("");
    }
}