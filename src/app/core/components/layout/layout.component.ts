import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
      <app-header></app-header>
      <main class="min-h-main max-w-full-hd h-0 m-auto px-8">
          <img ngSrc="assets/jpg/dashboard-background.jpg" priority fill class="pt-16 -z-10 object-cover">

          <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
  `,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent { }
