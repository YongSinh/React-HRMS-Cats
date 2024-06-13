

    
import { useState } from 'react';

import './style/emergency.css';

//Componets form MUI
import Grid from '@mui/material/Unstable_Grid2';

//Componets form antd
import {
    Collapse, DatePicker, Space, Button, List,
    Checkbox,
    Form,
    Input,
    Select,
    Tag,
    Radio,
} from 'antd';
import {
    EyeOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    EditOutlined,
    FileAddOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import 'antd/dist/antd';







const Emergency = () =>{
    return(
        <>
     <div className='charge'>

<span className='span-case1'> Emergency Contact </span>
<div style={{ minWidth: '95rem' }}>
<Grid container spacing={{ xs: 1 }} >
    

                        <Grid xs={8}>
                                <Form.Item label="Full Name:" name={""}>
                                    <Input />
                                </Form.Item>
                            </Grid>
                            <Grid xs={4}>
                                <Form.Item label="Relationship:" name={""}>
                                    <Input />
                                </Form.Item>
                            </Grid>
                            <Grid xs={8}>
                                <Form.Item label="Address:" name={""}>
                                    <Input />
                                </Form.Item>
                            </Grid>
                            <Grid xs={4}>
                                <Form.Item label="Tel:" name={""}>
                                    <Input />
                                </Form.Item>
                            </Grid>
                            <Grid xs={8}>
                                <Form.Item label="Office Address:" name={""}>
                                    <Input />
                                </Form.Item>
                            </Grid>
                            <Grid xs={4}>
                                <Form.Item label="Office Tel:" name={""}>
                                    <Input />
                                </Form.Item>
                            </Grid>
                           
    
</Grid>
<Grid container spacing={{ xs: 1 }} >
 
    
    
</Grid>

<div className='charge'>

<span className='span-case2'> Residence in Google Map</span>

<Grid container spacing={{ xs: 1 }} >


                <Grid xs={6}>
                        <Form.Item label="Latitude:" name={""}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={6}>
                        <Form.Item label="Longtitude:" name={""}>
                            <Input />
                        </Form.Item>
                    </Grid>
                  
                  
                  


</Grid>

</div>






</div>
</div>









        </>
    )
}
export default Emergency;