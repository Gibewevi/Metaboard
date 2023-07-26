const convertDatesToObjects = (orders) => {
    const ordersProfits = [];
    orders.forEach((order) => {
        const profit = {
            plValue: parseFloat(order.profit),
            date: new Date(order.closed_date)
        };
        ordersProfits.push(profit);
    });
    return ordersProfits;
}

const calculProfitsPerYear = (ordersProfits) => {
    const sortedProfit = [...ordersProfits].sort((a, b) => a.date - b.date);

    const profitsByMonth = sortedProfit.reduce((acc, item) => {
        const dateKey = `${item.date.getFullYear()}-${('0' + (item.date.getMonth() + 1)).slice(-2)}`; // Format as "YYYY-MM"
        acc[dateKey] = (acc[dateKey] || 0) + item.plValue;
        return acc;
    }, {});

    return profitsByMonth;
};


const calculProfitsPerMonth = (ordersProfits) => {
    const sortedProfit = [...ordersProfits].sort((a, b) => a.date - b.date);

    const lastDate = new Date(sortedProfit[sortedProfit.length - 1].date);
    const firstDateOfTheMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);

    const currentMonthProfits = sortedProfit.filter(order => order.date >= firstDateOfTheMonth);

    const profitsByDays = currentMonthProfits.reduce((acc, item) => {
        const dateKey = item.date.toISOString().split('T')[0];
        acc[dateKey] = parseFloat((acc[dateKey] || 0) + item.plValue).toFixed(2);
        return acc;
    }, {});

    return profitsByDays;
};

const calculProfitsPerWeek = (ordersProfits) => {
    const sortedProfit = [...ordersProfits].sort((a, b) => a.date - b.date);

    const profitsByDays = sortedProfit.reduce((acc, item) => {
        const dateKey = item.date.toISOString().split('T')[0];
        acc[dateKey] = (acc[dateKey] || 0) + item.plValue;
        return acc;
    }, {});

    // Get an array of dates
    const dates = Object.keys(profitsByDays);
    // Get the last 7 dates
    const lastSevenDates = dates.slice(Math.max(dates.length - 10, 0));
    // Build the profits object for the last 7 dates
    const lastSevenProfits = lastSevenDates.reduce((acc, date) => {
        acc[date] = profitsByDays[date];
        return acc;
    }, {});

    return lastSevenProfits;
};



export const statisticController = {
    convertDatesToObjects,
    calculProfitsPerWeek,
    calculProfitsPerMonth,
    calculProfitsPerYear 
};