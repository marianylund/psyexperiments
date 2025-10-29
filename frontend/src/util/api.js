// Interface against the backend, doing the network things

const sendData = (data) => {
  const params =
    location.href.split("?").length > 1 ? location.href.split("?").at(-1) : "";
  console.log(params);
  const host = location.host.startsWith("localhost")
    ? "http://localhost:3001/?" // Why no /api? there?
    : "/api?";
  //fetch("http://localhost:3001/?" + params, {
  fetch(host + params, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export { sendData };
