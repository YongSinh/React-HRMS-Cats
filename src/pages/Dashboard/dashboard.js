import './dashboard.css'
import PageTitle from '../../components/Title_Page/TitlePage';
import CardCustom from './Card/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Chart } from "react-google-charts";

// import AboutPage from '../About/AboutPage';

import {ReactComponent as Attendance} from '../../asset/icon/attendance.svg'
import {ReactComponent as User} from '../../asset/icon/user-icon.svg'
import {ReactComponent as Leave} from '../../asset/icon/leave-icon.svg'
import {ReactComponent as Payroll} from '../../asset/icon/payroll-icon.svg'


export const databar = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
];

export const optionsbar = {
    title: "My Daily Activities",
};

export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];
  
  export const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
  };

const DashboardPage = () => {
    return (
        <>
            <PageTitle
                PageTitle='TODAY'
            />
            
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }}>

                    <Grid xs={2} sm={4} md={3} >
                        <CardCustom
                            title='Attendance'
                            icon={<Attendance />}
                            number={25}
                        />
                    </Grid>
                    <Grid xs={2} sm={4} md={3} >
                        <CardCustom
                            bkColor='#FBAD4B'
                            title='Employee'
                            icon={<User />}
                            number={6}
                        />
                    </Grid>
                    <Grid xs={2} sm={4} md={3} >
                        <CardCustom
                            bkColor='#357AF6'
                            title='Laeve'
                            icon={<Leave />}
                            number={4}
                        />
                    </Grid>
                    <Grid xs={2} sm={4} md={3} >
                        <CardCustom
                            bkColor='#FF646C'
                            title='Payroll'
                            icon={<Payroll />}
                            number={25}
                        />
                    </Grid>
                  
                    <Grid xs={2} sm={12} md={6} >
                        <div className='chart'>
                            <Chart
                                className='chart'
                                chartType="PieChart"
                                data={databar}
                                options={optionsbar}
                                width={"100%"}
                                height={"400px"}
                            />
                        </div>
                    </Grid>
                    <Grid xs={2} sm={12} md={6} >
                        <div className='chart'>
                            <Chart
                              
                              chartType="Bar"
                              width="100%"
                              height="400px"
                              data={data}
                              options={options}
                            />
                        </div>
                    </Grid>
                
                </Grid>

            </Box>
           
        </>
    )
}

export default DashboardPage;