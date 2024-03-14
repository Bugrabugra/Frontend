import { useMutation } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/types";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { error, data: newOrderItem } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrderItem;
    }
  });
};
