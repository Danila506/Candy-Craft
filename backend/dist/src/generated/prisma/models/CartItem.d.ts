import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CartItemModel = runtime.Types.Result.DefaultSelection<Prisma.$CartItemPayload>;
export type AggregateCartItem = {
    _count: CartItemCountAggregateOutputType | null;
    _avg: CartItemAvgAggregateOutputType | null;
    _sum: CartItemSumAggregateOutputType | null;
    _min: CartItemMinAggregateOutputType | null;
    _max: CartItemMaxAggregateOutputType | null;
};
export type CartItemAvgAggregateOutputType = {
    id: number | null;
    cartId: number | null;
    productId: number | null;
    quantity: number | null;
};
export type CartItemSumAggregateOutputType = {
    id: number | null;
    cartId: number | null;
    productId: number | null;
    quantity: number | null;
};
export type CartItemMinAggregateOutputType = {
    id: number | null;
    cartId: number | null;
    productId: number | null;
    quantity: number | null;
};
export type CartItemMaxAggregateOutputType = {
    id: number | null;
    cartId: number | null;
    productId: number | null;
    quantity: number | null;
};
export type CartItemCountAggregateOutputType = {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    _all: number;
};
export type CartItemAvgAggregateInputType = {
    id?: true;
    cartId?: true;
    productId?: true;
    quantity?: true;
};
export type CartItemSumAggregateInputType = {
    id?: true;
    cartId?: true;
    productId?: true;
    quantity?: true;
};
export type CartItemMinAggregateInputType = {
    id?: true;
    cartId?: true;
    productId?: true;
    quantity?: true;
};
export type CartItemMaxAggregateInputType = {
    id?: true;
    cartId?: true;
    productId?: true;
    quantity?: true;
};
export type CartItemCountAggregateInputType = {
    id?: true;
    cartId?: true;
    productId?: true;
    quantity?: true;
    _all?: true;
};
export type CartItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartItemWhereInput;
    orderBy?: Prisma.CartItemOrderByWithRelationInput | Prisma.CartItemOrderByWithRelationInput[];
    cursor?: Prisma.CartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CartItemCountAggregateInputType;
    _avg?: CartItemAvgAggregateInputType;
    _sum?: CartItemSumAggregateInputType;
    _min?: CartItemMinAggregateInputType;
    _max?: CartItemMaxAggregateInputType;
};
export type GetCartItemAggregateType<T extends CartItemAggregateArgs> = {
    [P in keyof T & keyof AggregateCartItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCartItem[P]> : Prisma.GetScalarType<T[P], AggregateCartItem[P]>;
};
export type CartItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartItemWhereInput;
    orderBy?: Prisma.CartItemOrderByWithAggregationInput | Prisma.CartItemOrderByWithAggregationInput[];
    by: Prisma.CartItemScalarFieldEnum[] | Prisma.CartItemScalarFieldEnum;
    having?: Prisma.CartItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CartItemCountAggregateInputType | true;
    _avg?: CartItemAvgAggregateInputType;
    _sum?: CartItemSumAggregateInputType;
    _min?: CartItemMinAggregateInputType;
    _max?: CartItemMaxAggregateInputType;
};
export type CartItemGroupByOutputType = {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    _count: CartItemCountAggregateOutputType | null;
    _avg: CartItemAvgAggregateOutputType | null;
    _sum: CartItemSumAggregateOutputType | null;
    _min: CartItemMinAggregateOutputType | null;
    _max: CartItemMaxAggregateOutputType | null;
};
type GetCartItemGroupByPayload<T extends CartItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CartItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CartItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CartItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CartItemGroupByOutputType[P]>;
}>>;
export type CartItemWhereInput = {
    AND?: Prisma.CartItemWhereInput | Prisma.CartItemWhereInput[];
    OR?: Prisma.CartItemWhereInput[];
    NOT?: Prisma.CartItemWhereInput | Prisma.CartItemWhereInput[];
    id?: Prisma.IntFilter<"CartItem"> | number;
    cartId?: Prisma.IntFilter<"CartItem"> | number;
    productId?: Prisma.IntFilter<"CartItem"> | number;
    quantity?: Prisma.IntFilter<"CartItem"> | number;
    cart?: Prisma.XOR<Prisma.CartScalarRelationFilter, Prisma.CartWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type CartItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    cart?: Prisma.CartOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type CartItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    cartId_productId?: Prisma.CartItemCartIdProductIdCompoundUniqueInput;
    AND?: Prisma.CartItemWhereInput | Prisma.CartItemWhereInput[];
    OR?: Prisma.CartItemWhereInput[];
    NOT?: Prisma.CartItemWhereInput | Prisma.CartItemWhereInput[];
    cartId?: Prisma.IntFilter<"CartItem"> | number;
    productId?: Prisma.IntFilter<"CartItem"> | number;
    quantity?: Prisma.IntFilter<"CartItem"> | number;
    cart?: Prisma.XOR<Prisma.CartScalarRelationFilter, Prisma.CartWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "cartId_productId">;
export type CartItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    _count?: Prisma.CartItemCountOrderByAggregateInput;
    _avg?: Prisma.CartItemAvgOrderByAggregateInput;
    _max?: Prisma.CartItemMaxOrderByAggregateInput;
    _min?: Prisma.CartItemMinOrderByAggregateInput;
    _sum?: Prisma.CartItemSumOrderByAggregateInput;
};
export type CartItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.CartItemScalarWhereWithAggregatesInput | Prisma.CartItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.CartItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CartItemScalarWhereWithAggregatesInput | Prisma.CartItemScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"CartItem"> | number;
    cartId?: Prisma.IntWithAggregatesFilter<"CartItem"> | number;
    productId?: Prisma.IntWithAggregatesFilter<"CartItem"> | number;
    quantity?: Prisma.IntWithAggregatesFilter<"CartItem"> | number;
};
export type CartItemCreateInput = {
    quantity?: number;
    cart: Prisma.CartCreateNestedOneWithoutItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutCartItemsInput;
};
export type CartItemUncheckedCreateInput = {
    id?: number;
    cartId: number;
    productId: number;
    quantity?: number;
};
export type CartItemUpdateInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cart?: Prisma.CartUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutCartItemsNestedInput;
};
export type CartItemUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cartId?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemCreateManyInput = {
    id?: number;
    cartId: number;
    productId: number;
    quantity?: number;
};
export type CartItemUpdateManyMutationInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cartId?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemListRelationFilter = {
    every?: Prisma.CartItemWhereInput;
    some?: Prisma.CartItemWhereInput;
    none?: Prisma.CartItemWhereInput;
};
export type CartItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CartItemCartIdProductIdCompoundUniqueInput = {
    cartId: number;
    productId: number;
};
export type CartItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type CartItemAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type CartItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type CartItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type CartItemSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type CartItemCreateNestedManyWithoutCartInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutCartInput, Prisma.CartItemUncheckedCreateWithoutCartInput> | Prisma.CartItemCreateWithoutCartInput[] | Prisma.CartItemUncheckedCreateWithoutCartInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutCartInput | Prisma.CartItemCreateOrConnectWithoutCartInput[];
    createMany?: Prisma.CartItemCreateManyCartInputEnvelope;
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
};
export type CartItemUncheckedCreateNestedManyWithoutCartInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutCartInput, Prisma.CartItemUncheckedCreateWithoutCartInput> | Prisma.CartItemCreateWithoutCartInput[] | Prisma.CartItemUncheckedCreateWithoutCartInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutCartInput | Prisma.CartItemCreateOrConnectWithoutCartInput[];
    createMany?: Prisma.CartItemCreateManyCartInputEnvelope;
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
};
export type CartItemUpdateManyWithoutCartNestedInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutCartInput, Prisma.CartItemUncheckedCreateWithoutCartInput> | Prisma.CartItemCreateWithoutCartInput[] | Prisma.CartItemUncheckedCreateWithoutCartInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutCartInput | Prisma.CartItemCreateOrConnectWithoutCartInput[];
    upsert?: Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput | Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput[];
    createMany?: Prisma.CartItemCreateManyCartInputEnvelope;
    set?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    disconnect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    delete?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    update?: Prisma.CartItemUpdateWithWhereUniqueWithoutCartInput | Prisma.CartItemUpdateWithWhereUniqueWithoutCartInput[];
    updateMany?: Prisma.CartItemUpdateManyWithWhereWithoutCartInput | Prisma.CartItemUpdateManyWithWhereWithoutCartInput[];
    deleteMany?: Prisma.CartItemScalarWhereInput | Prisma.CartItemScalarWhereInput[];
};
export type CartItemUncheckedUpdateManyWithoutCartNestedInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutCartInput, Prisma.CartItemUncheckedCreateWithoutCartInput> | Prisma.CartItemCreateWithoutCartInput[] | Prisma.CartItemUncheckedCreateWithoutCartInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutCartInput | Prisma.CartItemCreateOrConnectWithoutCartInput[];
    upsert?: Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput | Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput[];
    createMany?: Prisma.CartItemCreateManyCartInputEnvelope;
    set?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    disconnect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    delete?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    update?: Prisma.CartItemUpdateWithWhereUniqueWithoutCartInput | Prisma.CartItemUpdateWithWhereUniqueWithoutCartInput[];
    updateMany?: Prisma.CartItemUpdateManyWithWhereWithoutCartInput | Prisma.CartItemUpdateManyWithWhereWithoutCartInput[];
    deleteMany?: Prisma.CartItemScalarWhereInput | Prisma.CartItemScalarWhereInput[];
};
export type CartItemCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutProductInput, Prisma.CartItemUncheckedCreateWithoutProductInput> | Prisma.CartItemCreateWithoutProductInput[] | Prisma.CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutProductInput | Prisma.CartItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.CartItemCreateManyProductInputEnvelope;
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
};
export type CartItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutProductInput, Prisma.CartItemUncheckedCreateWithoutProductInput> | Prisma.CartItemCreateWithoutProductInput[] | Prisma.CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutProductInput | Prisma.CartItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.CartItemCreateManyProductInputEnvelope;
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
};
export type CartItemUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutProductInput, Prisma.CartItemUncheckedCreateWithoutProductInput> | Prisma.CartItemCreateWithoutProductInput[] | Prisma.CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutProductInput | Prisma.CartItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.CartItemUpsertWithWhereUniqueWithoutProductInput | Prisma.CartItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.CartItemCreateManyProductInputEnvelope;
    set?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    disconnect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    delete?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    update?: Prisma.CartItemUpdateWithWhereUniqueWithoutProductInput | Prisma.CartItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.CartItemUpdateManyWithWhereWithoutProductInput | Prisma.CartItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.CartItemScalarWhereInput | Prisma.CartItemScalarWhereInput[];
};
export type CartItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.CartItemCreateWithoutProductInput, Prisma.CartItemUncheckedCreateWithoutProductInput> | Prisma.CartItemCreateWithoutProductInput[] | Prisma.CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.CartItemCreateOrConnectWithoutProductInput | Prisma.CartItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.CartItemUpsertWithWhereUniqueWithoutProductInput | Prisma.CartItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.CartItemCreateManyProductInputEnvelope;
    set?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    disconnect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    delete?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    connect?: Prisma.CartItemWhereUniqueInput | Prisma.CartItemWhereUniqueInput[];
    update?: Prisma.CartItemUpdateWithWhereUniqueWithoutProductInput | Prisma.CartItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.CartItemUpdateManyWithWhereWithoutProductInput | Prisma.CartItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.CartItemScalarWhereInput | Prisma.CartItemScalarWhereInput[];
};
export type CartItemCreateWithoutCartInput = {
    quantity?: number;
    product: Prisma.ProductCreateNestedOneWithoutCartItemsInput;
};
export type CartItemUncheckedCreateWithoutCartInput = {
    id?: number;
    productId: number;
    quantity?: number;
};
export type CartItemCreateOrConnectWithoutCartInput = {
    where: Prisma.CartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.CartItemCreateWithoutCartInput, Prisma.CartItemUncheckedCreateWithoutCartInput>;
};
export type CartItemCreateManyCartInputEnvelope = {
    data: Prisma.CartItemCreateManyCartInput | Prisma.CartItemCreateManyCartInput[];
    skipDuplicates?: boolean;
};
export type CartItemUpsertWithWhereUniqueWithoutCartInput = {
    where: Prisma.CartItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.CartItemUpdateWithoutCartInput, Prisma.CartItemUncheckedUpdateWithoutCartInput>;
    create: Prisma.XOR<Prisma.CartItemCreateWithoutCartInput, Prisma.CartItemUncheckedCreateWithoutCartInput>;
};
export type CartItemUpdateWithWhereUniqueWithoutCartInput = {
    where: Prisma.CartItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.CartItemUpdateWithoutCartInput, Prisma.CartItemUncheckedUpdateWithoutCartInput>;
};
export type CartItemUpdateManyWithWhereWithoutCartInput = {
    where: Prisma.CartItemScalarWhereInput;
    data: Prisma.XOR<Prisma.CartItemUpdateManyMutationInput, Prisma.CartItemUncheckedUpdateManyWithoutCartInput>;
};
export type CartItemScalarWhereInput = {
    AND?: Prisma.CartItemScalarWhereInput | Prisma.CartItemScalarWhereInput[];
    OR?: Prisma.CartItemScalarWhereInput[];
    NOT?: Prisma.CartItemScalarWhereInput | Prisma.CartItemScalarWhereInput[];
    id?: Prisma.IntFilter<"CartItem"> | number;
    cartId?: Prisma.IntFilter<"CartItem"> | number;
    productId?: Prisma.IntFilter<"CartItem"> | number;
    quantity?: Prisma.IntFilter<"CartItem"> | number;
};
export type CartItemCreateWithoutProductInput = {
    quantity?: number;
    cart: Prisma.CartCreateNestedOneWithoutItemsInput;
};
export type CartItemUncheckedCreateWithoutProductInput = {
    id?: number;
    cartId: number;
    quantity?: number;
};
export type CartItemCreateOrConnectWithoutProductInput = {
    where: Prisma.CartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.CartItemCreateWithoutProductInput, Prisma.CartItemUncheckedCreateWithoutProductInput>;
};
export type CartItemCreateManyProductInputEnvelope = {
    data: Prisma.CartItemCreateManyProductInput | Prisma.CartItemCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type CartItemUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.CartItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.CartItemUpdateWithoutProductInput, Prisma.CartItemUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.CartItemCreateWithoutProductInput, Prisma.CartItemUncheckedCreateWithoutProductInput>;
};
export type CartItemUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.CartItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.CartItemUpdateWithoutProductInput, Prisma.CartItemUncheckedUpdateWithoutProductInput>;
};
export type CartItemUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.CartItemScalarWhereInput;
    data: Prisma.XOR<Prisma.CartItemUpdateManyMutationInput, Prisma.CartItemUncheckedUpdateManyWithoutProductInput>;
};
export type CartItemCreateManyCartInput = {
    id?: number;
    productId: number;
    quantity?: number;
};
export type CartItemUpdateWithoutCartInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutCartItemsNestedInput;
};
export type CartItemUncheckedUpdateWithoutCartInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemUncheckedUpdateManyWithoutCartInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemCreateManyProductInput = {
    id?: number;
    cartId: number;
    quantity?: number;
};
export type CartItemUpdateWithoutProductInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    cart?: Prisma.CartUpdateOneRequiredWithoutItemsNestedInput;
};
export type CartItemUncheckedUpdateWithoutProductInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cartId?: Prisma.IntFieldUpdateOperationsInput | number;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cartId?: Prisma.IntFieldUpdateOperationsInput | number;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CartItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cartId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    cart?: boolean | Prisma.CartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cartItem"]>;
export type CartItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cartId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    cart?: boolean | Prisma.CartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cartItem"]>;
export type CartItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cartId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    cart?: boolean | Prisma.CartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cartItem"]>;
export type CartItemSelectScalar = {
    id?: boolean;
    cartId?: boolean;
    productId?: boolean;
    quantity?: boolean;
};
export type CartItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "cartId" | "productId" | "quantity", ExtArgs["result"]["cartItem"]>;
export type CartItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cart?: boolean | Prisma.CartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type CartItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cart?: boolean | Prisma.CartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type CartItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cart?: boolean | Prisma.CartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $CartItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CartItem";
    objects: {
        cart: Prisma.$CartPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
    }, ExtArgs["result"]["cartItem"]>;
    composites: {};
};
export type CartItemGetPayload<S extends boolean | null | undefined | CartItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CartItemPayload, S>;
export type CartItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CartItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CartItemCountAggregateInputType | true;
};
export interface CartItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CartItem'];
        meta: {
            name: 'CartItem';
        };
    };
    findUnique<T extends CartItemFindUniqueArgs>(args: Prisma.SelectSubset<T, CartItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CartItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CartItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CartItemFindFirstArgs>(args?: Prisma.SelectSubset<T, CartItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CartItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CartItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CartItemFindManyArgs>(args?: Prisma.SelectSubset<T, CartItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CartItemCreateArgs>(args: Prisma.SelectSubset<T, CartItemCreateArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CartItemCreateManyArgs>(args?: Prisma.SelectSubset<T, CartItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CartItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CartItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CartItemDeleteArgs>(args: Prisma.SelectSubset<T, CartItemDeleteArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CartItemUpdateArgs>(args: Prisma.SelectSubset<T, CartItemUpdateArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CartItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, CartItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CartItemUpdateManyArgs>(args: Prisma.SelectSubset<T, CartItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CartItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CartItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CartItemUpsertArgs>(args: Prisma.SelectSubset<T, CartItemUpsertArgs<ExtArgs>>): Prisma.Prisma__CartItemClient<runtime.Types.Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CartItemCountArgs>(args?: Prisma.Subset<T, CartItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CartItemCountAggregateOutputType> : number>;
    aggregate<T extends CartItemAggregateArgs>(args: Prisma.Subset<T, CartItemAggregateArgs>): Prisma.PrismaPromise<GetCartItemAggregateType<T>>;
    groupBy<T extends CartItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CartItemGroupByArgs['orderBy'];
    } : {
        orderBy?: CartItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CartItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CartItemFieldRefs;
}
export interface Prisma__CartItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    cart<T extends Prisma.CartDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CartDefaultArgs<ExtArgs>>): Prisma.Prisma__CartClient<runtime.Types.Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CartItemFieldRefs {
    readonly id: Prisma.FieldRef<"CartItem", 'Int'>;
    readonly cartId: Prisma.FieldRef<"CartItem", 'Int'>;
    readonly productId: Prisma.FieldRef<"CartItem", 'Int'>;
    readonly quantity: Prisma.FieldRef<"CartItem", 'Int'>;
}
export type CartItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    where: Prisma.CartItemWhereUniqueInput;
};
export type CartItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    where: Prisma.CartItemWhereUniqueInput;
};
export type CartItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CartItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CartItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CartItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CartItemCreateInput, Prisma.CartItemUncheckedCreateInput>;
};
export type CartItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CartItemCreateManyInput | Prisma.CartItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CartItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    data: Prisma.CartItemCreateManyInput | Prisma.CartItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CartItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CartItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CartItemUpdateInput, Prisma.CartItemUncheckedUpdateInput>;
    where: Prisma.CartItemWhereUniqueInput;
};
export type CartItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CartItemUpdateManyMutationInput, Prisma.CartItemUncheckedUpdateManyInput>;
    where?: Prisma.CartItemWhereInput;
    limit?: number;
};
export type CartItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CartItemUpdateManyMutationInput, Prisma.CartItemUncheckedUpdateManyInput>;
    where?: Prisma.CartItemWhereInput;
    limit?: number;
    include?: Prisma.CartItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CartItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    where: Prisma.CartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.CartItemCreateInput, Prisma.CartItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CartItemUpdateInput, Prisma.CartItemUncheckedUpdateInput>;
};
export type CartItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
    where: Prisma.CartItemWhereUniqueInput;
};
export type CartItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CartItemWhereInput;
    limit?: number;
};
export type CartItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CartItemSelect<ExtArgs> | null;
    omit?: Prisma.CartItemOmit<ExtArgs> | null;
    include?: Prisma.CartItemInclude<ExtArgs> | null;
};
export {};
