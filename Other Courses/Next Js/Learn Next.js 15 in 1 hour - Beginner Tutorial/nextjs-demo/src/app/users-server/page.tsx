type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
};

const UsersServer = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return (
    <div className="space-y-4 p-4">
      {users.map((user: User) => (
        <li
          key={user.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          {user.name} ({user.email})
        </li>
      ))}
    </div>
  );
};

export default UsersServer;
