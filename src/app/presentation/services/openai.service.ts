import { Injectable } from '@angular/core';
import { orthograpyUseCase } from '@use-cases/index';
import { prosConsUseCase } from '@use-cases/prosCons/pros-cons.use-case';
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
}
