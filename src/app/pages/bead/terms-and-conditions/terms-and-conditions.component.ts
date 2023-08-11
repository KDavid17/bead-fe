import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
    imports: [CommonModule, MatCardModule, NgOptimizedImage],
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {

}
