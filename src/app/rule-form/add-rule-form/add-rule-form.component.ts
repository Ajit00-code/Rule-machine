import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Condition } from 'src/app/Models/condition.model';
import { RuleFormService } from '../rule-form.service';

@Component({
  selector: 'app-add-rule-form',
  templateUrl: './add-rule-form.component.html',
  styleUrls: ['./add-rule-form.component.css']
})
export class AddRuleFormComponent implements OnInit {

  ruleId = null;
  editRule;

  displayFirstForm = true;

  tempValuesArray: Array<any> = [];
  showFormModal = false;


  showMoreModal = false;
  showMoreCondition: Condition;

  currentEditItemIndex: number = 0;
  formMode = "";
  conditionType = "";


  ruleForm: FormGroup;
  conditionForm: FormGroup;

  simpleCondition: Condition = null;
  andArray: Array<Condition> = [];
  orArray: Array<Condition> = [];


  constructor(private activatedRout: ActivatedRoute, private ruleFormService: RuleFormService, private router: Router) { }

  ngOnInit() {

    this.ruleForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      discription: new FormControl(''),

      condition: new FormGroup({
        attribute: new FormControl(''),
        operator: new FormControl(''),
        value: new FormArray([]),


        and: new FormArray([]),
        or: new FormArray([])
      })
    });


    if (this.activatedRout.snapshot.params['id'] != null) {
      this.ruleId = this.activatedRout.snapshot.params['id'];
      this.setRuleFormValues();
    }



    this.conditionForm = new FormGroup({
      attribute: new FormControl('', Validators.required),
      operator: new FormControl('', Validators.required),
      value: new FormArray([]),
      tempValue: new FormControl('')
    });
  }

  onNextFormClick() {

    this.displayFirstForm = false;
  }

  onBackFormClick() {

    this.displayFirstForm = true;

  }

  addAndCondition() {
    const control = new FormControl(this.conditionForm, Validators.required);
    (<FormArray>this.ruleForm.get('condition.and')).push(control);
  }

  addOrCondition() {
    const control = new FormControl(this.conditionForm, Validators.required);
    (<FormArray>this.ruleForm.get('condition.or')).push(control);

  }

  onAddValue() {

    console.log(this.conditionForm.get('tempValue').value);
    this.tempValuesArray.push(this.conditionForm.get('tempValue').value);

    this.conditionForm.patchValue({

      tempValue: ""

    });



  }


  onSubmitValues() {

    for (var val of this.tempValuesArray) {

      const control = new FormControl(val, Validators.required);
      (<FormArray>this.ruleForm.get('condition.value')).push(control);
    }

    console.log(this.conditionForm.value);
  }

  onclickRemoveValue(index: number) {

    console.log(index);
    if (confirm("Are you sure ?")) {

      this.tempValuesArray.splice(index, 1);
    }

  }

  onCloseAddForm() {

    this.clearConditionFormModal();
  }



  onClickAddSimpleCondition() {

    this.showFormModal = true;
    this.formMode = "Add";
    this.conditionType = "";
  }

  onClickAddAndCondition() {
    this.showFormModal = true;
    this.formMode = "Add";
    this.conditionType = "AND";

  }


  onClickAddOrCondition() {
    this.showFormModal = true;
    this.formMode = "Add";
    this.conditionType = "OR";

  }

  onClickEditSimpleCondition() {

    this.formMode = "Edit";
    this.conditionType = "";
    this.showFormModal = true;

    this.conditionForm.patchValue({
      attribute: this.simpleCondition.attribute,
      operator: this.simpleCondition.operator
    });

    this.tempValuesArray = this.simpleCondition.value;

  }


  onClickEditAndCondition(index: number) {

    this.currentEditItemIndex = index;
    this.formMode = "Edit";
    this.conditionType = "AND";
    this.showFormModal = true;

    this.conditionForm.patchValue({
      attribute: this.andArray[index].attribute,
      operator: this.andArray[index].operator
    });

    this.tempValuesArray = this.andArray[index].value;

  }

  onClickEditOrCondition(index: number) {

    this.currentEditItemIndex = index;
    this.formMode = "Edit";
    this.conditionType = "OR";
    this.showFormModal = true;

    this.conditionForm.patchValue({
      attribute: this.orArray[index].attribute,
      operator: this.orArray[index].operator
    });

    this.tempValuesArray = this.orArray[index].value;

  }

  onClickDeleteSimpleCondition() {

    if (confirm("Are You Sure?")) {

      this.simpleCondition = null;


    }
  }

  onClickDeleteANDCondition(index: number) {

    if (confirm("Are You Sure?")) {

      this.andArray.splice(index, 1);
      console.log(this.andArray);

    }
  }

  onClickDeleteORCondition(index: number) {

    if (confirm("Are You Sure?")) {

      this.orArray.splice(index, 1);
      console.log(this.orArray);
    }
  }

  clearConditionFormModal() {

    this.showFormModal = false;

    this.conditionForm.patchValue({
      attribute: "",
      operator: ""
    });

    this.tempValuesArray = [];

  }

  isTempValueArrayEmpty(): boolean {
    return this.tempValuesArray.length == 0;
  }

  onClickShowMore(conditionType: string, index: number) {

    this.showMoreModal = true;
    this.conditionType = conditionType;

    this.currentEditItemIndex = index;

    if (conditionType == "AND") {

      this.showMoreCondition = {
        attribute: this.andArray[index].attribute,
        operator: this.andArray[index].operator,
        value: this.andArray[index].value
      };


    } else if (conditionType == "OR") {

      this.showMoreCondition = {
        attribute: this.orArray[index].attribute,
        operator: this.orArray[index].operator,
        value: this.orArray[index].value
      };

    } else if (conditionType == "") {

      this.showMoreCondition = {
        attribute: this.simpleCondition.attribute,
        operator: this.simpleCondition.operator,
        value: this.simpleCondition.value
      };

    }
  }

  onCloseShowMoreModal() {

    this.showMoreModal = false;
  }

  onClickEditFromShowMore() {

    this.showMoreModal = false;
    this.showFormModal = true;

    if (this.conditionType == "AND") {

      this.onClickEditAndCondition(this.currentEditItemIndex);
    } else if (this.conditionType == "OR") {

      this.onClickEditOrCondition(this.currentEditItemIndex);
    } else if (this.conditionType == "") {

      this.onClickEditSimpleCondition();
    }
  }

  onSubmitAddCondition() {

    if (this.formMode == "Add") {

      this.addNewCondition();
    } else if (this.formMode == "Edit") {

      this.editCondition();
    }


    this.clearConditionFormModal();
  }

  addNewCondition() {

    let tempNewCondition: { attribute: string, operator: string, value: Array<any> };
    let tempAttribute = this.conditionForm.get('attribute').value;
    let tempOperator = this.conditionForm.get('operator').value;

    tempNewCondition = {
      attribute: tempAttribute,
      operator: tempOperator,
      value: this.tempValuesArray
    };

    if (this.conditionType == "AND") {

      this.andArray.push(tempNewCondition);
    } else if (this.conditionType == "OR") {

      this.orArray.push(tempNewCondition);
    } else if (this.conditionType == "") {

      this.simpleCondition = tempNewCondition;
    }


  }

  editCondition() {

    if (this.conditionType == "AND") {

      this.andArray[this.currentEditItemIndex].attribute = this.conditionForm.get('attribute').value;
      this.andArray[this.currentEditItemIndex].operator = this.conditionForm.get('operator').value;
      this.andArray[this.currentEditItemIndex].value = this.tempValuesArray;


    } else if (this.conditionType == "OR") {

      this.orArray[this.currentEditItemIndex].attribute = this.conditionForm.get('attribute').value;
      this.orArray[this.currentEditItemIndex].operator = this.conditionForm.get('operator').value;
      this.orArray[this.currentEditItemIndex].value = this.tempValuesArray;

    } else if (this.conditionType == "") {

      this.simpleCondition.attribute = this.conditionForm.get('attribute').value;
      this.simpleCondition.operator = this.conditionForm.get('operator').value;
      this.simpleCondition.value = this.tempValuesArray;
    }
  }


  onClickSubmitRule() {


    if (this.simpleCondition != null) {

      this.ruleForm.patchValue({

        condition: {
          attribute: this.simpleCondition.attribute,
          operator: this.simpleCondition.operator
        }

      });

      for (var val of this.simpleCondition.value) {

        const control = new FormControl(val, Validators.required);
        (<FormArray>this.ruleForm.get('condition.value')).push(control);
      }

    }


    if (this.andArray.length > 0) {



      for (var condition of this.andArray) {

        const control = new FormControl(condition, Validators.required);
        (<FormArray>this.ruleForm.get('condition.and')).push(control);
      }
    }


    if (this.orArray.length > 0) {

      for (var condition of this.orArray) {

        const control = new FormControl(condition, Validators.required);
        (<FormArray>this.ruleForm.get('condition.or')).push(control);
      }
    }

    if (this.ruleId == null) {

      this.saveRuleToServer(this.ruleForm.value, "Added");

    } else {

      this.ruleForm.patchValue({
        id: this.ruleId
      });

      this.saveRuleToServer(this.ruleForm.value, "Updated");
    }


  }

  saveRuleToServer(rule: any, saveMode: string) {

    this.ruleFormService.saveNewRule(rule).subscribe(
      (response: any) => {
        alert("Rule " + saveMode + " Successfully !");
        this.resetAllConditions();
        if (this.ruleId != null) {
          this.router.navigate(['../rules']);
        } else {
          this.displayFirstForm = true;
        }
      }
    );
  }

  resetAllConditions() {

    this.ruleForm.patchValue({
      name: '',
      value: '',
      discription: ''
    });

    this.simpleCondition = null;
    this.andArray = [];
    this.orArray = [];
  }

  setRuleFormValues() {


    let a = {
      id: "0",
      name: "Rule Name",
      value: "Rule Value",
      discription: "bla bla bla",

      condition: {
        attribute: "Simple Attribute",
        operator: "Simple operator",
        value: ["value1", "Value2", "Value3"],
        and: [
          {
            attribute: "And Attribute",
            operator: "And operator",
            value: ["value1", "Value2", "Value3"]
          },
          {
            attribute: "And Attribute 2",
            operator: "And operator 2",
            value: ["value1", "Value2"]
          }
        ],
        or: [
          {
            attribute: "Or Attribute",
            operator: "Or operator",
            value: ["value1", "Value2"]
          },
          {
            attribute: "Or Attribute 2",
            operator: "Or operator 2",
            value: ["value1", "Value2"]
          }
        ]
      }

    };


    this.ruleFormService.getRuleById(this.ruleId).subscribe(
      (response: any) => {
        this.editRule = response;
        console.log(response);
        this.setEditRulesValueToEntities();
      }
    );


  }

  setEditRulesValueToEntities() {

    this.ruleForm.patchValue({
      name: this.editRule.name,
      value: this.editRule.value,
      discription: this.editRule.discription
    });

    if ((this.editRule.condition.value.length > 0) && (this.editRule.condition.value != null)) {

      this.simpleCondition = {
        attribute: this.editRule.condition.attribute,
        operator: this.editRule.condition.attribute,
        value: this.editRule.condition.value
      };
    }

    if ((this.editRule.condition.and.length > 0) && (this.editRule.condition.and != null)) {

      this.andArray = this.editRule.condition.and;
    }

    if ((this.editRule.condition.or.length > 0) && (this.editRule.condition.or != null)) {

      this.orArray = this.editRule.condition.or;
    }

  }

}


