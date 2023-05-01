import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatExpansionModule } from "@angular/material/expansion";

import FoodDetailsResponseModel from "../../../../../shared/models/responses/food-details-response.model";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-eatery-foods',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './eatery-foods.component.html',
  styleUrls: ['./eatery-foods.component.scss']
})
export class EateryFoodsComponent {
  @Input() foodsDetails: FoodDetailsResponseModel[] | null = null;
}
