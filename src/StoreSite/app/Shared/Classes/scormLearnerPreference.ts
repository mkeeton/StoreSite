import { AudioCaptioningState } from "../Types/states";

export class ScormLearnerPreference {
    constructor(public audio_level?: number,
        public language?: string,
        public delivery_speed?: number,
        public audio_captioning?: AudioCaptioningState) { }
}