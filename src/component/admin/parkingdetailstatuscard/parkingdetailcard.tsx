import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface DeatailstatuscardProps {
    blockName: string;
    totalno: number;
    twowheeler: number;
    fourwheeler: number;
    occupied: number;
}

const Deatailstatuscard: React.FC<DeatailstatuscardProps> = ({
    blockName,
    totalno,
    twowheeler,
    fourwheeler,
    occupied,
}) => {
    const Unoccupied=totalno-occupied
    const occupancyRate = Math.round((occupied/totalno) * 100);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                maxWidth: '300px',
                margin: '0 auto',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: '16px', color: '#64A7CA' }}>
                {blockName}
            </Typography>
            <Typography variant="body1">Total no of Parking slot: {totalno}</Typography>
            {/* <Typography variant="body1">Total no of 2 Wheeler slot: {twowheeler}</Typography>
            <Typography variant="body1">Total no of 4 Wheeler slot: {fourwheeler}</Typography> */}
            <Typography variant="body1">Total no of slot Occupied: {occupied}</Typography>
            <Typography variant="body1">Total no of slot Unoccupied: {Unoccupied}</Typography>
            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    marginTop: '20px',
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={occupancyRate}
                    size={120}
                    thickness={4}
                    sx={{
                        color: '#64A7CA',
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5" component="div" color="textSecondary">
                        {`${occupancyRate}%`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Deatailstatuscard;
