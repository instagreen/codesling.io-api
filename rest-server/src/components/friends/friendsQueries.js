import { globalQueryHelper } from '../../lib/components/globals';
import {
  addFriendHelper,
  removeFriendHelper,
  fetchAllFriendsHelper
} from './friendsSQLHelpers';

export const friendQuery = async (payload, url) => {
  console.log(payload, url);
  if (url === '/addFriend') {
    return await globalQueryHelper(payload, addFriendHelper, 'addFriendQuery');
  } else if (url.includes('/deleteFriend')) {
    return await globalQueryHelper(payload, removeFriendHelper, 'deleteFriendQuery');
  } else {
    return await globalQueryHelper(payload, fetchAllFriendsHelper, 'fetchAllFriendQuery');
  }
};
