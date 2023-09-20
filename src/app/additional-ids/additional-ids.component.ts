import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { WorkerService } from "../worker.service";

@Component({
  selector: 'additional-ids',
  templateUrl: './additional-ids.component.html',
  styleUrls: ['./additional-ids.component.css']
})
export class AdditionalIdsComponent {
  validateAdditionalIds: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const pattern = /^\d+(\s?,\s?\d+)*$/;

    if (!pattern.test(value)) {
      return { invalidAdditionalIds: true };
    }

    return null;
  };
  additionalIdsControl: FormControl = new FormControl('', [this.validateAdditionalIds]);
  constructor(
    private workerService: WorkerService,
  ) {}

  onSubmit() {
    if (this.additionalIdsControl.valid) {
      const additionalIds = this.additionalIdsControl.value;

      this.workerService.setIds(additionalIds);
    }
  }
}
