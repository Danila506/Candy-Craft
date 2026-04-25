import { afterEach, describe, expect, it, vi } from "vitest";
import { getCheckoutOptions } from "./checkoutOptions";

describe("checkout options api", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads delivery and gift options from the backend source of truth", async () => {
    const response = {
      delivery: [{ id: 1, name: "Express", price: 500, priceMinor: 50_000 }],
      gifts: [{ id: 2, name: "Card", price: 150, priceMinor: 15_000 }],
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => response,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getCheckoutOptions()).resolves.toEqual(response);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/orders\/options$/),
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      }),
    );
  });
});
