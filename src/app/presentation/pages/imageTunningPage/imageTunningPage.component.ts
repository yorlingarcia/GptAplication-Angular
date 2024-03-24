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
  GptMessageEditableImageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfacesmessages.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    GptMessageEditableImageComponent,
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([
    {
      isGtp: true,
      text: 'Dummy Image',
      iamgeInfo: {
        url: 'http://localhost:3000/gpt/image-generation/1711233553006.png',
        alt: 'Atardecer de nueva York',
      },
    },
  ]);
  public isLoading = signal(false);

  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGtp: false,
        text: prompt,
      },
    ]);
    this.openAiService.imageGeneration(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      if (!resp) return;

      this.messages.update((prev) => [
        ...prev,
        {
          isGtp: true,
          text: resp.alt,
          iamgeInfo: resp,
        },
      ]);
    });
  }

  generateVariation() {
    this.isLoading.set(true);
    this.openAiService
      .variationImage(this.originalImage()!)
      .subscribe((resp) => {
        this.isLoading.set(false);
        if (!resp) return;
        this.messages.update((prev) => [
          ...prev,
          {
            isGtp: true,
            text: resp?.alt!,
            iamgeInfo: resp!,
          },
        ]);
      });
  }

  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    console.log({ newImage, originalImage });
  }
}
