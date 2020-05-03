import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({email});
    }

    async findById(id: number): Promise<User | undefined> {
        return await this.usersRepository.findOne(id);
    }

    async findAll(): Promise<User[] | []> {
        return await this.usersRepository.find();
    }

    async create(user: User): Promise<User> {
        const userModel = User.create(user);
        return this.usersRepository.save(userModel);
    }
}
