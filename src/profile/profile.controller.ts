import { Controller, Get, Param } from '@nestjs/common'
import { User } from '@app/user/decorators/user.decorator'
import { ProfileResponseInterface } from '@app/profile/types/profileResponse.interface'
import { ProfileService } from '@app/profile/profile.service'

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Get(':username')
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(currentUserId, profileUsername)
    return this.profileService.buildProfileResponse(profile)
  }
}
