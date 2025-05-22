import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, InputNumber, Select } from "antd";

export const EditProduct = () => {
  const { formProps, saveButtonProps, query } = useForm({
    redirect: "show",
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name={["category", "id"]}>
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber step="0.01" stringMode />
        </Form.Item>
      </Form>
    </Edit>
  );
};
