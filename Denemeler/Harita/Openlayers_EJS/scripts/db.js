const config = require("../config/default");
const Pool  = require('pg').Pool;

const pool = new Pool({
  user: config.pgUser,
  password: config.pgPassword,
  host: config.pgHost,
  port: config.pgPort,
  database: config.pgDatabase
});

const getCity = (request, response) => {
  pool.query("select kimlik_no, adi from public.\"ABS_IL_M\"", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getDistrict = (request, response) => {
  const cityCode = parseInt(request.params.cityCode);
  pool.query("select kimlikno, adi from public.\"ABS_ILCE_M\" where il_kodu = $1", [cityCode], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getNeighborhood = (request, response) => {
  const districtCode = parseInt(request.params.districtCode);
  pool.query("select kimlikno, adi from public.\"ABS_MAHALLE_M\" where ilce_kodu = $1", [districtCode], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getStreet = (request, response) => {
  const neighborhoodCode = parseInt(request.params.neighborhoodCode);
  pool.query("select adi, yolid from public.\"ABS_SOKAK_M\" where mahalle_ko = $1 group by adi, yolid", [neighborhoodCode], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getDoor = (request, response) => {
  const streetCode = parseInt(request.params.streetCode);
  pool.query("select kimlik_no, kapi_no from public.\"ABS_NUMARATAJ_M\" where yolid = $1", [streetCode], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getParcel = (request, response) => {
  const neighborhoodCode = parseInt(request.params.neighborhoodCode);
  const block = parseInt(request.params.block);
  const parcel = parseInt(request.params.parcel);
  pool.query("select objectid, abs_ilce_a, kadastral1, kadastral_ from public.\"ABS_PARSEL_M\" where abs_mahall = $1 and kadastral1 = $2 and kadastral_ = $3", [neighborhoodCode, block, parcel], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

module.exports = {getCity, getDistrict, getNeighborhood, getStreet, getDoor, getParcel};
