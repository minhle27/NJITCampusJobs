import { io } from "socket.io-client";
const endpoint = window.location.hostname + ":" + 3001;
export const socket = io(endpoint, { transports : ['websocket'] });

async function convertToJSON(res: Response) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  try {
    return await res
      .clone() // clone so that the original is still readable for debugging
      .json(); // start converting to JSON object
  } catch (error) {
    const text = await res.text();
    throw `API request's result could not be converted to a JSON object: \n${text}`;
  }
}

export async function post(endpoint: string, params = {}) {
  try {
    const res = await fetch(endpoint, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(params),
    });
    return convertToJSON(res);
  } catch (error) {
    throw `POST request to ${endpoint} failed with error:\n${error}`;
  }
}

socket.on("connect", () => {
  post("http://localhost:3001/api/initsocket", { socketid: socket.id });
});
