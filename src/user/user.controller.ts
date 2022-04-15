import { Body, Controller, Get, Post, Put, UseGuards, UsePipes } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { CreateUserDto } from '@app/user/dto/createUser.dto'
import { LoginUserDto } from '@app/user/dto/login.dto'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { User } from '@app/user/decorators/user.decorator'
import { UserEntity } from '@app/user/user.entity'
import { AuthGuard } from '@app/user/guards/auth.guard'
import { UpdateUserDto } from '@app/user/dto/updateUser.dto'
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto)
    return this.userService.buildUserResponse(user)
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto)
    return this.userService.buildUserResponse(user)
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user)
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(currentUserId, updateUserDto)
    return this.userService.buildUserResponse(user)
  }
}
