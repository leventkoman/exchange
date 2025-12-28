import type {Currency} from "./currency.model.ts";

export interface Exchange {
    Tarih_Date: {
        Bulten_No: string;
        Currency: Currency[];
        Date: string;
        Tarih: string;
    }
}