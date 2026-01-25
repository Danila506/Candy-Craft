import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly category: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  findAll(): Promise<Category[]> {
    return this.category.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.category.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new category' })
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.category.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'PutUpdate category' })
  putUpdate(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    console.log('PUT id:', id);
    console.log('PUT dto:', dto);
    return this.category.putUpdate(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.category.remove(id);
  }
}
