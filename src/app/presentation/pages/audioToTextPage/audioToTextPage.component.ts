import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxFileComponent,
  TextMessageEvent,
  TypingLoaderComponent,
} from '@components/index';
import { AudioToTextResponse } from '@interfacesaudio-to-text.response';
import { Message } from '@interfacesmessages.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxFileComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGtp: false,
        text: text,
      },
    ]);
    this.openAiService
      .audioToText(file, text)
      .subscribe((resp) => this.handleResponse(resp));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;
    const text = `## Transcripcion:

    __Duracion:__ ${Math.round(resp.duration)} segundos.

    ## el texto es:

    ${resp.text}
    `;

    this.messages.update((prev) => [
      ...prev,
      {
        isGtp: true,
        text,
      },
    ]);

    for (const segment of resp.segments) {
      const segmentMessage = `
      __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
      ${segment.text}
      `;
      this.messages.update((prev) => [
        ...prev,
        {
          isGtp: true,
          text: segmentMessage,
        },
      ]);
    }
  }
}
