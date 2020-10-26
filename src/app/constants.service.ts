import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ConstantService {


    domainName = "http://localhost:8080";

    // request= "POST" --same for update--
    addNewRuleAPI = "http://localhost:8080/rule";

    // request= "GET"
    getAllRulesAPI = "http://localhost:8080/rule";

    // request = "GET", params= ruleId
    getRuleByIdAPI = "http://localhost:8080/rule/";

    // request= "Delete", params= ruleId
    deleteRuleByIdAPI = "http://localhost:8080/rule/";




}