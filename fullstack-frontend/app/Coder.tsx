import React, { useEffect } from "react";
import { getData } from "./api/controllers/common-coder";


const Coder = () => {
    const [value, setValue] = React.useState('');
    const [text, setText] = React.useState("");

    const [letter, setLetter] = React.useState([]);
    const [num, setNum] = React.useState([]);

    useEffect(() => {
        getData()
        .then((res) => {
            setLetter(res.data.letter);
            setNum(res.data.num);
        })
        .catch((err) => console.error(err));
    })

    // let str = "станислав олегович хочет такую штуку!"
    const encode = () => {

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
    }

    const decode = () => {

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
    }

    // const dou = () => {

    //     let sim = text.split(' ');
    //     let num = ""
    //     do { 

    //     }
    //     while () 
    // }



    return <div
    style={{
        display: "flex",
        justifyContent: "space-around"
        
    }}>
        <div
        style={{
            display: "flex",
            flexDirection:"column"
        }}>
            <input style={{
                width: "800px"
            }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={encode} 
            >
                Закодируй
            </button>

        </div>

        <div style={{
            display:"flex",
            flexDirection:"column"
        }}>
            <input
            style={{
                width: "800px"
            }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={decode}>
                раскодируй
            </button>
        </div>
    </div>

}

export default Coder;