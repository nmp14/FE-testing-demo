import React, { useState, useEffect } from 'react';
import './App.css';
import DetailPanel from './DetailPanel';
import { ldHook } from './utils';

function App(props) {
  const { name } = props;

  const [nameState, setNameState] = useState("");
  const [text, setText] = useState('default');
  const [loading, setLoading] = useState(true);

  const { disabled: isDisabled } = ldHook();

  useEffect(() => {
    // Some API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let newName = "";
    if (name) {
      newName = myFunction(name);
    }

    setNameState(newName);
  }, [name]);

  const myFunction = (nameVar) => {
    let skip = false;
    const res = nameVar.split('').map((letter) => {
      if (!skip) {
        skip = !skip;
        return letter.toUpperCase();
      }
      skip = !skip;
      return letter;
    });

    return res.join('');
  }

  const clickHandler = () => {
    setText('not default');
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <p>This is a super basic test</p>

      <p>Hi, my name is {nameState ? nameState : "undefined"}</p>

      <p>{text}</p>

      <div onClick={() => clickHandler()}>Click Me</div>

      {!isDisabled && <DetailPanel />}
    </div>
  );
}

export default App;
