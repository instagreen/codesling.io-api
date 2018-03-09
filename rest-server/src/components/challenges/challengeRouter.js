import express from 'express';

import {
  addChallengeController,
  getChallengeController
} from './challengeControllers';

const router = express.Router();

router.route('/')
  .post(addChallengeController);

router.route('/:challenge_id')
  .get(getChallengeController);
  
export default router;
