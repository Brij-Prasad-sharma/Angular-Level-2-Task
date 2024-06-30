import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent {
  /**
   * Receives the tag label from parent.
   */
  public label: InputSignal<string> = input.required();

  /**
   * Receives the tag bg color from parent.
   */
  public tagBgColor: InputSignal<string | undefined> = input.required();
}
