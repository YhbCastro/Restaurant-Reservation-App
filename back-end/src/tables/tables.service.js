const knex = require("../db/connection");
const tableName = "tables";

function list() {
    return knex(tableName)
        .select("*")
        .orderBy("table_name");
};

function create(table) {
    return knex(tableName)
      .insert(table)
      .returning("*")
      .then((rows) => rows[0]);
};

function read(table_id) {
    return knex(tableName)
        .where({ table_id })
        .first();
};

function update(reservation_id, status) {
    return knex('reservations')
      .where({ reservation_id })
      .update({ status }, "*")
      .then((res) => res[0]);
  }

function seat(reservation_id, table_id) {
    return knex(tableName)
      .where({ table_id })
      .update({ reservation_id, full: true }, "*")
      .then((res) => res[0]);
};

function finish(table_id) {
    return knex(tableName)
      .where({ table_id })
      .update({ reservation_id: null, full: false })
      .then((res) => res[0]);
};

module.exports = {
    list,
    create,
    read,
    update,
    seat,
    finish
}