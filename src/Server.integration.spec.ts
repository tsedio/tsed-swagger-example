import {PlatformTest} from "@tsed/common";
import * as SuperTest from "supertest";
import {Server} from "./Server";

describe("Server", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /rest", async () => {
    const response = await request.get("/rest").expect(404);

    expect(response.text).toEqual("Not found");
  });
});
