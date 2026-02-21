import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="min-h-screen bg-[#0b2d3b] flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-white">
          {" "}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-600">
              Generate a Password
            </h1>
          </div>
          <div className="flex items-center bg-gray-200 rounded-md overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-full px-4 py-4 text-gray-800 outline-none bg-gray-200"
            />
            <button
              onClick={copyPasswordToClipboard}
              className="px-4 text-green-600 hover:text-green-800 transition"
            >
              📋
            </button>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            {" "}
            <div className="flex flex-col">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="mt-2 font-medium">Length: {length}</label>{" "}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="ml-2 font-medium">
                Number
              </label>{" "}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className="ml-2 font-medium">
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
