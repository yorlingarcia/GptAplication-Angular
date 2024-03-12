import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthograpy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gptMessageOrthograpy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthograpyComponent {
  @Input({ required: true }) userScore!: number;
  @Input({ required: true }) text!: string;
  @Input() errors: string[] = [];
}
