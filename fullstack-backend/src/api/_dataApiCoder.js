import {
        createRequire
} from "module";
import {
        letter,
        num
} from "../helpers/variable";

const require = createRequire(
        import.meta.url);

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