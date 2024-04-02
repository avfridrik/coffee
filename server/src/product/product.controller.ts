import { Controller, Get, Param, Query } from "@nestjs/common";
import { Product, ProductService, queryParams } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() query: queryParams): Promise<Product[]> {
    return this.productService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Product | null> {
    return this.productService.findOne(id);
  }
}
