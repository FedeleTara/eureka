import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteFormComponent } from './quote/quote-form/quote-form.component';
import { QuoteListComponent } from './quote/quote-list/quote-list.component';
import { QuoteSuggestComponent } from "./quote/quote-suggest/quote-suggest.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuoteFormComponent, QuoteListComponent, QuoteSuggestComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.21462504069086 157.62074312032988" width="469.21462504069086" height="157.62074312032988"><!-- svg-source:excalidraw --><metadata></metadata><defs><style class="style-fonts">
      @font-face { font-family: Excalifont; src: url(data:font/woff2;base64,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); }</style></defs><rect x="0" y="0" width="469.21462504069086" height="157.62074312032988" fill="#ffffff"></rect><g transform="translate(10 10) rotate(0 224.60731252034543 68.81037156016494)"><text x="224.6073125203454" y="96.9950997512085" font-family="Excalifont, Xiaolai, Segoe UI Emoji" font-size="110.0965944962639px" fill="#ffd43b" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="alphabetic">Eureka</text></g></svg>
    </header>
    <main>
      <section>
        <app-quote-form />
        <app-quote-suggest />
      </section>
      <section>
        <app-quote-list />
      </section>
    </main>
    <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eureka';
}
