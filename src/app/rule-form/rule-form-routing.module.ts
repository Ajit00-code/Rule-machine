import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddRuleFormComponent } from './add-rule-form/add-rule-form.component';
import { RulesHomeComponent } from './rules-home/rules-home.component';
import { ShowRulesComponent } from './show-rules/show-rules.component';

const formRoutes: Routes = [
    {
        path: '', component: RulesHomeComponent, children: [

            { path: '', component: ShowRulesComponent },
            { path: 'add', component: AddRuleFormComponent },
            { path: 'edit/:id', component: AddRuleFormComponent }
        ]
    }
];

@NgModule({

    imports: [
        RouterModule.forChild(formRoutes)
    ],

    exports: [
        RouterModule
    ]
})

export class RuleFormRoutingModule {

}