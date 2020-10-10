import {CollectionOf, Generics, Min} from "@tsed/schema";
import {DocumentLink} from "./DocumentLink";

@Generics("T")
export class Documents<T> {
  @CollectionOf("T")
  data: T[];

  @CollectionOf(DocumentLink)
  links: DocumentLink[];

  @Min(0)
  totalCount: number;

  constructor(options: Partial<Documents<T>>) {
    options.data && (this.data = options.data);
    options.links && (this.links = options.links);
    options.data && (this.totalCount = options.data.length);
  }
}

@Generics("T")
export class Document<T> {
  @CollectionOf("T")
  data: T;

  @CollectionOf(DocumentLink)
  links: DocumentLink[];

  constructor(options: Partial<Document<T>>) {
    options.data && (this.data = options.data);
    options.links && (this.links = options.links);
  }
}
