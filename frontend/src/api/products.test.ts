import { afterEach, describe, expect, it, vi } from "vitest";
import { createProduct, updateProduct } from "./products";
import type { CreateProductDto } from "../types/ProductType";

const productDto: CreateProductDto = {
  name: "Berry cake",
  price: 1200,
  categoryId: 1,
  description: "Fresh berry cake",
  imageUrl: "https://example.com/cake.jpg",
  inStock: 5,
};

describe("products api", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates products through the shared http client", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ id: 1, ...productDto }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await createProduct(productDto);

    expect(result.id).toBe(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/products$/),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify(productDto),
      }),
    );
  });

  it("returns the backend update response shape", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({
        message: "Товар изменен",
        changedProduct: { id: 7, ...productDto },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await updateProduct(7, productDto);

    expect(result.changedProduct.id).toBe(7);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/products\/7$/),
      expect.objectContaining({
        method: "PUT",
        credentials: "include",
      }),
    );
  });
});
