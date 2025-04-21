import { useState, useEffect} from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");
  useEffect(() => {
    prism.highlightAll();
  }, []);
  async function reviewCode(){
    const response = await axios.post("http://localhost:3000/ai/get-review/", {code});
    console.log("Review response:", response.data);
    setReview(response.data);
}
async function getTime(){
  const response = await axios.post("http://localhost:3000/ai/get-time/", {code});
  console.log("Time response:", response.data);
  setReview(response.data);
}
async function getSpace(){
  const response = await axios.post("http://localhost:3000/ai/get-space/", {code});
  console.log("Space response:", response.data);
  setReview(response.data);
}
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6'>
      <header className='w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-gray-600 to-green-900 shadow-lg rounded-lg'>AI Code Reviewer</header>
      <div className='flex flex-row gap-6 w-full max-w-6xl'>
          <div className='w-1/2 h-full bg-gray-600 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
          <input type='file' accept='.js, .py, .css .cpp, .cs, .ts, .html, .json, .java' 
          onChange={handleFileUpload} className='mb-4 text-sm text-gray-400 rounded-lg cursor-pointer bg-gray-700 p-2 rounded-lg'></input>
          <div className='border border-gray-600 rounded-lg p-4 bg-gray-900'>
          <Editor value={code} onValueChange={(code) => setCode(code)}
              highlight={(code)=>prism.highlight(code, prism.languages.javascript, "python")}
              padding={10}
              style={{fontFamily: "Fira Code, monospace", fontsize: 16}}></Editor>
          </div>
          <button onClick={getTime} className='w-1/3 py-3 text-lg font-semibold text-white bg-gray-400 rounded-lg shadow-lg transform transition duration-300 hover:scale-105'>Time C</button>
          <button onClick={getSpace} className='w-1/3 py-3 text-lg font-semibold text-white bg-gray-400 rounded-lg shadow-lg transform transition duration-300 hover:scale-105'>Space C</button>
          <button onClick={reviewCode} className='w-1/3 py-3 text-lg font-semibold text-white bg-gray-400 rounded-lg shadow-lg transform transition duration-300 hover:scale-105'>Review Code</button>
          </div>
          <div className='w-1/2 h-full bg-gray-600 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
          <div className='w-1/2 h-full bg-gray-600 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
  <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
</div>

          </div>
      </div>
    </div>
  );
}

export default App
