import { Inject, Injectable } from "@angular/core";
import { ISCORMAPI } from "../Interfaces/scormAPI.interface";
import { LMSApiService } from "../lmsApi.service";

import { ScormError } from "../../Classes/Errors/scormError";
import { CmiElement } from "../../Classes/cmiElement";
import { ScormComment } from "../../Classes/scormComment";
import { ScormInteraction } from "../../Classes/scormInteraction";
import { ScormLearnerPreference } from "../../Classes/scormLearnerPreference";
import { ScormObjective } from "../../Classes/scormObjective";
import { ScormScore } from "../../Classes/scormScore";
import { CompletionStatusState, CreditState, EntryState, ExitState, ModeState, SuccessStatusState, TimeLimitActionState } from "../../Types/states";

@Injectable()
export class SCORM2004V4Service implements ISCORMAPI {

    constructor(lmsService: LMSApiService) { }

    public version: string;

    public cmi: any[];

    public InitializeCmi(): boolean {
        this.cmi = [new CmiElement<ScormComment[]>("comments_from_learner", new Array<ScormComment>()),
            new CmiElement<ScormComment[]>("comments_from_lms", new Array<ScormComment>()),
            new CmiElement<CompletionStatusState>("completion_status", "unknown"),
            new CmiElement<number>("completion_threshold", 0.0),
            new CmiElement<CreditState>("credit", "no_credit"),
            new CmiElement<EntryState>("entry", ""),
            new CmiElement<ExitState>("exit", ""),
            new CmiElement<ScormInteraction[]>("interactions", new Array<ScormInteraction>()),
            new CmiElement<string>("launch_data", ""),
            new CmiElement<string>("learner_id", ""),
            new CmiElement<string>("learner_name", ""),
            new CmiElement<ScormLearnerPreference>("learner_preference", null),
            new CmiElement<string>("location", ""),
            new CmiElement<string>("max_time_allowed", ""),
            new CmiElement<ModeState>("mode", "normal"),
            new CmiElement<ScormObjective[]>("objectives", new Array<ScormObjective>()),
            new CmiElement<number>("progress_measure", 0.0),
            new CmiElement<number>("scaled_passing_score", 0.0),
            new CmiElement<ScormScore>("score", new ScormScore(0.0,0.0,0.0,0.0)),
            new CmiElement<string>("session_time", ""),
            new CmiElement<SuccessStatusState>("success_status", "unknown"),
            new CmiElement<string>("suspend_data", ""),
            new CmiElement<TimeLimitActionState>("time_limit_action", "continue_no_message"),
            new CmiElement<string>("total_time", "")];

        return true;
    }

    public Initialize(parameter: string): string {
        return "true";
    }

    public Terminate(parameter: string): string {
        return "true";
    }

    public GetValue(parameter: string): string {
        return "true";
    }

    public SetValue(parameter1: string, parameter2: string): string {
        return "true";
    }

    public Commit(parameter: string): string {
        return "true";
    }

    public GetLastError(): string {
        return "true";
    }

    public GetErrorString(parameter: string): string {
        return "true";
    }

    public GetDiagnostic(parameter: string): string {
        return "true";
    }

    private Errors: ScormError[] = [new ScormError("101", "General Exception"),
    new ScormError("102", "General Initialization Failure"),
    new ScormError("103", "Already Initialized"),
    new ScormError("104", "Content Instance Terminated"),
    new ScormError("111", "General Termination Failure"),
    new ScormError("112", "Termination Before Initialization"),
    new ScormError("113", "Termination After Termination"),
    new ScormError("122", "Retrieve Data Before Initialization"),
    new ScormError("123", "Retrieve Data After Termination"),
    new ScormError("132", "Store Data Before Initialization"),
    new ScormError("133", "Store Data After Termination"),
    new ScormError("142", "Commit Before Initialization"),
    new ScormError("143", "Commit After Termination"),
    new ScormError("201", "General Argument Error"),
    new ScormError("301", "General Get Failure"),
    new ScormError("351", "General Set Failure"),
    new ScormError("391", "General Commit Failure"),
    new ScormError("401", "Undefined Model Error Codes"),
    new ScormError("402", "Unimplemented Data Model Element"),
    new ScormError("403", "Data Model Element Value Not Initialized"),
    new ScormError("404", "Data Model Element Is Read Only"),
    new ScormError("405", "Data Model Element Is Write Only"),
    new ScormError("406", "Data Model Element Type Mismatch"),
    new ScormError("407", "Data Model Element Value Out Of Range"),
    new ScormError("408", "Data Model Dependency Not Established")];
}