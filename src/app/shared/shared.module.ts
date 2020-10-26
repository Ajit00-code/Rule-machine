import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RuleFormService } from '../rule-form/rule-form.service';

@NgModule({

    imports: [
        FormsModule,
        ReactiveFormsModule
    ],

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],

    providers: [
        RuleFormService
    ]

})
export class SharedModule { }