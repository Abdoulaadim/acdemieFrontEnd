import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EntrainementService } from 'src/app/core/services/entrainement.service';
import { EquipeService } from 'src/app/core/services/equipe.service';
import { Equipe } from 'src/app/core/models/equipe';
import { Entrainement } from 'src/app/core/models/entrainement';
import { AppError } from 'src/app/core/common/app-error';
import { BadInput } from 'src/app/core/common/bad-input';
import Swal from 'sweetalert2';
import { NotFoundError } from 'src/app/core/common/not-found-error';

@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.scss']
})
export class EntrainementComponent implements OnInit {

  constructor(private entrainementService : EntrainementService, private route: Router , private flashMessage: FlashMessagesService,private equipeService : EquipeService) { }

  equipes : Equipe[] = [];
  entrainements : Entrainement[] = [];
  entrainement : Entrainement = {};

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
    this.entrainementService.getALL()
    .subscribe(entrainements => {this.entrainements = entrainements
      console.log(this.entrainements);
    },
        error => {
        alert('error inattendu');
        console.log(error);
    })



  }

  create(){
    this.entrainementService.create(this.entrainement)
      .subscribe(() => {
      this.entrainements.unshift(this.entrainement); // ajouter en premier
      //initialisation input
      this.entrainement ={
        stade :'',
        ville :'',
        description:''
      };
    },(error : AppError) => {

      if(error instanceof BadInput) {
        alert('Merci de vérifié vos information !! ')
      }else{
        alert('error inattendu');
      }
    })
    this.flashMessage.show('A été ajoutée avec success ', {cssClass : 'alert-success',timeout:3000});
    this.route.navigate(['/entrainement']);
    this.closePopup();

  }

  edit(entrainement:any){
    this.entrainement = entrainement;
    this.openPopup();
    this.StatusButton = false;
   }

   update(){
    this.entrainementService.update(this.entrainement)
      .subscribe(() => {
        this.entrainement  = {
          stade :'',
          ville :'',
          description:''

        };

      },(error : AppError) => {
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
         }else{
          alert('error inattendu');
         }
      })
      this.flashMessage.show('updeted avec succes ', {cssClass : 'alert-success',timeout:3000});
      this.route.navigate(['/entrainement'])

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

        this.entrainementService.delete(entrainement)
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
          this.route.navigate(['/entrainement'])
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
