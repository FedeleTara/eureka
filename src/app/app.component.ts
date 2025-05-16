import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteFormComponent } from './quote/quote-form/quote-form.component';
import { QuoteListComponent } from './quote/quote-list/quote-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuoteFormComponent, QuoteListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Head Title -->
    <app-quote-form />
    <app-quote-list />
    <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eureka';
}
