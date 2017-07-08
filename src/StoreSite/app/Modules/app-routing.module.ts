import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//import { AuthGuard } from "../Services/authGuard.service";
import { AuthenticationComponent } from "../General/Components/authentication.component";
import { AuthCheckComponent } from "angular-highfieldauth";
import { DefaultComponent } from "../General/Components/default.component";
import { LoginPageComponent } from "../General/Components/login.component";
import { SCORMPlayerComponent } from "../Shared/Components/scormPlayer.component";

const routes: Routes = [
    { path: "login", component: LoginPageComponent },
    { path: "player", component: SCORMPlayerComponent, canActivate: [AuthenticationComponent], data: { roles: ["Learner"] } },
    { path: "welcome", component: AuthCheckComponent },
    { path: "", component: DefaultComponent  },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
