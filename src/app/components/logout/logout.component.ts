import { Component, OnInit } from '@angular/core';
import {UserService} from '../../domain/user/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'jsn-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private api: UserService,
              private router: Router) { }

  ngOnInit() {
      this.api.logout().subscribe(_ => {
          this.router.navigate(['sender/login']);
      });
  }

}
