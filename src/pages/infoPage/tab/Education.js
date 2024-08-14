import { useState } from 'react';

import './style/education.css';

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




const Education = () =>{
return(
    <>
         <div className='charge'>

<span className='span-case1'> Education:</span>
<div style={{ minWidth: '100%' }}>
<Grid container spacing={{ xs: 1 }} >
    

                        <Grid xs={3}>
                                <Form.Item label="Educaion Level" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Education Institution" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="End Year" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Degree/Major" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="GPA" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                           
                           
    
    
</Grid>








</div>
</div>
    
    
    </>
)
}
export default Education;