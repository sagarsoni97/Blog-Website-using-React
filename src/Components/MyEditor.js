import React, { useState, useEffect } from 'react';
import { Editor,  } from 'react-draft-wysiwyg';
import { EditorState} from 'draft-js';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToRaw} from 'draft-js';
 
export default function MyEditor() {

  const [title, setTitle] = useState('')

  console.log(title);

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const [body, setBody] = useState([])
  
  console.log(body);

  var convertedData = convertToRaw(editorState.getCurrentContent())

  const textData = () =>{
    var body = (convertedData.blocks.map((item)=>item.text))
    setBody(body)
  }
  

  useEffect(() => {
    textData()
  }, [])
  
  return (
    <div style={styles.editor}>
      <Editor
      placeholder="hiygjh"
       editorState={editorState}
       wrapperClassName="demo-wrapper"
       editorClassName="demo-editor"
       onEditorStateChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};
 