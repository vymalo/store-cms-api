import { Module } from '@nestjs/common';
import { ProductBlogModule } from './product-blog/product-blog.module';
import { HealthModule } from './health/health.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        url: cs.get<string>('DB_URL'),
        synchronize: cs.get<string>('NODE_ENV') !== 'production',
        entities: [__dirname + '/../**/*.entity.{.ts,js}'],
        logging: cs.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      sortSchema: true,
      autoSchemaFile: {
        federation: 2,
      },
      transformAutoSchemaFile: true,
    }),
    ProductBlogModule,
    HealthModule,
  ],
})
export class AppModule {}
