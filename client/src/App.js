
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

  let fileReader;


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

  const onChange = e => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      editorRef.current.setValue(text);
    };
    reader.readAsText(e.target.files[0])
  };

  const saveFile = async () => {
    const blob = new Blob([editorRef.current.getValue()], {type : 'application/plain'});
    const a = document.createElement('a');
    a.download = 'archivo.cst';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  function limpiar() {
    editorRef.current.setValue(" ")
    document.getElementById('terminal').value = " "
    ast = "graph G{}"
    tabla = "graph G{}"
    errores = "graph G{}"

    document.getElementById('update').click()
  }


  return (
    
    <div class="main-div">

      <div class="titulo">Compscript</div>

      <div class='wrapper'>
        <div class='row'>
          <div class='column'>
            <button class="button" onClick={limpiar} >Nuevo Archivo</button>
          </div>
          <div class='column'>
              <input id="fileInput" type="file" onChange={onChange} style={{ display: "none" }} />
              <button onClick={() => document.getElementById('fileInput').click()} class="button" >Cargar Archivo</button>
          </div>
          <div class='column'>
            <button onClick={saveFile} class="button" >Guardar Archivo</button>
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
            <button id="update" style={{ display: "none" }} onClick={forceUpdate}></button>
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
