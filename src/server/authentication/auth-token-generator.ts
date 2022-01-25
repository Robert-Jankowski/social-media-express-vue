import jwt from 'jsonwebtoken';
import CONFIG from '../config';
import { UserTokenData } from "./auth-types";

export const generateAuthToken = (userData: UserTokenData) =>
  jwt.sign(userData, CONFIG.JWT_SECRET, CONFIG.JWT_OPTIONS);
