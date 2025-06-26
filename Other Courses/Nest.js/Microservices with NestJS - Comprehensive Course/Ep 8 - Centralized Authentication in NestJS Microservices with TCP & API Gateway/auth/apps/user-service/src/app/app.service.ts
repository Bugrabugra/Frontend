import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private users = [
    {
      id: '123',
      name: 'John',
    },
  ];

  getUserProfile(userId: string) {
    const user = this.users.find((user) => user.id === userId);
    return user;
  }
}
