import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");

import { dataApiJournal } from "./src/api/_dataApiJournal.js";
import { dataCourse } from "./src/api/_dataCourse.js";
import { dataApiCoder } from "./src/api/_dataApiCoder.js";


// назначение порта для сервера (нельзя использовать 3000 порт, так как он используется для frontend)
const PORT = process.env.PORT || 3001;

// запуск приложения локального сервера
const app = express();
app.use(express.json());

dataApiJournal(app);

dataCourse(app);

dataApiCoder(app);

// слушатель app-приложения сервера
app.listen(PORT, () => {
	console.log(`Server starting on port ${PORT}`);
});

app.get('/api', (req, res) => {
	res.json({
		message: 'backend server online now'
	})
});