import React from 'react';
import { TextField, Grid } from '@mui/material';
import SyntaxUtils from '../../helpers/SyntaxUtils';
import VariableTags from './VariableTags';

function VariableSummary({ dict, name }) {
  const details = dict[name];
  const { Source, Value, Condition } = details;

  let displayValue = Value;
  if (Source === 'progressive_calculation') {
    displayValue = details.Stages[details.Stages.length - 1].Value;
  }

  let conditionDesc = '';
  if (Condition) {
    const formulaDesc = SyntaxUtils.parseFormula(dict, Condition.Formula);
    conditionDesc = `If: ${formulaDesc}`;
  }

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          placeholder=""
          value={name}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Source"
          placeholder=""
          value={details.Source}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Value"
          placeholder=""
          value={displayValue}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <VariableTags dict={dict} name={name} />
      </Grid>
      {!conditionDesc ? ''
        : (
          <>
            <Grid item xs={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              ---- Calculated Under Condition ----
            </Grid>
            <Grid item xs={12}>
              <span dangerouslySetInnerHTML={{ __html: conditionDesc }} />
            </Grid>
          </>
        )}
    </>
  );
}

export default VariableSummary;
