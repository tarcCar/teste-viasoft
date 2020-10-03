import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Feedback, PersonAdd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: any) => ({
  dial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const DialActionButtonHome: React.FC = () => {
  const [open, setOpen] = useState(false);

  const styles = useStyles();
  const history = useHistory();
  const handleClose = (to?: string) => {
    setOpen(false);
    if (to) history.push(to);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <SpeedDial
      icon={<SpeedDialIcon />}
      ariaLabel="Opções"
      onClose={() => {
        handleClose();
      }}
      onOpen={handleOpen}
      open={open}
      direction="up"
      className={styles.dial}
    >
      <SpeedDialAction
        icon={<Feedback />}
        tooltipTitle="Cadastrar Feedback"
        onClick={() => {
          handleClose("/feedback/cadastro");
        }}
      />
      <SpeedDialAction
        icon={<PersonAdd />}
        tooltipTitle="Cadastrar Usuario"
        onClick={() => {
          handleClose("/usuario/cadastro");
        }}
      />
    </SpeedDial>
  );
};

export default DialActionButtonHome;
