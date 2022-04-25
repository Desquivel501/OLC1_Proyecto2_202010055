
import './App.css';
import Editor from "@monaco-editor/react";
import { useRef } from 'react';
// import {graphviz} from "d3-graphviz";
// import logo from './logo.png';
// import * as d3                    from 'd3'
// import * as d3Graphviz            from 'd3-graphviz'
import { Graphviz } from 'graphviz-react';

function App() {

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  let dot = `graph {
    grandparent -- "parent A";
    child;
    "parent B" -- child;
    grandparent --  "parent B";
  }`

  function enviar() {
  
    var command = editorRef.current.getValue()
    const jsonData = {
      "exp": String(command)
    }

    fetch('http://localhost:5000/', {  
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors', 
      body: JSON.stringify(jsonData)
    })
    .then(res => res.json())
    .then(response =>{
      console.log(response)
      document.getElementById('terminal').value = response.res
      
    })
  }

  function ast() {

    // graphviz(`#graphviz`).renderDot('digraph {a -> b}');

    var command = editorRef.current.getValue()
    const jsonData = {
      "exp": String(command)
    }

    fetch('http://localhost:5000/ast', {  
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors', 
      body: JSON.stringify(jsonData)
    })
    .then(res => res.json())
    .then(response =>{
      console.log(response)


      document.getElementById('terminal').value = response.res
      dot = response.res

    })
  }


  return (
    
    <div class="main-div">

      <div class="titulo">Editor de texto</div>

      <div class='wrapper'>
        <div class='row'>
          <div class='column'>
            <button class="button">Crear Archivo</button>
          </div>
          <div class='column'>
            <button class="button">Abrir archivo</button>
          </div>
          <div class='column'>
            <button class="button">Guardar el archivo</button>
          </div>
        </div>
      </div>

      <div class='wrapper_editor'>
        <div class='row'>
          <div class='column'>

            <Editor
              height="70vh"
              onMount={handleEditorDidMount}
              className={'rounded-xl'}
              theme= "vs-dark"
            />
            
          </div>
          <div class='column'>
              <textarea class="textarea" id = "terminal" readOnly={true}></textarea>
          </div>
        </div>
      </div>

      <div class='wrapper'>
        <div class='row'>
          <div class='column'>
            <button class="button" onClick={enviar}>Resultado</button>
          </div>
          {/* <div class='column'>
            <button class="button" onClick={ast}>Generar AST</button>
          </div>
          <div class='column'>
            <button class="button" >Tabla de Simbolos</button>
          </div> */}
        </div>
      </div>
{/* 
      <div class='wrapper' id="graphviz">
      <Graphviz classname = "canvas" dot={dot} />
      </div> */}


    </div>
  );
}

export default App;
