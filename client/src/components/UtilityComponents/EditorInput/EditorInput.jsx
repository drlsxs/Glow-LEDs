// React
import React from "react";
// Styles
import './editor_input.css'
import { FlexContainer } from '../../ContainerComponents/index'


const EditorInput = (props) => {

  return (
    <input
      defaultValue={props.value}
      onChange={e => props.on_change_function(e.target.value)}
      className="editor_input"
      style={props.styles}
      id={props.id}
      placeholder={props.label}
      name={props.name} />
  );
}

export default EditorInput;
