import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, RouterModule],
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
