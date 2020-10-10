import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Name, Returns, Summary} from "@tsed/schema";
import {DocumentLinks} from "../../decorators/documentLinks";
import {Document, Documents} from "../../domain/document/Documents";
import {Product} from "../../domain/product/Product";
import {ProductTypes} from "../../domain/product/ProductTypes";

const product = new Product({
  id: "AGAC",
  label: "Agadir",
  type: ProductTypes.VILLA,
  description: "An awesome resort at AGADIR"
});

const documentProduct = new Document<Product>({
  data: product
});

@Controller("/products")
@Name("Products")
export class ProductsCtrl {
  @Get("/:id")
  @(Returns(200, Document).Of(Product).Description("A product"))
  @(Returns(404, NotFound).Description("Product not found"))
  @Summary("Return a product from the given Id")
  @DocumentLinks()
  async geProduct(@PathParams("id") id: string): Promise<Document<Product>> {
    if (id === "AGAC") {
      return documentProduct;
    }

    throw new NotFound("Product not found");
  }

  @Post()
  @(Returns(201, Document).Of(Product).Description("A product"))
  @(Returns(404, NotFound).Description("Product not found"))
  @Summary("Create a product")
  @DocumentLinks()
  createProduct(@BodyParams() product: Product): Document<Product> {
    return new Document<Product>({
      data: product
    });
  }

  @Put("/:id")
  @(Returns(200, Document).Of(Product).Description("A product"))
  @Summary("Update a product")
  @DocumentLinks()
  updateProduct(@PathParams("id") @Description("A product ID") id: string, @BodyParams() product: Product): Document<Product> {
    if (id === "AGAC") {
      return new Document({data: product});
    }

    throw new NotFound("Product not found");
  }

  @Delete("/:id")
  @Returns(204)
  @(Returns(404, NotFound).Description("Product not found"))
  @Summary("Remove a product")
  @DocumentLinks()
  deleteProduct(@PathParams("id") @Description("A product ID") id: string): void {
    if (id === "AGAC") {
      return;
    }

    throw new NotFound("Product not found");
  }

  @Get()
  @(Returns(200, Documents).Of(Product).Description("A product"))
  @Summary("Get all products")
  @DocumentLinks()
  getProducts() {
    return new Documents<Product>({
      data: [product]
    });
  }
}
