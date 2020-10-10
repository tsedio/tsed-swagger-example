import {Description, Enum, Example, Property, Required} from "@tsed/schema";
import {ProductTypes} from "./ProductTypes";

export class Product {
  @Property()
  @Description("Product ID")
  @Example("AGAC")
  @Required()
  id: string;

  @Enum(ProductTypes)
  @Description("Product type")
  @Example(ProductTypes.VILLA)
  @Required()
  type: ProductTypes;

  @Description("Product label")
  @Example("Agadir")
  @Required()
  label: string;

  @Description("Product label")
  @Example("Agadir")
  description: string;

  constructor(options: Partial<Product>) {
    options.id && (this.id = options.id);
    options.type && (this.type = options.type);
    options.label && (this.label = options.label);
    options.description && (this.description = options.description);
  }
}
