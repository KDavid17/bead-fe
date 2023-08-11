import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

import { EateryService } from "../../../services/eatery-service/eatery.service";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-eateries',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatCardModule, RouterLink, MatButtonModule, NgOptimizedImage],
  templateUrl: './eateries.component.html',
  styleUrls: ['./eateries.component.scss']
})
export class EateriesComponent implements OnInit {
  private readonly eateryService = inject(EateryService);

  defaultEateries$ = this.eateryService.getEateriesByParam('a');
  eateries$ = this.defaultEateries$;
  eaterySearch = new FormControl('');

  ngOnInit(): void {
    this.eaterySearch.valueChanges.subscribe({
      next: (param: string | null): void => {
        this.eateries$ = param ? this.eateryService.getEateriesByParam(param) : this.defaultEateries$;
      }
    })
  }
}
