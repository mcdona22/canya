import { Component, inject, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { onInput } from '../../../../common/presentation/form-utils';
import { ICanyaEvent, IDateSlot } from '../../data/i-canya-event';
import { DateTime } from 'luxon';
import { CanyaService } from '../../application/canya-service';
import { AuthService } from '../../../auth/application/auth-service';
import { Router } from '@angular/router';
import { UiMessageService } from '../../../ui-massaging/ui-message-service';
import { catchError, first, of, tap } from 'rxjs';
import { canyasBasePath } from '../../../../routing/app-routes';

@Component({
  selector: 'app-canya-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButtonModule,
    MatIcon,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatSuffix,
    MatError,
  ],
  templateUrl: './canya-form.html',
  styleUrl: './canya-form.scss',
})
export class CanyaForm {
  readonly maxTitle = 20;
  readonly minTitle = 5;
  readonly maxDesc = 100;

  formBuilder = inject(FormBuilder);
  canyaService = inject(CanyaService);
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(UiMessageService);

  pageTitle = input('New Canya');
  saveCaption = 'Save Canya';
  readonly minDate = new Date();

  form = this.formBuilder.group({
    name: [
      '',
      {
        validators: [
          Validators.required,
          Validators.maxLength(this.maxTitle),
          Validators.minLength(this.minTitle),
        ],
      },
    ],
    description: [null],
    selectedDates: this.formBuilder.array([]) as FormArray,
  });

  formValue = toSignal(this.form.valueChanges);

  onAddDate() {
    console.log(`Adding an event date`);
    const eventDateForm = this.formBuilder.group({
      selectedDate: [null, [Validators.required]],
      comments: [''],
    });

    this.selectedDates.push(eventDateForm);
  }

  get title() {
    return this.form.controls.name;
  }

  get description() {
    return this.form.controls.description;
  }

  get dateForms(): FormGroup[] {
    return this.selectedDates.controls.map((fg) => fg as FormGroup);
  }

  get selectedDates() {
    return this.form.controls.selectedDates;
  }

  get eventDateEntries(): FormGroup[] {
    return this.form.controls.selectedDates.controls as FormGroup[];
  }

  onDeleteContactRow(index: number) {
    this.selectedDates.removeAt(index);
  }

  protected readonly onInput = onInput;

  onCancelClick() {
    console.log(`The form value`, this.eventDateEntries);
  }

  onSave() {
    if (!this.authService.authenticated()) {
      console.log(`You must be authenticated to create a canya`);
      return;
    }
    if (!this.form.valid) {
      console.warn(`The form is invalid`);
      return;
    }

    const { name, description, selectedDates } = this.form.value;
    const slots = selectedDates.map(
      (slot: { selectedDate: DateTime; comments: string }) => {
        return {
          selectedDate: slot.selectedDate.toJSDate(),
          comment: slot.comments ?? '',
        } as IDateSlot;
      },
    );

    console.log(`The mapped slots`, slots);

    const canya: ICanyaEvent = {
      ownerId: this.authService.currentUser()!.id!,
      name: name as string,
      description: description ?? '',
      slots: slots,
    };
    const save$ = this.canyaService.createCanya(canya);
    save$
      .pipe(
        catchError((err) => {
          this.messageService.error(err.message, 'Houston, we have a problem!');
          return of();
        }),
        first(),
        tap((c) => {
          console.log(`Saved Canya`, c);
          this.messageService.success(
            `Created the canya for '${c.name}'`,
            'Canya Created',
          );
          this.router.navigate(['/', canyasBasePath]).then();
        }),
      )
      .subscribe();
  }
}
