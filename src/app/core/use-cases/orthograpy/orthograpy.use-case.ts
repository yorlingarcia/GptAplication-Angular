import { OrthograpyRespone } from '@interfacesorthogrqapy.interface';
import { environment } from 'environments/environment.development';

export const orthograpyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.base_url}/orthograpy-ckeck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('No se pudo realizar la correccion');

    const data = (await resp.json()) as OrthograpyRespone;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la correccion',
    };
  }
};
