import { memo } from 'react';
import { Card, Typography, Button, Select, MenuItem } from '../../../components';
import COUNTRIES from '../../../commons/constants/countries';
import { CardPanelContentStyled, ItemStyled } from './style';

const navigatorHasShare = navigator.share;

function Panel({ updateAt, onChange, data, country, getCovidData }){

    //const { cases, recovered, deaths, todayCases, todayDeaths } = data;
    const { recovered } = data;

    const renderCountries = ( country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} alt={`País-${country.label}`} />
            </ItemStyled>
        </MenuItem>
    );   

    const textCovid19 = `País: ${country} - recuperados: ${recovered}`;

    const copyInfo = () => {
        //navigator.clipboard API do navegador, não tem no mobile
        //função javascript que copia os dados que são definidos
        navigator.clipboard.writeText(textCovid19);
    }

    //Na web não tem o navigator.share só no mobile
    const shareInfo = () => {
        //navigator.share API do navegador; title, text e url são valores padrões da API
        navigator.share({
            title: `Dados do Covid19 - ${country}`,
            text: textCovid19,
            url: 'https://covid19dio.netlify.app/'
        });
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div>
    );

    const renderCopyButton = (
        <div>
            <Button variant="contained" color="primary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    );


    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" component="span" color="primary">COVID19</Typography>
                    <Typography variant="h6" component="span" color="primary">Painel Coronavírus</Typography>
                    <Typography variant="body2" component="span" color="primary">Atualizado em: {updateAt}</Typography>
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                {navigatorHasShare ? renderShareButton : renderCopyButton}
            </CardPanelContentStyled>
        </Card>
    )
    
}

export default memo(Panel);

