
import {View, Text} from 'react-native'
import React, { useEffect, useState } from 'react'

type Pokemon ={
    url: string,
    name: string
}

export default function Page(){

    const [listPokemon, setListPokemons] = useState([]as Pokemon[]);

    useEffect(()=>{
        callApi();
    },[]);

    useEffect(()=>{
        console.log({listPokemon})
    },[listPokemon])

    const callApi = async()=>{
        try{
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            const data = await response.json()
            console.log(
                response,
                data
            )
            setListPokemons(data.results as Pokemon[]);
        }
        catch(error){
            console.log("error: ",error)
        }
    }
     
    return(
        <View>
            {
                listPokemon.map((pokemon, index)=> (
                    <View
                        style={{
                            borderWidth: 1,
                            borderBlockColor: 'black',
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text key={index}>{pokemon.name}</Text>
                    </View>
                ))
            }
        </View>
    )
}