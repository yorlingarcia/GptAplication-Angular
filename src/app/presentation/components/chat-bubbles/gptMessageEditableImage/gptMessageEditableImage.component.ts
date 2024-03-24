import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gptMessageEditableImage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageEditableImageComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string; alt: string };

  @Output() onSelectedimage = new EventEmitter();

  handleClick() {
    this.onSelectedimage.emit(this.imageInfo.url);
  }
}
