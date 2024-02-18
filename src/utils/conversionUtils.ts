export const mps_to_kmh = (mps: number): number => {
  const mph = mps * 3600;

  return mph / 1000;
};

export const m_to_km = function (m: number): number {
  const km = m / 1000;
  return km;
};

export const unixTimeStampToTime = function (unixTimeStamp: number): string {
  const date = new Date(unixTimeStamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${minutes} ${period}`;
};
