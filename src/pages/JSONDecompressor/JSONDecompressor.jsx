/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import Pako from 'pako';
import 'react-diff-view/style/index.css';
import BackToTop from 'react-back-to-top-button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ReactJson from 'react-json-view';
import { useInput } from '../../helpers/hooks';

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

function JSONDecompressor() {
  const rawJSON = useInput('');
  const [parsedJSON, setParsedJSON] = useState({});

  const decompressAndBeautify = useCallback(() => {
    const json = parseJSON(rawJSON.value);
    if (!json) {
      alert('JSON is not valid.');
      return;
    }

    setParsedJSON(json);
  }, [rawJSON.value]);

  return (
    <>
      <Grid container spacing={3} style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Grid item xs={12}>
          <TextField
            id="json"
            label="JSON"
            multiline
            rows={10}
            fullWidth
            {...rawJSON}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={decompressAndBeautify}>
            Decompress
          </Button>
        </Grid>
        <Grid item xs={12}>
          {Object.keys(parsedJSON).length === 0 ? '' : <ReactJson src={parsedJSON} theme="monokai" style={{ padding: '20px' }} />}
        </Grid>
      </Grid>
      <BackToTop
        showAt={500}
        speed={1500}
        easing="easeInOutQuint"
      >
        <Button variant="contained" startIcon={<ArrowUpwardIcon />}>
          Up
        </Button>
      </BackToTop>
    </>
  );
}

export default JSONDecompressor;
