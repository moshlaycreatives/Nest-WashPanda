import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './infra/mongoose/mongoose.module';
import { UserService } from './modules/user/services/user.service';
import { CreateUserDto } from './modules/user/dto/create-user.dto';
import { Role } from './modules/user/enums';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, BookingModule, UserModule } from './modules';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BookingModule,
    UserModule,
    AuthModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    console.log('AppModule has been initialized.');
    await this.createAdminUser();
  }

  private async createAdminUser(): Promise<void> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!adminEmail || !adminPassword) {
      console.warn(
        'Admin email or password not found in .env. Skipping admin user creation.',
      );
      return;
    }

    try {
      const existingAdmin = await this.userService.findOneByEmail(adminEmail);

      if (existingAdmin) {
        console.log(
          `Admin user with email "${adminEmail}" already exists. Skipping creation.`,
        );
        return;
      }

      const createAdminDto: CreateUserDto = {
        email: adminEmail,
        password: adminPassword,
      };

      const newAdmin = await this.userService.create(createAdminDto);
      if (newAdmin.role !== Role.Admin) {
        newAdmin.role = Role.Admin;
        await newAdmin.save();
      }
      console.log(`Admin user "${newAdmin.email}" created successfully.`);
    } catch (error) {
      if (error.code === 11000) {
        console.warn(
          `Admin user with email "${adminEmail}" already exists (duplicate key error).`,
        );
      } else {
        console.error('Error creating admin user:', error.message);
      }
    }
  }
}
