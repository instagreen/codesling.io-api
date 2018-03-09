import express from 'express';

import {
  fetchAllUserController,
  fetchUsersFromSearch
} from './userControllers';

const router = express.Router();

router.route('/fetchAllUsers')
  .get(fetchAllUserController);

router.route('/getUser/:email')
  .get(fetchUsersFromSearch);

export default router;
