import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/material/styles";
import { FixedTableCell } from '../../Layouts/Tables/FixedTableCell';
import MUITablePagination from '../../Layouts/Tables/TablePagination';
import ListPaper from '../../Layouts/Tables/ListPaper';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Avatar, FormControlLabel, IconButton, Stack, Switch, Tooltip, Typography } from '@mui/material';
import DecisionAction from './component/DecisionAction';
import { Launch, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import CellColor from '../../Components/Custom/CellColor';
import TableData from '../../Layouts/Tables/TableData';
import BooleanCell from '../../Components/Custom/BooleanCell';

const ListPageStyle = styled("div")(() => ({
    height: "100%",
}));

export default function RefundOrdersList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const rowsPerPage = 15;

    const handleChangePage = (event, page) => {
        setPage(page);
    };


    useEffect(() => {
        setLoading(true);
        fetch('/refundOrders.json')
            .then(response => response.json())
            .then(fullData => {
                setData(fullData);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Error fetching refund orders');
                setLoading(false);
            });
    }, []);

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
        "reason",
        "store name",
        "store logo",
        "store url",
        "amount",
        "active",
        "decision",
        "items count",
        "actions"
    ]

    return (
        <ListPageStyle>
            <ListPaper loading={loading} data={!!(data && data.length > 0)}>
                <TableData
                    tableCellHeader={tableCellHeader}
                    loading={loading}
                    tableBody={
                        data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          ).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <FixedTableCell>
                                        {row.id}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.reason}
                                    </FixedTableCell>
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
                                        {row.amount}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        <BooleanCell value={row.active} />
                                    </FixedTableCell>
                                    <CellColor cell={{ label: row.decision, code: row.decision }} />
                                    <FixedTableCell>
                                        {row.items.length}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                            <DecisionAction id={row.id} handleChangeDecision={handleChangeDecision} />
                                            <Stack minWidth={"83px"}>
                                                <FormControlLabel
                                                    sx={{ m: 0 }}
                                                    control={<Switch
                                                        checked={row.active}
                                                        onChange={(event) => handleChange(event, row.id)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                        size='small'
                                                    />}
                                                    labelPlacement="start"
                                                    label={
                                                        <Typography variant="body2" color="text.secondary">
                                                            {row.active ? "active" : "inactive"}
                                                        </Typography>
                                                    }
                                                />
                                            </Stack>
                                            <Tooltip title="order details">
                                                <IconButton
                                                    aria-label="visibility"
                                                    onClick={() => handleViewDetails(row.id)}
                                                >
                                                    <Visibility color='primary' />
                                                </IconButton>
                                            </Tooltip>

                                        </Stack>
                                    </FixedTableCell>
                                </TableRow>
                            );
                        })
                    }
                />
                <MUITablePagination
                    count={data?.length ?? 0}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </ListPaper>
        </ListPageStyle>
    );
}