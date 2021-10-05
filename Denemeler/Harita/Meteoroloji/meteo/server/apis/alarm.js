const db = require("../database/db");


// check poi alarms
const checkPOIsForWarnings = async (req, res) => {
  const {queryType, source, source2, value, value2, isPresent, isPresent2, poiId} = req.body;
  let query = "";
  switch (queryType) {
    case "single":
      query = `
      (source = '${source}' and
                        (${value} between min_value and max_value) and
                        is_present = ${isPresent})`;
      break;
    case "multi":
      query = `
      (source = '${source}' and
                        (${value} between min_value and max_value) and
                        is_present = ${isPresent}) 
                        or 
      (source = '${source2}' and
                        (${value2} between min_value and max_value) and
                        is_present = ${isPresent2})
      `;
      break;
  }
  await db.query(
    `select users.phone_number, users.warnings_to_receive, 
     users.poi_responsibilities, sub_warnings.warning_id, sub_warnings.message,
     sub_warnings.is_screen, sub_warnings.is_field
     from users, (select id as warning_id, message, is_screen, is_field
                  from warnings
                  where uniq(sort(rules)) = uniq(sort((
                    select array_agg(id) as rule_id
                    from rules
                    where ${query}
             )))) as sub_warnings
     where
     sub_warnings.warning_id = any (users.warnings_to_receive) and
    ${poiId} = any(users.poi_responsibilities);`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
};

module.exports = {checkPOIsForWarnings};