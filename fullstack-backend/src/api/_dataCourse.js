import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json')

export const dataCourse = (app) => {
    app.get('/api/data', (req, res) => {
        console.log('start request')
        return res.json(data.dataD);
    });

    app.get('/api/data/:id', (req, res) => {
        const idReq = req.params.id;
        console.log('start request id' + idReq);



        for (let i = 0; data.dataD.length > i; i++) {
            if (data.dataD[i].id === idReq) {
                return res.json(data.dataD[i]);
            }
            return res.status(404).send("Data not found");
        }
    })
}