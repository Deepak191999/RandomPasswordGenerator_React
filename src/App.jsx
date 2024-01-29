import { useState, useCallback, useEffect ,useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef= useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += '!@#$%^&*()-=_+[]{}|;:",<>/?';
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]); //'setPassword' bs optimisation ke liye dala na ,need nhi thi

  const copyPassWordToClipBoard= useCallback(()=>{
    passwordRef.current?.select()  // yha hum jo pasword hai usko select all kra hai 'passwordRef' ko use krke , iske bina bhi code copy ho rh tha ,bs show nhi hoga ki kya copy hua hai
    // passwordRef.current?.setSelectionRange(0,4) // specific range select ho rh h
    window.navigator.clipboard.writeText(password)   //copy kra hai
  },[password])


  // passwordGenerator()  aise call nhi krskte isliye useeffect use kra

  //call the function  passwordGenerator(), jo item niche [] me hai uska mtlb hai in sb ke change me func run hoga
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);  // arr ka ismese koi bhi elemen tme change hua to ye useeffect run ho jayega

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4 py-12 my-8 text-orange-500 bg-gray-700 ">
        <h1 className="text-4xl text-center text-white pb-4 my-3">
          Password Generator
        </h1>

        <div className="flex rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            className="py-1 px-3 w-full outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef} // yha se ref liya 'line 10' se ab baat kr pa rh h, jo select hoga code uske liye ,ikha hai
          />
          <button
          onClick={copyPassWordToClipBoard} className="bg-blue-700 active:bg-blue-950 text-white px-4 py-1 outline-none  shrink-0 hover: cursor-pointer ">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
