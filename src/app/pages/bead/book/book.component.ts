import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from "rxjs";

import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

import { EateryService } from "../../../services/eatery-service/eatery.service";
import BookingFormModel from "../../../shared/models/forns/booking-form.model";
import EateryResponseModel from "../../../shared/models/responses/eatery-response.model";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  private readonly eateryService = inject(EateryService);

  selected: number | undefined;
  filteredOptions = new BehaviorSubject<EateryResponseModel[]>([]).asObservable();
  eaterySearch: FormControl<string | null> = new FormControl("");
  bookingForm = new FormGroup<BookingFormModel>({
    eatery: new FormControl<EateryResponseModel | null>(null)
  });

  ngOnInit(): void {
    this.eaterySearch.valueChanges.subscribe({
      next: (value: string | null): void => {
        this.filteredOptions = this.eateryService.getEateriesByParam(value);
      }
    });
  }

  scrollIntoView(action: string): void {
    const date: number = new Date().getHours();

    document.getElementById(`${date}-${action}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  displayEateryName(eatery: EateryResponseModel) {
    return eatery ? eatery.name : "";
  }

  clearFilteredOptions(): void {
    this.eaterySearch.reset();
    this.bookingForm.controls.eatery.reset();
    this.filteredOptions = new BehaviorSubject<EateryResponseModel[]>([]).asObservable();
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.bookingForm.controls.eatery.setValue(event.option.value);
  }

  onSubmit(): void {
    console.log(this.bookingForm);
  }
}
