import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Quote } from '../../models';
import { FirestoreService } from '../../firestore.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-quote-list',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if(quotes().length) {
    <mat-card>
      <mat-card-header>
        <mat-card-title>My eurekas</mat-card-title>
        <mat-card-actions>
          <!-- Filter -->
        </mat-card-actions>
      </mat-card-header>
      <mat-card-content>
        <div class="quotes">
          @for(quote of this.quotes(); track quote.id) {
            <mat-card class="quote">
              <mat-card-content>
                <mat-form-field>
                  <mat-label>Author</mat-label>
                  <input matInput readonly formControlName="author" [value]="quote.author">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Brilliant Quote</mat-label>
                  <textarea matInput readonly cdkTextareaAutosize formControlName="sentence" [value]="quote.sentence"></textarea>
                </mat-form-field>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </mat-card-content>
    </mat-card>
  }
  `,
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent {
  quotes = signal<Quote[]>([]);

  #firestore = inject(FirestoreService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Retrieve quotes form firebase
    this.#firestore.getQuotes()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((res) => this.quotes.set(res));
  }
}
