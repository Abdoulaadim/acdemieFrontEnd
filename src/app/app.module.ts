import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { EntraineurComponent } from './shared/components/entraineur/entraineur.component';
import { EntrainementComponent } from './shared/components/entrainement/entrainement.component';
import { CarouselComponent } from './shared/composants/carousel/carousel.component';
import { FooterComponent } from './shared/composants/footer/footer.component';
import { CardsComponent } from './shared/composants/cards/cards.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ContactsComponent } from './shared/composants/contacts/contacts.component';
import { RegisterEntraineurComponent } from './shared/components/register-entraineur/register-entraineur.component';
import { RegisterJoeurComponent } from './shared/components/register-joeur/register-joeur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EquipeComponent } from './shared/components/equipe/equipe.component';
import { SidebarComponent } from './shared/composants/sidebar/sidebar.component';
import { FlashMessagesModule } from 'flash-messages-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { JwtInterceptor } from './core/services/jwt.interceptor';
import { MatchComponent } from './shared/components/match/match.component';
import { ScoreComponent } from './shared/components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    EntraineurComponent,
    EntrainementComponent,
    CarouselComponent,
    FooterComponent,
    CardsComponent,
    HomeComponent,
    ContactsComponent,
    RegisterEntraineurComponent,
    RegisterJoeurComponent,
    EquipeComponent,
    SidebarComponent,
    MatchComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    SweetAlert2Module.forRoot(),
    SweetAlert2Module
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
