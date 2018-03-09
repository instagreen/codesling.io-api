import db from '../../config/database';
import {
  addChallengeHelper,
  getChallengeHelper
} from './challengeSQLHelpers';
import {
  success,
  error
} from '../../lib/log';

export const addChallengeQuery = async (body) => {
  try {
    const queryString = addChallengeHelper(body);
    const data = await db.queryAsync(queryString);
    success('addChallengeQuery - successfully added challenge ', data);
    return data;
  } catch (err) {
    error('addChallengeQuery - error= ', err);
  }
};

export const getChallengeQuery = async (params) => {
  try {
    const queryString = getChallengeHelper(params);
    const data = await db.queryAsync(queryString);
    success('getChallengeQuery - successfully getted challenge ', data);
    return data;
  } catch (err) {
    error('getChallengeQuery - error= ', err);
  }
};
