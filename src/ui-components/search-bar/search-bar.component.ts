import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  InputSignal,
  OnInit,
  OutputEmitterRef,
  inject,
  input,
  output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

// Default debounce timer for search.
const DEBOUNCE_TIMER: number = 300;

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  /**
   * Receives search bar label from parent.
   */
  public label: InputSignal<string> = input.required();

  /**
   * Receives search bar placeholder from parent.
   */
  public placeholder: InputSignal<string> = input.required();

  /**
   * Receives search bar debounce timer from parent.
   */
  public debounceTimer: InputSignal<number> = input(DEBOUNCE_TIMER);

  /**
   * Event emit to parent with latest search.
   */
  public search: OutputEmitterRef<string> = output();

  /**
   * Emit search to subs so tha we can add some performance benifit.
   */
  public searchSubject: BehaviorSubject<string> = new BehaviorSubject('');

  // Binding search value input
  public searchValue: string = '';

  // Destory ref
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /**
   * Add initialize logic.
   */
  public ngOnInit(): void {
    this.listenUserSearchChange();
  }

  /**
   * Listen to keyup event and notify the subs about latest value.
   *
   * @param search - Users searched keyword.
   */
  public listenKeyup(search: string): void {
    this.searchSubject.next(search);
  }

  /**
   * Listen to user search change subject and inhance the search.
   */
  public listenUserSearchChange(): void {
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTimer()),
        distinctUntilChanged(),
        tap((search: string) => this.search.emit(search)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
