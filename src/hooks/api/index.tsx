import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { FetchKlinesParams } from "./types"


const BaseUrl = " https://api.binance.com/api/"


const KEYS = {
    klines: "Klines"
}

// axios calls must split to another file name (api or ....) but for test don't need this.
const fetchKlines = async (params: FetchKlinesParams) => (await axios({
    method: 'get',
    url: `${BaseUrl}v3/uiKlines`,
    params,
})).data


const useFetchKlines = (
    params: FetchKlinesParams,
    options?: UseQueryOptions<number[][], AxiosError>,
) => {
    const query = useQuery({
        queryKey: [...KEYS.klines, params],
        queryFn: async () => fetchKlines(params),
        ...options
    });
    return query;
}

export { useFetchKlines }
