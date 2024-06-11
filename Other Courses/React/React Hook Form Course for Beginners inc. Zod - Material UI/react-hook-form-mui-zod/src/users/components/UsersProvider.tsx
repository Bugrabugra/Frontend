import { FormProvider, useForm } from "react-hook-form";
import { Users } from "./Users.tsx";
import { defaultValues, schema, Schema } from "../types/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

const UsersProvider = () => {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default UsersProvider;
