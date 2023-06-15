import React from 'react';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';

function DependentCalculation({ dict, name, onUpdateDict }) {
  const details = dict[name];

  const subCalculation = details.Calculation;
  const dependentField = details.DependentField;

  const onClick = () => {
    onUpdateDict(subCalculation);
  };

  return (
    <Grid item xs={12} style={{ textAlign: 'center' }}>
      <Link href={`#${dependentField}`} onClick={onClick}>
        {`View ${name}'s calculation`}
      </Link>
    </Grid>
  );
}

export default DependentCalculation;
