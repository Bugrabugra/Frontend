import { revalidatePath } from "next/cache";
// import { auth, currentUser } from "@clerk/nextjs/server";

type MockUser = {
  id: number;
  name: string;
};

const MockUsers = async () => {
  // const authObj = await auth();
  // const userObj = await currentUser();

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    "https://673b51e4339a4ce4451bad93.mockapi.io/users",
  );
  const users = await response.json();

  async function addUser(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const res = await fetch(
      "https://673b51e4339a4ce4451bad93.mockapi.io/users",
      {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const newUser = await res.json();
    revalidatePath("/mock-users");
    console.log(newUser);
  }

  return (
    <div className="py-10">
      <form action={addUser} className="mb-4">
        <input
          type="text"
          name="name"
          required
          className="border p-2 mr-2 text-black"
        />
        <button className="bg-blue-500 px-4 py-2 rounded">Add User</button>
      </form>
      <div className="grid grid-cols-4 gap-4 py-10">
        {users.map((user: MockUser) => (
          <li
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            {user.name}
          </li>
        ))}
      </div>
    </div>
  );
};

export default MockUsers;
