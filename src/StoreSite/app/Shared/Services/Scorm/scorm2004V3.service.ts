import { Inject, Injectable } from "@angular/core";
import { ISCORMAPI } from "../Interfaces/scormAPI.interface";
import { LMSApiService } from "../lmsApi.service";
import { CmiElement } from "../../Classes/cmiElement";

@Injectable()
export class SCORM2004V3Service implements ISCORMAPI  {

    constructor(lmsService: LMSApiService) { }

    public version: string;

    public cmi: any[];

    public InitializeCmi(): boolean {
        this.cmi = [new CmiElement<string>("", ""),
                new CmiElement<string>("","")];

        return true;
    }

}