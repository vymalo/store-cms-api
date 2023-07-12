import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ProductBlogDTO } from './entities/product-blog.dto';
import { ProductBlogEntity } from './entities/product-blog.entity';
import { ProductDto } from '../product/entities/product.dto';
import { ProductService } from '../product/product.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProductBlogEntity])],
      services: [ProductService],
      resolvers: [
        {
          DTOClass: ProductBlogDTO,
          EntityClass: ProductBlogEntity,
          referenceBy: { key: 'id' },
        },
        {
          type: 'federated',
          DTOClass: ProductDto,
          Service: ProductService,
        },
      ],
    }),
  ],
})
export class ProductBlogModule {}
