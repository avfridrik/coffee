import { Injectable } from "@nestjs/common";
import { client } from "@/core/client";
import { Databases, Models } from "node-appwrite";

export type Product = Models.Document & {
  name?: string;
  text?: string;
  id?: number;
  price?: number;
  image?: string;
};

export interface queryParams {
  title?: string;
}

@Injectable()
export class ProductService {
  constructor() {}

  async findAll(query: queryParams): Promise<Product[]> {
    const res = [];
    const databases = new Databases(client);
    let products = await databases.listDocuments("main", "product");
    return products.documents;
  }
  async findOne(id: string): Promise<Product | null> {
    const databases = new Databases(client);
    const data = await databases.getDocument("main", "product", id);
    const product: Product = data;
    return product;
  }
}
