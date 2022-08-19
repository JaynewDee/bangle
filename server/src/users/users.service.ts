import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Return all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  // Return one user by email
  async findOne(email: string): Promise<any> {
    return this.userModel.find({ email: email }).exec();
  }

  // Login user:
  // 1 - lookup user
  // 2 - if user not found, return false
  // 3 - if user found, check if password is correct
  // 4 - if password correct, return user
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email });
    if (user === null) {
      return false;
    }
    const isCorrectPass = await bcrypt.compare(password, user.password);
    if (isCorrectPass) {
      return user;
    }
    return false;
  }

  // Create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  // Modify an existing user's details
  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // Delete a user!
  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
