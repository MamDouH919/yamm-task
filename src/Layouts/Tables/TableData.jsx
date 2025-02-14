import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TableBodyWithLoad from './TableBodyWithLoad';
import PropTypes from 'prop-types';

const TableData = ({
    tableCellHeader,
    loading,
    tableBody,
}) => {
    return (
        <TableContainer sx={{ width: "100%", overflow: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {tableCellHeader.map(e =>
                            <TableCell align={'left'} key={e}>
                                {e}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBodyWithLoad loading={loading} tableCellHeaderLength={tableCellHeader.length}>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </TableBodyWithLoad>
            </Table>
        </TableContainer>
    )
}

export default TableData

TableData.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    tableCellHeader: PropTypes.array,
    tableBody: PropTypes.node,
};