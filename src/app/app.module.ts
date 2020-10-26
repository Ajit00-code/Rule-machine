import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRuleFormComponent } from './rule-form/add-rule-form/add-rule-form.component';
import { RuleFormModule } from './rule-form/rule-form.module';
import { HomepageComponent } from './core/homepage/homepage.component';
import { CoreModule } from './core/homepage/core.module';
import { ConstantService } from './constants.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [ConstantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
