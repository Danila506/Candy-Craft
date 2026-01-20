"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.2.0",
    "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id    Int    @id @default(autoincrement())\n  name  String\n  email String @unique\n  cart  Cart? // связь с корзиной (единственное число!)\n\n  orders Order[]\n\n  @@map(\"users\") // таблица в БД будет называться \"users\"\n}\n\nmodel Cart {\n  id        Int      @id @default(autoincrement())\n  userId    Int      @unique @map(\"user_id\")\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  // Связи\n  user  User       @relation(fields: [userId], references: [id])\n  items CartItem[] // было cart_items\n\n  @@map(\"carts\")\n}\n\nmodel CartItem {\n  id        Int @id @default(autoincrement())\n  cartId    Int @map(\"cart_id\")\n  productId Int @map(\"product_id\")\n  quantity  Int @default(1)\n\n  // Связи\n  cart    Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)\n  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@unique([cartId, productId])\n  @@index([cartId])\n  @@index([productId])\n  @@map(\"cart_items\")\n}\n\nmodel Product {\n  id          Int      @id @default(autoincrement())\n  name        String\n  description String\n  price       Int\n  inStock     Int      @default(0) @map(\"in_stock\")\n  imageUrl    String\n  categoryId  Int\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  // Связи\n  cartItems  CartItem[]\n  category   Category    @relation(fields: [categoryId], references: [id])\n  orderItems OrderItem[]\n\n  @@index([categoryId])\n  @@map(\"products\")\n}\n\nmodel Category {\n  id          Int       @id @default(autoincrement())\n  name        String    @unique\n  description String\n  imageUrl    String\n  products    Product[]\n\n  @@map(\"categories\")\n}\n\nmodel Order {\n  id         Int         @id @default(autoincrement())\n  userId     Int         @map(\"user_id\")\n  status     OrderStatus @default(PENDING)\n  totalPrice Int         @map(\"total_price\")\n  createdAt  DateTime    @default(now()) @map(\"created_at\")\n  updatedAt  DateTime    @updatedAt @map(\"updated_at\")\n\n  // Связи\n  user  User        @relation(fields: [userId], references: [id])\n  items OrderItem[]\n\n  @@index([userId])\n  @@map(\"orders\")\n}\n\nenum OrderStatus {\n  PENDING // создан\n  PAID // оплачен\n  PROCESSING // собирается\n  SHIPPED // отправлен\n  COMPLETED // выполнен\n  CANCELED // отменён\n}\n\nmodel OrderItem {\n  id          Int    @id @default(autoincrement())\n  orderId     Int    @map(\"order_id\")\n  productId   Int    @map(\"product_id\")\n  productName String @map(\"product_name\")\n\n  quantity Int\n  price    Int\n\n  // Связи\n  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  product Product @relation(fields: [productId], references: [id])\n\n  @@index([orderId])\n  @@index([productId])\n  @@map(\"order_items\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cart\",\"kind\":\"object\",\"type\":\"Cart\",\"relationName\":\"CartToUser\"},{\"name\":\"orders\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToUser\"}],\"dbName\":\"users\"},\"Cart\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"user_id\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CartToUser\"},{\"name\":\"items\",\"kind\":\"object\",\"type\":\"CartItem\",\"relationName\":\"CartToCartItem\"}],\"dbName\":\"carts\"},\"CartItem\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"cartId\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"cart_id\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"product_id\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"cart\",\"kind\":\"object\",\"type\":\"Cart\",\"relationName\":\"CartToCartItem\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"CartItemToProduct\"}],\"dbName\":\"cart_items\"},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"inStock\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"in_stock\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"cartItems\",\"kind\":\"object\",\"type\":\"CartItem\",\"relationName\":\"CartItemToProduct\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToProduct\"},{\"name\":\"orderItems\",\"kind\":\"object\",\"type\":\"OrderItem\",\"relationName\":\"OrderItemToProduct\"}],\"dbName\":\"products\"},\"Category\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"CategoryToProduct\"}],\"dbName\":\"categories\"},\"Order\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"user_id\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"OrderStatus\"},{\"name\":\"totalPrice\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"total_price\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"OrderToUser\"},{\"name\":\"items\",\"kind\":\"object\",\"type\":\"OrderItem\",\"relationName\":\"OrderToOrderItem\"}],\"dbName\":\"orders\"},\"OrderItem\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"orderId\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"order_id\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"product_id\"},{\"name\":\"productName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"product_name\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToOrderItem\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"OrderItemToProduct\"}],\"dbName\":\"order_items\"}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map