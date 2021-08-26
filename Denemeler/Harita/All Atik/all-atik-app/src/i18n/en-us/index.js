export default {
  pageMainMap: {
    toolbar: {
      lblContainerCount: "Container Count:",
      btnChangeLanguage: "TR"
    },
    expansionItems: {
      headers: {
        lblFullnessPercentages: "Fullness Values",
        lblSensorInfo: "Sensor Info",
        lblFilters: "Filters",
        lblSpatialOperations: "Spatial Operations",
        lblContainerDetail: "Container Detail"
      },
      fullness: {
        lblNoValue: "No Value :"
      },
      info: {
        lblSensorsIdentified: "Sensors Identified",
        lblSensorsUnidentified: "Sensors Unidentified",
        lblConnectionProblem: "Connection Problem",
        btnClearFilter: "Clear Filter"
      },
      filters: {
        lblAddress: "Address",
        phNeighborhood: "Neighborhood",
        phStreet: "Street",
        lblZone: "Zone",
        phZone: "Zone",
        lblContainer: "Container",
        lblWarnings: "Warnings",
        phConnectionProblem: "Connection Problem",
        phContainerType: "Container Type",
        phFullness: "Fullness",
        phFireRisk: "Fire Risk"
      },
      spatialOperations: {
        btnEditGeometry: "EDIT GEOMETRY",
        btnEditGeometryCancel: "CANCEL",
        btnCreateRoute: "CREATE ROUTE",
        btnFindMyLocation: "FIND MY LOCATION"
      },
      containerDetail: {
        lblID: "ID:",
        lblContainerName: "Container Name:",
        lblNeighborhood: "Neighborhood:",
        lblStreet: "Street:",
        lblZone: "Zone:",
        lblType: "Type:",
        lblFullness: "Fullness:",
        lblBattery: "Battery:",
        lblFireRisk: "Fire Risk:",
        lblDevice: "Device:",
        lblLastUpdate: "Last Update:",
        lblLastCollection: "Last Collection:",
        lblNoValue: "No Value",
        lblThere: "Yes",
        lblThereIsNot: "No"
      }
    },
    map: {
      lblMunicipalityCenter: "Municipality Center",
      lblDisposalCenter: "Garbage Disposal Area",
      lblDirectionsError: "Directions request failed due to "
    }
  },
  pageContainer: {
    buttonContainer: {
      btnGeometry: "LOCATION",
      btnGeometryCancel: "CANCEL",
      btnLastFiveContainers: "LAST 5 COORDINATES",
      btnLastFiveContainersHide: "HIDE COORDINATES"
    },
    weeklyCollections: {
      lblHeader: "Weekly Collection Dates",
      lblNoValue: "No Value",
      lblRowsPerPage: "Rows per page"
    },
    lastFiveSensorValue: {
      lblHeader: "Last 5 Sensor Values",
      lblTemperature: "Temperature",
      lblFullness: "Fullness",
      lblBattery: "Battery"
    }
  },
  notifications: {
    lblAddGeometry: "- Geometry was updated",
    lblFullContainers: "Full containers count: ",
    lblFireRisk: "Containers with fire risk: ",
    btnClickToSee: "CLICK TO FILTER",
    lblWarning: "Warning",
    btnOK: "OK",
    lblLoading: "Container data is loading"
  },
  errors: {
    lblLoadContainers: "There was an error while loading containers!",
    lblUpdateGeometry: "There was an error while updating value!",
    lblAddGeometry: "There was an error while updating geometry!",
    lblMyLocation: "There was an error while fetching location data!",
    lblGetContainer: "There was an error while fetching container!",
    lblLoadZones: "There was an error while loading zones!"
  },
  myLocation: {
    lblTitle: "My Location"
  },
  mobile: {
    headers: {
      btnFullness: "FULLNESS",
      btnFilters: "FILTERS",
      btnSpatialOperations: "SPATIAL OPERATIONS",
      btnDetails: "DETAILS"
    }
  }
}
