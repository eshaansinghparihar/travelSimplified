import React, { useState } from "react";
import '../App.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
function MinDistance(){
    const [cities, setCities] = useState([{ cityname: "", longitude:0 ,latitude:0}]);
    const [mssg,setMessage]=useState("");
    
    const changeHandler = (e, index) => {
        const { name, value } = e.target;
        const list = [...cities];
        list[index][name] = value;
        setCities(list);
    };

    const removeCity = index => {
        const list = [...cities];
        list.splice(index, 1);
        setCities(list);
    };

    const addCity=()=>{
        setCities([...cities, {cityname:"",longitude:0,latitude:0}]);
    };

    const calculatePath=()=>{
        setMessage(" Have some patience sweetie ! ");
        for(let i=0;i<cities.length;i++)
        {
            var urltoCoordinates = "https://api.opentripmap.com/0.1/en/places/geoname?apikey=5ae2e3f221c38a28845f05b60e7759b29878873a69598c9d75b72fbe&name="+(cities[i].cityname);
            var lattitude=0,longitude=0;
            fetch(urltoCoordinates)
            .then(response => response.json())
            .then(coordinates=> {
            lattitude=coordinates.lat;
            longitude=coordinates.lon;
            cities[i].latitude=lattitude;
            cities[i].longitude=longitude;
        }).catch(errorHandler)
        }
    }

        function errorHandler()
        {

        }
    return(
        <div>
            {cities.map((city , index) => {
                return(
                    <div key={index} className="number">
                    {index<1?(<input
                    name="cityname" 
                    value={city.cityname}
                    placeholder="Add Source City"
                    onChange={e=>changeHandler(e , index)}
                    className="Input"
                    />):
                    (<input
                        name="cityname" 
                        value={city.cityname}
                        placeholder="Add Destination City"
                        onChange={e=>changeHandler(e , index)}
                        className="Input"
                        />
                    )}
                    <button className="Button" onClick={() => removeCity(index)}><RemoveIcon fontSize="small"/></button>
                    </div>
                )
            })}
            <button className="Button" onClick={addCity}><AddIcon fontSize="small"/></button>
            {cities.length>2 && <button className="Button" onClick={calculatePath}><ArrowForwardIosIcon fontSize="small"/></button>}
            <div style={{ marginTop: 20 }}>{JSON.stringify(cities)}</div> 
            {mssg!=="" && <div style={{ marginTop: 20 }}>{mssg}</div>}
        </div>
    )
}
export default MinDistance;