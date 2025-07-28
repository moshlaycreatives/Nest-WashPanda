import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
    if (!value) {
      throw new BadRequestException('Validation failed: ID is required');
    }
    // Check if the value is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Validation failed: Invalid ID format');
    }
    return new Types.ObjectId(value);
  }
}
