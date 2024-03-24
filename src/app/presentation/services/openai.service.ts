import { Injectable } from '@angular/core';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthograpyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  tranlateTextUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  checkOrthograpy(prompt: string) {
    return from(orthograpyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translateText(prompt: string, lang: string) {
    return from(tranlateTextUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }

  audioToText(audioFile: File, prompt?: string) {
    return from(audioToTextUseCase(audioFile, prompt));
  }

  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, originalImage, maskImage));
  }
  variationImage(originalImage: string) {
    return from(imageVariationUseCase(originalImage));
  }
}
