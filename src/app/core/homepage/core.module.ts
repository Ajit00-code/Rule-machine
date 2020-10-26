import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RuleFormModule } from 'src/app/rule-form/rule-form.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({

    declarations: [

    ],

    imports: [
        CommonModule,
        CoreRoutingModule,
        RuleFormModule
    ]
})

export class CoreModule { }