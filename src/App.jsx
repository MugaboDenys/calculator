import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');
  const [answer, setAnswer] = useState(false)
  
  const handleChange = (event) =>{
    setInputValue(prevDisp => (prevDisp,event.target.value))
    
  }

  const clearScreen = () =>{
    setInputValue("")
  }
  
  const handleButtonClick = (key) => {
    if(key === '+/-'){
      setInputValue(prevInput=> prevInput * -1)
      return
    } else if( key === "%"){
          setInputValue(prevInput => prevInput / 100)
          return
    } else if(key === "AC"){
      clearScreen()
      return
    } else if(key === "x"){
          key = "*"
    }
    if (key === '=') {
      try {
        const result = evaluateExpression(previousValue, operator, inputValue);
        setInputValue(result.toString());
        setAnswer(true);
        setPreviousValue('');
        setOperator('');
      } catch (error) {
        setInputValue('Error');
        setPreviousValue('');
        setOperator('');
      }
    } else if (isOperator(key)) {
      setOperator(key);
      setPreviousValue(inputValue);
      setInputValue('');
    } else {
      if(inputValue.charAt(0) == 0 || inputValue.charAt(0) == "."){
        setInputValue(key);
        return
      }
      if(answer){
        setInputValue(key);
        setAnswer(false)
      } else{
        setInputValue(inputValue + key);
      }
    }
  };

  const isOperator = (char) => {
    return ['+', '-', '*', '/'].includes(char);
  };

  const evaluateExpression = (previousValue, operator, currentValue) => {
    if (!operator || !previousValue) {
      return currentValue;
    }

    switch (operator) {
      case '+':
        return parseFloat(previousValue) + parseFloat(currentValue);
      case '-':
        return parseFloat(previousValue) - parseFloat(currentValue);
      case '*':
        return parseFloat(previousValue) * parseFloat(currentValue);
      case '/':
        return parseFloat(previousValue) / parseFloat(currentValue);
      case '%':
        return parseFloat(previousValue) % parseFloat(currentValue);
      case '+/-':
        return setInputValue(prevInput=> prevInput * -1)
      default:
        throw new Error('Invalid operator');
    }
  };

  const characters = ["AC","+/-", "%", "/", "7", "8", "9","x", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
  return (
    <div className="flex justify-center mt-32">
      <div className="w-72">
        <input value={inputValue} disabled={true} onChange={handleChange} className="bg-[#7a7b88] text-white text-2xl w-full py-4 text-end px-2 outline-none"/>
        <div className="grid grid-cols-4">
          {characters.map((item, index)=>(
            <button key={index}  onClick={()=>handleButtonClick(item)} className={`py-6 border font-semibold text-xl ${index == 3 || index == 7 || index == 11 || index == 15  || index == 18 ? 'bg-[#ec873d] text-white' : "bg-[#dbdbdb]"} ${index == 16 && "col-span-2"}`}>{item}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
