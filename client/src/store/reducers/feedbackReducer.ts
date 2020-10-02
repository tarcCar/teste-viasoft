import { Feedback } from '../../types/feedback';
import { FeedbackActionsTypes } from '../actions/feedback/feedbackActionsTypes';

type FeedbackReducerType = {
    feedbacksDoUsuario: Feedback[],
    feedbacksParaUsuario: Feedback[],
    erroGetFeedBacks?: string,
    loadingGetFeedbacks: boolean,
    feedback?:Feedback,
    erroSaveFeedback?: string,
    loadingSaveFeedback: boolean,
    erroGetFeedBackById?: string,
    loadingGetFeedBackById: boolean,
  }

const INITIAL_STATE:FeedbackReducerType = {
  feedbacksDoUsuario: [],
  feedbacksParaUsuario: [],
  erroGetFeedBacks: undefined,
  loadingGetFeedbacks: false,
  feedback: undefined,
  erroSaveFeedback: undefined,
  loadingSaveFeedback: false,
  erroGetFeedBackById: undefined,
  loadingGetFeedBackById: false,
};

export default function FeedbackReducer(
  state = INITIAL_STATE,
  action: FeedbackActionsTypes,
): any {
  switch (action.type) {
    case 'GET_FEEDBACKS':
      return {
        ...state,
        feedbacksDoUsuario: action.feedbacksDoUsuario,
        feedbacksParaUsuario: action.feedbacksParaUsuario,
        erroGetFeedBacks: null,
        loadingGetFeedbacks: false,
      };
    case 'GET_FEEDBACKS_ERRO':
      return {
        ...state,
        feedBacks: [],
        erroGetFeedBacks: action.error,
        loadingGetFeedbacks: false,
      };
    case 'LOADING_GET_FEEDBACKS':
      return {
        ...state,
        loadingGetFeedbacks: action.loading,
      };
    case 'SAVE_FEEDBACK':
      return {
        ...state,
        feedback: action.feedback,
        feedbacksDoUsuario: [...state.feedbacksDoUsuario, action.feedback],
        erroSaveFeedback: null,
        loadingSaveFeedback: false,
      };
    case 'SAVE_FEEDBACK_ERRO':
      return {
        ...state,
        feedback: null,
        erroSaveFeedback: action.error,
        loadingSaveFeedback: false,
      };
    case 'LOADING_SAVE_FEEDBACK':
      return {
        ...state,
        loadingSaveFeedback: action.loading,
      };
    case 'UPDATE_FEEDBACK':
      return {
        ...state,
        feedback: action.feedback,
        feedbacksDoUsuario: [
          ...state.feedbacksDoUsuario.filter((f) => f.id !== action.feedback.id),
          action.feedback,
        ],
        erroSaveFeedback: null,
        loadingSaveFeedback: false,
      };
    case 'GET_FEEDBACK_BY_ID':
      return {
        ...state,
        feedback: action.feedback,
        erroGetFeedBackById: null,
        loadingGetFeedBackById: false,
      };
    case 'GET_FEEDBACK_BY_ID_ERRO':
      return {
        ...state,
        feedback: null,
        erroGetFeedBackById: action.error,
        loadingGetFeedBackById: false,
      };
    case 'LOADING_GET_FEEDBACK_BY_ID':
      return {
        ...state,
        loadingGetFeedBackById: action.loading,
      };
    default:
      return state;
  }
}
