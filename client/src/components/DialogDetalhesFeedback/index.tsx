import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {
  format,
  parseISO,
} from 'date-fns';
import { Feedback } from '../../types/feedback';

type ModalDetalhesFeedbackProps ={
    feedback:Feedback,
    open:boolean,
    feedbackDoUsuario?:boolean,
    handleClose:()=>void
}

const useStyles = makeStyles(() => ({
  label: {
    width: '100%',
    fontSize: 18,
    marginRight: 15,
    fontWeight: 'bold',
  },
  valor: {
    width: '100%',
    fontSize: 18,
  },
  linha: {
    marginBottom: 10,
  },

}));

type CampoModalDetalhesFeedbackProps ={
  label:string,
  valor?:string
}

const CampoModalDetalhesFeedback: React.FC<CampoModalDetalhesFeedbackProps> = (
  { label, valor },
) => {
  const styles = useStyles();

  return (
    <Grid container className={styles.linha}>
      <Grid item xs={12} md={2}>
        <div className={styles.label}>
          {label}
        </div>
      </Grid>
      <Grid item xs={12} md={10}>
        <div className={styles.valor}>
          {valor}
        </div>
      </Grid>
    </Grid>
  );
};

const ModalDetalhesFeedback: React.FC<ModalDetalhesFeedbackProps> = (
  {
    feedback, feedbackDoUsuario, open, handleClose,
  },
) => {
  const styles = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Typography variant="h5">
          Detalhes do Feedback
        </Typography>
      </DialogTitle>
      <DialogContent>
        <CampoModalDetalhesFeedback
          label={feedbackDoUsuario ? 'Para quem:' : 'De Quem:'}
          valor={feedbackDoUsuario ? feedback.usuarioDestino?.nome : feedback.usuarioOrigem?.nome}
        />
        <CampoModalDetalhesFeedback
          label="Criado em:"
          valor={feedback.criadoEm ? format(parseISO(feedback.criadoEm), 'dd/MM/yyyy HH:mm:ss') : ''}
        />
        <CampoModalDetalhesFeedback
          label="Última Alteração:"
          valor={feedback.alteradoEm ? format(parseISO(feedback.alteradoEm), 'dd/MM/yyyy HH:mm:ss') : ''}
        />
        {feedback.pontosManter && feedback.pontosManter.length >= 0 && (
        <Grid container className={styles.linha}>
          <Grid item xs={12}>
            <div className={styles.label}>
              Pontos a Manter:
            </div>
          </Grid>

          {feedback.pontosManter.map((p) => (
            <Grid item xs={12} md={4} style={{ margin: 10 }}>
              <div className={styles.valor}>
                {`- ${p.descricao}`}
              </div>
            </Grid>
          ))}
        </Grid>
        )}
        {feedback.pontosMelhorar && feedback.pontosMelhorar.length >= 0 && (
        <Grid container className={styles.linha}>
          <Grid item xs={12}>
            <div className={styles.label}>
              Pontos a Melhorar:
            </div>
          </Grid>

          {feedback.pontosMelhorar.map((p) => (
            <Grid item xs={12} md={4} style={{ margin: 10 }}>
              <div className={styles.valor}>
                {`- ${p.descricao}`}
              </div>
            </Grid>
          ))}
        </Grid>
        )}
        <CampoModalDetalhesFeedback
          label="Sugestões"
          valor={feedback.sugestoes}
        />
        <CampoModalDetalhesFeedback
          label="Feedback"
          valor={feedback.feedBackFinal}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalDetalhesFeedback;
