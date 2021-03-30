const response = require("../distance-matrix-response/response.json");
const Excel = require('exceljs');


const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('Distances');

response.rows.forEach((row, i) => {
  const rowValues = [];
  row.elements.forEach(item => {
    // rowValues.push([item.distance.value, item.duration.value]);
    rowValues.push(item.distance.value)
  })

  worksheet.addRow(rowValues);
});

workbook.xlsx.writeFile('Distances.xlsx').then(() => {});



// response.rows.forEach(row => {
//   console.log(row.elements)
// })
