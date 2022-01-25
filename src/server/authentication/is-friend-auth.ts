import { isNil } from 'lodash';
import { ObjectId } from 'mongoose';
import { User } from '../models';

export const isFriend = async (userId: ObjectId, friendId: ObjectId): Promise<boolean | undefined> => {

  const friend = await User.findById(friendId);

  if (isNil(friend)) {
    return false;
  }

  return friend.friends.includes(userId);
}
