import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfacesmessages.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log(prompt);

    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGtp: false,
        text: prompt,
      },
    ]);

    this.openAiService.prosConsDiscusser(prompt).subscribe((resp) => {
      console.log(resp);

      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        { isGtp: true, text: resp.content },
      ]);
    });
  }
}
