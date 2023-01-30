import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const AppCard = (props: { title: React.ReactNode; producer: React.ReactNode; description: React.ReactNode; switch: React.ReactNode; }) => {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 275,
            textAlign: 'center',
            alignItems: 'center'
        }}>
            <CardContent>
                {props.title}
                {props.producer}
                {props.description}
            </CardContent>
            <CardActions>
                {props.switch}
            </CardActions>
        </Card>
    );
};

export default AppCard;
