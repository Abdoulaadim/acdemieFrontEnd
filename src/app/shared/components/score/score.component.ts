import { Score } from './../../../core/models/score';
import { ScoreService } from './../../../core/services/score.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { EquipeService } from 'src/app/core/services/equipe.service';
import { Equipe } from 'src/app/core/models/equipe';
import { AppError } from 'src/app/core/common/app-error';
import { BadInput } from 'src/app/core/common/bad-input';
import Swal from 'sweetalert2';
import { NotFoundError } from 'src/app/core/common/not-found-error';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(private scoreService : ScoreService, private route: Router , private flashMessage: FlashMessagesService,private equipeService : EquipeService) { }
  equipes : Equipe[] = [];
  scores : Score[] = [];
  score : Score = {};

  StatusButton : Boolean = true;
  ngOnInit(): void {
    this.getALL();
    this.getALLequipe();
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  getALLequipe(){
    this.equipeService.getALL()
    .subscribe(equipes => this.equipes = equipes,
        error => {
        alert('error inattendu');
        console.log(error);
    })
  }

  getALL(){
    this.scoreService.getALL()
    .subscribe(scores => this.scores = scores,
        error => {
        alert('error inattendu');
        console.log(error);
    })

  }

  create(){
    this.scoreService.create(this.score)
      .subscribe(() => {
      this.scores.unshift(this.score); // ajouter en premier
      //initialisation input
      this.score ={};
    },(error : AppError) => {

      if(error instanceof BadInput) {
        alert('Merci de vérifié vos information !! ')
      }else{
        alert('error inattendu');
      }
    })
    this.flashMessage.show('A été ajoutée avec success ', {cssClass : 'alert-success',timeout:3000});
    this.route.navigate(['/score']);
    this.closePopup();

  }

  edit(score:any){
    this.score = score;
    this.openPopup();
    this.StatusButton = false;
   }

   update(){
    this.scoreService.update(this.score)
      .subscribe(() => {
        this.score  = { };

      },(error : AppError) => {
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
         }else{
          alert('error inattendu');
         }
      })
      this.flashMessage.show('updeted avec succes ', {cssClass : 'alert-success',timeout:3000});
      this.route.navigate(['/score'])

      this.closePopup();

  }

  Delete(entrainement:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.scoreService.delete(entrainement)
        .subscribe(() => {
          let index  = this.equipes.indexOf(entrainement);
          this.equipes.splice(index, 1)
        },(error : AppError)  => {
          if(error instanceof NotFoundError) {
            alert('Ce message est déjà supprimé !! ')
          }else{
            alert('error inattendu');
            console.log(error)
          }
        })
          this.flashMessage.show('deleted avec succes', {cssClass : 'alert-danger',timeout:3000});
          this.route.navigate(['/score'])
        Swal.fire(
          {
            title: 'Deleted',
            text: "This client is deleted",
            icon: 'success',
            timer : 3000
          }


        )
      }
    })
  }


}
