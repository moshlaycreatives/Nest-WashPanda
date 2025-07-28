import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../schemas/review.schema';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { Types } from 'mongoose';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../user/enums';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(
    @Body(new ValidationPipe()) createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<Review> {
    return this.reviewService.findOne(id.toHexString());
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id.toHexString(), updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async remove(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<Review> {
    return this.reviewService.remove(id.toHexString());
  }
}
