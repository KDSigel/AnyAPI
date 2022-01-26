const pool = require('../utils/pool');

// A model exists with methods for inserting a row, listing all rows, getting a single row, updating a row, and deleting a row.
module.exports = class Stranger {
  projectId;
  description;
  annoyance;

  constructor(row) {
    this.projectId = row.id;
    this.description = row.description;
    this.annoyance = row.annoyance;
  }

  static async insert({ description, annoyance }) {
    const { rows } = await pool.query(
      'INSERT INTO strangers(description, annoyance) VALUES ($1, $2) RETURNING *',
      [description, annoyance]
    );
    return new Stranger(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM strangers');
    const strangers = rows.map((row) => new Stranger(row));
    return strangers;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM strangers WHERE id=$1', [
      id,
    ]);
    if(!rows[0]) return null;
    return new Stranger(rows[0]);
  }

  static async updateById(id, { description, annoyance }) {
    const result = await pool.query('SELECT * FROM strangers WHERE id=$1', [
      id,
    ]);
    const existingStranger = result.rows[0];

    if (!existingStranger) {
      const error = new Error(`Stranger ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newDescription = description ?? existingStranger.description;
    const newAnnoyance = annoyance ?? existingStranger.annoyance;

    const { rows } = await pool.query(
      'UPDATE strangers SET description=$2, annoyance=$3 WHERE id=$1 RETURNING *;',
      [id, newDescription, newAnnoyance]
    );
    return new Stranger(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM strangers WHERE id=$1 RETURNING *;', [
      id,
    ]);
    return new Stranger(rows[0]);
  }
};
