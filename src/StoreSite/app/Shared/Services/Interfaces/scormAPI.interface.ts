import { CmiElement } from "../../Classes/cmiElement";

export interface ISCORMAPI {
    version: string;
    cmi: any[];

    InitializeCmi(): boolean;
}