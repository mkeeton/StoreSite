import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//import { AuthGuard } from "../Services/authGuard.service";
import { AdminComponent } from "./Components/admin.component";
import { AdminDashboardComponent } from "./Components/adminDashboard.component";
import { PackageListComponent } from "./Components/packageList.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: "", component: AdminDashboardComponent },
            { path: "packages", component: PackageListComponent }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }