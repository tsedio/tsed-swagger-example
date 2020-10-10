import {Description, Enum, Example, Format, OperationMethods} from "@tsed/schema";

export class DocumentLink {
  @Description("Name of the relationship")
  rel: string;

  @Enum(OperationMethods)
  @Description("HTTP method to use")
  @Example(OperationMethods.GET)
  method: OperationMethods;

  @Format("url")
  @Description("Link to the resource")
  @Example("https://host.fr")
  href: string;

  constructor(options: Partial<DocumentLink>) {
    options.rel && (this.rel = options.rel);
    options.method && (this.method = options.method);
    options.href && (this.href = options.href);
  }
}
