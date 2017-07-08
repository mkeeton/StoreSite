import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Http, HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { UrlSerializer } from '@angular/router';
import { AngularHighfieldauthModule, User, AuthenticationService, AuthenticatedService, CurrentUserService, UserService } from "angular-highfieldauth";
import { AngularHighfieldwebapiModule, APIService, EasyXDMService, StoredSettingService } from "angular-highfieldwebapi";
import { AdminComponent } from "./Components/admin.component";
import { AdminDashboardComponent } from "./Components/adminDashboard.component";
import { PackageListComponent } from "./Components/packageList.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { DropdownModule, CalendarModule, CheckboxModule, InputTextModule, MultiSelectModule, RadioButtonModule, SpinnerModule, SplitButtonModule, ButtonModule } from 'primeng/primeng';
import { AdminPackageService } from "./Services/adminPackage.service";

@NgModule({
    declarations: [AdminComponent, AdminDashboardComponent, PackageListComponent],
    imports: [BrowserModule, AngularHighfieldwebapiModule.forRoot(), AdminRoutingModule, BrowserAnimationsModule, FormsModule, HttpModule, ReactiveFormsModule, DropdownModule, CheckboxModule, InputTextModule, RadioButtonModule, ButtonModule],
    providers: [
        AdminPackageService
    ],
})

export class AdminModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminModule
        };
    }
}