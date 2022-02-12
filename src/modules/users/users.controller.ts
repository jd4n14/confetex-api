import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiPaginatedResponse, Paginate, Paginated, PaginateQuery } from '@common/paginate';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUser } from '../auth/dto/register.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: RegisterUser): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @ApiPaginatedResponse(User)
  async all(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.all(query);
  }

  @Get('mechanics')
  async mechanics(): Promise<User[]> {
    return this.userService.mechanics();
  }

  @Delete('/:user')
  async delete(@Param('user') userId: number): Promise<void> {
    const user = await this.userService.findById(userId);
    await this.userService.delete(user);
  }
}
