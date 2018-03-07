import {
  addUserChallengeQuery,
  fetchAllUserChallengesQuery
} from './usersChallengesQueries';
import {
  success,
  error
} from '../../lib/log';

export const addUserChallengeController = async (req, res) => {
  try {
    const data = await addUserChallengeQuery(req.body);
    success('addUserChallengeController - successfully added userChallenge ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('addUserChallengeController - error= ', err);
    res.status(404).send(err);
  }
};

export const fetchAllUserChallengesController = async (req, res) => {
  try {
    const data = await fetchAllUserChallengesQuery(req.params);
    success('fetchAllUserChallengesController - successfully fetched all user challenges ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchAllUserChallengesController - error= ', err);
    res.status(404).send(err);
  }
}
