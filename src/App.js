import React, { useEffect, useState } from "react"
import "./App.css"
import { NumericFormat } from "react-number-format";
function App() {
  const [input, setInput] = useState("")
  const [curState, setCurState] = useState("")
  const [total, setTotal] = useState(false)
  const [preState, setPreState] = useState("")
  const [operator, setOperator] = useState("")

  const addNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return

    /*if (total) {
      setPreState()
    }*/
    curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText)
  }
  useEffect(() => {
    setInput(curState)
  }, [curState])

  useEffect(() => {
    setInput("0")
  }, [])

  const operatorType = (e) => {
    setTotal(false)
    setOperator(e.target.innerText)

    if (curState === "") return
    if (preState !== "") {
      equal()
    } else {
      setPreState(curState)
      setCurState("")
    }
  }
  const equal = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true)
    }

    let cal
    switch (operator) {
      case "/":
        cal = parseFloat(preState) / parseFloat(curState)
        break

      case "+":
        cal = parseFloat(preState) + parseFloat(curState)
        break

      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState))
        break

      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState))
        break
    }

    setPreState(cal)
    setInput("")
    setCurState("")
    console.log(cal)
    console.log("prestate " + preState)
    console.log("curstate " + curState)
    console.log("operator " + operator)
    console.log("input " + input)
  }

  const reset = () => {
    setCurState("")
    setPreState("")
    setInput(0)
    setOperator("")
  }
  const del = () => {
    setCurState(curState.slice(0, -1))
  }
  const percent = () => {
    setInput(input / 100)
  }
  return (
    <>
      <div className="container">
        
        <div id='number' className="input">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>

        <div className="specialbtn">
          <button type="reset" className="special-btn" onClick={reset}>
            AC
          </button>
          <button className="special-btn" onClick={del}>
            Del
          </button>
          <button className="special-btn" onClick={percent}>
            %
          </button>
        </div>
        <div className="numbers">
          <button className="btn" innerText={1} onClick={addNum}>
            1
          </button>
          <button className="btn" innerText={2} onClick={addNum}>
            2
          </button>
          <button className="btn" innerText={3} onClick={addNum}>
            3
          </button>
          <button className="btn" innerText={4} onClick={addNum}>
            4
          </button>
          <button className="btn" innerText={5} onClick={addNum}>
            5
          </button>
          <button className="btn" innerText={6} onClick={addNum}>
            6
          </button>
          <button className="btn" innerText={7} onClick={addNum}>
            7
          </button>
          <button className="btn" innerText={8} onClick={addNum}>
            8
          </button>
          <button className="btn" innerText={9} onClick={addNum}>
            9
          </button>

          <button className="btn zero" innerText={0} onClick={addNum}>
            0
          </button>
          <button className="btn" onClick={addNum} innerText={"."}>
            .
          </button>
        </div>

        <div className="symbols">
          <button className="btn divide" onClick={operatorType} innerText={"/"}>
            /
          </button>

          <button className="btn add" innerText={"+"} onClick={operatorType}>
            +
          </button>
          <button className="btn multiply" innerText={"*"} onClick={operatorType}>
            x
          </button>
          <button className="btn subtract" innerText={"-"} onClick={operatorType}>
            -
          </button>
          <button className="btn equal" innerText={"="} onClick={equal}>
            =
          </button>
        </div>
      </div>
    </>
  )
}

export default App
