import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { StoredSettingService } from "angular-highfieldwebapi";

declare var easyXDM: any;


@Component({
    selector: "default-page",
    styleUrls: ["../Styles/default.component.css"],
    templateUrl: "../Templates/default.component.html",
})

export class DefaultComponent implements OnInit {

    private sub: any;

    constructor(private route: ActivatedRoute, private router: Router, private settingService: StoredSettingService) {
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.settingService.setSetting("currentOrderId", params["id"]);
        });
        if (this.settingService.getSetting("currentOrderId") !== "") {
            this.router.navigate(['/orderconfirmation']);
        }
    }
}
