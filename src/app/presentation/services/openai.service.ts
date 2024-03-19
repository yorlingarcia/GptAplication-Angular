import { Injectable } from '@angular/core';
import {
  orthograpyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
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
}
