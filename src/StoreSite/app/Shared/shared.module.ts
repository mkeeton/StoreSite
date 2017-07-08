import { NgModule, ModuleWithProviders } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { AngularHighfieldauthModule } from "angular-highfieldauth";
import { AngularHighfieldwebapiModule } from "angular-highfieldwebapi";
import { LMSApiService } from "./Services/lmsApi.service";
import { SCORMAPIFactory } from "./Factories/scormAPI.factory";
import { SCORMPlayerComponent } from "./Components/scormPlayer.component";

@NgModule({
    declarations: [SCORMPlayerComponent],
    imports: [AngularHighfieldauthModule.forRoot(), AngularHighfieldwebapiModule.forRoot()],
    providers: [LMSApiService, SCORMAPIFactory],
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}