// src/modules/review/services/review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewModel } from '../schemas/review.schema';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel) private readonly reviewModel: Model<Review>,
  ) {}

  /**
   * Creates a new review in the database.
   * @param createReviewDto Data for creating the review.
   * @returns The newly created review document.
   */
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = new this.reviewModel(createReviewDto);
    return newReview.save();
  }

  /**
   * Retrieves all reviews from the database.
   * @returns A promise that resolves to an array of review documents.
   */
  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  /**
   * Finds a single review by its ID.
   * @param id The ID of the review to find.
   * @returns The found review document.
   * @throws NotFoundException if the review is not found.
   */
  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found.`);
    }
    return review;
  }

  /**
   * Updates an existing review by its ID.
   * @param id The ID of the review to update.
   * @param updateReviewDto Data for updating the review.
   * @returns The updated review document.
   * @throws NotFoundException if the review is not found.
   */
  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const existingReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true }) // {new: true} returns the updated document
      .exec();

    if (!existingReview) {
      throw new NotFoundException(`Review with ID "${id}" not found.`);
    }
    return existingReview;
  }

  /**
   * Deletes a review by its ID.
   * @param id The ID of the review to delete.
   * @returns The deleted review document.
   * @throws NotFoundException if the review is not found.
   */
  async remove(id: string): Promise<Review> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedReview) {
      throw new NotFoundException(`Review with ID "${id}" not found.`);
    }
    return deletedReview;
  }
}
