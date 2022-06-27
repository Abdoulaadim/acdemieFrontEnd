import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from 'src/app/core/common/app-error';
import { BadInput } from 'src/app/core/common/bad-input';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router : Router, private userService: UserService) { }
  users : User [] = [];
  user : User = {}
  ngOnInit(): void {
  }


  onRegister(){
    this.userService.create(this.user)
    // .subscribe(response => console.log(response))
         .subscribe(() => {
        this.users.unshift(this.user); // ajouter en premier
        console.log(this.user);
      },(error : AppError) => {

        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
        }else{
          alert('error inattendu');
        }
      })
     this.router.navigate(['/login']);
}

}
