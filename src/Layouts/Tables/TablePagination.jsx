import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const MUITablePagination = (props) => {
    const {
        count,
        rowsPerPage,
        onRowsPerPageChange,
        rowsPerPageOptions,
    } = props;

    const PREFIX = "ListPickups";

    const classes = {
        background: `${PREFIX}-background`,
    };

    const Root = styled("div")(({ theme }) => ({
        [`& .${classes.background}`]: {
            "& .MuiTablePagination-toolbar": {
                padding: theme.spacing(0, 2),
                overflowY: "hidden",
                height: "100% !important",
                minHeight: "100% !important",
                "&::-webkit-scrollbar": {
                    height: "8px",
                }
            },
        },
    }));

    return (
        <Root>
            <TablePagination
                className={classes.background}
                sx={{
                    height: "40px",
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                    {
                        margin: 0,
                    },
                }}
                labelRowsPerPage={""}
                rowsPerPageOptions={rowsPerPageOptions ?? [20, 50, 100]}
                component="div"
                count={count ? count : 15}
                rowsPerPage={rowsPerPage}
                page={0}
                onPageChange={() => { }}
                onRowsPerPageChange={onRowsPerPageChange}
                ActionsComponent={() => null}
            />
        </Root>
    );
};

MUITablePagination.propTypes = {
    count: PropTypes.number,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    rowsPerPageOptions: PropTypes.array,
};

export default MUITablePagination;
