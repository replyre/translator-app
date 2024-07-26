import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Languages from "./Languages";
import ReactSelect from "react-select";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [Data, setData] = useState({
    src_lang: Languages[0].value,
    tras_lang: Languages[1].value,
    text: "",
  });

  const [output, setOutput] = useState("Translated Text Here ");

  async function translate() {
    setOutput("Loading...");
    if (Data.src_lang === Data.tras_lang) {
      toast.error("translate language can't b same.");
      setOutput("Translated Text Here");
      return;
    }
    if (Data.text.length == 0) {
      toast.error("please type something first");
      setOutput("Translated Text Here");
      return;
    }
    const data = new FormData();
    data.append("source_language", Data.src_lang);
    data.append("target_language", Data.tras_lang);
    data.append("text", Data.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API,
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      setOutput(response.data.data.translatedText);
    } catch (error) {
      setOutput("Translated Text Here");
      console.error(error);
    }
  }
  // console.log(Data, process.env.REACT_APP_RAPID_API);
  return (
    <div className="App">
      <div className="heading" style={{ width: "20%" }}>
        <h1>Translation App</h1>
        <p style={{ width: "70%" }}>
          A React Translation App allows you to translate from one language to
          another with ease.{" "}
        </p>
      </div>

      <div className="input">
        <ReactSelect
          className="basic-single"
          classNamePrefix="select"
          defaultValue={Languages[0]}
          // isDisabled={isDisabled}
          // isLoading={isLoading}
          isClearable={true}
          // isRtl={isRtl}
          isSearchable={true}
          name="color"
          options={Languages}
          onChange={(e) => {
            setData({
              ...Data,
              src_lang: e.value,
            });
          }}
        />
        <textarea
          name=""
          id=""
          className="textd"
          value={Data.text}
          placeholder="Enter text here... "
          onChange={(e) => {
            setData({ ...Data, text: e.target.value });
          }}
        ></textarea>
        <button
          disabled={output === "Loading..."}
          onClick={() => {
            translate();
          }}
        >
          {" "}
          Translate
        </button>
      </div>
      <div className="output">
        <ReactSelect
          className="basic-single"
          classNamePrefix="select"
          defaultValue={Languages[1]}
          // isDisabled={isDisabled}
          // isLoading={isLoading}
          isClearable={true}
          // isRtl={isRtl}
          isSearchable={true}
          name="color"
          options={Languages}
          onChange={(e) => {
            setData({
              ...Data,
              tras_lang: e.value,
            });
          }}
        />
        <div className="textd"> {output}</div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
