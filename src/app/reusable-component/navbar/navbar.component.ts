import { Component, OnInit } from '@angular/core';
import { faCoffee, faRightToBracket} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faCoffee = faCoffee;
  RightBracket = faRightToBracket

}
