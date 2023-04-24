import React, {useEffect, useState} from 'react'
import {Speech} from './Speech'



const modelsFetch = {
  'recomendar películas' : 'movie',
  'predecir precio de un automóvil': 'car'
}

const OptionsForFetch = [
  {
    "recomendar películas" : {
      "título" : "movie_title",
    }, 
    "predecir precio de un automóvil" : { 
      "año": "Year", 
      "precio": "Present_Price",
      "km": "Kms_Driven",
      "combustible": "Fuel_Type",
      "vendedor": "Seller_Type",
      "transmisión": "Transmission",
      "dueño": "Owner",
    }, 
    "clasificar la calidad del vino" : { 
      "acidez": "volatile acidity", 
      "cloruros": "chlorides",
      "dióxido": "free sulfur dioxide",
      "densidad": "density",
      "alcohol": "alcohol",
    }
  }
]


export const Model = ({options, state, model}) => {

    const [resp, setResp] = useState('')

    const propNames = Object.keys(options); 

    // todo: cuando se llena el state hacer la peticion
    useEffect(() => {
      const valoresVacios = Object.values(state).filter(valor => valor === ''); 
      if (valoresVacios.length === 0) { 
        // verificar valores numericos en string y convertirlos a numeros float o int
        const newArray = Object.entries(state).map(([clave, valor]) => {
          if(typeof valor === 'string' && !isNaN(parseFloat(valor))){ 
            return [clave, parseFloat(valor)]
          }
          if(typeof valor === 'string' && !isNaN(parseInt(valor))){ 
            return [clave, parseInt(valor)]
          }
          return [clave, valor]
        })
        const data = Object.fromEntries(newArray)
        
        // cambiar data para que sea un objeto con las propiedades que necesita la peticion
        const modelOptions = OptionsForFetch.find(options => options.hasOwnProperty(model)) 
        if (modelOptions) {
          Object.keys(data).forEach(key => {
            if (modelOptions[model][key]) {
              data[modelOptions[model][key]] = data[key];
              delete data[key];
            }
          });
        }
        console.log(data)

        // direccion peticion
        const dir = modelsFetch[model] 
        console.log(dir)
        async function fetchData() {
          const response = await fetch(`http://127.0.0.1:5000/model/${dir}`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          const json = await response.json()
          setResp(json)
        }
        fetchData()
        
    }
  }, [state])


  return (
    
    <div>


        {propNames.map((propName) => (
        <p key={propName}>
          {propName}: {options[propName]}
        </p>
      ))}
      {Object.keys(state).map(key => (
        <li key={key}>
          {key}: {state[key]}
        </li>
      ))}

      {console.log(resp)}
        
    </div>
  )
}
