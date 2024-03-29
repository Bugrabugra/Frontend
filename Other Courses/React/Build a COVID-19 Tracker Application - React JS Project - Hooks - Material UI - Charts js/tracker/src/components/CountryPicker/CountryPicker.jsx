import React, {useEffect, useState} from "react";
import {FormControl, NativeSelect} from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import {fetchCountries} from "../../api";


const CountryPicker = ({handleCountryChange}) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    }
    fetchAPI();
  }, []);


  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {fetchedCountries.map((country, index) => <option key={index} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;