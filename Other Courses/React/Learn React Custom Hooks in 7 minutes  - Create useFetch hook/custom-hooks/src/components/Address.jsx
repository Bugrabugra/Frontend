import useFetch from "../hooks/useFetch";

const Address = () => {
  const url = "https://random-data-api.com/api/address/random_address"
  const { data, error, isLoading } = useFetch(url, null);
  
  return (
    <div style={{ margin: 40 }}>
      <h1>Address component</h1>
      {isLoading && <p>Loading Address</p>}
      {data && <p>Random Address: {data?.full_address}</p>}
      {error && <p>Opps something went wrong</p>}
    </div>
  );
}

export default Address;