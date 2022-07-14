import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
//dayjs默认不支持utc方法转化，我们需要将utc扩展到dayjs中
dayjs.extend(utc);

const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(
  utcString: string,
  format: string = DEFAULT_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format);
}
