import { PrismaService } from "../prisma/prisma.service";
import { UpdateUsersDto } from "./dto/update-users.dto";
export declare class UserService {
  private readonly prisma;
  constructor(prisma: PrismaService);
  private readonly safeUserWithCartSelect;
  findAll(
    page?: number,
    limit?: number,
  ): Promise<
    {
      id: number;
      email: string | null;
      firstName: string;
    }[]
  >;
  findOne(id: number): Promise<
    | {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.Role;
        cart: {
          id: number;
          createdAt: Date;
          updatedAt: Date;
          userId: number;
          items: {
            product: {
              id: number;
              name: string;
              description: string;
              imageUrl: string;
              category: {
                id: number;
                name: string;
                description: string;
                imageUrl: string;
              };
              sku: string;
              slug: string;
              price: number;
              isActive: boolean;
              deletedAt: Date | null;
              inStock: number;
              reservedQty: number;
              categoryId: number;
              createdAt: Date;
              updatedAt: Date;
            } | null;
            id: number;
            quantity: number;
            productId: number | null;
            cartId: number;
            customPrice: number | null;
          }[];
        } | null;
      }
    | {
        cart: {
          totalPrice: number;
          itemsCount: number;
          id: number;
          createdAt: Date;
          updatedAt: Date;
          userId: number;
          items: {
            product: {
              id: number;
              name: string;
              description: string;
              imageUrl: string;
              category: {
                id: number;
                name: string;
                description: string;
                imageUrl: string;
              };
              sku: string;
              slug: string;
              price: number;
              isActive: boolean;
              deletedAt: Date | null;
              inStock: number;
              reservedQty: number;
              categoryId: number;
              createdAt: Date;
              updatedAt: Date;
            } | null;
            id: number;
            quantity: number;
            productId: number | null;
            cartId: number;
            customPrice: number | null;
          }[];
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.Role;
      }
  >;
  findByEmail(email: string): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
    cart: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      userId: number;
      items: {
        product: {
          id: number;
          name: string;
          description: string;
          imageUrl: string;
          category: {
            id: number;
            name: string;
            description: string;
            imageUrl: string;
          };
          sku: string;
          slug: string;
          price: number;
          isActive: boolean;
          deletedAt: Date | null;
          inStock: number;
          reservedQty: number;
          categoryId: number;
          createdAt: Date;
          updatedAt: Date;
        } | null;
        id: number;
        quantity: number;
        productId: number | null;
        cartId: number;
        customPrice: number | null;
      }[];
    } | null;
  }>;
  update(
    id: number,
    updateUserDto: UpdateUsersDto,
  ): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
    cart: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      userId: number;
      items: {
        product: {
          id: number;
          name: string;
          description: string;
          imageUrl: string;
          category: {
            id: number;
            name: string;
            description: string;
            imageUrl: string;
          };
          sku: string;
          slug: string;
          price: number;
          isActive: boolean;
          deletedAt: Date | null;
          inStock: number;
          reservedQty: number;
          categoryId: number;
          createdAt: Date;
          updatedAt: Date;
        } | null;
        id: number;
        quantity: number;
        productId: number | null;
        cartId: number;
        customPrice: number | null;
      }[];
    } | null;
  }>;
  remove(id: number): Promise<{
    message: string;
  }>;
  getUserStats(id: number): Promise<{
    userId: number;
    userFirstName: string;
    userLastName: string;
    cartItemsCount: number;
    totalCartValue: number;
    categories: {
      name: string;
      itemsCount: number;
    }[];
  }>;
}
