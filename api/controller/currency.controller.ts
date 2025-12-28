import type {Request, Response} from 'express';
import xml2json from 'xml2json';
export class CurrencyController {
    static async getCurrencies(_: Request, res: Response) {
        try {
            const data = await fetchCurrency();
            
            if (!data) return res.status(404).send('No Currency Found');
            console.log(data);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

async function fetchCurrency() {
    const res = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml');
    const xml = await res.text();

    const json = xml2json.toJson(xml, {
        object: true,
        reversible: false,
        sanitize: false,
        trim: true
    });

    return json;
}