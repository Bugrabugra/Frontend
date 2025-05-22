import { Form, Input } from "antd";
import { Create, useForm } from "@refinedev/antd";

export const CreateCategories = () => {
  const { formProps, saveButtonProps, query } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
