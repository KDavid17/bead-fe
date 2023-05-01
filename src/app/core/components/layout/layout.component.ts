import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
      <app-header></app-header>
      <main class="min-h-main max-w-full-hd h-0 m-auto px-8">
          <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
  `,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent { }
