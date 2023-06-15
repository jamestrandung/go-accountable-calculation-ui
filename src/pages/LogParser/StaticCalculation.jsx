import React from 'react';
import { Grid } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import SyntaxUtils from '../../helpers/SyntaxUtils';
import FormulaUtils from '../../helpers/FormulaUtils';

function StaticCalculation({ dict, name }) {
  const details = dict[name];

  return (
    <Grid item xs={12}>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem
          style={{ padding: '4px 0px' }}
          key={name}
          nodeId={name}
          label={<span dangerouslySetInnerHTML={{ __html: `${FormulaUtils.createVariableShortDesc(name, dict[name].Value)} = ${SyntaxUtils.parseFormula(dict, details.Formula)}` }} />}
        />
      </TreeView>
    </Grid>
  );
}

export default StaticCalculation;
