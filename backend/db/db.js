import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DEV_DATABASE_URL,
});

class Database {
  constructor(table) {
    this.table = table;
  }

  async queryBuilder(query, params) {
    try {
      const res = await pool.query(query, params);
      const { rows, rowCount } = res;
      return {
        rows,
        count: rowCount,
      };
    } catch (errors) {
      return { errors };
    }
  }

  async create(data) {
    const params = [];
    const chunks = [];
    const values = [];
    const keys = [];
    Object.keys(data).forEach((key) => {
      keys.push(key);
      params.push(data[key]);
      values.push(`$${params.length}`);
    });
    chunks.push(`(${values.join(', ')})`);
    const sql = `INSERT INTO ${this.table}(${keys.join(', ')}) values${chunks.join(
      ', ',
    )} RETURNING *`;
    const query = await this.queryBuilder(sql, params);
    if (query.errors) return query;
    return {
      rows: query.rows,
      count: query.count,
    };
  }

  async where(column, op = '=', value, orderBy = 'id DESC') {
    if (this.table && column && value) {
      const sql = `SELECT * FROM ${this.table} WHERE ${column}${op}$1 ORDER BY ${orderBy}`;
      const query = await this.queryBuilder(sql, [value]);
      if (query.errors) return query;
      return {
        rows: query.rows,
        count: query.count,
      };
    }
    return {
      error: 'provide table name & column & value',
    };
  }

  async first(column, op = '=', value) {
    const query = await this.where(column, op, value);
    if (!query.error) {
      return {
        row: query.rows[0],
        count: query.count,
      };
    }
    return query;
  }

  async all(orderBy = 'id DESC') {
    const sql = `SELECT * FROM ${this.table} ORDER BY ${orderBy}`;
    const query = await this.queryBuilder(sql, []);
    return !query.errors
      ? {
        rows: query.rows,
        count: query.count,
      }
      : query;
  }

  async allWhere(where) {
    const conditions = this.prepareObject(where, ' AND ');
    const sql = `SELECT * FROM ${this.table} WHERE ${conditions}`;
    const query = await this.queryBuilder(sql, []);
    return !query.errors
      ? {
        rows: query.rows,
        count: query.count,
      }
      : query;
  }

  async allWithOffset(limit = 5, offset = 0, orderBy = 'id DESC') {
    const sql = `SELECT * FROM ${this.table} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset} `;
    const query = await this.queryBuilder(sql, []);
    return !query.errors
      ? {
        rows: query.rows,
        count: query.count,
      }
      : query;
  }

  async delete(where) {
    if (where) {
      const conditions = this.prepareObject(where, ' AND ');
      const sql = `DELETE FROM ${this.table} WHERE ${conditions}`;
      return this.queryBuilder(sql);
    }
    return { error: 'provide condition' };
  }

  async update(data, where) {
    if (data && where) {
      const updates = this.prepareObject(data);
      const conditions = this.prepareObject(where, ' AND ');
      const sql = `UPDATE ${this.table} SET ${updates} WHERE ${conditions} RETURNING *`;
      const query = await this.queryBuilder(sql);
      return !query.errors
        ? {
          rows: query.rows,
          count: query.count,
        }
        : query;
    }
    return { error: 'provide data & condition' };
  }

  prepareObject(obj, separator = ', ') {
    const chunks = [];
    Object.keys(obj).forEach((key) => {
      chunks.push(`${key}='${obj[key]}'`);
    });
    return chunks.join(`${separator}`);
  }
}

export default Database;
