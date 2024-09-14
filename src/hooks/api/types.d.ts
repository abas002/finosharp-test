export interface FetchKlinesParams {
  symbol: string;
  interval: Interval;
  startTime: number;
  endTime: number;
  timeZone?: string;
  limit?: number | 1000; //Default 500; max 1000.
}
export interface FetchQueryResponse {
  open: string | number;
  high: string | number;
  low: string | number;
  close: string | number;
  time: string | number;
}
