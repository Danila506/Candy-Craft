export type DadataSuggestion = {
  value: string;
  unrestricted_value: string;
  data: any;
};
export type DadataSuggestResponse = {
  suggestions: DadataSuggestion[];
};
export declare class SuggestService {
  private readonly endpoint;
  suggestAddress(query: string, count?: number): Promise<DadataSuggestResponse>;
}
