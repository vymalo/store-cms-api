import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  PagingStrategies,
  QueryOptions,
  Reference,
} from '@ptc-org/nestjs-query-graphql';
import { ProductDto } from '../../product/entities/product.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ObjectType('ProductBlog')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  defaultFilter: { published: { is: true } },
})
@Reference('product', () => ProductDto, {
  id: 'productId',
  channel: 'productChannel',
})
export class ProductBlogDTO {
  @IDField(() => ID)
  id: string;

  @IsString()
  @IsNotEmpty()
  @FilterableField()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @FilterableField()
  description!: string;

  @IsString()
  @IsNotEmpty()
  @FilterableField()
  content!: string;

  @IsString()
  @IsNotEmpty()
  @IDField(() => ID)
  @FilterableField()
  productId!: string;

  @IsString()
  @IsNotEmpty()
  @IDField(() => String)
  @FilterableField()
  productChannel!: string;

  @IsBoolean()
  @IsNotEmpty()
  @FilterableField()
  published!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}
