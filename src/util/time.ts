import { format } from 'timeago.js';

export function convertTimeago(date: string, lang = 'en_US') {
  return format(date, lang);
}
