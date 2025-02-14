import { Avatar, Grid2 as Grid, Icon, Paper, Stack, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner';
import LoadingPage from '../../Components/LoadingPage';
import NodataFound from '../../Components/NodataFound';
import { KeyValue } from '../../Components/Custom/KeyValue';
import { FixedTableCell } from '../../Layouts/Tables/FixedTableCell';
import TableData from '../../Layouts/Tables/TableData';
import ListPaper from '../../Layouts/Tables/ListPaper';
import { Launch } from '@mui/icons-material';

const RefundOrdersView = () => {
    const { id } = useParams(); // Get ID from URL
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/refundOrders.json")
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                const refundOrder = data.find((order) => order.id === id);

                if (refundOrder) {
                    setData(refundOrder);
                } else {
                    toast.error("Order not found");
                }
            })
            .catch(() => {
                toast.error("Error fetching refund orders");
                setLoading(false);
            });
    }, [id]);

    const tableCellHeader = [
        "id",
        "name",
        "quantity",
        "price",
    ]

    if (loading) {
        return <LoadingPage />
    }

    if (!data) {
        return <NodataFound />
    }

    return (
        <Stack spacing={2}>
            <Paper component={Grid} padding={2} container>
                <KeyValue
                    title={"id"}
                    value={data.id}
                />
                <KeyValue
                    title={"decision"}
                    value={data.decision}
                />
                <KeyValue
                    title={"store name"}
                    value={data.store_name}
                />
                <KeyValue title={"store url"}>
                    <a href={data.store_url} target="_blank" rel="noreferrer">
                        <Launch color='primary' />
                    </a>
                </KeyValue>
                <KeyValue title={"store logo"}>
                    <Avatar>
                        <img src={data.store_logo} alt={data.store_name} />
                    </Avatar>
                </KeyValue>
                <KeyValue
                    title={"reason"}
                    value={data.reason}
                />
                <KeyValue
                    title={"amount"}
                    value={data.amount}
                />
                <KeyValue
                    title={"active"}
                    value={data.active ? (
                        <Icon color="success">
                            check_circle_outline
                        </Icon>
                    ) : (
                        <Icon color="error">highlight_off</Icon>
                    )}
                />
            </Paper>
            <ListPaper loading={loading} data={!!(data && data.items.length > 0)} minHeight={"250px"}>
                <TableData
                    tableCellHeader={tableCellHeader}
                    loading={loading}
                    tableBody={
                        data.items.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <FixedTableCell>
                                        {row.id}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.name}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.quantity}
                                    </FixedTableCell>
                                    <FixedTableCell>
                                        {row.price}
                                    </FixedTableCell>
                                </TableRow>
                            );
                        })
                    }
                />
            </ListPaper>
        </Stack>
    )
}

export default RefundOrdersView