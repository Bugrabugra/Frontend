import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography
} from "@mui/material";
import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch
} from "react-hook-form";
import { defaultValues, Schema } from "../types/schema.ts";
import RHFAutocomplete from "../../components/RHFAutocomplete.tsx";
import { Fragment, useEffect } from "react";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers
} from "../services/queries.ts";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup.tsx";
import { RHFRadioGroup } from "../../components/RHFRadioGroup.tsx";
import { RHFCheckbox } from "../../components/RHFCheckbox.tsx";
import { RHFDateAndTimePicker } from "../../components/RHFDateAndTimePicker.tsx";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker.tsx";
import { RHFSlider } from "../../components/RHFSlider.tsx";
import { RHFSwitch } from "../../components/RHFSwitch.tsx";
import { RHFTextField } from "../../components/RHFTextField.tsx";
import { useCreateUser, useEditUser } from "../services/mutations.ts";

export function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const { watch, control, handleSubmit, unregister, reset, setValue } =
    useFormContext<Schema>();

  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const userQuery = useUser(id);

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students"
  });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />
          <RHFAutocomplete<Schema>
            name="states"
            label="States"
            options={statesQuery.data}
          />
          <RHFToggleButtonGroup<Schema>
            name="languagesSpoken"
            options={languagesQuery.data}
          />
          <RHFRadioGroup<Schema>
            name="gender"
            label="Gender"
            options={gendersQuery.data}
          />
          <RHFCheckbox<Schema>
            name="skills"
            label="Skills"
            options={skillsQuery.data}
          />
          <RHFDateAndTimePicker<Schema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, i) => (
            <Fragment key={field.id}>
              <RHFTextField name={`students.${i}.name`} label="Name" />
              <Button color="error" onClick={() => remove(i)} type="button">
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained">
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
