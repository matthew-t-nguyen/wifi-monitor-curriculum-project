import { Button } from '@mui/material';
import './UserSubmissions.css';
import * as React from 'react';
import { FormControl } from '@mui/base/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

function UserSubmissions() {
    const [buttonClickCounter, setButtonClickCounter] = React.useState(0);

    const [scoreMLK, setScoreMLK] = React.useState(0);
    const [scoreGlade, setScoreGlade] = React.useState(0);
    const [scoreMoffit, setScoreMoffit] = React.useState(0);
    
    const [loc, setLocation] = React.useState('');
    const [wifi, setWifi] = React.useState(0);
  
    const handleLocation = (event) => {
      setLocation(event.target.value);
    };
  
    const handleWifi = (event) => {
      setWifi(event.target.value);
    };
    
    function handleSubmit() {
        fetch("http://localhost:2024/add-user", {   
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: loc,
                rating: wifi
            })
        });

        setButtonClickCounter(buttonClickCounter + 1);
    };

    React.useEffect(() => {
        fetch("http://localhost:2024/get-users", {   
            method: "GET",
        }).then(response => {
            return response.json();
        }).then(data => {
            let MLKScoreSum = 0;
            let MLKCounter = 0;
            let GladeScoreSum = 0;
            let GladeCounter = 0;
            let MoffitScoreSum = 0;
            let MoffitCounter = 0;

            data.results.forEach(item => {
                if (item.location === "MLK") {
                    MLKScoreSum += item.rating;
                    MLKCounter += 1;
                } else if (item.location === "Glade") {
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

        })}, [buttonClickCounter]);
    

    return (
        <>
            <FormControl defaultValue="" required>
                <InputLabel id="simple-select-label">Where are you located?</InputLabel>
                <Select
                    labelId="simple-select-label"
                    value={loc}
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
