import { GetUsersParamDto } from '../dtos/get-users-params.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user with email exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    /**
     * Handle exceptions if user exists later
     * */

    // Try to create a new user
    // - Handle Exceptions Later
    const newUser = this.usersRepository.create(createUserDto);

    // Create the user
    return this.usersRepository.save(newUser);
  }

  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /**
   * Public method used to find one user using the ID of the user
   */
  public async findOneById(id: number) {
    return this.usersRepository.findOneBy({
      id,
    });
  }
}