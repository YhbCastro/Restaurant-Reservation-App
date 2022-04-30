const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsRead = require("../reservations/reservations.service").read;

const required = ["table_name", "capacity"];
const allowed = [...required, "reservation_id"];

async function list(req, res) {
    const { date } = req.query;
    const data = await service.list(date);
    res.json({ data });
};

async function create(req, res) {
    const { table } = res.locals;
    const data = await service.create(table);
    res.status(201).json({ data });
};

function read(req, res) {
    res.json({ data: res.locals.table });
};

async function seat(req, res) {
    const { reservation_id } = res.locals.reservation;
    const { table_id } = res.locals.table;
    await service.update(reservation_id, "seated");
    const data = await service.seat(reservation_id, table_id);
    res.status(200).json({ data });
};

async function finish(req, res) {
    const { reservation_id, table_id } = res.locals.table;
    await service.update(reservation_id, "finished");
    const data = await service.finish(table_id);
    res.json({ data });
};

function validateBody(req, res, next) {
    const { data = {} } = req.body;
  
    for (let property of Object.keys(data)) {
        if (!allowed.includes(property)) {
            return next({ status: 400, message: `property '${property}' not accepted` });
        };
    };

    for (let property of required) {
      if (!data[property]) {
          return next({ status: 400, message: `missing '${property}' property` });
      };
    };
  
    if (data.table_name.length < 2) {
      return next({ status: 400, message: `'table_name' must be at least 2 alphanumerics` });
    };

    if (typeof data.capacity !== "number" || data.capacity < 1) {
      return next({ status: 400, message: `'capacity' must be and integer at least 1` });
    };

    res.locals.table = data;
    return next();
};

async function validateReservationId(req, res, next) {
    const { data: { reservation_id } = {} } = req.body;

    if (!reservation_id){
      return next({ status: 400, message: `missing 'reservation_id' property` });
    };

    return next();
};

async function validateReservation(req, res, next) {
    const { data: { reservation_id } = {} } = req.body;
  
    if (!reservation_id) return next();
  
    const reservation = await reservationsRead(reservation_id);
    if (!reservation) {
      return next({ status: 404, message: `reservation: '${reservation_id}' does not exist` });
    };

    res.locals.reservation = reservation;

    return next();
};

async function validateTableId(req, res, next) {
    const { table_id } = req.params
    const table = await service.read(table_id);
  
    if (!table){
      return next({ status: 404, message: `table ${table_id} does not exist` });
    };

    res.locals.table = table;
    
    return next();
};

async function validateTable(req, res, next) {
    const { reservation, table } = res.locals;
    if (!!table.reservation_id) {
      return next({ status: 400, message: `"${table.table_name}" (#${table.table_id}) is unavailable as it is occupied` });
    };

    if (reservation.people > table.capacity) {
      return next({ status: 400, message: `"party size (${reservation.people}) exceeds ${table.table_name}" (#${table.table_id}) capacity (${table.capacity})` });
    };

    return next();
};

async function validateSeated(req, res, next) {
    const { table } = res.locals;
    if (!table.reservation_id) {
      return next({ status: 400, message: `cannot unseat "${table.table_name}" (#${table.table_id}), as it is not occupied` });
    };

    return next();
};

async function validateUniqueReservation(req, res, next) {
    const { reservation } = res.locals;
    if (reservation.status === "seated" || reservation.status === "finished") {
      return next({ status: 400, message: `cannot seat reservation: ${reservation.reservation_id}, it has already been ${reservation.status}` });
    };

    return next();
};

module.exports = {
    list: asyncErrorBoundary(list),
    create: [validateBody, asyncErrorBoundary(validateReservation), asyncErrorBoundary(create)],
    read: [asyncErrorBoundary(validateTableId), read],
    seat: [asyncErrorBoundary(validateTableId), validateReservationId, asyncErrorBoundary(validateReservation), validateTable, validateUniqueReservation, asyncErrorBoundary(seat)],
    finish: [asyncErrorBoundary(validateTableId), validateSeated, asyncErrorBoundary(finish)]
  };