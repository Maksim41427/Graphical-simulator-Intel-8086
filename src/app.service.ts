import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [{id: 1, login: 'user', password: 12345}];
  }
}
