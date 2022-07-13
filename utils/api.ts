import { BASE_URL } from "./constant";

export async function fetchData(endPoint: string, body?: any, method?: string) {
  const url = BASE_URL + endPoint;
  const options: RequestInit = {
    method,
  };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}
