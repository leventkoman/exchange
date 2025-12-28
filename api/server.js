import http from 'node:http'
import xml2json from 'xml2json'

async function getAllCurrency() {
    const res = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml')
    const xml = await res.text()

    const json = xml2json.toJson(xml, {
        object: true,   
        reversible: false,
        sanitize: false,
        trim: true
    })

    return json
}

const server = http.createServer(async (req, res) => {
    try {

        if (req.method === 'GET' && req.url === '/api/currency') {
            const data = await getAllCurrency()

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })

            res.end(JSON.stringify(data))
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Page Not Found");
            
        }
    } catch (err) {
        res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        res.end(JSON.stringify({ error: 'TCMB fetch failed' }))
    }
})

server.listen(3000, () => {
    console.log('Currency API running on http://localhost:3000/api/currency')
})