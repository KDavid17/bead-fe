import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatIconModule, MatSnackBarModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  data = inject(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef);
}
