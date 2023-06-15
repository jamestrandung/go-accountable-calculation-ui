/* eslint-disable max-len */
import React from 'react';
import { Grid } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import FormulaUtils from '../../helpers/FormulaUtils';
import SyntaxUtils from '../../helpers/SyntaxUtils';

function buildProgressiveCalculationTree(nodes, dict, name, curIdx, endIdx, condIdx) {
  if (curIdx > endIdx) {
    return;
  }

  const details = dict[name];
  const stages = details.Stages;
  const conditions = details.Conditions;

  const hasConditions = conditions && conditions[curIdx] && condIdx < conditions[curIdx].length;

  if (hasConditions) {
    const condition = conditions[curIdx][condIdx];
    const formulaDesc = SyntaxUtils.parseFormula(dict, condition.Formula);
    const conditionDesc = `If: ${formulaDesc}`;

    const innerNodes = [];
    buildProgressiveCalculationTree(innerNodes, dict, name, curIdx, condition.CloseIfStageIdx, condIdx + 1);

    nodes.push(
      <TreeItem
        style={{ padding: '4px 0px' }}
        key={`node${curIdx}_${condIdx}`}
        nodeId={`node${curIdx}_${condIdx}`}
        label={<span dangerouslySetInnerHTML={{ __html: conditionDesc }} />}
      >
        {innerNodes}
      </TreeItem>,
    );

    buildProgressiveCalculationTree(nodes, dict, name, condition.CloseIfStageIdx + 1, endIdx, 0);

    return;
  }

  const stage = stages[curIdx];
  const formulaDesc = `${FormulaUtils.createVariableShortDesc(name, stage.Value)} = ${SyntaxUtils.parseFormula(dict, stage.Formula)}`;

  nodes.push(<TreeItem
    style={{ padding: '4px 0px' }}
    key={`node${curIdx}`}
    nodeId={`node${curIdx}`}
    label={<span dangerouslySetInnerHTML={{ __html: formulaDesc }} />}
  />);

  buildProgressiveCalculationTree(nodes, dict, name, curIdx + 1, endIdx, 0);
}

function ProgressiveCalculation({ dict, name }) {
  const details = dict[name];

  const nodes = [];
  buildProgressiveCalculationTree(nodes, dict, name, 0, details.Stages.length - 1, 0);

  return (
    <Grid item xs={12}>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {nodes}
      </TreeView>
    </Grid>
  );
}

export default ProgressiveCalculation;
