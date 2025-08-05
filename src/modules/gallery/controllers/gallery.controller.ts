import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
  ParseFilePipe,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from '../services/gallery.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import path = require('path');
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../user/enums/user-role.enum';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './public/uploads/gallery',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // Keep commented as requested
          // new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
          // new FileTypeValidator({ fileType: 'video/*' }),
        ],
      }),
    )
    video: Express.Multer.File,
  ) {
    const uploadPath = this.configService.get<string>('UPLOAD_PATH');
    if (!uploadPath) {
      throw new BadRequestException(
        'UPLOAD_PATH environment variable is missing',
      );
    }

    const relativePath = path.join(uploadPath, 'gallery', video.filename);
    // Normalize path for different OS
    return this.galleryService.create(relativePath.replace(/\\/g, '/'));
  }

  @Get()
  async getAllVideos() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  async getVideoById(@Param('id') id: string) {
    const video = await this.galleryService.findById(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteVideo(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}
