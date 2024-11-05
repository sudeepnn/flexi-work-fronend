import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EventDetailcardProps {
    blockName: string;
    displyname: string;
    totalno: number;
    occupied: number;
}

const EventDetailcard: React.FC<EventDetailcardProps> = ({
    blockName,
    totalno,
    occupied,
    displyname,
}) => {
    const unoccupied = totalno - occupied;
    const occupancyRate = Math.round((occupied / totalno) * 100);

    // Data for the pie chart
    const pieData = [
        { name: 'Occupied', value: occupied },
        { name: 'Unoccupied', value: unoccupied },
    ];

    const COLORS = ['#64A7CA', '#FF7043'];

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
                position: 'relative', // Set position to relative for the parent
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: '16px', color: '#64A7CA' }}>
                {blockName}
            </Typography>
            <Typography variant="body1">Total {displyname}: {totalno}</Typography>
            <Typography variant="body1">Total Occupied: {occupied}</Typography>
            <Typography variant="body1">Total Unoccupied: {unoccupied}</Typography>

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%" // Center X
                        cy="50%" // Center Y
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={1}
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        verticalAlign="bottom"
                        align="center"
                        iconSize={10}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Percentage Text at Center of Pie Chart */}
            <Typography variant="h5" sx={{
                position: 'absolute', // Use absolute positioning
                top: '59%', // Center vertically
                left: '50%', // Center horizontally
                transform: 'translate(-50%, -50%)', // Adjust to center
                color: '#64A7CA',
                fontWeight: 'bold',
            }}>
                {occupancyRate}%
            </Typography>
        </Box>
    );
};

export default EventDetailcard;
