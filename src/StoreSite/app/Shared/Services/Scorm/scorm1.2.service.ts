import { Inject, Injectable } from "@angular/core";
import { ISCORMAPI } from "../Interfaces/scormAPI.interface";
import { LMSApiService } from "../lmsApi.service";

import { ScormError } from "../../Classes/Errors/scormError";
import { CmiElement } from "../../Classes/cmiElement";

@Injectable()
export class SCORM12Service implements ISCORMAPI {

    constructor(lmsService: LMSApiService) { }

    public version: string;

    public cmi: any[];

    public InitializeCmi(): boolean {
        this.cmi = [new CmiElement<string>("", ""),
        new CmiElement<string>("", "")];

        return true;
    }

    public LMSInitialize(parameter: string): string {
        return "true";
    }

    public LMSFinish(parameter: string): string {
        return "true";
    }

    public LMSGetValue(parameter: string): string {
        return "true";
    }

    public LMSSetValue(parameter1: string, parameter2: string): string {
        return "true";
    }

    public LMSCommit(parameter: string): string {
        return "true";
    }

    public LMSGetLastError(): string {
        return "true";
    }

    public LMSGetErrorString(parameter: string): string {
        return "true";
    }

    public LMSGetDiagnostic(parameter: string): string {
        return "true";
    }

    private Errors: ScormError[] = [new ScormError("101", "General Exception"),
        new ScormError("201", "Invalid argument error"),
        new ScormError("202", "Element cannot have children"),
        new ScormError("203", "Element not an array. Cannot have count"),
        new ScormError("301", "Not initialized"),
        new ScormError("401", "Not implemented error"),
        new ScormError("402", "Invalid set value, element is a keyword"),
        new ScormError("403", "Element is read only"),
        new ScormError("404", "Element is write only"),
        new ScormError("405", "Incorrect Data Type"),];
}