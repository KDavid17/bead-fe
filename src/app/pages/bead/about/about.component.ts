import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
    imports: [CommonModule, MatCardModule, NgOptimizedImage, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

}
