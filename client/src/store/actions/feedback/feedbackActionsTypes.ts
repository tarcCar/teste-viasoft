import { Feedback } from '../../../types/feedback';

type GET_FEEDBACKS = {
    type: 'GET_FEEDBACKS';
    feedbacksDoUsuario: Feedback[],
    feedbacksParaUsuario: Feedback[]
  };
type GET_FEEDBACKS_ERRO = {
    type: 'GET_FEEDBACKS_ERRO';
    error: string;
  };
type LOADING_GET_FEEDBACKS= {
    type: 'LOADING_GET_FEEDBACKS';
    loading: boolean;
  };

type SAVE_FEEDBACK = {
    type: 'SAVE_FEEDBACK';
    feedback: Feedback;
  };
type SAVE_FEEDBACK_ERRO = {
    type: 'SAVE_FEEDBACK_ERRO';
    error: string;
  };
type LOADING_SAVE_FEEDBACK= {
    type: 'LOADING_SAVE_FEEDBACK';
    loading: boolean;
  };

type UPDATE_FEEDBACK = {
    type: 'UPDATE_FEEDBACK';
    feedback: Feedback;
  };
type GET_FEEDBACK_BY_ID = {
    type: 'GET_FEEDBACK_BY_ID';
    feedback: Feedback;
  };

type GET_FEEDBACK_BY_ID_ERRO = {
    type: 'GET_FEEDBACK_BY_ID_ERRO';
    error: string;
  };

type LOADING_GET_FEEDBACK_BY_ID= {
    type: 'LOADING_GET_FEEDBACK_BY_ID';
    loading: boolean;
  };

export type FeedbackActionsTypes =
    | GET_FEEDBACKS
    | GET_FEEDBACKS_ERRO
    | LOADING_GET_FEEDBACKS
    | SAVE_FEEDBACK
    | SAVE_FEEDBACK_ERRO
    | LOADING_SAVE_FEEDBACK
    | UPDATE_FEEDBACK
    | GET_FEEDBACK_BY_ID
    | GET_FEEDBACK_BY_ID_ERRO
    | LOADING_GET_FEEDBACK_BY_ID;
