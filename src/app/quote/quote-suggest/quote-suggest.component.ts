import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiNinjasService } from '../../services/api-ninjas.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuoteGenerated } from '../../models';
import { FirestoreService } from '../../services/firestore.service';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-quote-suggest',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatExpansionModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-accordion>
      <mat-expansion-panel [(expanded)]="expanded">
        <mat-expansion-panel-header>
          <mat-panel-title> Idea! (Suggestion) </mat-panel-title>
        </mat-expansion-panel-header>
        <ng-template matExpansionPanelContent>
          <mat-card>
            <mat-card-content>
              <mat-form-field>
                <mat-label>Author</mat-label>
                <input matInput readonly [value]="quote().author">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Brilliant Quote</mat-label>
                <textarea matInput readonly cdkTextareaAutosize [value]="quote().quote"></textarea>
              </mat-form-field>
            </mat-card-content>
            <mat-card-footer>
              <mat-card-actions>
                <button mat-fab extended [disabled]="disabled" (click)="refresh()">
                  <mat-icon>refresh</mat-icon>
                  Suggest me another one
                </button>
                <button mat-fab extended [disabled]="disabled" (click)="save()">
                  <mat-icon>add</mat-icon>
                  Save
                </button>
              </mat-card-actions>
            </mat-card-footer>
          </mat-card>
        </ng-template>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrl: './quote-suggest.component.scss'
})
export class QuoteSuggestComponent implements OnInit {
  #refresh$ = new Subject<void>();

  quote = signal<Partial<QuoteGenerated>>({});

  expanded = false;
  disabled = true;

  #apiNinjas = inject(ApiNinjasService);
  #firestore = inject(FirestoreService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#refresh$
      .pipe(
        startWith(void 0),  // Che pensata... forte!!
        switchMap(() => this.#apiNinjas.getRandomQuote()),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((res) => {
        this.quote.set(res[0]);
        this.disabled = false;
      });
  }

  refresh(): void {
    // Disabilita i bottoni
    this.disabled = true;
    
    // Refresh
    this.#refresh$.next();
  }

  save(): void {
    const data = {
      author: this.quote().author,
      sentence: this.quote().quote,
      date_creation: new Date().toISOString()
    } as const;

    // Salva i dati su Firebase
    this.#firestore.putQuote(data);

    // Chiude l'accordion
    this.expanded = false;

    // Refresh della suggestion
    this.refresh();
  }
}
