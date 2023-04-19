import { z } from "zod";

export type PaginatedResponse<ItemType extends z.ZodTypeAny> = {
    items: z.infer<ItemType>[];
    limit?: number;
    offset?: number;
    total?: number;
}

export const createPaginatedResponse = <ItemType extends z.ZodTypeAny>({ items, limit, offset, total }: PaginatedResponse<ItemType>): PaginatedResponse<ItemType> => {
    return {
        items,
        limit,
        offset,
        total,
    }
}


// https://stackoverflow.com/questions/74907523/creating-zod-schema-for-generic-interface
