const Excel = require('exceljs');
const axios = require("axios");


const baseURL = "https://www.tazedirekt.com/rest/products/search?category-id="

// Create workbook & add worksheet
const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('Sonuçlar');

// add column headers
worksheet.columns = [
  { header: 'Kategori Numarası', key: 'categoryId' },
  { header: 'Kategori', key: 'category' },
  { header: 'Sorgu sayısı', key: 'queryCount' },
  { header: 'Fiyatı', key: 'price' },
  { header: 'Markası', key: 'brand' },
  { header: 'Ürün', key: 'product' }
];

const fetcher = async function(categoryId) {
  const response = await axios.get(`${baseURL}${categoryId}`);
  const data = await response.data.data;
  const categoryName = data.metaData.title;
  const hitCount = data.hitCount
  const storeProductInfos = data.storeProductInfos;

  let counter = 0
  storeProductInfos.forEach(storeProductInfo => {
    counter++;
    worksheet.addRow({
      categoryId: categoryId,
      category: categoryName,
      queryCount: `${counter}/${hitCount}`,
      price: storeProductInfo.shownPrice / 100,
      brand: storeProductInfo.brand.name.toUpperCase(),
      product: storeProductInfo.name
    })
    console.log(`${counter} - (${storeProductInfo.shownPrice / 100} TL) - ${storeProductInfo.brand.name.toUpperCase()} - ${storeProductInfo.name} `)
  })
}

for (let i = 1; i < 200; i++) {
  fetcher(i);
}

setTimeout(() => {
  // save workbook to disk
  workbook
    .xlsx
    .writeFile('sample.xlsx')
    .then(() => {
      console.log("saved");
    })
    .catch((err) => {
      console.log("err", err);
    });
}, 15000)

