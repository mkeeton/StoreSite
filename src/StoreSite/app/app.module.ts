import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { UrlSerializer } from '@angular/router';
import { AngularHighfieldauthModule } from "angular-highfieldauth";
import { AngularHighfieldlayoutModule } from "angular-highfieldlayout";
import { AngularHighfieldwebapiModule } from "angular-highfieldwebapi";
import { AppComponent } from "./General/Components/app.component";
import { AuthenticationComponent } from "./General/Components/authentication.component";
import { DefaultComponent } from "./General/Components/default.component";
import { LoginPageComponent } from "./General/Components/login.component";
import { AppRoutingModule } from "./Modules/app-routing.module";
import { LowerCaseUrlSerializer } from "./Modules/urlserializer.module";
import { DropdownModule, CalendarModule, CheckboxModule, InputTextModule, MultiSelectModule, RadioButtonModule, SpinnerModule, SplitButtonModule, ButtonModule } from 'primeng/primeng';
import { SharedModule } from "./Shared/shared.module";
import { AdminModule } from "./Admin/admin.module";
import { LearnerModule } from "./Learner/learner.module";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, AuthenticationComponent, DefaultComponent, LoginPageComponent],
    imports: [BrowserModule, AngularHighfieldauthModule.forRoot(), AngularHighfieldlayoutModule.forRoot(), AngularHighfieldwebapiModule.forRoot(), SharedModule.forRoot(), AdminModule.forRoot(), LearnerModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpModule, ReactiveFormsModule, DropdownModule, CheckboxModule, InputTextModule, RadioButtonModule, ButtonModule],
    providers: [
        AuthenticationComponent,
        { provide: "AuthApiBaseUrl", useValue: "https://authentication-uat.highfieldabc.com/auth" },
        { provide: "LoginPageUrl", useValue: "https://authentication-uat.highfieldabc.com/login" },
        { provide: "UserApiBaseUrl", useValue: "https://authentication-uat.highfieldabc.com/" },
        { provide: "LMSApiBaseUrl", useValue: "http://localhost:54301/" },
        { provide: "LMSScormPackagePath", useValue: "/Packages" },
        { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
        { provide: "AuthCheckDisplayName", useValue: "Highfield LMS" },
        { provide: "AuthCheckFailURL", useValue: "/login" },
        {
            provide: "CurrentSiteId",
            useValue: "public-uk"
        },
        {
            provide: "domainId",
            useValue: "3"
        }
    ],
})

export class AppModule { }
