import { ScormScore } from "./scormScore";
import { CompletionStatusState, CreditState, EntryState, ExitState, ModeState, SuccessStatusState, TimeLimitActionState } from "../Types/states";


export class ScormObjective {
    constructor(public id?: string,
        public score?: ScormScore,
        public success_status?: SuccessStatusState,
        public completion_status?: CompletionStatusState,
        public progress_measure?: number,
        public description?: string) { }
}