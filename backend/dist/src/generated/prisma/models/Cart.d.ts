import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CartModel = runtime.Types.Result.DefaultSelection<Prisma.$CartPayload>;
export type AggregateCart = {
    _count: CartCountAggregateOutputType | null;
    _avg: CartAvgAggregateOutputType | null;
    _sum: CartSumAggregateOutputType | null;
    _min: CartMinAggregateOutputType | null;
    _max: CartMaxAggregateOutputType | null;
};
export type CartAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type CartSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type CartMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CartMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CartCountAggregateOutputType = {
    id: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CartAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type CartSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type CartMinAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CartMaxAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CartCountAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CartAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput | Prisma.CartOrderByWithRelationInput[];
    cursor?: Prisma.CartWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CartCountAggregateInputType;
    _avg?: CartAvgAggregateInputType;
    _sum?: CartSumAggregateInputType;
    _min?: CartMinAggregateInputType;
    _max?: CartMaxAggregateInputType;
};
export type GetCartAggregateType<T extends CartAggregateArgs> = {
    [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCart[P]> : Prisma.GetScalarType<T[P], AggregateCart[P]>;
};
export type CartGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithAggregationInput | Prisma.CartOrderByWithAggregationInput[];
    by: Prisma.CartScalarFieldEnum[] | Prisma.CartScalarFieldEnum;
    having?: Prisma.CartScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CartCountAggregateInputType | true;
    _avg?: CartAvgAggregateInputType;
    _sum?: CartSumAggregateInputType;
    _min?: CartMinAggregateInputType;
    _max?: CartMaxAggregateInputType;
};
export type CartGroupByOutputType = {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: CartCountAggregateOutputType | null;
    _avg: CartAvgAggregateOutputType | null;
    _sum: CartSumAggregateOutputType | null;
    _min: CartMinAggregateOutputType | null;
    _max: CartMaxAggregateOutputType | null;
};
type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CartGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CartGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CartGroupByOutputType[P]>;
}>>;
export type CartWhereInput = {
    AND?: Prisma.CartWhereInput | Prisma.CartWhereInput[];
    OR?: Prisma.CartWhereInput[];
    NOT?: Prisma.CartWhereInput | Prisma.CartWhereInput[];
    id?: Prisma.IntFilter<"Cart"> | number;
    userId?: Prisma.IntFilter<"Cart"> | number;
    createdAt?: Prisma.DateTimeFilter<"Cart"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Cart"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.CartItemListRelationFilter;
};
export type CartOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    items?: Prisma.CartItemOrderByRelationAggregateInput;
};
export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId?: number;
    AND?: Prisma.CartWhereInput | Prisma.CartWhereInput[];
    OR?: Prisma.CartWhereInput[];
    NOT?: Prisma.CartWhereInput | Prisma.CartWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Cart"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Cart"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.CartItemListRelationFilter;
}, "id" | "userId">;
export type CartOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CartCountOrderByAggregateInput;
    _avg?: Prisma.CartAvgOrderByAggregateInput;
    _max?: Prisma.CartMaxOrderByAggregateInput;
    _min?: Prisma.CartMinOrderByAggregateInput;
    _sum?: Prisma.CartSumOrderByAggregateInput;
};
export type CartScalarWhereWithAggregatesInput = {
    AND?: Prisma.CartScalarWhereWithAggregatesInput | Prisma.CartScalarWhereWithAggregatesInput[];
    OR?: Prisma.CartScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CartScalarWhereWithAggregatesInput | Prisma.CartScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Cart"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Cart"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Cart"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Cart"> | Date | string;
};
export type CartCreateInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCartInput;
    items?: Prisma.CartItemCreateNestedManyWithoutCartInput;
};
export type CartUncheckedCreateInput = {
    id?: number;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.CartItemUncheckedCreateNestedManyWithoutCartInput;
};
export type CartUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCartNestedInput;
    items?: Prisma.CartItemUpdateManyWithoutCartNestedInput;
};
export type CartUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.CartItemUncheckedUpdateManyWithoutCartNestedInput;
};
export type CartCreateManyInput = {
    id?: number;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CartUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CartUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CartNullableScalarRelationFilter = {
    is?: Prisma.CartWhereInput | null;
    isNot?: Prisma.CartWhereInput | null;
};
export type CartCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CartAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type CartMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CartMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CartSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type CartScalarRelationFilter = {
    is?: Prisma.CartWhereInput;
    isNot?: Prisma.CartWhereInput;
};
export type CartCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CartCreateWithoutUserInput, Prisma.CartUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CartCreateOrConnectWithoutUserInput;
    connect?: Prisma.CartWhereUniqueInput;
};
export type CartUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CartCreateWithoutUserInput, Prisma.CartUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CartCreateOrConnectWithoutUserInput;
    connect?: Prisma.CartWhereUniqueInput;
};
export type CartUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CartCreateWithoutUserInput, Prisma.CartUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CartCreateOrConnectWithoutUserInput;
    upsert?: Prisma.CartUpsertWithoutUserInput;
    disconnect?: Prisma.CartWhereInput | boolean;
    delete?: Prisma.CartWhereInput | boolean;
    connect?: Prisma.CartWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CartUpdateToOneWithWhereWithoutUserInput, Prisma.CartUpdateWithoutUserInput>, Prisma.CartUncheckedUpdateWithoutUserInput>;
};
export type CartUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CartCreateWithoutUserInput, Prisma.CartUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CartCreateOrConnectWithoutUserInput;
    upsert?: Prisma.CartUpsertWithoutUserInput;
    disconnect?: Prisma.CartWhereInput | boolean;
    delete?: Prisma.CartWhereInput | boolean;
    connect?: Prisma.CartWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CartUpdateToOneWithWhereWithoutUserInput, Prisma.CartUpdateWithoutUserInput>, Prisma.CartUncheckedUpdateWithoutUserInput>;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type CartCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.CartCreateWithoutItemsInput, Prisma.CartUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.CartCreateOrConnectWithoutItemsInput;
    connect?: Prisma.CartWhereUniqueInput;
};
export type CartUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.CartCreateWithoutItemsInput, Prisma.CartUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.CartCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.CartUpsertWithoutItemsInput;
    connect?: Prisma.CartWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CartUpdateToOneWithWhereWithoutItemsInput, Prisma.CartUpdateWithoutItemsInput>, Prisma.CartUncheckedUpdateWithoutItemsInput>;
};
export type CartCreateWithoutUserInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.CartItemCreateNestedManyWithoutCartInput;
};
export type CartUncheckedCreateWithoutUserInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.CartItemUncheckedCreateNestedManyWithoutCartInput;
};
export type CartCreateOrConnectWithoutUserInput = {
    where: Prisma.CartWhereUniqueInput;
    create: Prisma.XOR<Prisma.CartCreateWithoutUserInput, Prisma.CartUncheckedCreateWithoutUserInput>;
};
export type CartUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.CartUpdateWithoutUserInput, Prisma.CartUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CartCreateWithoutUserInput, Prisma.CartUncheckedCreateWithoutUserInput>;
    where?: Prisma.CartWhereInput;
};
export type CartUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.CartWhereInput;
    data: Prisma.XOR<Prisma.CartUpdateWithoutUserInput, Prisma.CartUncheckedUpdateWithoutUserInput>;
};
export type CartUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.CartItemUpdateManyWithoutCartNestedInput;
};
export type CartUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.CartItemUncheckedUpdateManyWithoutCartNestedInput;
};
export type CartCreateWithoutItemsInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCartInput;
};
export type CartUncheckedCreateWithoutItemsInput = {
    id?: number;
    userId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CartCreateOrConnectWithoutItemsInput = {
    where: Prisma.CartWhereUniqueInput;
    create: Prisma.XOR<Prisma.CartCreateWithoutItemsInput, Prisma.CartUncheckedCreateWithoutItemsInput>;
};
export type CartUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.CartUpdateWithoutItemsInput, Prisma.CartUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.CartCreateWithoutItemsInput, Prisma.CartUncheckedCreateWithoutItemsInput>;
    where?: Prisma.CartWhereInput;
};
export type CartUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.CartWhereInput;
    data: Prisma.XOR<Prisma.CartUpdateWithoutItemsInput, Prisma.CartUncheckedUpdateWithoutItemsInput>;
};
export type CartUpdateWithoutItemsInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCartNestedInput;
};
export type CartUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CartCountOutputType = {
    items: number;
};
export type CartCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | CartCountOutputTypeCountItemsArgs;
};
export type CartCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartCountOutputTypeSelect<ExtArgs> | null;
};
export type CartCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartItemWhereInput;
};
export type CartSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Cart$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.CartCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cart"]>;
export type CartSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cart"]>;
export type CartSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cart"]>;
export type CartSelectScalar = {
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CartOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["cart"]>;
export type CartInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Cart$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.CartCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CartIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CartIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CartPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Cart";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        items: Prisma.$CartItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["cart"]>;
    composites: {};
};
export type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CartPayload, S>;
export type CartCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CartCountAggregateInputType | true;
};
export interface CartDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Cart'];
        meta: {
            name: 'Cart';
        };
    };
    findUnique<T extends CartFindUniqueArgs>(args: Prisma.SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CartFindFirstArgs>(args?: Prisma.SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CartFindManyArgs>(args?: Prisma.SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CartCreateArgs>(args: Prisma.SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CartCreateManyArgs>(args?: Prisma.SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CartCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CartDeleteArgs>(args: Prisma.SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CartUpdateArgs>(args: Prisma.SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CartDeleteManyArgs>(args?: Prisma.SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CartUpdateManyArgs>(args: Prisma.SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CartUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CartUpsertArgs>(args: Prisma.SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CartCountArgs>(args?: Prisma.Subset<T, CartCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CartCountAggregateOutputType> : number>;
    aggregate<T extends CartAggregateArgs>(args: Prisma.Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>;
    groupBy<T extends CartGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CartGroupByArgs['orderBy'];
    } : {
        orderBy?: CartGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CartFieldRefs;
}
export interface Prisma__CartClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.Cart$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Cart$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CartFieldRefs {
    readonly id: Prisma.FieldRef<"Cart", 'Int'>;
    readonly userId: Prisma.FieldRef<"Cart", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Cart", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Cart", 'DateTime'>;
}
export type CartFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where: Prisma.CartWhereUniqueInput;
};
export type CartFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where: Prisma.CartWhereUniqueInput;
};
export type CartFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput | Prisma.CartOrderByWithRelationInput[];
    cursor?: Prisma.CartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CartScalarFieldEnum | Prisma.CartScalarFieldEnum[];
};
export type CartFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput | Prisma.CartOrderByWithRelationInput[];
    cursor?: Prisma.CartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CartScalarFieldEnum | Prisma.CartScalarFieldEnum[];
};
export type CartFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput | Prisma.CartOrderByWithRelationInput[];
    cursor?: Prisma.CartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CartScalarFieldEnum | Prisma.CartScalarFieldEnum[];
};
export type CartCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CartCreateInput, Prisma.CartUncheckedCreateInput>;
};
export type CartCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CartCreateManyInput | Prisma.CartCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CartCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    data: Prisma.CartCreateManyInput | Prisma.CartCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CartIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CartUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CartUpdateInput, Prisma.CartUncheckedUpdateInput>;
    where: Prisma.CartWhereUniqueInput;
};
export type CartUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CartUpdateManyMutationInput, Prisma.CartUncheckedUpdateManyInput>;
    where?: Prisma.CartWhereInput;
    limit?: number;
};
export type CartUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CartUpdateManyMutationInput, Prisma.CartUncheckedUpdateManyInput>;
    where?: Prisma.CartWhereInput;
    limit?: number;
    include?: Prisma.CartIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CartUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where: Prisma.CartWhereUniqueInput;
    create: Prisma.XOR<Prisma.CartCreateInput, Prisma.CartUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CartUpdateInput, Prisma.CartUncheckedUpdateInput>;
};
export type CartDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
    where: Prisma.CartWhereUniqueInput;
};
export type CartDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartWhereInput;
    limit?: number;
};
export type Cart$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    where?: Prisma.CartItemWhereInput;
    orderBy?: Prisma.CartItemOrderByWithRelationInput | Prisma.CartItemOrderByWithRelationInput[];
    cursor?: Prisma.CartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CartItemScalarFieldEnum | Prisma.CartItemScalarFieldEnum[];
};
export type CartDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartSelect<ExtArgs> | null;
    omit?: Prisma.CartOmit<ExtArgs> | null;
    include?: Prisma.CartInclude<ExtArgs> | null;
};
export {};
