import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // currentUser : null | any;


  constructor(private  accountService : AccountService , private tokenService : TokenService, private router : Router) { }

  ngOnInit(): void {
    // this.accountService.authStatus.subscribe(res => {

    //   this.currentUser = this.tokenService.getInfos();

    // })
  }

  logout(){
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.router.navigateByUrl("/login");

  }

}
