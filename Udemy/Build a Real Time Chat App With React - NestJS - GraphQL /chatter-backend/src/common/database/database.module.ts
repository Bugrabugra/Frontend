import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { DbMigrationService } from "./db-migration.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("MONGODB_URI")
      }),
      inject: [ConfigService]
    })
  ],
  providers: [DbMigrationService]
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
