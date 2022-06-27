import { Match } from './../../../core/models/match';
import { MatchService } from './../../../core/services/match.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Equipe } from 'src/app/core/models/equipe';
import { AppError } from 'src/app/core/common/app-error';
import { BadInput } from 'src/app/core/common/bad-input';
import Swal from 'sweetalert2';
import { NotFoundError } from 'src/app/core/common/not-found-error';
import { EquipeService } from 'src/app/core/services/equipe.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(private matchService : MatchService, private route: Router , private flashMessage: FlashMessagesService,private equipeService : EquipeService) { }

  equipes : Equipe[] = [];
  matches : Match[] = [];
  match : Match = {};

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
    this.matchService.getALL()
    .subscribe(matches => this.matches = matches,
        error => {
        alert('error inattendu');
        console.log(error);
    })

  }

  create(){
    this.matchService.create(this.match)
      .subscribe(() => {
      this.matches.unshift(this.match); // ajouter en premier
      //initialisation input
      this.match ={
        stade :'',
        ville :''
      };
    },(error : AppError) => {

      if(error instanceof BadInput) {
        alert('Merci de vérifié vos information !! ')
      }else{
        alert('error inattendu');
      }
    })
    this.flashMessage.show('A été ajoutée avec success ', {cssClass : 'alert-success',timeout:3000});
    this.route.navigate(['/match']);
    this.closePopup();

  }

  edit(match:any){
    this.match = match;
    this.openPopup();
    this.StatusButton = false;
   }

   update(){
    this.matchService.update(this.match)
      .subscribe(() => {
        this.match  = {
          stade :'',
          ville :''

        };

      },(error : AppError) => {
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
         }else{
          alert('error inattendu');
         }
      })
      this.flashMessage.show('updeted avec succes ', {cssClass : 'alert-success',timeout:3000});
      this.route.navigate(['/match'])

      this.closePopup();

  }

  Delete(match:any){

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

        this.matchService.delete(match)
        .subscribe(() => {
          let index  = this.equipes.indexOf(match);
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
          this.route.navigate(['/match'])
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
