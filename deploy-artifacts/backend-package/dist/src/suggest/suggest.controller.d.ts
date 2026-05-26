import { SuggestService } from "./suggest.service";
export declare class SuggestController {
  private readonly suggestService;
  constructor(suggestService: SuggestService);
  address(body: {
    query: string;
    count?: number;
  }): Promise<import("./suggest.service").DadataSuggestResponse>;
}
