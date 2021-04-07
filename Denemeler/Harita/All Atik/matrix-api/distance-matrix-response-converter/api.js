const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const Excel = require('exceljs');

const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  const body = req.body;
  console.log(body)

  const workbook = new Excel.Workbook();
  workbook.xlsx.readFile("Distances.xlsx")
    .then(function() {
      const worksheet = workbook.getWorksheet("Distances");
      worksheet.eachRow(function(row, rowNumber) {
        console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
      });
    });
  res.send(body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
