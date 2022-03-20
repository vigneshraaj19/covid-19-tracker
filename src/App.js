import React,{useEffect, useState} from "react";
import{
  MenuItem,FormControl,Select,Card,
} from "@mui/material"
import './App.css';
import InfoBox from "./InfoBox.js";
import { CardContent } from "@mui/material";
import Table from "./Table.js"
import { sortData } from "./util.js";
//https://disease.sh/v3/covid-19/countries

function App() {

  const [countries,setCountries]= useState([]);
  const [country,setCountry] = useState('worldwide');
   const [countryInfo,setCountryInfo] =useState([])
   const [tableData,setTableData] = useState([]);
   useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  },[]);
   useEffect(() =>{
    //runs a piece of code based on a given condition
    //the code inside here will run once
    //when the component loads and not again
    const getCountriesData= async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries=data.map((country) => (
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
        const sortedData=sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    }
    getCountriesData();
  },[]);

  const onCountryChange= async(event) => {
    const countryCode=event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
     //All of the data from the country response

      setCountryInfo(data);
    })

  };
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>Covid-19-Tracker</h1>
<FormControl className="app__dropdown">
  <Select variant="outlined"onChange={onCountryChange} value={country}>
    <MenuItem value="worldwide">worldwide</MenuItem>
   {
     countries.map((country) =>(
       <MenuItem value={country.value}>{country.name}</MenuItem>
     ))
   }
    </Select>
  </FormControl>
        
        </div>
        <div className="app__stats">
          {/*infobox title="covid cases" */}
          <InfoBox title="coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deadths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          {/*infobox title="covid revovery" */}
          {/*infobox title="covid cases" */}
          </div>
         
          </div>

          <Card className="app__right">
            <CardContent>
               {/*Table*/ }
              <h3>  Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3>  worldwide new cases </h3>
            {/*Graph*/ }
          
            </CardContent>
            </Card>

            </div>
    
  );
}

export default App;
