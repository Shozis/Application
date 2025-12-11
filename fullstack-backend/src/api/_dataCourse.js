import { createRequire } from "module";
import { updateJsonFile } from "../helpers/_update";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json')

export const dataCourse = (app) => {
    app.get('/api/course', (req, res) => {
        console.log('start request')
        return res.json(data.dataD);
    });

    app.get('/api/course/:id', (req, res) => {
        const idReq = req.params.id;
        console.log('start request id' + idReq);



        for (let i = 0; data.dataD.length > i; i++) {
            if (data.dataD[i].id === idReq) {
                console.log('find ' + idReq);

                return res.json(data.dataD[i]);
            }
        }

        return res.status(404).send("Data not found");
    });

    app.post('/api/course/', (req, res) => {
        console.log('create new element');
        
        let newId = 0;

        if (data.dataD.length !== 0) {
            newId = data.dataD[data.dataD.length - 1].id + 1;
        }

        console.log(newId);
        const createdData = req.body;

        data.dataD.push({
            id: newId, 
            name: createdData,
            age: createdData.age
        });

        updateJsonFile('data.json', data);

        console.log('created complited')

        return res.json(data.dataD[data.dataD.length - 1]);
    })
}