import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { OffsetConnection } from '@ptc-org/nestjs-query-graphql';
import { ProductBlogDTO } from '../../product-blog/entities/product-blog.dto';

@ObjectType('Product')
@Directive('@extends')
@Directive('@key(fields: "id channel")')
@OffsetConnection('blogs', () => ProductBlogDTO)
export class ProductDto {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => String)
  @Directive('@external')
  channel: string;
}
