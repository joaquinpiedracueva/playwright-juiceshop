import { test, expect } from '../fixtures';
import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

type Method = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
type Operation = 'InsertDocuments' | 'FindDocuments' | 'ModifyDocuments' | 'RemoveDocuments';
type TestCase = `${Method} - ${Operation}`;

// Test data
const testUsers = [
  {name: 'John Doe', email: 'john@example.com', role: 'admin', isActive: true},
  {name: 'Jane Smith', email: 'jane@example.com', role: 'user', isActive: true},
  {name: 'Bob Wilson', email: 'bob@example.com', role: 'user', isActive: false},
];

// Database connection
let mongoServer: MongoMemoryServer;
let client: MongoClient;
let db: Db;
const COLLECTION = 'users';

test.describe('MongoDB CRUD Operations', () => {
  test.beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    client = new MongoClient(mongoServer.getUri());
    await client.connect();
    db = client.db('testing-db');
  });

  test.afterAll(async () => {
    if (db) await db.collection(COLLECTION).deleteMany({});
    if (client) await client.close();
    if (mongoServer) await mongoServer.stop();
  });

  test.beforeEach(async () => {
    if (db) await db.collection(COLLECTION).deleteMany({});
  });

  test.afterEach(async () => {
    if (db) await db.collection(COLLECTION).deleteMany({});
  });

  test('CREATE - InsertDocuments' satisfies TestCase, async () => {
    const result = await db.collection(COLLECTION).insertMany(testUsers);

    expect(result.insertedCount).toBe(3);
  });

  test('READ - FindDocuments' satisfies TestCase, async () => {
    await db.collection(COLLECTION).insertMany(testUsers);

    const admin = await db.collection(COLLECTION).findOne({role: 'admin'});
    const activeUsers = await db.collection(COLLECTION).find({isActive: true}).toArray();

    expect(admin?.name).toBe('John Doe');
    expect(activeUsers).toHaveLength(2);
  });

  test('UPDATE - ModifyDocuments' satisfies TestCase, async () => {
    await db.collection(COLLECTION).insertMany(testUsers);

    await db.collection(COLLECTION).updateOne(
      {email: 'bob@example.com'},
      {$set: {isActive: true}}
    );

    const bob = await db.collection(COLLECTION).findOne({email: 'bob@example.com'});
    expect(bob?.isActive).toBe(true);
  });

  test('DELETE - RemoveDocuments' satisfies TestCase, async () => {
    await db.collection(COLLECTION).insertMany(testUsers);

    await db.collection(COLLECTION).deleteOne({email: 'bob@example.com'});

    const count = await db.collection(COLLECTION).countDocuments();
    expect(count).toBe(2);
  });
});
