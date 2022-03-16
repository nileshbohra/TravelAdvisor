import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setType,
  setRating,
}) => {
  const classes = useStyles();
  const [eleRefs, setEleRefs] = useState([]);

  //create ref array of list to match with list on map with actual list
  //this will help when user clicks hotel etc on map and the list on left will scroll to that hotel.
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => eleRefs[i] || createRef());
    setEleRefs(refs);
  }, [places]);

  // console.log({ childClicked });
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        {" "}
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {/* ? means only map when places is not empty */}
            {places?.map((place, idx) => (
              <Grid ref={eleRefs[idx]} item key={idx} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === idx}
                  refProp={eleRefs[idx]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
