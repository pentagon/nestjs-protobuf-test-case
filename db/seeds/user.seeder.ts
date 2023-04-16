import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../src/auth/user.entity';
import { hashPassword } from '../../src/auth/pwd.utils';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: 'demo@user.com',
        password_hash: await hashPassword('demo1234'),
      },
    ]);
  }
}
