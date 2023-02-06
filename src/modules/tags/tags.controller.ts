import { CreateTagDto } from './dto/create-tag.dto';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { Auth } from 'src/decorators/authentication.decorator';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Auth('ADMIN')
  @Post()
  async createNewTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.createNewTag(createTagDto);
  }

  @Get()
  async getAllTags() {
    return await this.tagsService.getAllTags();
  }
}
