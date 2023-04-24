import React, {useEffect, useState} from 'react'
import {Speech} from './Speech'
import {Model} from './Model'

const models = [
    "predecir si un cliente termina contrato",
    "clasificar la calidad del vino",
    "predecir precio de un automóvil",
    "predecir precio del aguacate",
    "predecir el porcentaje de grasa de un adulto",
    "recomendar películas",
  ];

const movieOptions = { 
    "título" : "Any movie title",
}

const movieInitialState = { 
    "título" : "",
}

const carOptions = { 
    "año" : "format: 2010, 2019, 2018", 
    "precio" : "format: 2.3, 8.01, 5.5",
    "km" : "format: 20000, 15000, 5000",
    "combustible" : "format: petrol=0, diesel=1, cng=2",
    "vendedor" : "format: dealer=0, individual=1",
    "transmisión" : "format: manual=0, automatic=1",
    "dueño" : "format: 0, 1, 2, 3+",
}

const carInitialState = {
    "año" : "",
    "precio" : "",
    "km" : "",
    "combustible" : "",
    "vendedor" : "",
    "transmisión" : "",
    "dueño" : "",
}

const wineOptions = {
    "acidez": "format: 0.66, 0.75", 
    "cloruros": "format: 0.02, 0.08", 
    "dióxido": "format: 20, 100",  
    "densidad": "format: 0.99, 1.00", 
    "alcohol": "format: 9.0, 14.0",
} 

const wineInitialState = {
    "acidez": "",
    "cloruros": "",
    "dióxido": "",
    "densidad": "",
    "alcohol": "",
}


const getNextWordAfterKey = (text, key) => {
    const words = text.split(" ");
    const index = words.indexOf(key);
    if (index !== -1 && index < words.length - 1) {
      return words[index + 1];
    } else {
      return null;
    }
}
  

export const MainPage = () => {

    const [text, setText] = useState('')

    const [modelSelection, setModelSelection] = useState(true) 

    const [selectedModel, setSelectedModel] = useState('')

    const [peliculas, setPeliculas] = useState(movieInitialState)

    const [carros, setCarros] = useState(carInitialState)

    const [vino, setVino] = useState(wineInitialState)

    const handleChildData = (data) => {
        setText(data)
    }


    useEffect(() => {
        if (models.find(model => model.toLocaleLowerCase() === text.toLocaleLowerCase()) && !selectedModel ) {
            setSelectedModel(text.toLocaleLowerCase())
            setModelSelection(false)

        }
        if ( (text.toLocaleLowerCase() === 'regresar') && selectedModel) {
            setSelectedModel('')
            setModelSelection(true)
            // reset states 
            setPeliculas(movieInitialState)
            setCarros(carInitialState)
            setVino(wineInitialState)
        }
        if ( (text.toLocaleLowerCase() === 'enviar') && selectedModel) {
            setSendModel(true)
        }

        if ( selectedModel === 'recomendar películas' && Object.keys(movieOptions).some(option => text.toLocaleLowerCase().includes(option))) {

            // todo: seleccionar una pelicula con mas de una palabra despues de la key
            const key = Object.keys(movieOptions).find(option => text.toLocaleLowerCase().includes(option));
            const word = getNextWordAfterKey(text.toLocaleLowerCase(), key)

            setPeliculas({
                ...peliculas,
                [key]: word,
            })
        }
        if ( selectedModel === 'predecir precio de un automóvil' && Object.keys(carOptions).some(option => text.toLocaleLowerCase().includes(option))) {
            
            const key = Object.keys(carOptions).find(option => text.toLocaleLowerCase().includes(option));
            const word = getNextWordAfterKey(text.toLocaleLowerCase(), key)

            setCarros({
                ...carros,
                [key]: word,
            })
        }
        if ( selectedModel === 'clasificar la calidad del vino' && Object.keys(wineOptions).some(option => text.toLocaleLowerCase().includes(option))) {

            const key = Object.keys(wineOptions).find(option => text.toLocaleLowerCase().includes(option));
            const word = getNextWordAfterKey(text.toLocaleLowerCase(), key)

            setVino({
                ...vino,
                [key]: word,
            })
        }

    }, [text])

  return (
    <>

    <h2>Esto es la pagina principal</h2>

    {
    modelSelection &&
       models.map((model, index) => {
            return <p key={index}> - {model}</p>
        }) 
    }

    {
        (!modelSelection && selectedModel === 'recomendar películas') ?
            <Model options={movieOptions} state={peliculas} model={selectedModel}/> : 
        (!modelSelection && selectedModel === 'predecir precio de un automóvil') ?
            <Model options={carOptions} state={carros} model={selectedModel}/> :
        (!modelSelection && selectedModel === 'clasificar la calidad del vino') ?
            <Model options={wineOptions} state={vino} model={selectedModel}/> :
        // (!modelSelection && selectedModel === 'predecir si un cliente termina contrato') ?
        //     <Model options={carOptions}/> :
        // (!modelSelection && selectedModel === 'predecir precio del aguacate') ?
        //     <Model options={carOptions}/> :
        // (!modelSelection && selectedModel === 'predecir el porcentaje de grasa de un adulto') ?
        //     <Model options={carOptions}/> :
        null

    }

        <Speech onChildData={handleChildData}/>

    </>
  )
}
