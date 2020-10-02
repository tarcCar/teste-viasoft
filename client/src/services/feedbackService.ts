import axios from 'axios';
import { Feedback } from '../types/feedback';

export const getAllFeedback = async ():Promise<Feedback[]> => {
  try {
    const resposta = await axios.get('/api/feedback');
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};

export const saveFeedback = async (feedback:Feedback):Promise<Feedback> => {
  try {
    const resposta = await axios.post('/api/feedback', feedback);
    const { data } = resposta;
    return data;
  } catch (error) {
    console.log(error);

    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};

export const updateFeedback = async (feedback:Feedback):Promise<void> => {
  try {
    await axios.put(`/api/feedback/${feedback.id}`, feedback);
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};

export const getFeedbackById = async (id:string):Promise<Feedback> => {
  try {
    const resposta = await axios.get(`/api/feedback/${id}`);
    const { data } = resposta;
    return data;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};
