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

    const Root = styled("div")(({theme}) => ({
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

    // const Languages = config.app.languages;
    // const lang = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : Languages[0];
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
                // labelRowsPerPage={""}
                // rowsPerPageOptions={rowsPerPageOptions ?? [20, 50, 100]}
                // component="div"
                // count={count ? count : 15}
                // rowsPerPage={rowsPerPage}
                // page={!count || count <= 0 ? 0 : page}

                // onRowsPerPageChange={onRowsPerPageChange}
                // ActionsComponent={undefined}

                labelRowsPerPage={""}
                rowsPerPageOptions={rowsPerPageOptions ?? [20, 50, 100]}
                component="div"
                count={count ? count : 15}
                rowsPerPage={rowsPerPage}
                page={0} // Always show the first page
                onPageChange={() => { }} // Prevent page changes
                onRowsPerPageChange={onRowsPerPageChange}
                ActionsComponent={() => null} // Hides the pagination buttons
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
