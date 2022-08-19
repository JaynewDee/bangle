import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { validateEmail } from "../utils/helpers";
import * as bcrypt from "bcrypt";
import { NextFunction } from "express";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: "Anonymous" })
  firstName: string;

  @Prop({ default: "Rex" })
  lastName: string;

  @Prop({ default: 111 })
  age: number;

  @Prop({ required: true })
  chosenName: string;

  @Prop({
    required: true,
    unique: true,
    validate: function (email: string) {
      return validateEmail(email);
    },
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next: NextFunction) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export { UserSchema };
