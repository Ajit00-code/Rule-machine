import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../constants.service';

@Injectable({
    providedIn: 'root'
})
export class RuleFormService {

    constructor(private httpClient: HttpClient, private constants: ConstantService) {

    }


    saveNewRule(rule: any) {
        return this.httpClient.post(this.constants.addNewRuleAPI, rule);

    }

    getAllRules() {

        return this.httpClient.get(this.constants.getAllRulesAPI);
    }

    deleteRuleById(id: string) {

        return this.httpClient.delete(this.constants.deleteRuleByIdAPI + "" + id);
    }

    getRuleById(id: string) {

        return this.httpClient.get(this.constants.getRuleByIdAPI + "" + id);
    }

}