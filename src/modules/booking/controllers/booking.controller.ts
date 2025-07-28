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
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { Booking } from '../schemas/booking.schema';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { Types } from 'mongoose';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../user/enums';
import { UpdateBookingStatusDto } from '../dto/update-booking-status.dto';
import { UpdatePaymentStatusDto } from '../dto/update-payment-status.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.create(createBookingDto);
  }

  @Get('summary')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getSummary(): Promise<{
    totalBookings: number;
    totalEarnings: number;
  }> {
    return this.bookingService.getBookingSummary();
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<Booking> {
    return this.bookingService.findOne(id.toHexString());
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.update(id.toHexString(), updateBookingDto);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateBookingStatus(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body(new ValidationPipe()) updateBookingStatusDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    return this.bookingService.updateBookingStatus(
      id.toHexString(),
      updateBookingStatusDto.bookingStatus,
    );
  }

  @Patch(':id/payment-status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updatePaymentStatus(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body(new ValidationPipe()) updatePaymentStatusDto: UpdatePaymentStatusDto,
  ): Promise<Booking> {
    return this.bookingService.updatePaymentStatus(
      id.toHexString(),
      updatePaymentStatusDto.paymentStatus,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async remove(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<Booking> {
    return this.bookingService.remove(id.toHexString());
  }
}
