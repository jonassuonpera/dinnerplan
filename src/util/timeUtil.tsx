
export const timeUtil = (date: Date): number => {
    let dateCopy: Date = date;
    dateCopy = new Date(Date.UTC(dateCopy.getFullYear(), dateCopy.getMonth(), dateCopy.getDate()));
    dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - (dateCopy.getUTCDay() || 7));
    var yearStart: Date = new Date(Date.UTC(dateCopy.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((dateCopy.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    return weekNo;
}

