import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import Pako from 'pako';
import VariableTable from './VariableTable';
import VariableDetails from './VariableDetails';
import TagExplorer from './TagExplorer';

const VIEW_VARIABLES = 'variables';
const VIEW_TAGS = 'tags';

function parseJSON(rawText) {
  try {
    return JSON.parse(rawText);
  } catch (ex) {
    // Do nothing
  }

  try {
    const gezipedData = atob(rawText);
    const gzipedDataArray = Uint8Array.from(gezipedData, (c) => c.charCodeAt(0));
    const ungzipedData = Pako.ungzip(gzipedDataArray);

    return JSON.parse(new TextDecoder().decode(ungzipedData));
  } catch (ex) {
    // Do nothing
  }

  return {};
}

function CalculationParser() {
  const [jsonLog, setJSONLog] = useState('');

  const [dictStack, setDictStack] = useState([]);
  const [selectedVarName, setSelectedVarName] = useState('');

  const [targetView, setTargetView] = useState(VIEW_VARIABLES);

  useEffect(() => {
    if (window.location.hash !== '') {
      setSelectedVarName(window.location.hash.substring(1));
    }
  }, []);

  const onUpdateDict = (newDict) => {
    setDictStack((stack) => [
      ...stack,
      {
        dict: newDict,
        prevSelectedVarName: selectedVarName,
      },
    ]);
  };

  window.onhashchange = () => {
    const selectedName = window.location.hash.substring(1);

    if (dictStack.length > 0) {
      console.log(dictStack[dictStack.length - 1].dict[selectedName]);
    }

    setSelectedVarName(selectedName);
  };

  const onClick = () => {
    const parsedJSON = parseJSON(jsonLog);
    if (parseJSON.length === 0) {
      alert('Please provide a valid JSON log!');
      return;
    }

    onUpdateDict(parsedJSON);
    setJSONLog('');
  };

  if (dictStack.length === 0) {
    return (
      <Grid container spacing={3} style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Grid item xs={12}>
          <TextField
            id="jsonLog"
            label="JSON Log"
            value={jsonLog}
            onChange={(e) => setJSONLog(e.target.value)}
            multiline
            rows={10}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }

  const onBack = () => {
    setDictStack((stack) => {
      window.location.hash = `#${stack[stack.length - 1].prevSelectedVarName}`;
      return stack.slice(0, -1);
    });
  };

  const onChangeView = (e, nextView) => {
    e.preventDefault();
    setTargetView(nextView);
  };

  const { dict } = dictStack[dictStack.length - 1];
  return (
    <Grid container spacing={3} style={{ marginTop: '10px', marginBottom: '20px' }}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
        {targetView === VIEW_VARIABLES ? (
          <Button variant="text" style={{ marginLeft: '20px' }} onClick={(e) => onChangeView(e, VIEW_TAGS)}>
            Extract Tags
          </Button>
        ) : (
          <Button variant="text" style={{ marginLeft: '20px' }} onClick={(e) => onChangeView(e, VIEW_VARIABLES)}>
            View Variables
          </Button>
        )}
      </Grid>
      {targetView === VIEW_VARIABLES ? (
        <>
          <Grid item xs={3}>
            <VariableTable dict={dict} />
          </Grid>
          <Grid item xs={9}>
            <VariableDetails dict={dict} name={selectedVarName} onUpdateDict={onUpdateDict} />
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <TagExplorer dict={dict} changeToViewVariables={(e) => onChangeView(e, VIEW_VARIABLES)} />
        </Grid>
      )}
    </Grid>
  );
}

export default CalculationParser;
