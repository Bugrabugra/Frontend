import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server"
import { PosterList } from "./components/PosterList.tsx";
import { PosterEdit } from "./components/PosterEdit.tsx";
import { PosterCreate } from "./components/PosterCreate.tsx";
import { CategoryList } from "./components/CategoryList.tsx";
import { CategoryEdit } from "./components/CategoryEdit.tsx";

const dataProvider = jsonServerProvider("http://localhost:3000")

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="categories"
        list={CategoryList}
        edit={CategoryEdit}
        create={PosterCreate}
        recordRepresentation="name"
      />
      <Resource name="posters" list={PosterList} edit={PosterEdit} create={PosterCreate} />
    </Admin>
  );
};

export default App;

