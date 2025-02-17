import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DashboardCharts() {
    return (
        <>
            <div className='basis-4/6'>

                <BarChart
                    xAxis={[{
                        scaleType: 'band',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                    }]}
                    yAxis={[{}]}
                    series={[
                        { data: [4, 3, 5, 2, 6, 7, 8, 9, 10, 11, 12, 13], color: '#66cc99' },
                        { data: [2, 5, 6, 4, 3, 2, 1, 3, 4, 5, 6, 7], color: '#ff6666' }
                    ]}
                    height={300}
                />
            </div>
            <div className='basis-2/6 my-5'>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'Company A' },
                                { id: 1, value: 15, label: 'Company B' },
                                { id: 2, value: 20, label: 'Company C' },
                            ],
                        },
                    ]}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fontSize: 14,
                                fill: 'white',
                            },
                        },
                    }}

                    height={250}
                />
                {/* 
                <PieChart
                    series={[
                        { value: 40, label: 'Category 1', color: 'green' },
                        { value: 30, label: 'Category 2', color: 'blue' },
                        { value: 20, label: 'Category 3', color: 'orange' },
                        { value: 10, label: 'Category 4', color: 'red' }
                    ]}
                    width={400}
                    height={300}
                    legend={{
                        position: 'right',
                        sx: {
                            '.MuiLegend-label': {
                                color: '#ffffff', // Change the legend label text color to white
                            }
                        }
                    }}
                /> */}
            </div>
        </>
    )
}
