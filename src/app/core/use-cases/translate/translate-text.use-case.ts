import { ProsConsResponse } from '@interfacespros-cons.respone';
import { TranslateTextResponse } from '@interfacestranslate-text.response';
import { environment } from 'environments/environment.development';

export const tranlateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.base_url}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error('No se pudo realizar la traduccion');

    const { message } = (await resp.json()) as TranslateTextResponse;

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo realizar la traduccion revise la consola',
    };
  }
};
