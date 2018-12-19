const server = require("supertest");
const faker = require("faker");
const app = require("./../app");
const {
  createUser,
  createUserWithArticleAndComment
} = require("./helpers/auth");

describe("Article Unit Tests", () => {
  let testUser, testUserWithArticle;
  beforeAll(done => {
    createUser((err, user1) => {
      testUser = user1;
      createUserWithArticleAndComment((err, user2) => {
        testUserWithArticle = user2;
        done();
      });
    });
  });

  it("Should render articles page", done => {
    server(app)
      .get("/articles")
      .end((err, res) => {
        expect(res.text).toContain("Article's");
        done();
      });
  });

  it("Should allow a registered User to create an article", done => {
    server(app)
      .post("/articles")
      .send({
        title: faker.name.title(),
        body: faker.lorem.text(),
        userId: testUser._id
      })
      .end((err, res) => {
        expect(res.text).toContain("Found. Redirecting");
        done();
      });
  });

  it("Should allow a unregistered User to comment on an article", done => {
    server(app)
      .post(`/articles/comment/${testUserWithArticle.articles[0]._id}`)
      .send({
        commentBody: faker.lorem.text()
      })
      .end((err, res) => {
        expect(res.text).toContain("Found. Redirecting");
        done();
      });
  });

  it("Should allow a unregistered User to like an article", done => {
    server(app)
      .post(`/articles/like/${testUserWithArticle.articles[0]._id}`)
      .end((err, res) => {
        expect(res.text).toContain("Found. Redirecting");
        done();
      });
  });

  it("Should allow all users to like a comment", done => {
    server(app)
      .post(
        `/articles/comment/like/${
          testUserWithArticle.articles[0].comments[0]._id
        }`
      )
      .end((err, res) => {
        expect(res.text).toContain("Found. Redirecting");
        done();
      });
  });

  it("Should allow the owner of the article to edit an article", done => {
    server(app)
      .put(`/articles/${testUserWithArticle.articles[0]._id}`)
      .send({
        title: "new title",
        body: "new body"
      })
      .end((err, res) => {
        expect(res.text).toContain("Found. Redirecting to /");
        done();
      });
  });
});
