import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { RequestLogger } from "./common/middleware/logger.middleware";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./users/filters/all-exceptions.filter";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

const rootPath = join(__dirname, "..");
console.log(rootPath);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../client/src"),
    }),
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(process.env.BANGLE_DB),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    // { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes(AppController);
  }
}
