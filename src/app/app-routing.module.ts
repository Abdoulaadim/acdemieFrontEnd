import { ScoreComponent } from './shared/components/score/score.component';
import { EntrainementComponent } from './shared/components/entrainement/entrainement.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { EquipeComponent } from './shared/components/equipe/equipe.component';
import { MatchComponent } from './shared/components/match/match.component';
import { AuthGuardGuardGuard } from './core/guards/auth-guard-guard.guard';

const routes: Routes = [
  {path: "", redirectTo: "Home", pathMatch: 'full'  },
  {path: "Home", component: HomeComponent },
  {path: "equipe", component: EquipeComponent , canActivate: [AuthGuardGuardGuard]},
  {path: "match", component: MatchComponent , canActivate: [AuthGuardGuardGuard] },
  {path: "score", component: ScoreComponent , canActivate: [AuthGuardGuardGuard]},
  {path: "entrainement", component: EntrainementComponent , canActivate: [AuthGuardGuardGuard] },
  {path: "login" ,component: LoginComponent },
  {path: "register" ,component: RegisterComponent },
  {path: "**" , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
