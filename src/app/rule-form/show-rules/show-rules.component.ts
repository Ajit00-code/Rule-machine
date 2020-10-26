import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuleFormService } from '../rule-form.service';

@Component({
  selector: 'app-show-rules',
  templateUrl: './show-rules.component.html',
  styleUrls: ['./show-rules.component.css']
})
export class ShowRulesComponent implements OnInit {

  constructor(private ruleService: RuleFormService, private route: Router) { }

  rulesList: Array<any> = null;
  ruleDetail: any = null;

  displayShowRuleDetail = false;

  showConditionDetailModal = false;
  selectedConditionType = "";
  selectedCondition: any;

  tempArray: Array<any>;
  ngOnInit() {

    this.setRuleList();




  }

  setRuleList() {

    this.ruleService.getAllRules().subscribe(
      (response: Array<any>) => {
        this.rulesList = response;
      }
    );
  }

  onClickDeleteRule(id: string) {

    if (confirm("Are You Sure ?")) {
      console.log(id);
      this.ruleService.deleteRuleById(id).subscribe(
        (response: any) => {
          this.setRuleList();
          alert("Successfully Deleted !");
          this.displayShowRuleDetail = false;
        }
      );

    }
  }

  onClickEditRule(id: string) {

    console.log(id);
    this.route.navigate(['../edit/' + id]);

  }

  onClickRuleDetail(index: number) {

    this.ruleDetail = this.rulesList[index];
    this.displayShowRuleDetail = true;
  }

  onClickCloseRuleDetail() {

    this.displayShowRuleDetail = false;
  }

  onClickShowConditionDetails(conditionType: string, condition: any) {

    this.showConditionDetailModal = true;
    this.selectedConditionType = conditionType;
    this.selectedCondition = condition;
  }

  onCloseConditionDetailModal() {

    this.showConditionDetailModal = false;
  }

}
