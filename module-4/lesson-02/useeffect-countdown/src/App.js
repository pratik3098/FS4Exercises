import React from "react";
import "./App.css";

function App() {
  const Timer = () => {
    const [count, setCount] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const [startResumeText, setStartResumeText] = React.useState("Start")

    const toggle = () => {
      setIsActive(!isActive);
    };

    const resetBtnClick = () => {
      setIsActive(false)
      setStartResumeText("Start")
      setCount(0)
    }
    React.useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setCount(count => {
            return count + 1;
          });
        }, 1000);
      } else if (!isActive && count !== 0) {
        setStartResumeText("Resume")
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, count]);

    return (
      <div>
        <div className="count">{count}</div>
        <div>
          {/*Modify below for adding "Resunme"*/}
          <button onClick={toggle}> {isActive ? "Pause" : startResumeText} </button>
          {/*Add Reset button here*/}
          <button onClick={resetBtnClick}>Reset</button>
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      <h1> useEffect hook - countdown </h1>
      <Timer />
    </div>
  );
}

export default App;
