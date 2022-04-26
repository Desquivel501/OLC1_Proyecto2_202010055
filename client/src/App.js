
import './App.css';
import Editor from "@monaco-editor/react";
import { useRef } from 'react';
import React, {useState} from "react";
import { Graphviz } from "graphviz-react";

function useForceUpdate(){
  const [value, setValue] = useState(0); 
  return () => setValue(value => value + 1); 
}

let ast = "graph G{}"
let tabla = "graph G{}"
let errores = "graph G{}"

let Options = {
  fit: true,
  height: 700,
  width: 1000,
  zoom: true,
};

function App() {

  const forceUpdate = useForceUpdate();

  const editorRef = useRef(null);

  function Click(){
    enviar() 
    useForceUpdate()
  }
  

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

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

      ast = response.ast
      tabla = response.tabla
      errores = response.errores

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
            <button class="button" onClick={enviar} >Resultado</button>
          </div>
          <div class='column'>
            <button class="button" onClick={forceUpdate}>Generar Reportes</button>
          </div>
        </div>
      </div>

      <div class='wrapper_graph' id="graphviz">
        <div class="sub_titulo">AST</div>
        <Graphviz classname = "canvas" 
          dot={ast}
          options = {Options}
        />
      </div>

      <div class='wrapper_graph' id="graphviz">
        <div class="sub_titulo">Tabla de Simbolos</div>
        <Graphviz 
          classname = "canvas" 
          dot={tabla}
          options = {Options}
        />
      </div>

      <div class='wrapper_graph' id="graphviz">
        <div class="sub_titulo">Tabla de Errores</div>
        <Graphviz 
          classname = "canvas" 
          dot={errores}
          options = {Options}
        />
      </div>


    </div>
  );
}

export default App;
