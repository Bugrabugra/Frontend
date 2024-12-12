import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

export const COLOR_MAP = {
  CPU: {
    stroke: "#5dd4ee",
    fill: "#0a4d5c",
  },
  RAM: {
    stroke: "#e99311",
    fill: "#5f3c07",
  },
  STORAGE: {
    stroke: "#1acf4d",
    fill: "#0b5b22",
  },
};

export function Chart(props: Readonly<ChartProps>) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView],
  );
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined }),
      ),
    ];
  }, [props.data, props.maxDataPoints]);

  return (
    <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke} />
  );
}
