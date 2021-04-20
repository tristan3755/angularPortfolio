import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { QuiComponent } from './qui/qui.component';
import { DescriptionComponent } from './description/description.component';
import { MokupComponent } from './mokup/mokup.component';
import { GridComponent } from './grid/grid.component';
import { CompetenceComponent } from './competence/competence.component';
import { SkillsComponent } from './skills/skills.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    QuiComponent,
    DescriptionComponent,
    MokupComponent,
    GridComponent,
    CompetenceComponent,
    SkillsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
