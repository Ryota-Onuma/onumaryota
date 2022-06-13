import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Azia/Tokyo")


export const convertToJST = (time: string) => {
    return dayjs(time).format('YYYY/MM/DD')
}