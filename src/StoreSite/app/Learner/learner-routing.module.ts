import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//import { AuthGuard } from "../Services/authGuard.service";
import { LearnerComponent } from "./Components/learner.component";
import { LearnerDashboardComponent } from "./Components/learnerDashboard.component";

const routes: Routes = [
    {
        path: 'learner',
        component: LearnerComponent,
        children: [
            { path: "", component: LearnerDashboardComponent }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class LearnerRoutingModule { }