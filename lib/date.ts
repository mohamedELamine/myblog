/**
 * Convert the date format of YYYY-MM-DD to American writing
 * @param date The date in format of YYYY-MM-DD.
 */
export const normalizeDate = (date: string = "1970-01-01"): string => {
  let [year, month, day] = date.split("-");
  let month_num = parseInt(month);
  let day_num = parseInt(day);
  const month_en: {
    [index: number]: string;
  } = {
    1: "يناير",
    2: "فبراير",
    3: "مارس",
    4: "أبريل",
    5: "مايو",
    6: "يونيو",
    7: "يوليو",
    8: "أغسطس",
    9: "سبتمبر",
    10: "أكتوبر",
    11: "نوفمبر",
    12: "ديسمبر",
  };
  return `${day_num} ${month_en[month_num]}, ${year}`;
};
