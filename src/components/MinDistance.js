import React, { useState } from "react";
import '../App.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
function MinDistance(){
    const [cities, setCities] = useState([{ cityname: "", longitude:0 ,latitude:0}]);
    const [mssg,setMessage]=useState("");
    // let distanceMatrix=[
    //     [0,0,0],
    //     [0,0,0],
    //     [0,0,0]
    // ];
    // let timeMatrix=[
    //     [0,0,0],
    //     [0,0,0],
    //     [0,0,0]
    // ];
    // let steps=[
    //     [[],[],[]],
    //     [[],[],[]],
    //     [[],[],[]]
    // ];
    let distanceMatrix=[],timeMatrix=[],steps=[];
    for(let i=0;i<cities.length;i++)
    {
        distanceMatrix[i] = [];
        timeMatrix[i] = [];
        steps[i]=[];
        for(let j=0;j<cities.length;j++)
        {
            // distanceMatrix[j] = [];
            // timeMatrix[j] = [];
            steps[j]=[];
            distanceMatrix[i][j]=0
            timeMatrix[i][j]=0
        }
    }

    
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
    const setCoordinates=()=>{
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

    const createMatrix = () => {
        for(let i=0;i<cities.length;i++)
        {
            for(let j=0;j<cities.length;j++)
            {
                distanceMatrix[i][j]=0
                timeMatrix[i][j]=0
            }
        }
        for(let i=0;i<cities.length;i++)
        {
            for(let j=0;j<cities.length;j++)
            {
                if(i!==j)
                {
                    var urlforDistance="https://api.mapbox.com/directions/v5/mapbox/driving/"+cities[i].longitude+"%2C"+cities[i].latitude+"%3B"+cities[j].longitude+"%2C"+cities[j].latitude+"?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoiZXNoYWFuc2luZ2hwYXJpaGFyIiwiYSI6ImNrbWE4YmFzNTE1d2EydW51c3R5OWp1N3oifQ.jaII766AYtHlJyfp-a9mfA"
                    // console.log(cities[i].cityname+"-->"+cities[j].cityname)
                    fetch(urlforDistance)
                    .then(response => response.json())
                    .then(data=>{
                        let routeArray=data.routes;
                        let shortestRoute=routeArray[0];
                        let distance=0,time=0,leg=[],step=[];
                        console.log(shortestRoute);
                        // if(shortestRoute.weight !== 0 )
                        // {
                        //     distance=shortestRoute.distance;
                        //     distance=distance/1000;
                        //     time=shortestRoute.duration;
                        //     time=time/3600;
                        //     leg=shortestRoute.legs
                        //     step=leg[0].steps;
                        //     distanceMatrix[i][j]=distance;
                        //     timeMatrix[i][j]=time;
                        //     steps[i][j]=step;   
                        // }
                        // else
                        // {
                        //     setMessage("No Route Found !")
                        // }
                        
                        
                    })
                }
            }
        }
    }
    const calculatePath=()=>{
        setMessage(" Have some patience sweetie ! ");
        setCoordinates();
        createMatrix();
        console.log(distanceMatrix)
        console.log(timeMatrix)
        let stepArrayElem=[]
        stepArrayElem=steps[0][1]
        console.log(stepArrayElem)
        
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