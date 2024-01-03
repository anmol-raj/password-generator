/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-=";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    // passwordRef.current?.
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  return (
    <div className=" container ">
      <h1 className="text-4xl text-center font-semibold ">
        Password Generator
      </h1>
      <div className="my-4 rounded-md bg-white border ">
        <div className="flex flex-col mb-5 w-full  mb-1 items-center  ">
          <div className="px-4 py-3.5 w-full flex justify-between text-sm font-normal text-gray-700">
            <p>Password</p>
            <button
              type="button"
              onClick={copyPassword}
              className="rounded-md px-2  text-sm font-semibold shadow-sm hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Copy
            </button>
          </div>
          <input
            type="text"
            value={password}
            className="outline-none text-center text-2xl w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
        </div>
        <div className="flex cursor-pointer w-full gap-3 flex-col p-4 pb-5 items-center rounded-md bg-white">
          <div className=" flex items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer rounded  text-black focus:ring-black"
            />
            <label className="ml-3 cursor-pointer text-sm font-medium text-gray-900">
              Length:({length})
            </label>
          </div>
          <div className="flex gap-4">
            <div className=" flex items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="h-4 w-4 cursor-pointer rounded  text-black focus:ring-black"
              />
              <label className="ml-3 cursor-pointer text-sm font-medium text-gray-900">
                Numbers
              </label>
            </div>
            <div className=" flex items-center">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="h-4 w-4 cursor-pointer rounded  text-black focus:ring-black"
              />
              <label className="ml-3 cursor-pointer text-sm font-medium text-gray-900">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
