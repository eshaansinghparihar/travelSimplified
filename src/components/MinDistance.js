import React, { useState } from "react";
import '../App.css';

function MinDistance(){
    const [cities, setCities] = useState([{ cityname: "", longitude:0 ,latitude:0}]);
    
    
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

    

    return(
        <div>
            {cities.map((city , index) => {
                return(
                    <div key={index} className="number">
                        <input
                        name="cityname" 
                        value={city.cityname}
                        placeholder="Add A City"
                        onChange={e=>changeHandler(e , index)}
                        className="Input"
                        />
                    <button className="Button" onClick={() => removeCity(index)}>Remove</button>
                    </div>
                )
            })}
            <button className="Button" onClick={addCity}>Add City</button>
            <div style={{ marginTop: 20 }}>{JSON.stringify(cities)}</div>    
        </div>
    )
}
export default MinDistance;