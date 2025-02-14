import { memo } from "react";
import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import * as colors from "@mui/material/colors";
import { FixedTableCell } from "../../Layouts/Tables/FixedTableCell";
import PropTypes from 'prop-types';


const StyledFixedTableCell = styled(Chip, {
    shouldForwardProp: (prop) => prop !== "colorCode",
})(({ theme, colorCode }) => ({
    color: theme.palette.getContrastText(colorCode),
    backgroundColor: `${colorCode} !important`,
}));

const TableCellColor = ({ cell, table = true }) => {
    const color = {
        reject: colors["red"]["500"],
        accept: colors["green"]["500"],
        escalate: colors["orange"]["500"]
    };

    // Determine color code based on shipment status or default to brown
    const cellCode = cell?.code;
    const colorCode = cellCode && color[cellCode] ? color[cellCode] : colors["brown"]["500"];

    if (!cellCode) {
        return <FixedTableCell />
    }

    return table ? (
        <FixedTableCell>
            <StyledFixedTableCell
                colorCode={colorCode}
                size="small"
                label={cell.label}
            />
        </FixedTableCell>
    ) : (
        <StyledFixedTableCell
            colorCode={colorCode}
            size="small"
            label={cell.label}
        />
    );
}

TableCellColor.propTypes = {
    cell: PropTypes.object,
    table: PropTypes.bool,
};

export default memo(TableCellColor);
