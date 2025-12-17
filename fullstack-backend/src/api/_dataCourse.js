import { createRequire } from "module";
import { updateJsonFile } from "../helpers/_update.js";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json')

export const dataCourse = (app) => {
    app.get('/api/course', (req, res) => {
        console.log('start request')
        return res.json(data.dataD);
    });

    app.get('/api/course/:id', (req, res) => {
        const idReq = Number(req.params.id);
        console.log('start request id ' + idReq);

        for (let i = 0; data.dataD.length > i; i++) {
            console.log('cycle ' + data.dataD[i].id === idReq)
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
            name: createdData.name,
            age: createdData.age
        });

        updateJsonFile('data.json', data);

        console.log('created complited')

        return res.json(data.dataD[data.dataD.length - 1]);
    })

    app.put('/api/course/:id', (req, res) => {
        console.log('change data for id ' + req.params.id);
        const idCourseReq = req.params.id;
        const updatedCourse = req.body

        const searchId = Number(idCourseReq);
        const indexDataD = data.dataMain.findIndex(item => item.id === searchId);

         if (indexDataD === -1) {
            console.log('No id ' + idCourseReq);
            return res.status(404).send("data not found");
        } else {
            const newElement = {
                id: Number(idCourseReq),
                name: updatedCourse.name,
                age: updatedCourse.age
            }

            data.dataD[indexDataD] = newElement;
            updateJsonFile('data.json', data);
            res.json(data.dataD[indexDataD]);
            console.log("completed change data");
        }
    });

    app.delete('/api/course/:id', (req, res) => {
        console.log(`Delete ${req.params.id} ...`);

        const filterArray = data.dataD.filter((item) => item.id !== +req.params.id);

        data.dataD = filterArray;

        updateJsonFile('data.json', data);

        console.log(`Delete ${req.params.id} completed`);
        return res.status(204).send(`Delete ${req.params.id} completed`);
    })
}