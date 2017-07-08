import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { UrlSerializer } from '@angular/router';
import { AngularHighfieldauthModule, User, AuthenticationService, AuthenticatedService, CurrentUserService, UserService } from "angular-highfieldauth";
import { AngularHighfieldwebapiModule, APIService, EasyXDMService, StoredSettingService } from "angular-highfieldwebapi";
import { LearnerComponent } from "./Components/learner.component";
import { LearnerDashboardComponent } from "./Components/learnerDashboard.component";
import { LearnerRoutingModule } from "./learner-routing.module";
import { DropdownModule, CalendarModule, CheckboxModule, InputTextModule, MultiSelectModule, RadioButtonModule, SpinnerModule, SplitButtonModule, ButtonModule } from 'primeng/primeng';

@NgModule({
    declarations: [LearnerComponent, LearnerDashboardComponent],
    imports: [BrowserModule, AngularHighfieldwebapiModule.forRoot(), LearnerRoutingModule, BrowserAnimationsModule, FormsModule, HttpModule, ReactiveFormsModule, DropdownModule, CheckboxModule, InputTextModule, RadioButtonModule, ButtonModule],
    providers: [
    ],
})

export class LearnerModule { 

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LearnerModule
        };
    }
}