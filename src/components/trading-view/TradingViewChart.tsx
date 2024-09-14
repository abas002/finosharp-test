/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Radio, RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { CandlestickData, ColorType, createChart, Time, WhitespaceData } from 'lightweight-charts';
import React from 'react';
import { useTheme } from 'src/contexts/ThemeContext';
import { Interval } from 'src/types/Enums';


interface IProps {
    updatedAt?: number
    onChangeInterval?: (value: Interval) => void
    candles: (number | string)[][]
}


const colors = {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350'
}

const TradingViewChart: React.FC<IProps> = (props) => {
    const chartContainerRef = React.useRef<HTMLDivElement>(null)
    const { theme } = useTheme();

    const [interval, setInterval] = React.useState<string>(Interval.OneMinute)


    const handleIntervalChange = (e: RadioChangeEvent) => {
        setInterval(e.target.value as string)
        if (props.onChangeInterval)
            props.onChangeInterval(e.target.value as Interval)
    }


    React.useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: theme === "light" ? "white" : "black" },
                textColor: theme === "light" ? "black" : "white",
            },
            width: chartContainerRef.current?.clientWidth,
            height: 400,
            timeScale: {
                timeVisible: true,
                tickMarkFormatter: (time: number) => dayjs(time).format("YY/MM/DD-HH:mm"),
            },
            crosshair: {
                vertLine: false,
                horzLine: false
            },
        });
        chart.timeScale().fitContent();


        // ایجاد Tooltip سفارشی
        const tooltip = document.createElement('div');
        tooltip.style = `
            position: absolute;
            display: none;
            padding: 5px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 3px;
            pointer-events: none;
            font-size: 12px;
            z-index:10000
            `;
        chartContainerRef.current?.appendChild(tooltip);


        chart.subscribeCrosshairMove((param) => {
            if (!param.point || !param.time) {
                tooltip.style.display = 'none';
                return;
            }
            tooltip.style.display = 'block';
            tooltip.style.left = param.point.x + 15 + 'px';
            tooltip.style.top = param.point.y + 15 + 'px';
            tooltip.innerHTML = dayjs(param.time as string).format("YY/MM/DD-HH:mm");
        });



        const newSeries = chart.addCandlestickSeries({
            upColor: colors.upColor,
            downColor: colors.downColor,
            borderVisible: colors.borderVisible,
            wickUpColor: colors.wickUpColor,
            wickDownColor: colors.wickDownColor
        })
        newSeries.setData(props.candles as unknown as (CandlestickData<Time> | WhitespaceData<Time>)[] ?? []);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [props.candles, theme]);

    return (
        <div className='flex flex-col gap-2'>
            <div ref={chartContainerRef} className='relative w-full' />
            <label htmlFor="interval-switcher" className='text-primary dark:text-white'>Interval:</label>
            <Radio.Group id="interval-switcher" value={interval} onChange={handleIntervalChange}>
                <Radio.Button value={Interval.OneMinute}>1m</Radio.Button>
                <Radio.Button value={Interval.FiveMinute}>5m</Radio.Button>
                <Radio.Button value={Interval.FifteenMinute}>15m</Radio.Button>
                <Radio.Button value={Interval.OneHour}>1h</Radio.Button>
                <Radio.Button value={Interval.OneDay}>1d</Radio.Button>
            </Radio.Group>
            <p className='text-sm text-primary dark:text-white'>Last Updated: {props.updatedAt ? dayjs(props.updatedAt).format("YY/MM/DD-HH:mm:ss") : '-'}</p>
        </div>
    )
}

export default TradingViewChart