/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import request from "supertest";
import RepositoryInstance from "../../src/server/database";
import app from "../../src/server/index";

const server = request(app);

before(() => {
  RepositoryInstance.truncate();
});

describe("PHONE NUMBER GENERATOR API", () => {
  it("should welcome users to the API", async () => {
    server.get("/api/v1/home").end((err, res) => {
      const { message } = res.body;
      expect(message).to.equal("welcome to random phone generator api");
    });
  });

  it("should generate default number of phone numbers", async () => {
    server
      .post("/api/v1/generate")
      .set("Accept", "Application/json")
      .end((err, res) => {
        const { message } = res.body;
        const { data } = res.body;
        expect(message).to.equal("20 phone numbers generated");
        expect(typeof data).to.equal("string");
        expect(data).to.exist;
      });
  });

  it("should generate phone numbers based on phoneNumberCount input", () => {
    server
      .post("/api/v1/generate")
      .send({
        phoneNumberCount: 5
      })
      .set("Accept", "Application/json")
      .end((err, res) => {
        const { message } = res.body;
        const { data } = res.body;
        expect(message).to.equal("5 phone numbers generated");
        expect(typeof data).to.equal("string");
        expect(data).to.exist;
      });
  });

  it("should throw error when phoneNumberCount is more than 20", () => {
    server
      .post("/api/v1/generate")
      .send({
        phoneNumberCount: 21
      })
      .set("Accept", "Application/json")
      .end((err, res) => {
        const { message } = res.body;
        expect(message).to.equal("Only 20 numbers can be generated per time");
      });
  });

  it("should get all the generated phone numbers in the database", () => {
    server.get("/api/v1/phone").end((err, res) => {
      const { message } = res.body;
      const { data } = res.body;
      expect(message).to.equal("file contents successfully retrieved");
      expect(typeof data).to.equal("string");
      expect(data).to.exist;
    });
  });
});
