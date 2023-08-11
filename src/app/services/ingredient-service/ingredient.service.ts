import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../../environments/environment";

import IngredientResponseModel from "../../shared/models/responses/ingredient-response.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  readonly http = inject(HttpClient);

  private readonly ingredientApi = `${environment.apiUrl}/ingredients`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getIngredients(): Observable<IngredientResponseModel[]> {
    return this.http.get<IngredientResponseModel[]>(`${this.ingredientApi}`, {headers: this.headers});
  }

  getIngredientsFormatted(foodIngredients: IngredientResponseModel[]): string {
    const noIngredients: string = "There are no ingredients listed";

    if (foodIngredients && foodIngredients.length > 0) {
      let ingredients: string = "";
      let allergens: string[] = [];

      foodIngredients.forEach(fi => {
        fi.isAllergen ? allergens.push(fi.name) : ingredients += fi.name + ' ';
      });

      if (allergens.length > 0) {
        ingredients += '\nAllergens: ';

        allergens.forEach(a => ingredients += a + ' ');
      }

      return ingredients;
    }

    return noIngredients;
  }
}
