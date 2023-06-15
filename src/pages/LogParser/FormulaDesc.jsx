import React from 'react';
import { Grid } from '@mui/material';
import Source from '../../helpers/Source';
import StaticCalculation from './StaticCalculation';
import ProgressiveCalculation from './ProgressiveCalculation';
import DependentCalculation from './DependentCalculation';

function FormulaDesc({ dict, name, onUpdateDict }) {
  const details = dict[name];

  if (details.Source === Source.StaticFormula) {
    return (
      <>
        <Grid item xs={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          ---- Static Calculation ----
        </Grid>
        <StaticCalculation dict={dict} name={name} />
      </>
    );
  }

  if (details.Source === Source.ProgressiveFormula) {
    return (
      <>
        <Grid item xs={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          ---- Progressive Calculation ----
        </Grid>
        <ProgressiveCalculation dict={dict} name={name} />
      </>
    );
  }

  if (details.Source === Source.DependentCalculation) {
    return (
      <>
        <Grid item xs={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          ---- Local Calculation Dependency ----
        </Grid>
        <DependentCalculation dict={dict} name={name} onUpdateDict={onUpdateDict} />
      </>
    );
  }

  return '';
}

export default FormulaDesc;
