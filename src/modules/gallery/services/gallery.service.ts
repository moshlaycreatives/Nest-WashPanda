// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Gallery, GalleryDocument } from '../schemas/gallery.schema';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class GalleryService {
//   constructor(
//     @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
//     private configService: ConfigService,
//   ) {}

//   async create(videoPath: string): Promise<Gallery> {
//     const baseUrl = this.getRequiredEnv('BASE_URL');
//     const videoUrl = `${baseUrl}/${videoPath.replace('public/', '')}`;

//     const createdGallery = new this.galleryModel({ videoUrl });
//     return createdGallery.save();
//   }

//   async findAll(): Promise<Gallery[]> {
//     return this.galleryModel.find().exec();
//   }

//   async delete(id: string): Promise<Gallery> {
//     const deletedVideo = await this.galleryModel.findByIdAndDelete(id).exec();
//     if (!deletedVideo) {
//       throw new NotFoundException(`Video with ID ${id} not found`);
//     }
//     return deletedVideo;
//   }

//   private getRequiredEnv(key: string): string {
//     const value = this.configService.get<string>(key);
//     if (!value) {
//       throw new Error(`Environment variable ${key} is not defined`);
//     }
//     return value;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from '../schemas/gallery.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    private configService: ConfigService,
  ) {}

  async create(videoPath: string): Promise<Gallery> {
    const baseUrl = this.configService.get<string>('BASE_URL');
    // Ensure proper URL formatting
    const videoUrl = `${baseUrl}/${videoPath.replace('public/', '')}`;
    return this.galleryModel.create({ videoUrl });
  }

  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }

  async findById(id: string): Promise<Gallery | null> {
    return this.galleryModel.findById(id).exec();
  }

  async delete(id: string): Promise<Gallery> {
    const deletedVideo = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!deletedVideo) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return deletedVideo;
  }
}
