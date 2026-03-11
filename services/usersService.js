const pool = require("../db/postgres");

exports.create = async (data) => {
    const result = await pool.query(
        `INSERT INTO users(username,password,email,full_name,avatar_url,role_id)
   VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        [
            data.username,
            data.password,
            data.email,
            data.fullName || "",
            data.avatarUrl || "https://i.sstatic.net/l60Hf.png",
            data.roleId || null
        ]
    );

    return result.rows[0];
};

exports.getAll = async () => {
    const result = await pool.query(
        "SELECT * FROM users WHERE deleted=false"
    );
    return result.rows;
};

exports.getById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id=$1 AND deleted=false",
        [id]
    );
    return result.rows[0];
};

exports.update = async (id, data) => {
    const result = await pool.query(
        `UPDATE users
   SET full_name=$1, avatar_url=$2, role_id=$3
   WHERE id=$4 RETURNING *`,
        [data.fullName, data.avatarUrl, data.roleId, id]
    );

    return result.rows[0];
};

exports.softDelete = async (id) => {
    await pool.query(
        "UPDATE users SET deleted=true WHERE id=$1",
        [id]
    );
};

exports.enable = async (username, email) => {
    const result = await pool.query(
        `UPDATE users
   SET status=true
   WHERE username=$1 AND email=$2
   RETURNING *`,
        [username, email]
    );

    return result.rows[0];
};

exports.disable = async (username, email) => {
    const result = await pool.query(
        `UPDATE users
   SET status=false
   WHERE username=$1 AND email=$2
   RETURNING *`,
        [username, email]
    );

    return result.rows[0];
};

exports.getUsersByRole = async (roleId) => {
    const result = await pool.query(
        `SELECT * FROM users
   WHERE role_id=$1 AND deleted=false`,
        [roleId]
    );

    return result.rows;
};