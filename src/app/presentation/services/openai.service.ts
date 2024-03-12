import { Injectable } from '@angular/core';
import { orthograpyUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  checkOrthograpy(prompt: string) {
    return from(orthograpyUseCase(prompt));
  }
}
