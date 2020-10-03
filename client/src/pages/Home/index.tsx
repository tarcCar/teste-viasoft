import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardDataTableFeedback from '../../components/CardDataTableFeedback';
import { getFeedbacksAction } from '../../store/actions/feedback/feedbackActions';
import { RootState } from '../../store/reducers';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const feedbacksParaUsuario = useSelector(
    (state:RootState) => state.feedbackReducer.feedbacksParaUsuario,
  );

  const feedbacksDoUsuario = useSelector(
    (state:RootState) => state.feedbackReducer.feedbacksDoUsuario,
  );

  useEffect(() => {
    dispatch(getFeedbacksAction());
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <Grid>
        <Grid item>
          <CardDataTableFeedback titulo="Feedback que você fez" feedBacks={feedbacksDoUsuario} feedbacksDoUsuario />
        </Grid>
        <Grid item>
          <CardDataTableFeedback titulo="Feedback que foram feitos para você" feedBacks={feedbacksParaUsuario} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
