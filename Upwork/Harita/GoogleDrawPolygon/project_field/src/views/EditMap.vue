<template>
  <div>
    <div id="editMap" style="height: 88vh;"></div>
    <EditTerritory
        style="height: 10vh; margin-bottom: 20px;"
        @evtSaveTerritory="saveTerritory"
    />
    <EditField
        style="height: 10vh;"
        @evtSaveField="saveField"
        @evtPlaceField="placeField"
    />
  </div>
</template>

<script>
  import EditTerritory from "../components/EditTerritory";
  import EditField from "../components/EditField";


  export default {
    name: 'EditMap',

    components: {
      EditField,
      EditTerritory
    },

    data() {
      return {
        map: null,
        drawingManager: null,
        geometry: null,
        territories: [],
        fields: [],
        lat: null,
        lng: null
      }
    },

    mounted() {
      this.initMap();
    },

    methods: {
      initMap() {
        const _this = this;
        setTimeout(() => {
          _this.map = new window.google.maps.Map(document.getElementById("editMap"), {
            zoom: 5,
            center: { lat: 24.886, lng: -70.268 },
            mapTypeId: "terrain",
          });

          _this.getTerritories();
          _this.getFields();

          _this.drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.BOTTOM_CENTER,
              drawingModes: [
                window.google.maps.drawing.OverlayType.POLYGON,
              ],
            },
          });

          this.drawingManager.setMap(_this.map);

          window.google.maps.event.addListener(_this.drawingManager, 'polygoncomplete', function(polygon) {
            _this.geometry = window.google.maps.geometry.encoding.encodePath(polygon.getPath());
            console.log(window.google.maps.geometry.encoding.encodePath(polygon.getPath()));
          });
        }, 1000)
      },

      // Gets all Land Boundaries from the server
      getTerritories() {
        const _this = this;
        (async () => {
          const res = await fetch(`http://localhost:3000/territories`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (res.status === 200) {
            this.territories = await res.json();

            this.territories.forEach(territory => {
              const landBoundaries = new window.google.maps.Polygon({
                paths: window.google.maps.geometry.encoding.decodePath(territory.geometry),
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: true,
                map: this.map,
                editable: true
              });

              // Adding all Land boundaries en event to be able to click at their
              // vertecies and getting the coordinates.
              window.google.maps.event.addListener(landBoundaries, "click", function(event) {
                // event.vertex returns the ID of the vertex
                if (event.vertex >= 0) {
                  _this.lat = landBoundaries.getPath().getArray()[event.vertex].lat();
                  _this.lng = landBoundaries.getPath().getArray()[event.vertex].lng()
                  console.log(_this.lat, _this.lng);
                } else {
                  console.log("Non-vertex click. Please click at vertecies")
                }
              })
            })
          }
        })();
      },

      getFields() {
        (async () => {
          const res = await fetch(`http://localhost:3000/fields`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (res.status === 200) {
            this.fields = await res.json();

            this.fields.forEach(field => {
              const feature = {
                geometry: new window.google.maps.Data.Polygon([window.google.maps.geometry.encoding.decodePath(field.geometry)]),
              }
              let color = "#00d9ff";

              let data = new window.google.maps.Data();
              data.add(feature)
              data.setMap(this.map);

              data.setStyle(function(feature) {
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                  fillColor: color,
                  strokeColor: "#323131",
                  strokeWeight: 2,
                  editable: true
                });
              });
            })
          }
        })();
      },

      saveTerritory(payload) {
        payload = {...payload, geometry: this.geometry};
        console.log(payload);

        (async () => {
          const res = await fetch("http://localhost:3000/territories/new", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
          })
          if (res.status === 200) {
            const result = await res.json();
            console.log(result);
          }
        })();
      },

      saveField(payload) {
        payload = {...payload, geometry: this.geometry};
        console.log(payload);

        (async () => {
          const res = await fetch("http://localhost:3000/fields/new", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
          })
          if (res.status === 200) {
            const result = await res.json();
            console.log(result);
          }
        })();
      },

      // ****************************
      // This is the main code block
      // ****************************

      placeField(payload) {
        console.log(payload);

        // Destructuring the EditField payload
        let {
          lat: startingLatitude, // if user clicked a Land Boundary vertex, use that coordinates else this coordinates
          lon: startingLongitude,
          width, // meters
          height, // meters
          row, // integer
          column, // integer
          gapWidth, // meters
          gapHeight, // meters
          angle // degree
        } = payload;

        width = parseFloat(width);
        height = parseFloat(height);
        row = parseFloat(row);
        column = parseFloat(column);
        gapWidth = parseFloat(gapWidth);
        gapHeight = parseFloat(gapHeight);
        angle = parseFloat(angle);

        console.log("lat: ", startingLatitude);
        console.log("lon: ", startingLongitude);
        console.log("width: ", width);
        console.log("height: ", height);
        console.log("row: ", row);
        console.log("column: ", column);
        console.log("gapWidth: ", gapWidth);
        console.log("gapHeight: ", gapHeight);
        console.log("angle: ", angle);
        console.log("width: ", ((column * width) + ((column + 1) * gapWidth)));
        console.log("height: ", ((row * height) + ((row + 1) * gapHeight)));
        console.log(((column * width) + ((column + 1) * gapWidth)))
        console.log(((row * height) + ((row + 1) * gapHeight)))
        console.log(((row * height) + ((row + 1) * gapHeight)))

        // Spherical
        const spherical = window.google.maps.geometry.spherical;

        // Field set boundaries coordinates
        let startingCoordinatesBottomLeft;

        // If user clicked Land Boundary vertex point
        if (this.lat && this.lng) {
          console.log("Land boundary vertex has been used!");
          startingCoordinatesBottomLeft = new window.google.maps.LatLng(this.lat, this.lng);
        } else {
          // If user entered latitude/longitude at user form
          console.log("Input form latitude/longitude has been used!");
          startingCoordinatesBottomLeft = new window.google.maps.LatLng(startingLatitude, startingLongitude);
        }

        const startingCoordinatesBottomRight = spherical.computeOffset(
          startingCoordinatesBottomLeft,
          ((column * width) + ((column + 1) * gapWidth)),
          (angle + 90)
        );

        const startingCoordinatesTopRight = spherical.computeOffset(
          startingCoordinatesBottomRight,
          ((row * height) + ((row + 1) * gapHeight)),
          angle
        );

        const startingCoordinatesTopLeft = spherical.computeOffset(
          startingCoordinatesBottomLeft,
          ((row * height) + ((row + 1) * gapHeight)),
          angle
        );

        // Checking if the drawing boundary coordinates are inside a land
        const arrayBoundaryCoordinates = [
          startingCoordinatesBottomLeft,
          startingCoordinatesBottomRight,
          startingCoordinatesTopRight,
          startingCoordinatesTopLeft
        ]

        let controlCoordinateInsideBoundary = [];
        
        arrayBoundaryCoordinates.forEach(coordinate => {
          this.territories.forEach(territory => {
            const landBoundaries = new window.google.maps.Polygon({
              paths: window.google.maps.geometry.encoding.decodePath(territory.geometry),
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              clickable: true
            });

            if (window.google.maps.geometry.poly.containsLocation(coordinate, landBoundaries)) {
              controlCoordinateInsideBoundary.push("true");
            }
          })
        })

        setTimeout(() => {
          if (controlCoordinateInsideBoundary.length === 4) {
            console.log(controlCoordinateInsideBoundary);

            // Marker for Field set outer boundaries coordinates
            // Left bottom
            new window.google.maps.Marker({
              position: startingCoordinatesBottomLeft,
              map: this.map,
              title: "BottomLeft",
            });

            // Right bottom
            new window.google.maps.Marker({
              position: startingCoordinatesBottomRight,
              map: this.map,
              title: "BottomRight",
            });

            // Right top
            new window.google.maps.Marker({
              position: startingCoordinatesTopRight,
              map: this.map,
              title: "TopRight",
            });

            // Left top
            new window.google.maps.Marker({
              position: startingCoordinatesTopLeft,
              map: this.map,
              title: "TopLeft",
            });

            const boundaryOuter = new google.maps.Polygon({
              paths: [
                startingCoordinatesBottomLeft,
                startingCoordinatesBottomRight,
                startingCoordinatesTopRight,
                startingCoordinatesTopLeft
              ],
              strokeColor: "#08ff00",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#80ff00",
              fillOpacity: 0.35,
              map: this.map,
            });

            // Distance between starting lat/long to First field polygon's left bottom coordinates
            const disStartToLeftBot = Math.hypot(parseFloat(gapHeight), parseFloat(gapWidth));
            // Angle
            const angleStartToLeftBot = this.degrees(gapHeight, gapWidth);

            // First field polygon's other coordinates
            const coordBottomLeft = spherical.computeOffset(startingCoordinatesBottomLeft, disStartToLeftBot, (angle + 90 - parseFloat(angleStartToLeftBot)));
            const coordBottomRight = spherical.computeOffset(coordBottomLeft, width, angle + 90);
            const coordTopLeft = spherical.computeOffset(coordBottomLeft, height, angle);
            const coordTopRight = spherical.computeOffset(coordBottomRight, height, angle);

            const arrayPolygons = [];
            let arrayMain = [];
            arrayPolygons.push([coordBottomLeft, coordBottomRight, coordTopRight, coordTopLeft]);

            // Creating polygons for column count
            for (let c = 1; c < column; c++) {
              const botLeft = spherical.computeOffset(coordBottomLeft, (c * (width + gapWidth)), (angle + 90));
              const botRight = spherical.computeOffset(botLeft, width, (angle + 90));
              const topRight = spherical.computeOffset(botRight, height, angle);
              const topLeft = spherical.computeOffset(botLeft, height, angle);

              arrayPolygons.push([botLeft, botRight, topRight, topLeft])
            }

            arrayMain = arrayPolygons;
            console.log("First row: ", arrayPolygons);

            // Creating polygons for row count
              arrayPolygons.forEach(polygon => {
                for (let r = 1; r < row; r++) {
                  console.log("r: ", r);
                  console.log(`Polygon:  ${r} --> ${polygon}`);
                  const botLeft = spherical.computeOffset(polygon[0], (r * (height + gapHeight)), angle);
                  const botRight = spherical.computeOffset(polygon[1], (r * (height + gapHeight)), angle);
                  const topRight = spherical.computeOffset(polygon[2], (r * (height + gapHeight)), angle);
                  const topLeft = spherical.computeOffset(polygon[3], (r * (height + gapHeight)), angle);

                  arrayMain.push([botLeft, botRight, topRight, topLeft])
                }
              })

            console.log("All polygons: ", arrayMain)

            // Drawing fields to map
            arrayMain.forEach(pathPolygon => {
              const polygon = new google.maps.Polygon({
                paths: pathPolygon,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                editable: true,
                map: this.map,
                zIndex: 999,
                draggable: true,
              });

              // Adding event listener to field polygons
              polygon.addListener("click", () => {
                  console.log("Clicked");
                }
              )
            })
          }
        }, 1000)
      },

      degrees(opposite, adjacent) {
        return Math.atan(opposite / adjacent) * 180 / Math.PI;
      }
  }

  }
</script>


<style scoped>

</style>
