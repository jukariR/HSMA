import { Component, OnInit } from '@angular/core';
import { faBriefcase, faComments, faHouse, faRightToBracket, faShop, faUsersLine} from '@fortawesome/free-solid-svg-icons';

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

  id = -1;

  constructor() { }

  ngOnInit(): void {
  }


}
