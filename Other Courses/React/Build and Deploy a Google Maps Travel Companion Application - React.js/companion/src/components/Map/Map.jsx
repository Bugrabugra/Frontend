import GoogleMapReact from "google-map-react";
import useStyles from "./styles";
import {useMediaQuery, Paper, Typography} from "@material-ui/core";
import LocationCityOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import dotenv from "dotenv";
import {useState} from "react";
import mapStyles from "./mapStyles";

dotenv.config();

const Map = ({coordinates, setBounds, setCoordinates, places, setChildClicked, weatherData}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
          console.log(e);
          setCoordinates({lat: e.center.lat, lng: e.center.lng})
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            {!isDesktop ?
              <LocationCityOutlinedIcon color="primary" fontSize="large"/> :
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>

                <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : ""}
                  alt=""
                />
                <Rating size="small" value={Number(place.rating)} readOnly/>
              </Paper>
            }
          </div>
        ))}

        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img height={100} src={`https://openweathermap.org/img/${data.weather[0].icon}.png`} alt="lklk"/>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;