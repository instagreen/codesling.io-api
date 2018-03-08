import express from 'express';

import {
  addTestCaseController,
  getTestCaseController
} from './testCasesControllers';

const router = express.Router();

router.route('/')
  .post(addTestCaseController);

//testing
router.route('/:challenge_id')
  .get(getTestCaseController);

export default router;
