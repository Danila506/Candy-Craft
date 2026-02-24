import { Injectable, InternalServerErrorException } from '@nestjs/common';

export type DadataSuggestion = {
  value: string;
  unrestricted_value: string;
  data: any;
};

export type DadataSuggestResponse = {
  suggestions: DadataSuggestion[];
};

@Injectable()
export class SuggestService {
  private readonly endpoint =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  async suggestAddress(
    query: string,
    count = 8,
  ): Promise<DadataSuggestResponse> {
    const apiKey = process.env.DADATA_API_KEY;
    console.log('apiKey: ' + apiKey);

    if (!apiKey) {
      throw new InternalServerErrorException('DADATA_API_KEY is not set');
    }

    const q = (query ?? '').trim();
    if (q.length < 3) return { suggestions: [] };

    const safeCount = Math.min(Math.max(count || 8, 1), 20);

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({ query: q, count: safeCount }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new InternalServerErrorException(
        `DaData error ${res.status}: ${text || 'Unknown error'}`,
      );
    }

    return (await res.json()) as DadataSuggestResponse;
  }
}
