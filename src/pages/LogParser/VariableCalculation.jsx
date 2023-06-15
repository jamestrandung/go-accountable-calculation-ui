import React from 'react';
import { TextField, Grid } from '@mui/material';
import FormulaDesc from './FormulaDesc';

function VariableCalculation({ dict, name, onUpdateDict }) {
  const details = dict[name];

  return (
    <>
      <ExternalOperation details={details} />
      <FormulaDesc dict={dict} name={name} onUpdateDict={onUpdateDict} />
    </>
  );
}

function ExternalOperation({ details }) {
  if (details.Operation == null || details.Operation === '') {
    return '';
  }

  const operation = details.Operation;

  return (
    <>
      <Grid item xs={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
        ---- External Operation ----
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          placeholder=""
          value={operation.Name}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      {
        Object.keys(operation.Params).map((name) => (
          <Grid key={name} item xs={6}>
            <TextField
              fullWidth
              label={name}
              placeholder=""
              value={operation.Params[name]}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        ))
      }
    </>
  );
}

export default VariableCalculation;
