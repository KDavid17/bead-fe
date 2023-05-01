import { FormControl } from "@angular/forms";

import EateryResponseModel from "../responses/eatery-response.model";

export default interface BookingFormModel {
  eatery: FormControl<EateryResponseModel | null>;
}
