import React, { memo, useState, useCallback, useEffect } from 'react';
import Api from '../../resource/api';
import Board from './components/Board';
import { ContainerStyled } from './style';

function Main() {

    const [data, setData] = useState({});
    const [country, setCountry] = useState('brazil');

    //Fazendo a chamada de um País na API
    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
            .then(data => setData(data))
    }, []);

    //É inicializado quando a página for renderizada
    //Esta ouvindo duas variaveis getCovidData, country
    //Toda vez que essas variveis forem alteradas useEffect vai ser chamado
    //O uso de useCallback no getCovidData é pra o useEffect não ficar em loop
    //com isso getCovidData está imutavél, então useEffect vai ser chamado só quando country for alterado
    useEffect(() => {
        getCovidData(country)
    }, [getCovidData, country]);

    return(
        <ContainerStyled>
            <div className="md-2">
                
            </div>
            <Board data={data} />
        </ContainerStyled>
        
    )
}

export default memo(Main);