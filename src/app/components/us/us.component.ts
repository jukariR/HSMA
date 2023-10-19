import { Component, OnInit } from '@angular/core';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faFacebook, faWhatsapp, fab } from '@fortawesome/free-brands-svg-icons';
import { library as legacy } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.css']
})
export class UsComponent implements OnInit {

  brief = faBriefcase
  insta = faInstagram
  face = faTwitter
  twit = faFacebook
  whats = faWhatsapp

  constructor() {
    legacy.add(fab)
  }

  ngOnInit(): void {

  }

}
