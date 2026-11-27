import {
        createRequire
} from "module";
import {
        letter,
        num
} from "../helpers/variable";

const require = createRequire(
        import.meta.url);

             const letter = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", ",", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "!", "?", " "];
    const num = ["1", "23", "5", "78", "28", "75", "10", "61", "63", "91", "56", "16", "82", "17", "8", "2", "45", "43", "93", "67", "73", "83", "80", "18", "51", "98", "3", "38", "71", "65", "34", "88", "70", "95", "49", "22", "59"];


export const dataApiCoder = (app) => {

        app.post('/api/coder/', (req, res) => {
                console.log('prosesing ...');

                const {
                        functionName
                } = req.body;

                // const [value, setValue] = React.useState("");
                // const [text, setText] = React.useState("");

                encode = () => {

                                let sim = value.split('');
                                let str = "";

                                for (let i = 0; i < sim.length; i++) {
                                        for (let j = 0; j < letter.length; j++) {
                                                if (sim[i] == letter[j]) {
                                                        str += num[j] + " ";
                                                }
                                        }
                                }
                                setValue(str);
                                return value;
                        },

                        decode = () => {

                                let sim = text.split(' ');
                                let str = "";


                                for (let i = 0; i < sim.length; i++) {
                                        for (let j = 0; j < num.length; j++) {
                                                if (sim[i] == num[j]) {
                                                        str += letter[j] + "";
                                                }
                                        }
                                }
                                setText(str);
                                return text;
                        }
        })
};