import {Context, HeaderParams, Middleware, UseAfter} from "@tsed/common";
import {StoreMerge, useDecorators} from "@tsed/core";
import {OperationMethods} from "@tsed/schema";
import {DocumentLink} from "../domain/document/DocumentLink";

export interface DocumentLinksOptions {
  name?: string;
}

@Middleware()
export class DocumentLinksMiddleware {
  use(@HeaderParams("x-forwarded-proto") protocol: string, @HeaderParams("host") host: string, @Context() ctx: Context) {
    const options = ctx.endpoint.get<DocumentLinksOptions>(DocumentLinksMiddleware) || {};
    const document = ctx.data;
    const url = `${protocol || "http"}://${host}`;
    const rel = (options.name || ctx.endpoint.parent.schema.get("name")).toLowerCase();

    document.links = (document.links || []).concat([
      new DocumentLink({
        rel,
        method: OperationMethods.GET,
        href: `${url}/rest/products/{id}`
      }),
      new DocumentLink({
        rel,
        method: OperationMethods.POST,
        href: `${url}/rest/products`
      }),
      new DocumentLink({
        rel,
        method: OperationMethods.PUT,
        href: `${url}/rest/products/{id}`
      }),
      new DocumentLink({
        rel,
        method: OperationMethods.DELETE,
        href: `${url}/rest/products/{id}`
      }),
      new DocumentLink({
        rel: rel,
        method: OperationMethods.GET,
        href: `${url}/rest/products`
      })
    ]);

    return document;
  }
}

export function DocumentLinks(options: DocumentLinksOptions = {}) {
  return useDecorators(UseAfter(DocumentLinksMiddleware), StoreMerge(DocumentLinksMiddleware, options));
}
