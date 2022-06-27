import { EquipeService } from './../../../core/services/equipe.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Equipe } from 'src/app/core/models/equipe';
import Swal from 'sweetalert2';
import { AppError } from 'src/app/core/common/app-error';
import { NotFoundError } from 'src/app/core/common/not-found-error';
import { BadInput } from 'src/app/core/common/bad-input';
import { AccountService } from 'src/app/core/services/account.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {

  constructor(private equipeService : EquipeService, private route: Router , private flashMessage: FlashMessagesService) { }

  equipes : Equipe[] = [];
  equipe : Equipe = {};
  StatusButton : Boolean = true;
  Selectcategorie = [
    { id: 1, categorie: "Biberon (U7)" },
    { id: 2, categorie: "Débutant (U8, U9)" },
    { id: 3, categorie: "Poussin (U10, U11)" },
    { id: 4, categorie: "Benjamin (U12, U13)" },
    { id: 5, categorie: "Minime (U14, U15)" },
    { id: 5, categorie: "Cadet (U16, U17)" },
    { id: 5, categorie: "Junior (U18, U19)" },
    { id: 5, categorie: "Senior  (20 ans à 34 ans)" }
  ];
  ngOnInit(): void {
    this.getALL();
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  getALL(){
    this.equipeService.getALL()
    .subscribe(equipes => this.equipes = equipes,
        error => {
        alert('error inattendu');
        console.log(error);
    })
  }

  create(){
    this.equipeService.create(this.equipe)
      .subscribe(() => {
      this.equipes.unshift(this.equipe); // ajouter en premier
      //initialisation input
      this.equipe ={
        nom :'',
        categorie :'',
        division :''
      };
    },(error : AppError) => {

      if(error instanceof BadInput) {
        alert('Merci de vérifié vos information !! ')
      }else{
        alert('error inattendu');
      }
    })
    this.flashMessage.show('A été ajoutée avec success ', {cssClass : 'alert-success',timeout:3000});
    this.route.navigate(['/equipe']);
    this.closePopup();

  }

  edit(equipe:any){
    this.equipe = equipe;
    this.openPopup();
    this.StatusButton = false;
   }

   update(){


    this.equipeService.update(this.equipe)
      .subscribe(() => {
        this.equipe  = {
          nom :'',
          categorie :'',
          division :''

        };

      },(error : AppError) => {
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
         }else{
          alert('error inattendu');
         }
      })
      this.flashMessage.show('updeted avec succes ', {cssClass : 'alert-success',timeout:3000});
      this.route.navigate(['/equipe'])

      this.closePopup();

  }





  Delete(equipe:any){

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

        this.equipeService.delete(equipe)
        .subscribe(() => {
          let index  = this.equipes.indexOf(equipe);
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
          this.route.navigate(['/equipe'])
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
