import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./MainComponent.css";

const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  let hostname = ''

  const getAllNumbers = useCallback(async () => {
    // we will use nginx to redirect it to the proper URL
    const data = await axios.get("/api/get");
    console.log("This is the date :  ", data)
    setValues(data.data.rows.map(row => row.number));
  }, []);

  // Scrape Questions : 
  const scrapeQuestions = useCallback(
    async event => {
      event.preventDefault();

      await axios.post("/api/start_scrape", {
        value
      });

      setValue("");
      getAllNumbers();
    },
    [value, getAllNumbers]
  );


  useEffect(() => {
    getAllNumbers();
  }, []);

  return (
    <div>
      <button onClick={getAllNumbers}>Get all numbers</button>
      <br />
      <span className="title">Values</span>
      <div className="values">
        {values.map(value => (
          <div className="value">{value}</div>
        ))}
      </div>
      <form className="form" onSubmit={scrapeQuestions}>
        <label>Select recursion depth : </label>
        <input
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MainComponent;
