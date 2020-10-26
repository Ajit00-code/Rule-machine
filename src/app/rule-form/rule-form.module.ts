import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RuleFormRoutingModule } from './rule-form-routing.module';
import { AddRuleFormComponent } from './add-rule-form/add-rule-form.component';
import { RulesHomeComponent } from './rules-home/rules-home.component';
import { ShowRulesComponent } from './show-rules/show-rules.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RuleFormService } from './rule-form.service';

@NgModule({

    declarations: [
        AddRuleFormComponent,
        RulesHomeComponent,
        ShowRulesComponent
    ],

    imports: [
        CommonModule,
        SharedModule,
        RuleFormRoutingModule
    ],

    providers: [RuleFormService]
})
export class RuleFormModule {

}