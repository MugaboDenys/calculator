import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState("")

  const handleChange = (event) =>{
    setDisplay(prevDisp => (prevDisp,event.target.value))
    console.log(display);
  }

  const clearScreen = () =>{
    setDisplay("")
  }
  const handleClick = (button) =>{
    if(button === "x"){
      button = "*"
    } else if( button === "%"){
      let answer = display / 100
      setDisplay(answer.toString())
    }
    if(button === "AC"){
      clearScreen()
    }
    // else if (button === '+' || button === '-' || button === '*' || button === '/') {
    //   setDisplay('');
    //   setDisplay(display + button);
    // }
    else if(button === "="){
      let answer = eval(display)
      setDisplay(answer.toString())
    }
    else{
      setDisplay(prevDisp=> (prevDisp + button))
    }
  }

  const characters = ["AC","+/-", "%", "/", "7", "8", "9","x", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
  return (
    <div className="flex justify-center mt-32">
      <div className="w-72">
        <input value={display} onChange={handleChange} className="bg-[#7a7b88] text-white text-2xl w-full py-4 text-end px-2 outline-none"/>
        <div className="grid grid-cols-4">
          {characters.map((item, index)=>(
            <button key={index}  onClick={()=>handleClick(item)} className={`py-6 border font-semibold text-xl ${index == 3 || index == 7 || index == 11 || index == 15 ? 'bg-[#ec873d] text-white' : "bg-[#dbdbdb]"} ${index == 16 && "col-span-2"}`}>{item}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
