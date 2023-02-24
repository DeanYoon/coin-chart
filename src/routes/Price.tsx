import { useQuery } from "react-query";
import { fetchCoinHistory } from "../\bapi";
import ApexCharts from "react-apexcharts";

// interface PriceProps {
//   coinId: string;
// }
// interface IHistorical {
//   time_open: number;
//   time_close: number;
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   volume: string;
//   market_cap: number;
// }

// function Price({ coinId }: PriceProps) {
//   const { isLoading, data } = useQuery<IHistorical>(["ohlcv2", coinId], () =>
//     fetchCoinHistory(coinId)
//   );
//   console.log(data);

//   return (
//     <div>
//       {isLoading ? (
//         "Loading Price"
//       ) : (
//         <ApexCharts
//           type="candlestick"
//           series={
//             [
//               // {
//               //   name: "Price",
//               //   data: data?.map((price) => parseFloat(price.close)) ?? [],
//               // },
//             ]
//           }
//         />
//       )}
//     </div>
//   );
// }

// export default Price;

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 100000,
    }
  );
  console.log(data);

  const formattedData =
    data?.map((price) => ({
      x: price.time_close,
      y: [price.open, price.high, price.low, price.close],
    })) ?? [];
  console.log(formattedData);
  return (
    <div>
      {isLoading ? (
        "Loading chart"
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data: formattedData,
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data
                ? data.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                  )
                : [],
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
