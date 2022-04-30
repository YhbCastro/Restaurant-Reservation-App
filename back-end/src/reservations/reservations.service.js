const knex = require('../db/connection');
const tableName = 'reservations'

function list(property) {
    return knex(tableName)
      .where(property)
      .select("*")
      .orderBy("reservation_time", "ASC");
}

function create(reservation) {
    return knex(tableName)
      .insert(reservation)
      .returning("*")
      .then((res) => res[0]);
}

function read(reservation_id) {
    return knex(tableName)
        .where({ reservation_id })
        .then((res) => res[0])
        .catch(() => {});
}

function update(reservation_id, updatedReservation) {
    return knex(tableName)
      .where({ reservation_id })
      .update(updatedReservation)
      .returning('*')
      .then((res) => res[0]);
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
}

function changeStatus(reservation_id, status) {
  return knex(tableName)
    .where({ reservation_id })
    .update({ status }, "*")
    .returning('*')
    .then((res) => res[0]);
}

module.exports = {
    list,
    create,
    read,
    update,
    search,
    changeStatus
}