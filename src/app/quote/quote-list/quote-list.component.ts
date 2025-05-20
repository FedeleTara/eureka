import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Quote } from '../../models';
import { FirestoreService } from '../../firestore.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuoteFilterComponent } from '../quote-filter/quote-filter.component';

@Component({
  selector: 'app-quote-list',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, QuoteFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>My eurekas</mat-card-title>
      </mat-card-header>
      <mat-card-actions>
        <app-quote-filter
          [authors]="authors()"
          (filter)="this.filter.set({
            author: $event.author,
            sentence: $event.sentence
          })"
        />
      </mat-card-actions>
      <mat-card-content>
        <div class="quotes">
          @for(quote of this.filtered(); track quote.id) {
            <mat-card class="quote">
              <mat-card-content>
                <mat-form-field>
                  <mat-label>Author</mat-label>
                  @let author = quote.author.length ? quote.author : 'Anonymous';
                  <input matInput readonly [value]="author">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Brilliant Quote</mat-label>
                  <textarea matInput readonly cdkTextareaAutosize [value]="quote.sentence"></textarea>
                </mat-form-field>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent {
  quotes = signal<Quote[]>([]);
  filter = signal<{ author: string, sentence: string[] }>({ author: '', sentence: []});
  
  authors = computed(() => [{ index: -1, author: 'Anonymous' }].concat(
    this.quotes()
      .filter((quote) => quote.author.length)
      .map((quote, index) => ({ index, author: quote.author }))
  ));

  filtered = computed(() => {
    let filteredQuotes = this.quotes();

    if (this.filter().author.length > 0) {
      const filterKey = this.filter().author === 'Anonymous' ? '' : this.filter().author;
      filteredQuotes = filteredQuotes.filter((quote) => filterKey === quote.author);
    }

    if (this.filter().sentence.length > 0) {
      filteredQuotes = filteredQuotes.filter((quote) =>
        this.filter()
        .sentence.some((keyword) =>
          quote.sentence
          .toLowerCase()
          .includes(keyword)
      ));
    }

    return filteredQuotes;
  });

  #firestore = inject(FirestoreService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Retrieve quotes form firebase
    this.#firestore.getQuotes()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((res) => this.quotes.set(res));
  }
}
