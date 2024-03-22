import { environment } from 'environments/environment.development';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const resp = await fetch(`${environment.base_url}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!resp.ok)
      throw new Error('No se pudo realizar la transformacion a audio');

    const audioFile = await resp.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message:
        'No se pudo realizar la transformacion a audio revise la consola',
      audioUrl: '',
    };
  }
};
