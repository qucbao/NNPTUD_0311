const pool = require("../db/postgres");

exports.create = async (data) => {
    const result = await pool.query(
        `INSERT INTO roles(name,description)
   VALUES($1,$2) RETURNING *`,
        [data.name, data.description]
    );

    return result.rows[0];
};

exports.getAll = async () => {
    const result = await pool.query(
        "SELECT * FROM roles WHERE deleted=false"
    );

    return result.rows;
};

exports.getById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM roles WHERE id=$1 AND deleted=false",
        [id]
    );

    return result.rows[0];
};

exports.update = async (id, data) => {
    const result = await pool.query(
        `UPDATE roles
   SET name=$1,description=$2
   WHERE id=$3 RETURNING *`,
        [data.name, data.description, id]
    );

    return result.rows[0];
};

exports.softDelete = async (id) => {
    await pool.query(
        "UPDATE roles SET deleted=true WHERE id=$1",
        [id]
    );
};