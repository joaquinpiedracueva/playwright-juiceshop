import {test, expect} from '@playwright/test';
import { Database } from 'sql.js';
import initSqlJs from 'sql.js';

type Method = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
type Operation = 'InsertRecords' | 'FindRecords' | 'ModifyRecords' | 'RemoveRecords';
type TestCase = `${Method} - ${Operation}`;

// Test data
const testUsers = [
  {name: 'John Doe', email: 'john@example.com', role: 'admin', is_active: 1},
  {name: 'Jane Smith', email: 'jane@example.com', role: 'user', is_active: 1},
  {name: 'Bob Wilson', email: 'bob@example.com', role: 'user', is_active: 0},
];

// Database connection
let db: Database;

test.describe('SQLite CRUD Operations', () => {
  test.beforeAll(async () => {
    const SQL = await initSqlJs();
    db = new SQL.Database();
    db.run(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        is_active INTEGER DEFAULT 1
      )
    `);
  });

  test.afterAll(async () => {
    if (db) db.close();
  });

  test.beforeEach(async () => {
    if (db) db.run('DELETE FROM users');
  });

  test.afterEach(async () => {
    if (db) db.run('DELETE FROM users');
  });

  test('CREATE - InsertRecords' satisfies TestCase, async () => {
    const stmt = db.prepare('INSERT INTO users (name, email, role, is_active) VALUES (?, ?, ?, ?)');

    for (const user of testUsers) {
      stmt.run([user.name, user.email, user.role, user.is_active]);
    }
    stmt.free();

    const result = db.exec('SELECT COUNT(*) as count FROM users');
    expect(result[0].values[0][0]).toBe(3);
  });

  test('READ - FindRecords' satisfies TestCase, async () => {
    const stmt = db.prepare('INSERT INTO users (name, email, role, is_active) VALUES (?, ?, ?, ?)');
    for (const user of testUsers) {
      stmt.run([user.name, user.email, user.role, user.is_active]);
    }
    stmt.free();

    const admin = db.exec("SELECT * FROM users WHERE role = 'admin'");
    const activeUsers = db.exec('SELECT * FROM users WHERE is_active = 1');

    expect(admin[0].values[0][1]).toBe('John Doe');
    expect(activeUsers[0].values.length).toBe(2);
  });

  test('UPDATE - ModifyRecords' satisfies TestCase, async () => {
    const stmt = db.prepare('INSERT INTO users (name, email, role, is_active) VALUES (?, ?, ?, ?)');
    for (const user of testUsers) {
      stmt.run([user.name, user.email, user.role, user.is_active]);
    }
    stmt.free();

    db.run("UPDATE users SET is_active = 1 WHERE email = 'bob@example.com'");

    const bob = db.exec("SELECT is_active FROM users WHERE email = 'bob@example.com'");
    expect(bob[0].values[0][0]).toBe(1);
  });

  test('DELETE - RemoveRecords' satisfies TestCase, async () => {
    const stmt = db.prepare('INSERT INTO users (name, email, role, is_active) VALUES (?, ?, ?, ?)');
    for (const user of testUsers) {
      stmt.run([user.name, user.email, user.role, user.is_active]);
    }
    stmt.free();

    db.run("DELETE FROM users WHERE email = 'bob@example.com'");

    const result = db.exec('SELECT COUNT(*) FROM users');
    expect(result[0].values[0][0]).toBe(2);
  });
});
