import { Inject, Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ISCORMAPI } from "../Services/Interfaces/scormAPI.interface";
import { SCORM12Service } from "../Services/Scorm/scorm1.2.service";
import { SCORM2004V3Service } from "../Services/Scorm/scorm2004V3.service";
import { LMSApiService } from "../Services/lmsApi.service";

@Injectable()
export class SCORMAPIFactory {

    constructor(private lmsService: LMSApiService) { }

    public build(scormVersion: string): ISCORMAPI {
        if (scormVersion == "") {
            return new SCORM12Service(this.lmsService);
        } else {
            return new SCORM2004V3Service(this.lmsService);
        }
    }
}