import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: number) {
    const user = this.usersService.findOneById(12345);
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
