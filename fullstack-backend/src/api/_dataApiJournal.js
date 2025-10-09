import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json');   

import { updateJsonFile } from "../helpers/_update.js";
import { findIndexId, findId } from "../helpers/_searchData.js";

export const dataApiJournal = (app) => {

    //* get-запрос data 
    app.get('/api/data/', (req, res) => {
        return res.json(data.dataMain);
    });

    app.get('/api/message', (req, res) => {
        return res.json({
            id: 0,
            message: 'hello'
        })
    }),

    //* get-запрос по id
    app.get('/api/data/:id', (req, res) => {
        const idDataReq = req.Params.id;
        console.log('start request id' + idDataReq);

        const dataResponse = findId(idDataReq, data.dataMain);

        if (!dataResponse) {
            console.log('No id: ' + idDataReq);
            return res.status(404).send("Data not found");
        } else {
            res.json(dataResponse);
        }
    });

    //* post-запрос
    app.post('/api/data/', (req, res) => {
        console.log('create new element ...');

        let idNewData = 0;

        if (data.dataMain.length !== 0) {
            idNewData = data.dataMain[data.dataMain.length - 1].id + 1;
        }

        console.log(idNewData);
        const crearedData = req.body;

        data.dataMain.push({
            id: idNewData,
            name: crearedData.name,
            age: crearedData.age
        });

        updateJsonFile('data.json', data);

        console.log('created compled')

        return res.json(data.dataMain[data.dataMain.length - 1]);
    })

    //* put-запрос
    app.put('/api/data/:id', (req, res) => {
        console.log('change data for id: ' + req.params.id);
        const idDataReq = req.params.id;
        const updatedData = req.body; //! Не сработает без - app.use(express.json());

        let indexDataMain = findIndexId(idDataReq, data.dataMain);

        if (indexDataMain === -1) {
            console.log('No id: ' + idDataReq);
            return res.status(404).send("Data not found");
        } else {
            const newElement = {
                id: Number(idDataReq),
                name: updatedData.name,
                age: updatedData.age
            }

            data.dataMain[indexDataMain] = newElement;
            updateJsonFile('data.json', data);
            res.json(data.dataMain[indexDataMain]);
            console.log("completed change data");
        }
    });

    //* delete-запрос
    app.delete('/api/data/:id', (req, res) => {
        console.log(`Delete ${req.params.id} ...`);

        const filterArray = data.dataMain.filter((item) => item.id !== +req.params.id);

        data.dataMain = filterArray;

        updateJsonFile('data.json', data);

        console.log(`Delete ${req.params.id} completed`);
        return res.status(204).send(`Delete ${req.params.id} completed`);
    })
}