import { PrismaService } from '../prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
export declare class UserService {
  private readonly prisma;
  constructor(prisma: PrismaService);
  create(createUserDto: CreateUsersDto): Promise<{
    name: string;
    id: number;
    email: string;
  }>;
  findAll(): Promise<
    {
      name: string;
      id: number;
      email: string;
    }[]
  >;
  findOne(id: number): Promise<
    | ({
        cart:
          | ({
              items: ({
                product: {
                  category: {
                    name: string;
                    description: string;
                    imageUrl: string;
                    id: number;
                  };
                } & {
                  name: string;
                  description: string;
                  price: number;
                  imageUrl: string;
                  inStock: number;
                  categoryId: number;
                  id: number;
                  createdAt: Date;
                  updatedAt: Date;
                };
              } & {
                cartId: number;
                id: number;
                productId: number;
                quantity: number;
              })[];
            } & {
              id: number;
              createdAt: Date;
              updatedAt: Date;
              userId: number;
            })
          | null;
      } & {
        name: string;
        id: number;
        email: string;
      })
    | {
        cart: {
          totalPrice: number;
          itemsCount: number;
          items: ({
            product: {
              category: {
                name: string;
                description: string;
                imageUrl: string;
                id: number;
              };
            } & {
              name: string;
              description: string;
              price: number;
              imageUrl: string;
              inStock: number;
              categoryId: number;
              id: number;
              createdAt: Date;
              updatedAt: Date;
            };
          } & {
            cartId: number;
            id: number;
            productId: number;
            quantity: number;
          })[];
          id: number;
          createdAt: Date;
          updatedAt: Date;
          userId: number;
        };
        name: string;
        id: number;
        email: string;
      }
  >;
  findByEmail(email: string): Promise<
    {
      cart:
        | ({
            items: ({
              product: {
                name: string;
                description: string;
                price: number;
                imageUrl: string;
                inStock: number;
                categoryId: number;
                id: number;
                createdAt: Date;
                updatedAt: Date;
              };
            } & {
              cartId: number;
              id: number;
              productId: number;
              quantity: number;
            })[];
          } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
          })
        | null;
    } & {
      name: string;
      id: number;
      email: string;
    }
  >;
  update(
    id: number,
    updateUserDto: UpdateUsersDto,
  ): Promise<
    {
      cart:
        | ({
            items: ({
              product: {
                name: string;
                description: string;
                price: number;
                imageUrl: string;
                inStock: number;
                categoryId: number;
                id: number;
                createdAt: Date;
                updatedAt: Date;
              };
            } & {
              cartId: number;
              id: number;
              productId: number;
              quantity: number;
            })[];
          } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
          })
        | null;
    } & {
      name: string;
      id: number;
      email: string;
    }
  >;
  remove(id: number): Promise<{
    message: string;
  }>;
  getUserStats(id: number): Promise<{
    userId: number;
    userName: string;
    cartItemsCount: number;
    totalCartValue: number;
    categories: {
      name: string;
      itemsCount: number;
    }[];
  }>;
}
