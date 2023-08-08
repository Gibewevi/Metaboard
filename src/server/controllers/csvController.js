import { csvModel } from "../models/csvModel";

const importCSVintoDataBase = async(csvParse, currency, timeframe) => {
    const res = await csvModel.importCsvParseIntoDataBase(csvParse, currency, timeframe);
    console.log('message : ', res);
    return res;
}

export const csvController = {
    importCSVintoDataBase
}