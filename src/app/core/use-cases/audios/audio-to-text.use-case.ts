import { AudioToTextResponse } from '@interfacesaudio-to-text.response';
import { environment } from 'environments/environment.development';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);

    if (prompt) {
      formData.append('prompt', prompt);
    }

    const resp = await fetch(`${environment.base_url}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok)
      throw new Error('No se pudo realizar la transformacion a texto');

    const data = (await resp.json()) as AudioToTextResponse;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
