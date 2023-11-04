import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBriefcase, faComments, faHouse, faRightToBracket, faShop, faUsersLine, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { timer } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  home = faHouse;
  rightBracket = faRightToBracket
  briefcase = faBriefcase
  shop = faShop
  us = faUsersLine
  qa = faComments
  dash = faChartLine

  id = -1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let ls = localStorage.getItem('id');
    ls != null ? this.id = parseInt(ls) : -1
  }

  logOut() {
    localStorage.removeItem('id')
    this.router.navigate(['/home'])
    timer(100).subscribe(x => {
      window.location.reload()
    })
  }

}
