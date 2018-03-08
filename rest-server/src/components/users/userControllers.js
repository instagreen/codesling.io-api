import db from '../../config/database';
import {
  fetchAllUserQuery,
  fetchUserQuery,
} from './userQueries';
import {
  success,
  error
} from '../../lib/log';

export const fetchAllUserController = async (req, res) => {
  try {
    const data = await fetchAllUserQuery();
    success('fetchAllUserController - successfully fetched data ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchAllUserController - error= ', error);
    res.status(404).send(err);
  }
};

export const fetchUsersFromSearch = async (req, res) => {
  try {
    const data = await fetchUserQuery(req.params.email);
    success('fetchUserQuery - successfully fetched data ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchAllUserController - error= ', error);
    res.status(404).send(err);
  }
}
