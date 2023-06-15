import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

function VariableTags({ dict, name }) {
  const details = dict[name];
  const tags = details.Tags;

  if (!tags) {
    return '';
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Tags</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer style={{ maxHeight: '500px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', width: '40%' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(tags).map((tagName) => (
                  <TableRow
                    key={tagName}
                    hover
                  >
                    <TableCell>
                      {tags[tagName].IsAccountableValue ? (
                        <Link href={`#${tagName}`}>
                          {tagName}
                        </Link>
                      ) : tagName }
                    </TableCell>
                    <TableCell>
                      {tags[tagName].Value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}

export default VariableTags;
