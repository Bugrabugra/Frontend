import {
  DatagridConfigurable,
  EditButton,
  ExportButton,
  ImageField,
  List,
  NumberField,
  ReferenceField,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  useRecordContext
} from 'react-admin';
import { PosterFilterSidebar } from "./FilterList.tsx";

const PosterListActions = () => {
  return (
    <TopToolbar>
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  )
}

const UrlField = ({ source }: { source: string }) => {
  const record = useRecordContext()

  if (!record) {
    return null
  }

  return (
    <a href={record[source]} target="_blank">View</a>
  )
}

export const PosterList = () => (
  <List aside={<PosterFilterSidebar />} actions={<PosterListActions />}>
    <DatagridConfigurable>
      <TextField source="id" />
      <ReferenceField source="category_id" reference="categories">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <NumberField source="width" label="Width(cm)" />
      <NumberField source="height" label="Height(cm)" />
      <NumberField source="price" />
      <ImageField
        source="thumbnail"
        title="Title"
        sx={{ "& img": { maxWidth: 80, maxHeight: 80, objectFit: "contain" } }}
      />
      <UrlField source="image" />
      <TextField source="description" />
      <NumberField source="stock" />
      <NumberField source="sales" sx={{ fontWeight: "bold" }} emptyText="N/A" />
      <EditButton />
    </DatagridConfigurable>
  </List>
);
