import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/material/styles";
import { FixedTableCell } from '../../Layouts/Tables/FixedTableCell';
import MUITablePagination from '../../Layouts/Tables/TablePagination';
import ListPaper from '../../Layouts/Tables/ListPaper';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Avatar, IconButton, Stack, Switch } from '@mui/material';
import DecisionAction from './component/DecisionAction';
import { Launch, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import CellColor from '../../Components/Custom/CellColor';
import TableData from '../../Layouts/Tables/TableData';

const ListPageStyle = styled("div")(() => ({
    height: "100%",
}));

export default function RefundOrdersList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage, setPerPage] = useState(15);

    const handleChangeRowsPerPage = (event) => {
        setPerPage(+event.target.value);
    };

    useEffect(() => {
        fetch('/refundOrders.json')
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setData(data.slice(0, perPage)); // Get only the first 15 records
            })
            .catch(() => {
                toast.error('Error fetching refund orders');
                setLoading(false);
            });
    }, [perPage]);

    const handleChange = (event, id) => {
        setData(prev => {
            const newData = [...prev];
            const index = newData.findIndex(item => item.id === id);
            newData[index].active = event.target.checked;
            return newData;
        });
        toast.success('Order updated successfully');
    };

    const handleViewDetails = (id) => {
        navigate(`/refund-orders/${id}`);
    };

    const handleChangeDecision = (id, code) => {
        setData(prev => {
            const newData = [...prev];
            const index = newData.findIndex(item => item.id === id);
            newData[index].decision = code;
            return newData;
        });
        toast.success('Order updated successfully');
    };

    const tableCellHeader = [
        "id",
        "decision",
        "store name",
        "store logo",
        "store url",
        "reason",
        "amount",
        "items",
        "actions"
    ]

    return (
        <ListPageStyle>
            <ListPaper loading={loading} data={!!(data && data.length > 0)}>
                <TableData
                    tableCellHeader={tableCellHeader}
                    loading={loading}
                    tableBody={
                        data.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <FixedTableCell>
                                        {row.id}
                                    </FixedTableCell>
                                    <CellColor cell={{ label: row.decision, code: row.decision }} />
                                    <FixedTableCell>
                                        {row.store_name}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        <Avatar>
                                            <img
                                                src={row.store_logo}
                                                alt={row.store_name}
                                                height={"100%"}
                                                width={"100%"}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Avatar>
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        <a href={row.store_url} target="_blank" rel="noreferrer">
                                            <Launch color='primary' />
                                        </a>
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.reason}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.amount}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.items.length}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                            <IconButton
                                                aria-label="visibility"
                                                onClick={() => handleViewDetails(row.id)}
                                            >
                                                <Visibility color='primary' />
                                            </IconButton>
                                            <Switch
                                                checked={row.active}
                                                onChange={(event) => handleChange(event, row.id)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <DecisionAction id={row.id} handleChangeDecision={handleChangeDecision} />
                                        </Stack>
                                    </FixedTableCell>
                                </TableRow>
                            );
                        })
                    }
                />
                <MUITablePagination
                    count={data?.length}
                    page={0}
                    rowsPerPage={perPage}
                    rowsPerPageOptions={[15, 30, 50]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </ListPaper>
        </ListPageStyle>
    );
}