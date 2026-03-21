import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
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

  // Find a user by ID
  public findOneById(id: string) {
    return {
      id: 12345,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
