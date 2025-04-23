console.log("✅ fetch override active");

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const [resource, config] = args;
  const response = await originalFetch(...args);

  console.log(response);

  if (!response.ok) {
    const clone = response.clone();
    const body = await clone.text();

    const requestDetails = {
      method: config?.method || "GET",
      url: resource,
      status: response.status,
      responseBody: body,
      timestamp: new Date().toISOString(),
    };

    // add to local storage
    const logs = JSON.parse(localStorage.getItem("errorLogs") || "[]");
    logs.push(requestDetails);
    localStorage.setItem("errorLogs", JSON.stringify(logs));
  }

  return response;
};
