import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function VariableTable({ dict }) {
  const [selectedSource, setSelectedSource] = useState('All');
  const [availableSources, setAvailableSources] = useState([]);

  useEffect(() => {
    const sources = [...new Set(Object.keys(dict).map((name) => dict[name].Source))];
    sources.sort();
    sources.unshift('All');

    setAvailableSources(sources);
  }, [dict]);

  const varNames = Object.keys(dict);
  varNames.sort();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {
          availableSources.length === 0 ? '' : (
            <Select
              fullWidth
              value={selectedSource}
              label="Source"
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              {availableSources.map((source) => (
                <MenuItem key={source} value={source}>{source}</MenuItem>
              ))}
            </Select>
          )
        }
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer style={{ maxHeight: '75vh' }}>
            <Table>
              <TableBody>
                {varNames.filter((name) => selectedSource === 'All' || dict[name].Source === selectedSource).map((name) => (
                  <TableRow
                    key={name}
                    hover
                  >
                    <TableCell
                      onClick={() => {
                        window.location.hash = `#${name}`;
                      }}
                    >
                      {name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default VariableTable;
