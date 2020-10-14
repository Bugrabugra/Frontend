class TownElements {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }

  calculateAge() {
    return new Date().getFullYear() - this.buildYear;
  }
}


class Park extends TownElements {
  constructor(name, buildYear, numberOfTrees, area) {
    super(name, buildYear);
    this.numberOfTrees = numberOfTrees;
    this.area = area;
  }

  calcTreeDensity() {
    return this.numberOfTrees / this.area;
  }
}


class Street extends TownElements {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classification() {
    const classify = new Map();
    classify.set(1, "tiny");
    classify.set(2, "small");
    classify.set(3, "normal");
    classify.set(4, "big");
    classify.set(5, "huge");
    console.log(`${this.name}, was build in ${this.buildYear}, is a ${classify.get(this.size)} street.`)
  }
}


const allParks = [
  new Park("Denovan", 1990, 200, 500),
  new Park("Mathen", 2003, 300, 600),
  new Park("Green", 1970, 2000, 2300)
];

const allStreets = [
  new Street("Şakacı", 1981, 340, 2),
  new Street("Bahariye", 1965, 650, 5),
  new Street("İstiklal", 1910, 2200, 5),
  new Street("Pamuk", 2001, 250, 1)
];


let report = function() {
  const totalParkAge = function() {
    let total = 0;
    allParks.forEach(cur => total += cur.calculateAge());
    console.log(total);
    return total;
  };

  const totalStreetLength = function() {
    let total = 0;
    allStreets.forEach(cur => total += cur.length);
    return total;
  };

  console.log("----Parks Report----");
  console.log(`Our ${allParks.length} parks have an average age of ${totalParkAge() / allParks.length}`);
  allParks.forEach(cur => console.log(`${cur.name} has a tree density of ${cur.calcTreeDensity()}`));
  console.log(`${allParks[allParks.map(cur => cur.numberOfTrees).findIndex(cur => cur > 1000)].name} has more than 1000 trees`);

  console.log("----Streets Report----");
  console.log(`Our ${allStreets.length} streets have a total length of ${totalStreetLength()} km, with an average of ${totalStreetLength() / allStreets.length}`);
  allStreets.forEach(cur => cur.classification());
};

report();