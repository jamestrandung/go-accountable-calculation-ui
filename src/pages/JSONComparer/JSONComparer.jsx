/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import {
  parseDiff, Diff, Hunk,
} from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import { Button, TextField, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import 'react-diff-view/style/index.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BackToTop from 'react-back-to-top-button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useInput, useCheckbox } from '../../helpers/hooks';

function beautifyJSON(json) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (ex) {
    return '';
  }
}

function JSONComparer() {
  const json1 = useInput('');
  const json2 = useInput('');
  const [diffs, setDiffs] = useState([]);
  const [isIdentical, setIsIdentical] = useState(false);
  const limitContext = useCheckbox(true);
  const context = useInput(10);

  const updateDiffText = useCallback(() => {
    setIsIdentical(false);

    const beautifiedJSON1 = beautifyJSON(json1.value);
    if (!beautifiedJSON1) {
      alert('JSON 1 is not valid.');
      return;
    }

    const beautifiedJSON2 = beautifyJSON(json2.value);
    if (!beautifiedJSON2) {
      alert('JSON 2 is not valid.');
      return;
    }

    const diffText = formatLines(diffLines(beautifiedJSON1, beautifiedJSON2), { context: limitContext.checked ? context.value : 999999 });
    const parsedDiffs = parseDiff(diffText, { nearbySequences: 'zip' });
    setDiffs(parsedDiffs);
    setIsIdentical(parsedDiffs[0].hunks.length === 0);
  }, [json1.value, json2.value, limitContext.checked, context.value]);

  const renderDiff = ({
    oldRevision, newRevision, type, hunks,
  }) => (
    <Diff key={`${oldRevision}-${newRevision}`} viewType="split" diffType={type} hunks={hunks} optimizeSelection>
      {(innerHunks) => innerHunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
  );

  return (
    <>
      <Grid container spacing={3} style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Grid item xs={6}>
          <TextField
            id="json1"
            label="JSON 1"
            multiline
            rows={10}
            fullWidth
            {...json1}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="json2"
            label="JSON 2"
            multiline
            rows={10}
            fullWidth
            {...json2}
          />
        </Grid>
        <Grid item xs={12} container spacing={3} alignItems="center">
          <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" onClick={updateDiffText}>
              Generate Diff
            </Button>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked {...limitContext} />} label="Limit lines" />
            </FormGroup>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              {...context}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center" />
        <Grid item xs={12} container justifyContent="center">
          {!diffs || !diffs[0] || diffs[0].hunks.length === 0 ? '' : (<Card variant="outlined">{diffs.map(renderDiff)}</Card>)}
          {!isIdentical ? '' : (<Typography>The provided JSONs are identical.</Typography>)}
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

export default JSONComparer;
