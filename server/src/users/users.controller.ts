import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get("all")
  async getAll() {
    return await this.usersService.findAll();
  }
  // Get one user by email
  @Get("one")
  getOne(@Req() req) {
    return this.usersService.findOne(req.body.email);
  }
  // Login a user with email and password
  @Post("login")
  @HttpCode(200)
  async login(@Req() req, @Res() res) {
    const validated = await this.usersService.login(
      req.body.email,
      req.body.password
    );
    validated ? res.send(validated) : res.status(400).send("false");
  }
  // Sign up a new user by creating document in database using data transfer object
  @Post("signup")
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      return await res.send(this.usersService.create(createUserDto));
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res
          .status(422)
          .send({ success: false, message: "User already exists!" });
      }
    }
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
