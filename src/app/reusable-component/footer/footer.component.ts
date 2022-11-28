import { Component, OnInit } from '@angular/core';
import { faPersonBreastfeeding } from '@fortawesome/free-solid-svg-icons';
import { twitter } from '@igniteui/material-icons-extended';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  twitter = faPersonBreastfeeding;

  constructor() { }

  ngOnInit(): void {
  }

}
