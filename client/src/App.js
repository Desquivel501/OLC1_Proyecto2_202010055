
import './App.css';
import Editor from "@monaco-editor/react";
import { useRef } from 'react';

function App() {

  const editorRef = useRef(null);

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
              theme="vs-dark"
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
        </div>
      </div>
    </div>
  );
}

export default App;
