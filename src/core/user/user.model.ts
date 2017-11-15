import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "./user.interface";

export interface IUserModel extends IUser, Document {
  
}

