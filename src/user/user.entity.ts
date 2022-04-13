import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hashSync } from 'bcryptjs'

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column({default: ''})
  bio: string

  @Column({default: ''})
  image: string

  @Column({select: false})
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashSync(this.password, 10)
  }
}
