import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(
    // Inject TagService
    private readonly tagsService: TagsService,
  ) {}

  @Post()
  public create(@Body() CreateTagDto: CreateTagDto) {
    return this.tagsService.create(CreateTagDto);
  }

// /tags/soft-delete
  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id)
  }
}
