import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.category.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'PutUpdate category' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  putUpdate(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    console.log('PUT id:', id);
    console.log('PUT dto:', dto);
    return this.category.putUpdate(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.category.remove(id);
  }
}
