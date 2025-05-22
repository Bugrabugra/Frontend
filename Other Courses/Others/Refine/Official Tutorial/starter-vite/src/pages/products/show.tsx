import { useOne, useShow } from "@refinedev/core";
import { MarkdownField, NumberField, Show, TextField } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: data?.data?.category.id || "",
    queryOptions: {
      enabled: !!data?.data,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={data?.data?.id} />

      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={data?.data?.name} />

      <Typography.Title level={5}>Description</Typography.Title>
      <MarkdownField value={data?.data?.description} />

      <Typography.Title level={5}>Material</Typography.Title>
      <TextField value={data?.data?.material} />

      <Typography.Title level={5}>Category</Typography.Title>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
      />

      <Typography.Title level={5}>Price</Typography.Title>
      <NumberField value={data?.data?.price} />
    </Show>
  );
};
