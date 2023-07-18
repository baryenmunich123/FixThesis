const dayjs = require('dayjs');
const CustomParseFormat = require('dayjs/plugin/customParseFormat');
const isBetween = require('dayjs/plugin/isBetween');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(CustomParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = 'Asia/Ho_Chi_Minh';
dayjs.tz.setDefault(tz);

module.exports = { dayjs };

