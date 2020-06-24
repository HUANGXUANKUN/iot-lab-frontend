import React from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';

function LinkButton(props){
  let history = useHistory();

  function handleClick() {
    history.push(props.link);
  }

  return (
    <Button color="inherit" onClick={handleClick}>
      {props.text} 
    </Button>
  );
}

export default LinkButton;