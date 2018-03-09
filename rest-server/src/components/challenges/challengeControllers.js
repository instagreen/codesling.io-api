import {
  addChallengeQuery,
  getChallengeQuery
} from './challengeQueries';
import {
  addUserChallengeQuery
} from '../usersChallenges/usersChallengesQueries';
import {
  success,
  error
} from '../../lib/log';

export const addChallengeController = async (req, res) => {
  try {
    /**
     * 
     */
    const { rows } = await addChallengeQuery(req.body);
    success('addChallengeController - successfully added challenge ', rows[0]);
    req.body.challenge_id = rows[0].id;
    await addUserChallengeQuery(req.body);
    success('addUserChallengeQuery - successfully added user challenge ');
    return res.status(200).send(rows[0]);
  } catch (err) {
    error('addChallengeController - error= ', error);
    res.status(404).send(err);
  }
};

export const getChallengeController = async (req, res) => {
  try {
    const data = await getChallengeQuery(req.params);
    success('getChallengeController - successfully getted test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('getChallengeController - error= ', error);
    res.status(404).send(err);
  }
};

