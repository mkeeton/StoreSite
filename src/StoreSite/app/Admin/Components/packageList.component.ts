import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminPackageService } from "..//Services/adminPackage.service";

@Component({
    selector: "packageList-component",
    styleUrls: ["../Styles/packageList.component.css"],
    encapsulation: ViewEncapsulation.None,
    templateUrl: "../Templates/packageList.component.html",
    providers: []
})
export class PackageListComponent implements OnInit {

    public _packageList: any[];

    constructor(private packageService: AdminPackageService) {

    }

    public ngOnInit() {
        this.packageService.listScormPackagesAsync()
            .subscribe((packages: string[]) => {
                this._packageList = packages;
            });
    }
}