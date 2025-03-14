import React from 'react';
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";


const PostEdit = (props) => {
  return (
    <Edit title="Edit Post" {...props}>
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput source="title"/>
        <TextInput multiline source="body"/>
        <DateInput source="publishedAt" label="Published"/>
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;
