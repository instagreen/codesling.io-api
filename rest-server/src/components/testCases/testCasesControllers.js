import {
  addTestCaseQuery,
  getTestCaseQuery
} from './testCasesQuery';
import {
  success,
  error
} from '../../lib/log';

export const addTestCaseController = async (req, res) => {
  try {
    const data = await addTestCaseQuery(req.body);
    console.log('controller req.body', req.body);
    success('addTestCaseController - successfully added test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('addTestCaseController - error= ', err);
    res.status(404).send(err);
  }
};

// getTestCaseController
export const getTestCaseController = async (req, res) => {
  try {
    const data = await getTestCaseQuery(req.params);
    success('getTestCaseController - successfully getted test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('getTestCaseController - error= ', err);
    res.status(404).send(err);
  }
};


