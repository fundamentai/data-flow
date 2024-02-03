import axios from 'axios'
import * as cheerio from 'cheerio'
/**
 *
 * @param year
 * @param announce
 * @returns
 * @example
 * getAnnounce(2023, 'duy2023-03').then(console.log)
 */
export async function getAnnounce(year: number, announce: string) {
    const headers = {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'if-none-match': '"566004793"',
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie: 'TS01ab7d04=015d31d6919899a080b9f386fcbe0026005919876398390fc36d5d0a6dbd2ccefa3c797cf227dc453fed4affc179e45d883e4b0a85; _ga_5MZ9LSZFG2=GS1.1.1706961273.1.0.1706961273.0.0.0; _ga=GA1.1.1165530928.1706961274'
    }

    // Web sitesinden veriyi çek
    const response = await axios.get(`https://www.tcmb.gov.tr/wps/wcm/connect/tr/tcmb+tr/main+menu/duyurular/basin/${year}/${announce}`, {
        headers
    })

    const $ = cheerio.load(response.data)
    const rows = $('p')
        .map((index: number, element: any) => $(element).text())
        .get()

    return rows.slice(2, rows.length).join('\n')
}
