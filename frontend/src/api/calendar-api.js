import { apiRequest } from "./api.js";

export async function fetchCalendar() {
  return apiRequest("/api/calendar");
}
