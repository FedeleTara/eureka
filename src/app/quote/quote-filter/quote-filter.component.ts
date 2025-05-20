import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-quote-filter',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatAutocompleteModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field class="author">
      <mat-label>Author</mat-label>
      <input matInput [(ngModel)]="author" [matAutocomplete]="auto" (keyup)="emit()">
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="emit()">
        @for (option of authors(); track option.index) {
          <mat-option [value]="option.author">{{ option.author }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
    <mat-form-field class="sentence">
      <mat-label>Sentence</mat-label>
      <input matInput [(ngModel)]="sentence" (keyup)="emit()">
    </mat-form-field>
  `,
  styleUrl: './quote-filter.component.scss'
})
export class QuoteFilterComponent {
  authors = input<{ index: number, author: string }[]>();
  
  author = '';
  sentence = '';

  filter = output<{ author: string, sentence: string[] }>();
  
  #trimForm() {
    this.author = this.author.trimStart();
    this.sentence = this.sentence.trimStart();
  }
  
  emit() {
    this.#trimForm();  // Cleaning the input

    this.filter.emit({
      author: this.author,
      sentence: this.sentence
        .toLowerCase()
        .split(/\s+/)
        .filter((str) => str.length)
    });
  }
}
