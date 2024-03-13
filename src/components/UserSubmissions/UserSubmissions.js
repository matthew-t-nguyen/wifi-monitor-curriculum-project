import { Button } from '@mui/material';
import DropdownMenuLocation from '../DropdownMenu/DropdownMenuLocation.js';
import DropdownMenuWifi from '../DropdownMenu/DropdownMenuWifi.js';
import './UserSubmissions.css';
import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

function UserSubmissions() {
    const [data, setData] = React.useState([]);
    const [scoreMLK, setScoreMLK] = React.useState(0);
    const [scoreGlade, setScoreGlade] = React.useState(0);
    const [scoreMoffit, setScoreMoffit] = React.useState(0);


    const [location, setLocation] = React.useState('');
  
    const handleLocation = (event) => {
      setLocation(event.target.value);
    };

    const [wifi, setWifi] = React.useState('');
  
    const handleWifi = (event) => {
      setWifi(event.target.value);
    };
    
    function handleSubmit() {
        fetch("http://localhost:3000/add-user", {   
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                loc: {location},
                score: {wifi}
            })
        });

        fetch("http://localhost:3000/get-users", {   
            method: "GET",
        }).then(response => {
            return response.json();
        }).then(data => {
            setData(data);
            let MLKScoreSum = 0;
            let MLKCounter = 0;
            let GladeScoreSum = 0;
            let GladeCounter = 0;
            let MoffitScoreSum = 0;
            let MoffitCounter = 0;
            data.forEach(item => {
                if (item.location == "MLK") {
                    MLKScoreSum += item.rating;
                    MLKCounter += 1;
                } else if (item.location == "Glade") {
                    GladeScoreSum += item.rating;
                    GladeCounter += 1;
                } else {
                    MoffitScoreSum += item.rating;
                    MoffitCounter += 1;
                }
            })

            setScoreMLK(MLKScoreSum / MLKCounter);
            setScoreGlade(GladeScoreSum / GladeCounter);
            setScoreMoffit(MoffitScoreSum / MoffitCounter);
        });
    };

    return (
        <>
            <FormControl defaultValue="" required>
                <InputLabel id="simple-select-label">Where are you located?</InputLabel>
                <Select
                    labelId="simple-select-label"
                    value={location}
                    onChange={handleLocation}
                >
                    <MenuItem value={"MLK"}>MLK</MenuItem>
                    <MenuItem value={"Glade"}>Glade</MenuItem>
                    <MenuItem value={"Moffit"}>Moffit</MenuItem>
                </Select>
            </FormControl>

            <FormControl defaultValue="" required>
                <InputLabel id="simple-select-label">How is the campus WIFI at your current location?</InputLabel>
                <Select
                    labelId="simple-select-label"
                    value={wifi}
                    onChange={handleWifi}
                >
                    <MenuItem value={1}>Bad</MenuItem>
                    <MenuItem value={2}>Okay</MenuItem>
                    <MenuItem value={3}>Good</MenuItem>
                </Select>
            </FormControl>

            <Button onClick={handleSubmit} variant="outlined">Submit</Button>

            <ul>
                <li>MLK = {scoreMLK}</li>
                <li>Glade = {scoreGlade}</li>
                <li>Moffit = {scoreMoffit}</li>
            </ul>

        </>
    );
}

export default UserSubmissions;
