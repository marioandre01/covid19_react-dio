import React, { memo, useState, useCallback, useEffect } from 'react';
import Api from '../../resource/api';
import Board from './components/Board';
import Panel from './components/Panel'; 
import { ContainerStyled } from './style';

function Main() {

    const [data, setData] = useState({});
    const [country, setCountry] = useState('brazil');
    const updateAt = new Date().toLocaleString(); //pegar data atual do browser

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

    const handleChange = ({ target }) => {
        const country = target.value;
        setCountry(country);
    }

    return(
        <ContainerStyled>
            <div className="mb-2">
                <Panel 
                    data={data}
                    updateAt={updateAt}
                    onChange={handleChange}
                    country={country}
                    getCovidData={getCovidData}
               />
            </div>
            <Board data={data} />
        </ContainerStyled>
        
    )
}

export default memo(Main);