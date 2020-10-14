// Dom elements
const closer = document.getElementById('popup-closer');
const infoAccordion = document.getElementById("info-accordion");
const mapDiv = document.querySelector("#map");

// Identify widget accordion element
const accordionSection = (feature, index) => {
  return `
              <div class="card-header popup-card-header" id="heading-${index}">
                <h2 class="mb-0">
                  <button class="btn btn-block text-left info-popup-card-button" id="info-popup-card-button-${index}" type="button" data-toggle="collapse" data-target="#collapse-${index}" aria-expanded="true" aria-controls="collapse-${index}">
                    ${feature.getId()}
                  </button>
                </h2>
              </div>

              <div id="collapse-${index}" class="collapse popup-body-container" aria-labelledby="heading-${index}" data-parent="#info-accordion">
                <div class="card-body popup-card-body" id="card-body-${index}">

                </div>
              </div>
            `
};

// Not authorized map landing page
mapDiv.innerHTML = "<div class=\"load-dot-container\">\n" + "  <div class=\"load-dot-1\"></div>\n" + "  <div class=\"load-dot-2\"></div>\n" + "  <div class=\"load-dot-3\"></div>\n" + "</div><h1>Please log in to use the map</h1>";

// Other layers fetch function
async function permittedLayers() {
  try {
    const response = await fetch("http://localhost:3000/otherLayers");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// Address layers fetch function
async function addressLayers() {
  try {
    const response = await fetch("http://localhost:3000/addressLayers");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// const allLayers
const getLayer = async (layerName) => {
  const arrayAllLayers = [];

  const resOtherLayers = await fetch("http://localhost:3000/otherLayers");
  const otherLayers = await resOtherLayers.json();

  const resAddressLayers = await fetch("http://localhost:3000/addressLayers");
  const addressLayers = await resAddressLayers.json();

  await arrayAllLayers.push(...otherLayers, ...addressLayers);
  for (const layer of arrayAllLayers) {
    if (layer.lyrName === layerName) {
      for (const lyr of layer.lyrFields) {
        if (lyr.binding.includes("geom")) {
          return await [lyr.name, lyr.binding.split(".")[lyr.binding.split(".").length - 1], layer.lyrFields];
        }
      }
    }
  }
};

// Map properties fetch function
async function mapProperties() {
  try {
    const response = await fetch("http://localhost:3000/maps");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// Vector source for geoserver services
const vectorSource = (layer) => {
  return new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: (extent) => {
      return (`http://localhost:8080/geoserver/Bugra/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bugra:${layer}&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join(',')},EPSG:3857`);
    },
    strategy: ol.loadingstrategy.bbox,
  })
};

// Layer creating class
class LayerCreator {
  constructor(
    lyrName, lyrGeoServerName, lyrStrokeColor,
    lyrStrokeWidth, lyrFillColor, lyrOpacity,
    lyrPointRadius, lyrMinZoom, lyrMaxZoom,
    lyrLabelField, lyrFontFamily, lyrFontFillColor,
    lyrFontStrokeColor, lyrFontStrokeWidth, lyrFontBold,
    lyrFontSize, lyrFontPlacement, lyrFontOffsetY
    ) {
    return new ol.layer.Vector({
      className: `${lyrName}-${lyrGeoServerName}`,
      source: vectorSource(lyrGeoServerName),
      style: function text(feature) {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: lyrStrokeColor,
            width: lyrStrokeWidth,
          }),
          fill: new ol.style.Fill({
            color: lyrFillColor
          }),
          image: new ol.style.Circle({
            radius: lyrPointRadius,
            fill: new ol.style.Fill({
              color: lyrFillColor
            }),
            stroke: new ol.style.Stroke({
              color: lyrStrokeColor,
              width: lyrStrokeWidth,
            })
          }),
          text: new ol.style.Text({
            text: feature.get(lyrLabelField),
            font: `${lyrFontBold} ${lyrFontSize}px ${lyrFontFamily}`,
            fill: new ol.style.Fill({
              color: lyrFontFillColor,
            }),
            stroke: new ol.style.Stroke({
              color: lyrFontStrokeColor,
              width: lyrFontStrokeWidth,
            }),
            placement: lyrFontPlacement,
            offsetY: lyrFontOffsetY
          }),
        })
      },
      opacity: lyrOpacity,
      minZoom: lyrMinZoom,
      maxZoom: lyrMaxZoom,
    });
  }
}

// OSM map
const lyrOSM = new ol.layer.Tile({
  source: new ol.source.OSM()
});

// View
const view = new ol.View({
  center: [0, 0],
  zoom: 1,
  maxZoom: 20
});

// Layers array
let layers = [];

// Filling address layers into layers array
addressLayers().then((adlay) => {
  adlay.forEach((al) => {
    layers.push(new LayerCreator(
      al.lyrName,
      al.lyrGeoServerName,
      al.lyrStrokeColor,
      al.lyrStrokeWidth,
      al.lyrFillColor,
      al.lyrOpacity,
      al.lyrPointRadius,
      al.lyrMinZoom,
      al.lyrMaxZoom,
      al.lyrLabelField,
      al.lyrFontFamily,
      al.lyrFontFillColor,
      al.lyrFontStrokeColor,
      al.lyrFontStrokeWidth,
      al.lyrFontBold,
      al.lyrFontSize,
      al.lyrFontPlacement,
      al.lyrFontOffsetY));
  });
});

// Fetching permitted layers
permittedLayers().then((permission) => {
  permission.forEach((layer) => {
    const lyrName = layer.lyrName;
    const lyrGeoServerName = layer.lyrGeoServerName;
    const lyrStrokeColor = layer.lyrStrokeColor;
    const lyrStrokeWidth = layer.lyrStrokeWidth;
    const lyrFillColor = layer.lyrFillColor;
    const lyrOpacity = layer.lyrOpacity;
    const lyrPointRadius = layer.lyrPointRadius;
    const lyrMinZoom = layer.lyrMinZoom;
    const lyrMaxZoom = layer.lyrMaxZoom;
    const lyrLabelField = layer.lyrLabelField;
    const lyrFontFamily = layer.lyrFontFamily;
    const lyrFontFillColor = layer.lyrFontFillColor;
    const lyrFontStrokeColor = layer.lyrFontStrokeColor;
    const lyrFontStrokeWidth = layer.lyrFontStrokeWidth;
    const lyrFontBold = layer.lyrFontBold;
    const lyrFontSize = layer.lyrFontSize;
    const lyrFontPlacement = layer.lyrFontPlacement;
    const lyrFontOffsetY = layer.lyrFontOffsetY;

    // Pushing fetched layers into layers array
    layers.push(new LayerCreator(
      lyrName, lyrGeoServerName, lyrStrokeColor,
      lyrStrokeWidth, lyrFillColor, lyrOpacity,
      lyrPointRadius, lyrMinZoom, lyrMaxZoom,
      lyrLabelField, lyrFontFamily, lyrFontFillColor,
      lyrFontStrokeColor, lyrFontStrokeWidth, lyrFontBold,
      lyrFontSize, lyrFontPlacement, lyrFontOffsetY
    ))
  });
}).then(() => {
  mapDiv.innerHTML = "";
  const map = new ol.Map({
    target: 'map',
    layers: [lyrOSM, ...layers],
    view: view
  });

  // Layer manager
  const layerManager = document.querySelector("#layer-manager");

  // Populating layer manager
  layers.forEach((layer, index) => {
    const html =
      `<div class="form-check">
        <div>
          <input class="form-check-input" type="checkbox" id="check-${index}" ${layer.getProperties().visible ? "checked" : ""}>
          <label class="form-check-label" for="check-${index}">
         ${layer.getClassName().split("-")[0].substring(0, 10)}
          </label>
            <input class="form-control ratio" type="text" value="%${layer.getOpacity() * 100}" id="ratio-${index}" readonly>
            <input class="form-control-range" type="range" id="slider-${index}" value=${layer.getOpacity() * 100}>
        </div>
      </div>`;

    layerManager.innerHTML += html;
  });

  // Layer visibility and color
  layerManager.addEventListener("change", (event) => {
    const targetLayer = layers[event.target.id.split("-")[1]];
    if (event.target.type === "checkbox") {
      event.target.checked ? targetLayer.setVisible(true) : targetLayer.setVisible(false);
    } else if (event.target.type === "range") {
      targetLayer.setOpacity(event.target.value / 100);
      document.querySelector(`#ratio-${event.target.id.split("-")[1]}`).value = "%" + String(targetLayer.getOpacity() * 100);
      document.querySelector(`#ratio-${event.target.id.split("-")[1]}`).value = "%" + String(targetLayer.getOpacity() * 100);
    }
  });

  // EPSG definition
  proj4.defs("EPSG:5256","+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  ol.proj.proj4.register(proj4);
  const turef = ol.proj.get("EPSG:5256");

  // HEX to RGB function
  function hexToRGB(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];

      // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return +r + "," + +g + "," + +b ;
  }

  // Sorting function
  function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  mapProperties().then((mapProperty) => {
    mapProperty.forEach((mp) => {

      // Highlight style definition
      const styleInfoHighlight = new ol.style.Style({
        fill: new ol.style.Fill({
          color: `rgba(${hexToRGB(mp.highlight.fillColor)},${mp.highlight.fillOpacity})`,
        }),
        stroke: new ol.style.Stroke({
          color: `rgba(${hexToRGB(mp.highlight.strokeColor)},${mp.highlight.strokeOpacity})`,
          width: mp.highlight.strokeWidth,
        }),
        image: new ol.style.Circle({
          radius: mp.highlight.radius,
          fill: new ol.style.Fill({
            color: `rgba(${hexToRGB(mp.highlight.fillColor)},${mp.highlight.fillOpacity})`,
          }),
          stroke: new ol.style.Stroke({
            color: `rgba(${hexToRGB(mp.highlight.strokeColor)},${mp.highlight.strokeOpacity})`,
            width: mp.highlight.strokeWidth,
          }),
        })
      });

      const featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: function() {
          return styleInfoHighlight
        }
      });

      // Fetching a feature and zooming to it and highlighting it
      let featureFetcher = (layerName, fieldName, value) => {
        fetch(`http://localhost:8080/geoserver/Bugra/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bugra%3A${layerName}&outputFormat=application%2Fjson&CQL_FILTER=${fieldName}=${value}`)
          .then(response => {
            return response.json()
          })
          .then(response => {
            const features = new ol.format.GeoJSON().readFeatures(response, {dataProjection: turef, featureProjection: "EPSG:3857"});

            let extent = new ol.extent.createEmpty();

            features.forEach((feat) => {
              extent = new ol.extent.extend(extent, feat.getGeometry().getExtent());
            });

            map.getView().fit(extent);

            featureOverlay.getSource().clear();
            featureOverlay.getSource().addFeatures(features);
          });
      };

      // Clearing comboboxes
      const clearCmb = (cmb) => {
        const length = cmb.options.length;
        for (let i = length; i >= 1; i--) {
          cmb.options[i] = null;
        }
      };

      // DOM constants
      const cmbCity = document.querySelector(".city");
      const cmbDistrict = document.querySelector(".district");
      const cmbNeighborhood = document.querySelector(".neighborhood");
      const cmbStreet = document.querySelector(".street");
      const cmbDoor = document.querySelector(".door");
      const cmbParcelDistrict =  document.querySelector(".parcel-district");
      const cmbParcelNeighborhood =  document.querySelector(".parcel-neighborhood");
      const btnFindParcel = document.querySelector(".find-parcel");

      // City combobox
      fetch("http://localhost:3000/city")
        .then((res) => {
          return res.json();
        }).then(response => {
        clearCmb(cmbCity);
        response.forEach((city) => {
          const html = `<option value="${city.kimlik_no}">${city.adi}</option>`;
          cmbCity.innerHTML += html;
        });
      });

      cmbCity.addEventListener("change", () => {
        clearCmb(cmbDistrict);
        clearCmb(cmbNeighborhood);
        clearCmb(cmbStreet);
        clearCmb(cmbDoor);

        const selectedCityCode = cmbCity.options[cmbCity.selectedIndex].value;

        featureFetcher("ABS_IL_M", "kimlik_no", selectedCityCode);

        fetch(`http://localhost:3000/district/${selectedCityCode}`)
          .then((res) => {
            return res.json();
          }).then(response => {
          response.sort(dynamicSort("adi")).forEach((district) => {
            const html = `<option value="${district.kimlikno}">${district.adi}</option>`;
            cmbDistrict.innerHTML += html;
          });
        });
      });

      // District combobox
      cmbDistrict.addEventListener("change", () => {
        clearCmb(cmbNeighborhood);
        clearCmb(cmbStreet);
        clearCmb(cmbDoor);

        const selectedDistrictCode = cmbDistrict.options[cmbDistrict.selectedIndex].value;

        featureFetcher("ABS_ILCE_M", "kimlikno", selectedDistrictCode);

        fetch(`http://localhost:3000/neighborhood/${selectedDistrictCode}`)
          .then((res) => {
            return res.json();
          }).then(response => {
          response.sort(dynamicSort("adi")).forEach((neighborhood) => {
            const html = `<option value="${neighborhood.kimlikno}">${neighborhood.adi}</option>`;
            cmbNeighborhood.innerHTML += html;
          });
        });
      });

      // Neighborhood combobox
      cmbNeighborhood.addEventListener("change", () => {
        clearCmb(cmbStreet);
        clearCmb(cmbDoor);
        const selectedNeighborhoodCode = cmbNeighborhood.options[cmbNeighborhood.selectedIndex].value;

        featureFetcher("ABS_MAHALLE_M", "kimlikno", selectedNeighborhoodCode);

        fetch(`http://localhost:3000/street/${selectedNeighborhoodCode}`)
          .then((res) => {
            return res.json();
          }).then(response => {
          response.sort(dynamicSort("adi")).forEach((street) => {
            const html = `<option value="${street.yolid}">${street.adi}</option>`;
            cmbStreet.innerHTML += html;
          });
        });
      });

      // Street combobox
      cmbStreet.addEventListener("change", () => {
        clearCmb(cmbDoor);
        const selectedStreetCode = cmbStreet.options[cmbStreet.selectedIndex].value;

        featureFetcher("ABS_SOKAK_M", "yolid", selectedStreetCode);

        fetch(`http://localhost:3000/door/${selectedStreetCode}`)
          .then((res) => {
            return res.json();
          }).then(response => {
          response.sort(dynamicSort("kapi_no")).forEach((door) => {
            const html = `<option value="${door.kimlik_no}">${door.kapi_no}</option>`;
            cmbDoor.innerHTML += html;
          });
        });
      });

      // Door combobox
      cmbDoor.addEventListener("change", () => {
        const selectedDoorCode = cmbDoor.options[cmbDoor.selectedIndex].value;

        featureFetcher("ABS_NUMARATAJ_M", "kimlik_no", selectedDoorCode);
      });

      // Parcel district combobox
      const selectedCityCode = 58; // Sivas citycode

      fetch(`http://localhost:3000/district/${selectedCityCode}`)
        .then((res) => {
          return res.json();
        }).then(response => {
        clearCmb(cmbParcelDistrict);
        clearCmb(cmbParcelNeighborhood);
        response.sort(dynamicSort("adi")).forEach((district) => {
          const html = `<option value="${district.kimlikno}">${district.adi}</option>`;
          cmbParcelDistrict.innerHTML += html;
        });
      });

      cmbParcelDistrict.addEventListener("change", () => {
        clearCmb(cmbParcelNeighborhood);

        const selectedParcelDistrictCode = cmbParcelDistrict.options[cmbParcelDistrict.selectedIndex].value;

        featureFetcher("ABS_ILCE_M", "kimlikno", selectedParcelDistrictCode);

        // Parcel neighborhood combobox
        fetch(`http://localhost:3000/neighborhood/${selectedParcelDistrictCode}`)
          .then((res) => {
            return res.json();
          }).then(response => {
          response.sort(dynamicSort("adi")).forEach((neighborhood) => {
            const html = `<option value="${neighborhood.kimlikno}">${neighborhood.adi}</option>`;
            cmbParcelNeighborhood.innerHTML += html;
          });
        });

        cmbParcelNeighborhood.addEventListener("change", () => {
          const selectedParcelNeighborhoodCode = cmbParcelNeighborhood.options[cmbParcelNeighborhood.selectedIndex].value;

          featureFetcher("ABS_MAHALLE_M", "kimlikno", selectedParcelNeighborhoodCode);
        })
      });

      btnFindParcel.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedParcelNeighborhoodCode = cmbParcelNeighborhood.options[cmbParcelNeighborhood.selectedIndex].value;
        fetch(`http://localhost:8080/geoserver/Bugra/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Bugra%3AABS_PARSEL_M&outputFormat=application%2Fjson&CQL_FILTER=abs_mahall=${selectedParcelNeighborhoodCode} and kadastral1=${$("#block").val()} and kadastral_=${$("#parcel").val()}`)
          .then(response => {
              return response.json()
            })
            .then(response => {
              console.log(response);
              const features = new ol.format.GeoJSON()
                .readFeatures(response, {dataProjection: turef, featureProjection: "EPSG:3857"});

              let extent = new ol.extent.createEmpty();

              features.forEach((feat) => {
                extent = new ol.extent.extend(extent, feat.getGeometry().getExtent());
              });

              map.getView().fit(extent);

              featureOverlay.getSource().clear();
              featureOverlay.getSource().addFeatures(features);
            }).catch(() => {
            $("#parcel").val("Couldn't find the parcel");
            })
      })
    })
  });

  /*
  -------------------------------------
  ---------CUSTOM WIDGET CODES---------
  -------------------------------------
   */

  // Openlayers WFS definition
  const formatWFS = new ol.format.WFS();

  // Map interactions
  let create;
  let modify;
  let modifySelect;
  let delete_;
  let identify;
  let measure;

  // Container that the elements will be appended
  const overlayContainer = document.querySelector(".ol-overlaycontainer-stopevent");

  // Clearing confirm and cancel buttons in overlayContainer
  const clearConCan = () => {
    for (let i = overlayContainer.childNodes.length - 1; i >= 0; --i) {
      if ($(overlayContainer.childNodes[i]).hasClass("con-can")) {
        overlayContainer.childNodes[i].remove();
      }
    }
  };

  // Layer selection combo box
  const selLayer = document.createElement('select');
  selLayer.className = "custom-select";
  $(selLayer).prepend("<option value='' disabled>Select a layer</option>").val('');
  layers.forEach(async (layer, index) => {
    $(selLayer).append(new Option(layer.getClassName().split("-")[0], index));
  });

  const elementDivSelectLayer = document.createElement('div');

  elementDivSelectLayer.className = 'select-layer-widget ol-unselectable ol-control';
  elementDivSelectLayer.appendChild(selLayer);
  overlayContainer.appendChild(elementDivSelectLayer);

  const controlSelectLayer = new ol.control.Control({
    element: elementDivSelectLayer
  });

  map.addControl(controlSelectLayer);


  // Create widget code
  const widgetCreate = async () => {
    let layerGeometryType;
    let layerGeometryColumn;
    let layerFields;

    // Get layer geometry and fields
    await getLayer($(".custom-select option:selected").text())
      .then(res => {
        layerFields = res[2];
        layerGeometryType = res[1];
        layerGeometryColumn = res[0];
      });

    // Refresh the source
    layers[$(selLayer).val()].getSource().refresh();

    // Clear confirm and cancel buttons
    clearConCan();

    const layerName = layers[$(selLayer).val()].getClassName().split("-")[1];
    const layerSource = layers[$(selLayer).val()].getSource();

    // Cancel other interactions
    map.removeInteraction(modify);
    map.removeInteraction(modifySelect);
    map.removeInteraction(delete_);
    map.removeInteraction(identify);
    map.removeInteraction(measure);

    // Collection of drawn features
    const drawnFeatures = new ol.Collection();

    // Adding draw and snap interactions to the map
    // Draw widget definition
    create = new ol.interaction.Draw({
      source: layerSource,
      features: drawnFeatures,
      type: layerGeometryType, // MultiPolygon, MultiLineString, Point
      geometryName: layerGeometryColumn,
      condition: (e) => {
        // When the point's button is 1 (left click) allow drawing, otherwise delete the sketch
        if (e.originalEvent.buttons === 1) {
          return true
        } else {
          create.abortDrawing();
          return false
        }
      }
    });

    // Adding create widget to the map
    map.addInteraction(create);

    // Snap widget definition
    const snap = new ol.interaction.Snap({
      source: layerSource
    });

    // Adding snap widget to the map
    map.addInteraction(snap);

    // WFS transactioner
    const transactionWFS = (f) => {
      const formatGML = new ol.format.GML({
        featureNS: "Bugra",
        featureType: layerName,
        srsName: "EPSG:3857"
      });
      
      const xs = new XMLSerializer();
      const payload = xs.serializeToString(formatWFS.writeTransaction(f, null, null, formatGML));

      $.ajax('http://localhost:8080/geoserver/wfs',{
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload
      }).done(function(res) {
        if (res.querySelector('ExceptionText')) {
          // Refresh the source
          layers[$(selLayer).val()].getSource().refresh();
          alert(res.querySelector('ExceptionText').textContent);
          $(`#card-body-${index}`).empty();
        } else {
          const totalInserted = res.querySelector('totalInserted').textContent;
          // Refresh the source
          layers[$(selLayer).val()].getSource().refresh();
          alert(`Total inserted feature count is: ${totalInserted}`);
          $(`#card-body-${index}`).empty();
        }
      });
    };

    let stateCreateConfirmCancel = false;

    create.on('drawend', (e) => {
      $(infoAccordion).empty();
      [(e.feature)].forEach((feature, index) => {
        // Fill the info accordion box
        $(infoAccordion).append(accordionSection(feature, index));
        // Emptying field and values's card body to fill it
        $(`#card-body-${index}`).empty();

        layerFields.forEach((field, _index) => {
          if (field.binding.split(".").length < 4) {
            const fieldType = field.binding.split(".")[2];
            const accordionSectionContent = () => {
              if (fieldType === "String") {
                return `<p class="popupRow"><b>${field.name}:</b> <input id="input-attribute-${_index}" type="text"></p>`
              } else if (fieldType === "Long" || fieldType === "Integer" || fieldType === "Double" || fieldType === "BigDecimal") {
                return `<p class="popupRow"><b>${field.name}:</b> <input id="input-attribute-${_index}" type="number"></p>`
              } else if (fieldType === "Date") {
                return `<p class="popupRow"><b>${field.name}:</b> <input id="input-attribute-${_index}" type="date"></p>`
              }
            };
            if (field.name !== "id" && field.name !== "geometry") {
              $(`#card-body-${index}`).append(accordionSectionContent())
            }
          }
        });

        if (!stateCreateConfirmCancel) {
          // Confirm and cancel
          // Confirm
          const btnCreateConfirm = document.createElement('button');
          btnCreateConfirm.innerHTML =
            "<span style=\"font-size: 1em; color: #30ff12;\">\n" +
            "  <i class=\"fas fa-check-circle\"></i>\n" +
            "</span>";
          btnCreateConfirm.style.width = "30px";

          // Create Confirm button event
          const handleCreateConfirm = () => {
            // Set new attributes
            layerFields.forEach((field, __index) => {
              if (field.name !== "id" && field.name !== layerGeometryColumn) {
                if ($(`#input-attribute-${__index}`).val()) {
                  feature.set(field.name, $(`#input-attribute-${__index}`).val())
                }
              }
            });

            transactionWFS([e.feature]);
            // Empty info card
            map.removeInteraction(create);
            overlayContainer.removeChild(elementDivCreateCancel);
            overlayContainer.removeChild(elementDivCreateConfirm);
            // Reset the confirm-cancel buttons
            stateCreateConfirmCancel = false;
          };

          btnCreateConfirm.addEventListener('click', handleCreateConfirm, false);

          const elementDivCreateConfirm = document.createElement('div');

          elementDivCreateConfirm.className = 'create-confirm-widget con-can ol-unselectable ol-control';
          elementDivCreateConfirm.appendChild(btnCreateConfirm);
          overlayContainer.appendChild(elementDivCreateConfirm);

          const controlCreateConfirm = new ol.control.Control({
            element: elementDivCreateConfirm
          });

          map.addControl(controlCreateConfirm);

          // Cancel
          const btnCreateCancel = document.createElement('button');
          btnCreateCancel.innerHTML =
            "<span style=\"font-size: 1em; color: #e22c69;\">\n" +
            "  <i class=\"fas fa-minus-circle\"></i>\n" +
            "</span>";
          btnCreateCancel.style.width = "30px";

          // Create Cancel button event
          const handleCreateCancel = () => {
            map.removeInteraction(create);
            overlayContainer.removeChild(elementDivCreateCancel);
            overlayContainer.removeChild(elementDivCreateConfirm);
            // Refresh the source
            layers[$(selLayer).val()].getSource().refresh();
            // Reset the confirm-cancel buttons
            stateCreateConfirmCancel = false;
          };

          btnCreateCancel.addEventListener('click', handleCreateCancel, false);

          const elementDivCreateCancel = document.createElement('div');

          elementDivCreateCancel.className = 'create-cancel-widget con-can ol-unselectable ol-control';
          elementDivCreateCancel.appendChild(btnCreateCancel);
          overlayContainer.appendChild(elementDivCreateCancel);

          const controlCreateCancel = new ol.control.Control({
            element: elementDivCreateCancel
          });

          map.addControl(controlCreateCancel);

          stateCreateConfirmCancel = true;
        }

      });
    });
  };

  // Modify widget code
  const widgetModify = async () => {
    let layerGeometryType;
    let layerGeometryColumn;
    let layerFields;

    // Get layer geometry and fields
    await getLayer($(".custom-select option:selected").text())
      .then(res => {
        layerFields = res[2];
        layerGeometryType = res[1];
        layerGeometryColumn = res[0];
      });

    // Clear confirm and cancel buttons
    clearConCan();

    // Refresh the source
    layers[$(selLayer).val()].getSource().refresh();

    const layerName = layers[$(selLayer).val()].getClassName().split("-")[1];
    const layerSource = layers[$(selLayer).val()].getSource();

    // Cancel other interactions
    map.removeInteraction(create);
    map.removeInteraction(delete_);
    map.removeInteraction(identify);
    map.removeInteraction(measure);

    // Collection of selected features
    const selectedFeatures = new ol.Collection();

    // Generating a select interaction
    modifySelect = new ol.interaction.Select({
      layers: [layers[$(selLayer).val()]],
      features: selectedFeatures,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#3b94ee',
          width: 6
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255,249,248,0.6)'
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: 'rgba(255,249,248,0.6)'
          }),
          stroke: new ol.style.Stroke({
            color: '#3b94ee',
            width: 2
          })
        })
      })
    });

    map.addInteraction(modifySelect);

    // Preventing confirm-cancel buttons to reappear
    let stateModifyConfirmCancel = false;

    // When a feature is selected
    modifySelect.on("select", (e) => {
      $(infoAccordion).empty();
      (e.selected).forEach((feature, index) => {
        // Fill the info accordion box
        $(infoAccordion).append(accordionSection(feature, index));
        // Emptying field and values's card body to fill it
        $(`#card-body-${index}`).empty();

        layerFields.forEach((field, _index) => {
          if (field.binding.split(".").length < 4) {
            const fieldType = field.binding.split(".")[2];
            const accordionSectionContent = () => {
              if (fieldType === "String") {
                return `<p class="popupRow"><b>${field.name}:</b> <input id="input-attribute-${_index}" type="text" value="${feature.get(field.name)}"></p>`
              } else if (fieldType === "Long" || fieldType === "Integer" || fieldType === "Double" || fieldType === "BigDecimal") {
                return `<p class="popupRow"><b>${field.name}:</b> <input id="input-attribute-${_index}" type="number" value="${feature.get(field.name)}"></p>`
              } else if (fieldType === "Date") {
                return `<p class="popupRow"><b>${field.name}:</b> <input id="input-attribute-${_index}" type="date" value=${d}.${m}.${y}></p>`
              }
            };
            if (field.name !== "id" && field.name !== "geometry") {
              $(`#card-body-${index}`).append(accordionSectionContent())
            }
          }
        });

        // Adding modify and snap interactions to the map
        // Modify widget definition
        modify = new ol.interaction.Modify({
          // Limiting the modifyable features
          features: selectedFeatures,
          condition: (e) => {
            // When the point's button is 1 (left click) allow drawing, otherwise delete the sketch
            return e.originalEvent.buttons === 1;
          }
        });

        // Adding create widget to the map
        map.addInteraction(modify);

        // Snap widget definition
        const snap = new ol.interaction.Snap({
          source: layerSource
        });

        // Adding snap widget to the map
        map.addInteraction(snap);

        // WFS transactioner
        const transactionWFS = (f) => {
          const formatGML = new ol.format.GML({
            featureNS: "Bugra",
            featureType: layerName,
            srsName: "EPSG:3857"
          });

          const xs = new XMLSerializer();

          // Replacing feature:layername with Bugra:layername
          const find = `feature:${layerName}`;
          const re = new RegExp(find, "g");
          const payload = xs.serializeToString(formatWFS.writeTransaction(null, f, null, formatGML))
            .replace(re, `Bugra:${layerName}`);

          $.ajax('http://localhost:8080/geoserver/wfs',{
            service: "WFS",
            type: 'POST',
            dataType: 'xml',
            processData: false,
            contentType: 'text/xml',
            data: payload
          }).done(function(res) {
            if (res.querySelector('ExceptionText')) {
              // Refresh the source
              layers[$(selLayer).val()].getSource().refresh();
              alert(res.querySelector('ExceptionText').textContent);
              // Empty the attribute table
              $(infoAccordion).empty();
            } else {
              const totalUpdated = res.querySelector('totalUpdated').textContent;
              // Refresh the source
              layers[$(selLayer).val()].getSource().refresh();
              alert(`Total modified feature count is: ${totalUpdated}`);
              // Empty the attribute table
              $(infoAccordion).empty();
            }
          });
        };

        if (!stateModifyConfirmCancel) {
          // Confirm and cancel
          // Confirm
          const btnModifyConfirm = document.createElement('button');
          btnModifyConfirm.innerHTML =
            "<span style=\"font-size: 1em; color: #30ff12;\">\n" +
            "  <i class=\"fas fa-check-circle\"></i>\n" +
            "</span>";
          btnModifyConfirm.style.width = "30px";

          // Modify Confirm button event
          const handleModifyConfirm = () => {
            layerFields.forEach((field, __index) => {
              if (field.name !== "id" && field.name !== layerGeometryColumn) {
                feature.set(field.name, $(`#input-attribute-${__index}`).val())
              }
            });

            transactionWFS([feature]);
            map.removeInteraction(modify);
            overlayContainer.removeChild(elementDivModifyCancel);
            overlayContainer.removeChild(elementDivModifyConfirm);

            // Clear the selection
            modifySelect.getFeatures().clear();
            // Reset the confirm-cancel buttons
            stateModifyConfirmCancel = false;
          };

          btnModifyConfirm.addEventListener('click', handleModifyConfirm, false);

          const elementDivModifyConfirm = document.createElement('div');

          elementDivModifyConfirm.className = 'modify-confirm-widget con-can ol-unselectable ol-control';
          elementDivModifyConfirm.appendChild(btnModifyConfirm);
          overlayContainer.appendChild(elementDivModifyConfirm);

          const controlModifyConfirm = new ol.control.Control({
            element: elementDivModifyConfirm
          });

          map.addControl(controlModifyConfirm);

          // Cancel
          const btnModifyCancel = document.createElement('button');
          btnModifyCancel.innerHTML =
            "<span style=\"font-size: 1em; color: #e22c69;\">\n" +
            "  <i class=\"fas fa-minus-circle\"></i>\n" +
            "</span>";
          btnModifyCancel.style.width = "30px";

          // Create Cancel button event
          const handleModifyCancel = () => {
            overlayContainer.removeChild(elementDivModifyCancel);
            overlayContainer.removeChild(elementDivModifyConfirm);
            // Clear the selection
            modifySelect.getFeatures().clear();
            // Empty the attribute table
            $(infoAccordion).empty();
            // Refresh the source
            layers[$(selLayer).val()].getSource().refresh();
            // Reset the confirm-cancel buttons
            stateModifyConfirmCancel = false;
          };

          btnModifyCancel.addEventListener('click', handleModifyCancel, false);

          const elementDivModifyCancel = document.createElement('div');

          elementDivModifyCancel.className = 'modify-cancel-widget con-can ol-unselectable ol-control';
          elementDivModifyCancel.appendChild(btnModifyCancel);
          overlayContainer.appendChild(elementDivModifyCancel);

          const controlModifyCancel = new ol.control.Control({
            element: elementDivModifyCancel
          });

          map.addControl(controlModifyCancel);

          stateModifyConfirmCancel = true;
        }

      });

    })
  };

  // Delete widget code
  const widgetDelete = () => {
    // Clear confirm and cancel buttons
    clearConCan();

    // Refresh the source
    layers[$(selLayer).val()].getSource().refresh();

    const layerName = layers[$(selLayer).val()].getClassName().split("-")[1];

    // Cancel other interactions
    map.removeInteraction(create);
    map.removeInteraction(modifySelect);
    map.removeInteraction(modify);
    map.removeInteraction(identify);
    map.removeInteraction(measure);

    // Adding delete interaction to the map
    // Select widget definition
    delete_ = new ol.interaction.Select({
      layers: [layers[$(selLayer).val()]], // Select only this layer
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#EE266D',
          width: 4
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 0.4)'
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.4)'
          }),
          stroke: new ol.style.Stroke({
            color: '#EE266D',
            width: 2
          })
        })
      })
    });

    // Adding delete widget to the map
    map.addInteraction(delete_);

    // Preventing confirm-cancel buttons to reappear
    let stateDeleteConfirmCancel = false;

    // WFS transactioner
    const transactionWFS = (f) => {
      const formatGML = new ol.format.GML({
        featureNS: "Bugra",
        featureType: layerName,
        srsName: "EPSG:3857"
      });

      const xs = new XMLSerializer();

      // Replacing feature:layername with Bugra:layername
      const find = `feature:${layerName}`;
      const re = new RegExp(find, "g");
      const payload = xs.serializeToString(formatWFS.writeTransaction(null, null, f, formatGML))
        .replace(re, `Bugra:${layerName}`);

      $.ajax('http://localhost:8080/geoserver/wfs', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload
      }).done(function(res) {
        if (res.querySelector('ExceptionText')) {
          // Refresh the source
          layers[$(selLayer).val()].getSource().refresh();
          alert(res.querySelector('ExceptionText').textContent);
        } else {
          const totalDeleted = res.querySelector('totalDeleted').textContent;
          // Refresh the source
          layers[$(selLayer).val()].getSource().refresh();
          alert(`Total deleted feature count is: ${totalDeleted}`);
        }
      });
    };

    delete_.on("select", (e) => {
      if (!stateDeleteConfirmCancel) {
        // Confirm and cancel
        // Confirm
        const btnDeleteConfirm = document.createElement('button');
        btnDeleteConfirm.innerHTML =
          "<span style=\"font-size: 1em; color: #30ff12;\">\n" +
          "  <i class=\"fas fa-check-circle\"></i>\n" +
          "</span>";
        btnDeleteConfirm.style.width = "30px";

        // Delete Confirm button event
        const handleDeleteConfirm = () => {
          transactionWFS(e.target.getFeatures().getArray());
          map.removeInteraction(delete_);
          overlayContainer.removeChild(elementDivDeleteCancel);
          overlayContainer.removeChild(elementDivDeleteConfirm);
          // Reset the confirm-cancel buttons
          stateDeleteConfirmCancel = false;
        };

        btnDeleteConfirm.addEventListener('click', handleDeleteConfirm, false);

        const elementDivDeleteConfirm = document.createElement('div');

        elementDivDeleteConfirm.className = 'delete-confirm-widget con-can ol-unselectable ol-control';
        elementDivDeleteConfirm.appendChild(btnDeleteConfirm);
        overlayContainer.appendChild(elementDivDeleteConfirm);

        const controlDeleteConfirm = new ol.control.Control({
          element: elementDivDeleteConfirm
        });

        map.addControl(controlDeleteConfirm);

        // Cancel
        const btnDeleteCancel = document.createElement('button');
        btnDeleteCancel.innerHTML =
          "<span style=\"font-size: 1em; color: #e22c69;\">\n" +
          "  <i class=\"fas fa-minus-circle\"></i>\n" +
          "</span>";
        btnDeleteCancel.style.width = "30px";

        // Delete Cancel button event
        const handleDeleteCancel = () => {
          map.removeInteraction(delete_);
          overlayContainer.removeChild(elementDivDeleteCancel);
          overlayContainer.removeChild(elementDivDeleteConfirm);
          // Refresh the source
          layers[$(selLayer).val()].getSource().refresh();
          // Reset the confirm-cancel buttons
          stateDeleteConfirmCancel = false;
        };

        btnDeleteCancel.addEventListener('click', handleDeleteCancel, false);

        const elementDivDeleteCancel = document.createElement('div');

        elementDivDeleteCancel.className = 'delete-cancel-widget con-can ol-unselectable ol-control';
        elementDivDeleteCancel.appendChild(btnDeleteCancel);
        overlayContainer.appendChild(elementDivDeleteCancel);

        const controlDeleteCancel = new ol.control.Control({
          element: elementDivDeleteCancel
        });

        map.addControl(controlDeleteCancel);

        stateDeleteConfirmCancel = true;
      }

    });
  };

  // Identify widget code
  const widgetIdentify = () => {
    // Cancel other interactions
    map.removeInteraction(create);
    map.removeInteraction(modifySelect);
    map.removeInteraction(modify);
    map.removeInteraction(delete_);
    map.removeInteraction(measure);

    // Clear confirm and cancel buttons
    clearConCan();

    // Collection of selected features
    let selectedFeatures = new ol.Collection();

    // Adding select interaction to the map
    // Select widget definition
    identify = new ol.interaction.Select({
      layers: layers,
      features: selectedFeatures,
      multi: true,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ee7125',
          width: 4
        }),
        fill: new ol.style.Fill({
          color: 'rgba(248,152,25,0.2)'
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: 'rgba(248,152,25,0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ee7125',
            width: 2
          })
        })
      })
    });

    map.addInteraction(identify);

    identify.on("select", (e) => {
      if (e.deselected.length > 0) {
        $(infoAccordion).empty();
      }
      // Checking if there is a feature under the pixel
      if (selectedFeatures.getArray().length > 0) {
        // If there are at least one feature
        $(infoAccordion).empty();
        selectedFeatures.getArray().forEach((feature, index) => {
          $(infoAccordion).append(accordionSection(feature, index));
          // Emptying field and values's card body to fill it
          $(`#card-body-${index}`).empty();

          feature.getKeys().forEach((key) => {
            if (key !== "geometry") {
              const accordionSectionContent = () => {
                return `<p class="popupRow"><b>${key}:</b> ${feature.get(key)}</p>`
              };
              $(`#card-body-${index}`).append(accordionSectionContent())
            }
          });
        });

        $(".info-popup-card-button").on("click", (event) => {
          const featureIndex = event.target.id.split("-")[4];

          let extent = new ol.extent.createEmpty();

          const extentSelectedFeature = selectedFeatures.getArray()[featureIndex].getGeometry().getExtent();

          // Zoom to the selected features' extent
          extent = new ol.extent.extend(extent, extentSelectedFeature);
          view.fit(extent, map.getSize());
        });
      }
    });
  };

  // Measure widget code
  const widgetMeasure = () => {
    // Clear confirm and cancel buttons
    clearConCan();
    
    // Cancel other interactions
    map.removeInteraction(create);
    map.removeInteraction(modifySelect);
    map.removeInteraction(modify);
    map.removeInteraction(delete_);
    map.removeInteraction(identify);

    const sourceMeasure = new ol.source.Vector();

    const vectorMeasure = new ol.layer.Vector({
      source: sourceMeasure,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    let sketchMeasure;
    let helpTooltipElement;
    let helpTooltip;
    let measureTooltipElement;
    let measureTooltip;

    const continuePolygonMsg = 'Click to continue drawing the polygon';
    const continueLineMsg = 'Click to continue drawing the line';

    const pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }

      let helpMsg = 'Click to start drawing';

      if (sketchMeasure) {
        const geom = sketchMeasure.getGeometry();
        if (geom instanceof ol.geom.Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
          helpMsg = continueLineMsg;
        }
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove('hidden');
    };

    map.addLayer(vectorMeasure);

    map.on('pointermove', pointerMoveHandler);

    map.getViewport().addEventListener('mouseout', function () {
      helpTooltipElement.classList.add('hidden');
    });

    // const typeSelect = document.getElementById('type');

    let measure; // global so we can remove it later

    const formatLength = function (line) {
      const length = ol.sphere.getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    };

    const formatArea = function (polygon) {
      const area = ol.sphere.getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
      }
      return output;
    };

    function addInteraction() {
      const type = 'LineString';
      measure = new ol.interaction.Draw({
        source: sourceMeasure,
        type: type,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
              color: 'rgba(0, 0, 0, 0.7)',
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
          }),
        }),
      });
      map.addInteraction(measure);

      createMeasureTooltip();
      createHelpTooltip();

      let listener;
      measure.on('drawstart', function (evt) {
        // set sketch
        sketchMeasure = evt.feature;

        let tooltipCoord = evt.coordinate;

        listener = sketchMeasure.getGeometry().on('change', function (evt) {
          const geom = evt.target;
          let output;
          if (geom instanceof ol.geom.Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof ol.geom.LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      measure.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketchMeasure = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        ol.Observable.unByKey(listener);
      });
    }

    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'ol-tooltip hidden';
      helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
      });
      map.addOverlay(helpTooltip);
    }

    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
      });
      map.addOverlay(measureTooltip);
    }

    addInteraction();
  };

  /*
  -----------------------------------------------------
  ----------CUSTOM WIDGET BUTTONS AND HANDLING---------
  -----------------------------------------------------
   */

  // Create widget button and handling
  const btnCreate = document.createElement('button');
  $(btnCreate).attr("disabled", true);
  btnCreate.innerHTML = 'Create';
  btnCreate.style.width = "80px";
  btnCreate.style.backgroundColor = "#716d74";

  const handleCreate = () => {
    widgetCreate();
  };

  btnCreate.addEventListener('click', handleCreate, false);

  const elementDivCreate = document.createElement('div');

  elementDivCreate.className = 'create-widget ol-unselectable ol-control';
  elementDivCreate.appendChild(btnCreate);
  overlayContainer.appendChild(elementDivCreate);

  const controlCreate = new ol.control.Control({
    element: elementDivCreate
  });

  map.addControl(controlCreate);


  // Modify widget button and handling
  const btnModify = document.createElement('button');
  $(btnModify).attr("disabled", true);
  btnModify.innerHTML = 'Modify';
  btnModify.style.width = "80px";
  btnModify.style.backgroundColor = "#716d74";

  const handleModify = () => {
    widgetModify();
  };

  btnModify.addEventListener('click', handleModify, false);

  const elementDivModify = document.createElement('div');

  elementDivModify.className = 'modify-widget ol-unselectable ol-control';
  elementDivModify.appendChild(btnModify);
  overlayContainer.appendChild(elementDivModify);

  const controlModify = new ol.control.Control({
    element: elementDivModify
  });

  map.addControl(controlModify);


  // Delete widget button and handling
  const btnDelete = document.createElement('button');
  $(btnDelete).attr("disabled", true);
  btnDelete.innerHTML = 'Delete';
  btnDelete.style.width = "80px";
  btnDelete.style.backgroundColor = "#716d74";

  const handleDelete = () => {
    widgetDelete();
  };

  btnDelete.addEventListener('click', handleDelete, false);

  const elementDivDelete = document.createElement('div');

  elementDivDelete.className = 'delete-widget ol-unselectable ol-control';
  elementDivDelete.appendChild(btnDelete);
  overlayContainer.appendChild(elementDivDelete);

  const controlDelete = new ol.control.Control({
    element: elementDivDelete
  });

  map.addControl(controlDelete);


  // Identify widget button and handling
  const btnIdentify = document.createElement('button');
  btnIdentify.innerHTML = 'Identify';
  btnIdentify.style.width = "80px";

  const handleIdentify = () => {
    widgetIdentify();
  };

  btnIdentify.addEventListener('click', handleIdentify, false);

  const elementDivIdentify = document.createElement('div');

  elementDivIdentify.className = 'identify-widget ol-unselectable ol-control';
  elementDivIdentify.appendChild(btnIdentify);
  overlayContainer.appendChild(elementDivIdentify);

  const controlIdentify = new ol.control.Control({
    element: elementDivIdentify
  });

  map.addControl(controlIdentify);


  // Disable the buttons until layer combobox is changed
  $(selLayer).on("change", () => {
    // Refresh the source
    layers[$(selLayer).val()].getSource().refresh();

    $(btnCreate).attr("disabled", false);
    btnCreate.style.backgroundColor  = "#68bf44";
    $(btnModify).attr("disabled", false);
    btnModify.style.backgroundColor  = "#c8c139";
    $(btnDelete).attr("disabled", false);
    btnDelete.style.backgroundColor  = "#d93934";
  });


  // Measure widget button and handling
  const btnMeasure = document.createElement('button');
  btnMeasure.innerHTML = 'Measure';
  btnMeasure.style.width = "80px";

  const handleMeasure = () => {
    widgetMeasure();
  };

  btnMeasure.addEventListener('click', handleMeasure, false);

  const elementDivMeasure = document.createElement('div');

  elementDivMeasure.className = 'measure-widget ol-unselectable ol-control';
  elementDivMeasure.appendChild(btnMeasure);
  overlayContainer.appendChild(elementDivMeasure);

  const controlMeasure = new ol.control.Control({
    element: elementDivMeasure
  });

  map.addControl(controlMeasure);
});

// Prevent explorers right click context menu
map.on("contextmenu", (e) => {
  e.preventDefault();
});