import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { LoadingService } from "../../services/loading/loading.service";

@Component({
  selector: 'app-loading-progress',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingProgressComponent implements OnInit{
  diameterValue = 100;

  isLoading = true;

  constructor(public loaderService: LoadingService) {}

  ngOnInit(): void {
    this.loaderService.getLoading().subscribe((data: boolean) => {
      this.isLoading = data;
    });
  }
}
