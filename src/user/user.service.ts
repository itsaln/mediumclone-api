import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/config'
import { Repository } from 'typeorm'
import { compare } from 'bcrypt'
import { CreateUserDto } from '@app/user/dto/createUser.dto'
import { UserEntity } from '@app/user/user.entity'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { LoginUserDto } from '@app/user/dto/login.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email
    })
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username
    })
    if (userByEmail || userByUsername) {
      throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newUser = new UserEntity()
    return await this.userRepository.save({...createUserDto, newUser})
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      email: loginUserDto.email
    }, {select: ['id', 'username', 'bio', 'image', 'password']})

    if (!user) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    // const isPasswordCorrect = await compare(loginUserDto.password, user.password)
    const isPasswordCorrect = loginUserDto.password === user.password

    if (!isPasswordCorrect) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    delete user.password
    return user
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id)
  }

  generateJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email
    }, JWT_SECRET)
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }
}
