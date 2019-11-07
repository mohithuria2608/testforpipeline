/* eslint-env mocha */

import * as chai from "chai";
import "mocha";
import { expect } from "chai";

import chaiHttp = require("chai-http");

import * as app from "../src/route/v1/guest.route";

chai.use(chaiHttp);

// const expect = chai.expect;

describe("/login api where language type is English and devicetype is Android ", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "En",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "ANDROID",
      osversion: "6.1"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }

        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is Arab and device type is android ", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "Ar",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "ANDROID",
      osversion: "6.1"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }

        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is En but DeviceType is wrong", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "En",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "Symbion",
      osversion: "6.1"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is English and DeviceType is IOS ", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "En",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "IOS",
      osversion: "6.1"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is Arab and DeviceType is Ios", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "Ar",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "IOS",
      osversion: "6.1"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is Arab and DeviceType is Ios but osversion is missing", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "Ar",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "IOS"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is Arab and DeviceType is Ios and sending an extra key", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "Ar",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "IOS",
      osversion: "6.1",
      extra: "abbj"
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is Arab and DeviceType is Ios  and sending deviceid as an integer value instead of a string", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "Ar",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "IOS",
      osversion: "6"
    };
    const body = { deviceId: 123 };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/login api where language type is Arab and DeviceType is Ios  and sending osversion as an integer value instead of a string", () => {
  it("user is logged  ", (done) => {
    const headers = {
      language: "Ar",
      appversion: "ACTIVE",
      devicemodel: "galaxy",
      devicetype: "IOS",
      osversion: 6.5
    };
    const body = { deviceId: "123" };
    chai
      .request("http://localhost:4001")
      .post("/v1/guest/login")
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) {
          return "error occured '{err}'";
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});
