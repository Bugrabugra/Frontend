document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("log-container");
  const logs = JSON.parse(localStorage.getItem("errorLogs") || "[]");

  logs.reverse().forEach((log, index) => {
    const div = document.createElement("div");
    div.className = "log";
    div.innerHTML = `
      <strong>[${log.status}]</strong> ${log.method} <br/>
      <code>${log.url}</code><br/>
      <pre>${log.responseBody.slice(0, 500)}</pre>
      <hr/>
    `;
    container.appendChild(div);
  });

  document.getElementById("clear").onclick = () => {
    localStorage.removeItem("errorLogs");
    container.innerHTML = "";
  };
});
