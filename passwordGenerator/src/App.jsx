import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNumb] = useState(false);
  const [chars, setChars] = useState(false);
  const [pass, setPass] = useState("");
  const passRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "{}[]~!?@-+_./%#$*";

    if (num) {
      str += numbers;
      pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    if (chars) {
      str += specialChars;
      pass += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    }

    for (let i = pass.length; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }
    setPass(pass);
  }, [length, num, chars]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, num, chars, PasswordGenerator]);
  
  const copytoclip = useCallback(() => {
    if (passRef.current) {
      passRef.current.select();
      passRef.current.setSelectionRange(0, pass.length);
      navigator.clipboard.writeText(pass).then(() => {
        alert("Password copied to clipboard!");
      });
    }
  }, [pass]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full max-w-md mx-auto shadow-xl shadow-slate-900 rounded-lg px-4 py-3 my-8 text-emerald-300 bg-slate-600 h-48">
        <h1 className="text-white text-3xl text-center font-black my-3">Password Generator</h1>
        <div className="flex shadow-xl rounded-xl overflow-hidden mb-4 mt-8 shadow-slate-900">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3 text-slate-950"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button 
            onClick={copytoclip}
            className="outline-none hover:bg-blue-500 active:bg-blue-900 bg-blue-700 text-white px-3 py-0.5 shrink-0 shadow-xl shadow-blue-400"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm mt-8 gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={7}
              max={15}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(Number(e.target.value)); }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={num}
              className="cursor-pointer"
              onChange={() => { setNumb((prev) => !prev); }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={chars}
              className="cursor-pointer"
              onChange={() => { setChars((prev) => !prev); }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
