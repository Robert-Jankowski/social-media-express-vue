import {includes, isNil } from 'lodash';
import { User } from '../models';

export const isFriend = async (userId: string, friendId: string): Promise<boolean | undefined> => {

  const friend = await User.findById(friendId);

  if (isNil(friend)) {
    return false;
  }

  return includes(friend.friends.map((friend) => friend.toString()), userId);
}
