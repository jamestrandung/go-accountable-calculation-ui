import React from 'react';
import { Grid } from '@mui/material';
import VariableSummary from './VariableSummary';
import VariableCalculation from './VariableCalculation';

function VariableDetails({ dict, name, onUpdateDict }) {
  const details = dict[name];

  if (details == null) {
    return (<div>Select a variable to view details.</div>);
  }

  return (
    <Grid container spacing={3}>
      <VariableSummary dict={dict} name={name} />
      <VariableCalculation dict={dict} name={name} onUpdateDict={onUpdateDict} />
    </Grid>
  );
}

export default VariableDetails;
