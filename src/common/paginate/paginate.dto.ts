import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateOA<T> {
  @ApiPropertyOptional({ description: 'The page of the request' })
  page?: number;

  @ApiPropertyOptional({ description: 'How many items get' })
  limit: number;

  @ApiPropertyOptional({ description: 'Order by', example: 'id:ASC' })
  sortBy: string;

  @ApiPropertyOptional({ description: '' })
  filter: string;
}
