import { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Skeleton } from '../../../components';
import Card from './Card';

function Board({ data }) {
    const { cases, todayDeaths, recovered, deaths, todayCases } = data;

    //Se tiver algum value retorna ele senão retorna o Skeleton, para a página não ficar em branco
    const getValue = (value) => value ? value : <Skeleton variant="text" width={182} height={60} />

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
                <Card value={getValue(cases)} label="Total de casos" color="#5d78ff" />
            </Grid>
        </Grid>
    )

}

export default Board;