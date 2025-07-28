import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingModel, Booking } from '../schemas/booking.schema';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { BookingStatus, PaymentStatus } from '../enums';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(BookingModel) private readonly bookingModel: Model<Booking>,
  ) {}

  /**
   * Creates a new booking in the database.
   * @param createBookingDto Data for creating the booking.
   * @returns The newly created booking document.
   */
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    if (createBookingDto.noOfCars !== createBookingDto.carDetails.length) {
      throw new BadRequestException(
        'Number of cars does not match the provided car details.',
      );
    }

    const newBooking = new this.bookingModel(createBookingDto);
    return newBooking.save();
  }

  /**
   * Retrieves all bookings from the database.
   * @returns A promise that resolves to an array of booking documents.
   */
  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  /**
   * Finds a single booking by its ID.
   * @param id The ID of the booking to find.
   * @returns The found booking document.
   * @throws NotFoundException if the booking is not found.
   */
  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
    return booking;
  }

  /**
   * Updates an existing booking by its ID.
   * @param id The ID of the booking to update.
   * @param updateBookingDto Data for updating the booking.
   * @returns The updated booking document.
   * @throws NotFoundException if the booking is not found.
   */
  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const existingBooking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, { new: true })
      .exec();

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
    return existingBooking;
  }

  /**
   * Deletes a booking by its ID.
   * @param id The ID of the booking to delete.
   * @returns The deleted booking document.
   * @throws NotFoundException if the booking is not found.
   */
  async remove(id: string): Promise<Booking> {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
    return deletedBooking;
  }

  /**
   * Updates the booking status of an existing booking by its ID.
   * @param id The ID of the booking to update.
   * @param bookingStatus The new booking status.
   * @returns The updated booking document.
   * @throws NotFoundException if the booking is not found.
   */
  async updateBookingStatus(
    id: string,
    bookingStatus: BookingStatus,
  ): Promise<Booking> {
    const existingBooking = await this.bookingModel
      .findByIdAndUpdate(id, { bookingStatus }, { new: true })
      .exec();

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
    return existingBooking;
  }

  /**
   * Updates the payment status of an existing booking by its ID.
   * @param id The ID of the booking to update.
   * @param paymentStatus The new payment status.
   * @returns The updated booking document.
   * @throws NotFoundException if the booking is not found.
   */
  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
  ): Promise<Booking> {
    const existingBooking = await this.bookingModel
      .findByIdAndUpdate(id, { paymentStatus }, { new: true })
      .exec();

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
    return existingBooking;
  }

  /**
   * Calculates the total number of bookings and total earnings.
   * Earnings are now directly summed from the 'totalAmount' field.
   * @returns An object containing total bookings and total earnings.
   */
  async getBookingSummary(): Promise<{
    totalBookings: number;
    totalEarnings: number;
  }> {
    const bookings = await this.bookingModel.find().exec();

    let totalEarnings = 0;
    bookings.forEach((booking) => {
      if (typeof booking.totalAmount === 'number') {
        totalEarnings += booking.totalAmount;
      }
    });

    return {
      totalBookings: bookings.length,
      totalEarnings: parseFloat(totalEarnings.toFixed(2)),
    };
  }
}
