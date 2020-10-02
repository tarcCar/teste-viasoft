import { FeedbackActionsTypes } from './feedbackActionsTypes';
import {
  getAllFeedback, getFeedbackById, saveFeedback, updateFeedback,
} from '../../../services/feedbackService';
import { Feedback } from '../../../types/feedback';

const setGetFeedbacks = (
  feedbacksDoUsuario: Feedback[], feedbacksParaUsuario:Feedback[],
): FeedbackActionsTypes => (
  { type: 'GET_FEEDBACKS', feedbacksDoUsuario, feedbacksParaUsuario }
);
const setGetFeedbacksErro = (error: string): FeedbackActionsTypes => ({ type: 'GET_FEEDBACKS_ERRO', error });
const setGetFeedbacksLoading = (loading: boolean): FeedbackActionsTypes => ({ type: 'LOADING_GET_FEEDBACKS', loading });

const setSaveFeedback = (feedback: Feedback): FeedbackActionsTypes => ({ type: 'SAVE_FEEDBACK', feedback });
const setSaveFeedbackErro = (error: string): FeedbackActionsTypes => ({ type: 'SAVE_FEEDBACK_ERRO', error });
const setSaveFeedbackLoading = (loading: boolean): FeedbackActionsTypes => ({ type: 'LOADING_SAVE_FEEDBACK', loading });

const setUpdateFeedback = (feedback: Feedback): FeedbackActionsTypes => ({ type: 'UPDATE_FEEDBACK', feedback });

const setGetFeedbackById = (feedback: Feedback): FeedbackActionsTypes => ({ type: 'GET_FEEDBACK_BY_ID', feedback });
const setGetFeedbackByIdErro = (error: string): FeedbackActionsTypes => ({ type: 'GET_FEEDBACK_BY_ID_ERRO', error });
const setGetFeedbackByIdLoading = (loading: boolean): FeedbackActionsTypes => ({ type: 'LOADING_GET_FEEDBACK_BY_ID', loading });

export const getFeedbacksAction = (idUsuario:number): any => async (dispatch: any) => {
  try {
    dispatch(setGetFeedbacksLoading(true));
    const feedbacks = await getAllFeedback();
    const feedbacksDoUsuario = feedbacks.filter((f) => f.usuarioOrigem?.id === idUsuario);
    const feedbacksParaUsuario = feedbacks.filter((f) => f.usuarioDestino?.id === idUsuario);
    dispatch(setGetFeedbacks(feedbacksDoUsuario, feedbacksParaUsuario));
  } catch (error) {
    console.log(error);
    dispatch(setGetFeedbacksErro(error.message));
  }
};

export const saveFeedbacksAction = (feedback:Feedback): any => async (dispatch: any) => {
  try {
    dispatch(setSaveFeedbackLoading(true));
    if (feedback.id) {
      const novoFeedback = await saveFeedback(feedback);
      dispatch(setSaveFeedback(novoFeedback));
    } else {
      await updateFeedback(feedback);
      dispatch(setUpdateFeedback(feedback));
    }
  } catch (error) {
    console.log(error);
    dispatch(setSaveFeedbackErro(error.message));
  }
};

export const getFeedbacByIdkAction = (id:string): any => async (dispatch: any) => {
  try {
    dispatch(setGetFeedbackByIdLoading(true));
    const novoFeedback = await getFeedbackById(id);
    dispatch(setGetFeedbackById(novoFeedback));
  } catch (error) {
    console.log(error);
    dispatch(setGetFeedbackByIdErro(error.message));
  }
};
