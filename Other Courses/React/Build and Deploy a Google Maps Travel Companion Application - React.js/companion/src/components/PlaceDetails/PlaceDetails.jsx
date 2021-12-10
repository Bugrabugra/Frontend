import useStyles from "./styles";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";


const PlaceDetails = ({place, refProp, selected}) => {
  const classes = useStyles();

  if (selected) {
    refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"})
  }

  return (
    <Card elevation={6}>
      <CardMedia
        style={{height: 350}}
        image={place.photo ? place.photo.images.large.url : null}
        title={place.name}
      />
      <CardContent>
        {/*name*/}
        <Typography gutterBottom variant="h5">{place.name}</Typography>

        {/*rating*/}
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)}/>
          <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
        </Box>

        {/*price*/}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
        </Box>

        {/*ranking*/}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
        </Box>

        {/*awards*/}
        {place?.awards?.map(award => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name}/>
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}

        {/*cuisine*/}
        {place?.cuisine?.map(({name}) => (
          <Chip key={name} size="small" label={name} className={classes.chip}/>
        ))}

        {/*address*/}
        {place?.address && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon/> {place.address}
          </Typography>
        )}

        {/*phone*/}
        {place?.phone && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon/> {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button size="small" color="primary" onClick={() => window.open(place.web_url, "_blank")}>
            Trip Advisor
          </Button>

          <Button size="small" color="primary" onClick={() => window.open(place.website, "_blank")}>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;