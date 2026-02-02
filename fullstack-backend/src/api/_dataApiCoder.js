import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const dataApiCoder = (app) => {

app.post('/api/data/', (req, res) => {
        console.log('create new element ...');

         const coding = req.body;
});
}