

const Coder = () => {

    return <div>
                <div
        style={{
            display: "flex",
            flexDirection:"column"
        }}>
            <input style={{
                width: "800px"
            }}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                // label="Текст1"
                // variant="outlined"
            />
            <button onClick={encode}>
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
                // value={text}
                // onChange={(e) => setText(e.target.value)}
                // label="Текст2"
                // variant="outlined"
            />
            <button onClick={decode}>
                раскодируй
            </button>
        </div>
    </div>
}