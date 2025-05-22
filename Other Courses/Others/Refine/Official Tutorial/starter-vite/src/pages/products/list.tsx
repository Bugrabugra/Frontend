import { getDefaultFilter, useMany } from "@refinedev/core";
import {
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  ShowButton,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { Input, Select, Space, Table } from "antd";

export const ListProducts = () => {
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [
        { field: "name", operator: "contains", value: "" },
        { field: "category.id", operator: "in", value: [1, 2] },
      ],
    },
    syncWithLocation: true,
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          // FilterDropdown will map the value to the filter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              // We'll store the selected id as number
              mapValue={(selectedKey) => Number(selectedKey)}
            >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
