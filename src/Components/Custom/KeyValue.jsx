import { styled } from "@mui/material/styles";
import { Grid2 as Grid } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PREFIX = "KeyValuePair";

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  value: `${PREFIX}-value`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(0.5),
  },
  [`& .${classes.title}`]: {
    "&::first-letter": {
      textTransform: "capitalize",
    },
  },
}));

export const KeyValue = (props) => {
  const {
    title,
    value,
    xs = 12,
    sm = 6,
    md = 3,
    lg = 3,
    children,
    ...restProps
  } = props;

  return (
    <StyledGrid
      {...restProps}
      size={{
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
      }}
      className={classes.root}
    >
      <Typography variant="body1" color="text.secondary" className={classes.title}>
        {title}
      </Typography>
      <Stack
        className={classes.value}
      >
        {value !== null ? value : "ــــ"}
      </Stack>
      {children}
    </StyledGrid>
  );
};

KeyValue.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  dir: PropTypes.string,
  noDefaultStyle: PropTypes.bool,
  children: PropTypes.node,
};
