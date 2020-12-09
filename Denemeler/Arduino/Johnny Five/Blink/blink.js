const {Board, Led, Sensor} = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  const led = new Led(13);
  const potentiometer = new Sensor("A2");

  potentiometer.on("change", () => {
    const {value, raw} = potentiometer;
    console.log("Sensor: ");
    console.log("  value  : ", value);
    console.log("  raw    : ", raw);
    console.log("-----------------");
  });

  led.blink(500);
});
