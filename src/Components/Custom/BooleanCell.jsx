import { Icon } from '@mui/material'
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types'

const Root = styled(Icon)(({ theme }) => ({
    color: theme.palette.success.main,
}));

const BooleanCell = ({ value }) => {
    return (
        value ? (
            <Root fontSize='small'>
                check_circle_outline
            </Root>
        ) : (
            <Icon fontSize='small' color="error">highlight_off</Icon>
        )
    )
}

export default BooleanCell

BooleanCell.propTypes = {
    value: PropTypes.bool
};