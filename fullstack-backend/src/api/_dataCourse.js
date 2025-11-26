import {createRequire} from "module";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json')

export const  dataCourse = (app) => {
    app.get('/api/data', (req, res) => {
        console.log('start request') 
        return res.json(data.dataD);
    });

    app.get('/api/data/:id', (req, res) => {
        const idReq = req.params.id;
        console.log('start request id') 
    })
}