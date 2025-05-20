import { ChangeDetectionStrategy, Component, inject, output, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-quote-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="form" (submit)="save()">
          <button mat-fab extended [class.pop]="!form.invalid">
            <mat-icon>add</mat-icon>
            Save
          </button>
          <mat-form-field>
            <mat-label>Author</mat-label>
            <input
              matInput
              formControlName="author"
            >
          </mat-form-field>
          <mat-form-field>
            <mat-label>Brilliant Quote</mat-label>
            <textarea
              matInput
              cdkTextareaAutosize
              cdkAutosizeMaxRows="6"
              formControlName="sentence"
              placeholder="Lorem Ipsum"
              required
            ></textarea>
            @if (form.controls.sentence.errors) {
              <mat-error>Please, write/paste some text if you want to save the quote</mat-error>
            }
          </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent {
  readonly formDirective = viewChild(FormGroupDirective);
  readonly form = new FormGroup({
    author: new FormControl(''),
    sentence: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  #firestore = inject(FirestoreService);

  save(): void {
    if (this.form.controls.sentence.errors || !this.form.value.sentence || this.form.value.sentence.trim().length < 10) return;

    const data = {
      author: this.form.value.author?.length ? this.form.value.author.trim() : '',
      sentence: this.form.value.sentence.trim(),
      date_creation: new Date().toISOString()
    } as const;

    // Salva i dati su Firebase
    this.#firestore.putQuote(data);

    this.formDirective()?.resetForm();
  }
}
