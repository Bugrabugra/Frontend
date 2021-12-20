import useFetch from "../hooks/useFetch";

const User = () => {
  const url = "https://random-data-api.com/api/users/random_user";
  const { data, error, isLoading } = useFetch(url, null);
  
  return (
    <div style={{ margin: 40 }}>
      <h1>User component</h1>
      {isLoading && <p>Loading User</p>}
      {data && <p>Random User: {data?.username}</p>}
      {error && <p>Opps something went wrong</p>}
    </div>
  );
};

export default User;