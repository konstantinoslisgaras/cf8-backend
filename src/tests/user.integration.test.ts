import { TestServer } from "./testSetup";
import userRoutes from "../routes/user.routes";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { after, before, describe } from "node:test";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || " ";
const server = new TestServer();
server.app.use("/users", userRoutes);

describe("User API Tests", ()=> {

  let token: string;

  beforeAll(async() => {
    await server.start();
    const hash = await bcrypt.hash("admin123456", 10);
    const user = await User.create({
      username: "admin",
      password: hash,
      firstname: "testUser",
      lastname: "testUser",
      email: "testUser@aueb.gr"
    });
    const payload = {
      username: user.username,
      email: user.email,
      roles: user.roles
    }
    token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'})
  });

  afterAll(async() => { await server.stop(); });

  test('GET /user -> returns list of users', async() => {
    const res = await server.request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  })

  test('POST /user -> creates new user', async()=>{
    const res = await server.request.post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({username: "newUser", password: "123456"});

    expect(res.status).toBe(201);
    expect(res.body.username).toBe("newUser");
  })

    test('POST /user -> creates new user with invalid password', async()=>{
    const res = await server.request.post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({username: "newUser", password: "16"});

    expect(res.status).toBe(400);
  })

    test('POST /user -> creates new user with invalid username', async()=>{
    const res = await server.request.post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send({username: "n", password: "123456"});

    expect(res.status).toBe(400);
  })
})