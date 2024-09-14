/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import dayjs from 'dayjs';
import React from 'react';
import TradingViewChart from 'src/components/trading-view/TradingViewChart';
import { useFetchKlines } from 'src/hooks/api';
import { Interval } from 'src/types/Enums';


const HomePage = () => {
    const now = dayjs()
    const previousDay = now.subtract(1, 'day')


    const [values, setValues] = React.useState({
        symbol: "BTCUSDT",
        interval: Interval.OneMinute,
        timeZone: "0",
        startTime: previousDay.valueOf(),
        endTime: now.valueOf(),
        limit: 1000
    })

    const useGetKlinesQuery = useFetchKlines(values, {
        refetchInterval: 60 * 1000,// Every 60 seconds call again automatically.
        select: (res) => res.map((p: number[]) => ({
            open: +p[1], high: +p[2], low: +p[3], close: +p[4], time: p[0]
        }))
    })

    return (
        <section className='px-8'>
            <div className="shadow-md p-4 bg-slate-50 box-content rounded-lg">
                <TradingViewChart candles={useGetKlinesQuery.data ?? []} onChangeInterval={e => setValues(prev => ({ ...prev, interval: e }))} updatedAt={useGetKlinesQuery.dataUpdatedAt} />
            </div>
        </section>
    )
}

export default HomePage