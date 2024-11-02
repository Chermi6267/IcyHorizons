import { IGenerateToken } from "./Token";
import { Request } from "express";

export interface IUser {
  email: string;
  password: string;
  loggedWith: string;
}

export interface IProfile {
  name?: string;
  avatar?: string;
}

export interface IUserRequest extends Request {
  user?: IGenerateToken;
}

export interface IReg extends IUser, IProfile {}
