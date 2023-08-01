export function formatDateTime(date, locale = 'en-US') {
    if (!date) {
        return null;
    }
    let p = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).formatToParts(new Date(date)).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {day: null, month: null, year: null, hour: null, minute: null, dayPeriod: null});

    return `${p.day}/${p.month}/${p.year}, ${p.hour}:${p.minute} ${p.dayPeriod}`;
}


export const getMonth = (index: number) => [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
][index];

export function formatDate(date, locale = 'en-US') {
    if (!date) {
        return null;
    }

    let p = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).formatToParts(new Date(date)).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {day: null, month: null, year: null, hour: null, minute: null, dayPeriod: null});

    return `${p.day}/${p.month}/${p.year}`;
}

export const formatCurrency = (value, locale = 'en-BD', currency = "BDT"): string =>
    Intl.NumberFormat(locale, {
        currency: currency,
        style: "currency",
        maximumFractionDigits: 0
    }).format(value);

export const localeCurrency = (value, locale = 'en-BD', currency = "BDT") =>
    formatCurrency(value, locale, currency).replace('BDT', '').trim() + '/-';

export function formatNumber(value, locale = 'bn-BD') {
    return Intl.NumberFormat(locale).format(value);
}

