import { ProductDto } from './entities/product.dto';
import {
  InjectQueryService,
  QueryService,
  RelationQueryService,
} from '@ptc-org/nestjs-query-core';
import { ProductBlogEntity } from '../product-blog/entities/product-blog.entity';

@QueryService(ProductDto)
export class ProductService extends RelationQueryService<ProductDto> {
  constructor(
    @InjectQueryService(ProductBlogEntity)
    readonly service: QueryService<ProductBlogEntity>,
  ) {
    super({
      // the name of the relation
      blogs: {
        service: service,
        // a query factory that will take in the reference to create a query.
        query: (product) => ({
          filter: {
            productId: { eq: product.id },
            productChannel: { eq: product.channel },
          },
        }),
      },
    });
  }
}
