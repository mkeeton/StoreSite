import { Inject, Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthenticatedService } from "angular-highfieldauth";
import { APIResponse, StoredSettingService } from "angular-highfieldwebapi";

@Injectable()
export class LMSApiService {

    constructor(private authenticatedService: AuthenticatedService,
        private settingService: StoredSettingService,
        @Inject("LMSApiBaseUrl") private apiBaseUrl: string,
    ) { }

    public getScormPackagesAsync(): Observable<any[]> {
        let remoteData: Observable<any[]> = new Observable((observer) => {
            this.authenticatedService.getAsync(this.apiBaseUrl, "api/ScormPackage/GetScormPackages")
                .subscribe((res: APIResponse) => {
                    if (res.responseCode === 200) {
                        observer.next(res.responseData as any[]);
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                });
        });
        return remoteData;
    }

}