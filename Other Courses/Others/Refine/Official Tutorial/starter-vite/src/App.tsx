import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";
import { authProvider } from "./providers/auth-provider";
import { Login } from "./pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
// We'll wrap our app with Ant Design's ConfigProvider to set the theme and App component to use the theme properly.
import { App as AntdApp, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { Register } from "./pages/register";
import {
  CreateCategories,
  EditCategories,
  ListCategories,
  ShowCategories,
} from "./pages/categories";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              // i18nProvider={i18nProvider}
              resources={[
                {
                  name: "protected-products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Products" },
                },
                {
                  name: "categories",
                  list: "/categories",
                  show: "/categories/:id",
                  edit: "/categories/:id/edit",
                  create: "/categories/create",
                  meta: { label: "Categories" },
                },
              ]}
              options={{
                projectId: "XYDC5v-vGlq0I-cSVjAv"
              }}>
              <Routes>
                <Route
                  element={
                    // We're wrapping our routes with the `<Authenticated />` component
                    // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                    // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                    <Authenticated
                      key="authenticated-routes"
                      redirectOnFail="/login"
                    >
                      <ThemedLayoutV2
                        Title={(props) => (
                          <ThemedTitleV2 {...props} text="Awesome Project" />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
                    // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
                    element={
                      <NavigateToResource resource="protected-products" />
                    }
                  />
                  <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<ListCategories />} />
                    <Route path=":id" element={<ShowCategories />} />
                    <Route path=":id/edit" element={<EditCategories />} />
                    <Route path="create" element={<CreateCategories />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      {/* We're also replacing the <Navigate /> component with the <NavigateToResource /> component. */}
                      {/* It's tailored version of the <Navigate /> component that will redirect to the resource's list route. */}
                      <NavigateToResource resource="protected-products" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Routes>
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
