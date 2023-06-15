/* eslint-disable max-len */
import React from 'react';
import { Button, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import TableSortLabel from '@mui/material/TableSortLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

function descendingComparator(a, b, orderBy) {
  return b[orderBy].localeCompare(a[orderBy]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TagExplorer({ dict, changeToViewVariables }) {
  const extractedTags = React.useMemo(() => {
    const result = [];

    Object.keys(dict).forEach((name) => {
      const details = dict[name];
      const tags = details.Tags;

      if (!tags) {
        return;
      }

      Object.keys(tags).forEach((tagName) => {
        result.push({
          name: tagName,
          owningVariable: name,
          details: tags[tagName],
        });
      });
    });

    return result;
  }, [dict]);

  if (extractedTags.length === 0) {
    return (<div>This calculation log does not contain any tags.</div>);
  }

  const [searchText, setSearchText] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [filteredTags, setFilteredTags] = React.useState([]);

  React.useEffect(() => {
    if (searchText === '') {
      setFilteredTags(extractedTags);
    }

    const matchingTags = extractedTags.filter((tag) => tag.name.toLowerCase().includes(searchText.toLocaleLowerCase())
             || tag.owningVariable.toLowerCase().includes(searchText.toLocaleLowerCase()));

    setFilteredTags(matchingTags);
  }, [searchText]);

  const onVariableClick = (e, varName) => {
    window.location.hash = `#${varName}`;
    changeToViewVariables(e);
  };

  const onClearSearch = (e) => {
    e.preventDefault();
    setSearchText('');
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        placeholder="Search"
        variant="standard"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: '400px', padding: '10px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        style={{ marginTop: '5px', marginLeft: '10px' }}
        onClick={(e) => onClearSearch(e)}
      >
        Clear
      </Button>

      <TableContainer style={{ maxHeight: '500px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: 'bold', width: '25%' }}
                sortDirection={orderBy === 'owningVariable' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'owningVariable'}
                  direction={orderBy === 'owningVariable' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'owningVariable')}
                >
                  Owning variable
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', width: '25%' }}
                sortDirection={orderBy === 'name' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTags.sort(getComparator(order, orderBy)).map((tag) => (
              <TableRow
                key={`${tag.owningVariable}.${tag.name}`}
                hover
              >
                <TableCell>
                  <Link href={`#${tag.owningVariable}`} onClick={(e) => onVariableClick(e, tag.owningVariable)}>
                    {tag.owningVariable}
                  </Link>
                </TableCell>
                <TableCell>
                  {tag.details.IsAccountableValue ? (
                    <Link href={`#${tag.name}`} onClick={(e) => onVariableClick(e, tag.name)}>
                      {tag.name}
                    </Link>
                  ) : tag.name }
                </TableCell>
                <TableCell>
                  {tag.details.Value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TagExplorer;
