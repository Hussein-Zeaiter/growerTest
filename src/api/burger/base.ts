import axios from "axios";

export const burgerApi = axios.create({
  baseURL: "https://693831414618a71d77cf4f12.mockapi.io/api/",
});

//other config ig?
// like interceptors for auth tokens etc ?
