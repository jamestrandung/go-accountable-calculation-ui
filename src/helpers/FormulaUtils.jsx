import React from 'react';
import { Link } from '@mui/material';

const FormulaUtils = {
  createVariableShortDesc(name, value) {
    return `${name}[${value}]`;
  },
  createClickableVariableShortDesc(name, value) {
    return (
      <span>
        <Link href={`#${name}`}>{name}</Link>
        {`[${value}]`}
      </span>
    );
  },
};

export default FormulaUtils;
