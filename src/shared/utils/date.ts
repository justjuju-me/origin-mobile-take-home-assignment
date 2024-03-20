import { format } from "date-fns";

export function formatDate(date: Date) {
  return format(new Date(), "MM/dd/yyyy HH:mm");
}
