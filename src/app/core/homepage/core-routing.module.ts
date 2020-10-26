import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';

const coreRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'rules', loadChildren: '../../rule-form/rule-form.module#RuleFormModule' }
];

@NgModule({

    imports: [
        RouterModule.forChild(coreRoutes)
    ],

    exports: [
        RouterModule
    ]
})

export class CoreRoutingModule {

}