function MinDistance({number}){

    function renderInputs(value){
        const inputCities=[];
        for(let i=0; i<value; i++){
          inputCities.push(<div key={i}>
              <input type="text" name="cityname"/>
        </div>)
        }
        console.log(inputCities);
        return inputCities;
       }

    return(
        <div>
            <div>
            {renderInputs(number)}
            </div>
        </div>
    )
}
export default MinDistance;