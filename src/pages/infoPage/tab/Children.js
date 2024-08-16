import { useState } from 'react';

import './style/children.css';

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





const Children = () => {
    return(
        <>
<div className='charge'>

<span className='span-case1'> Children:</span>
<div style={{ minWidth: '100' }}>
<Grid container spacing={{ xs: 1 }} >
    

                        <Grid xs={3}>
                                <Form.Item label="Name" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Gender" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Date of Birth" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="School Detail" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                           
                           
                           
    
    
</Grid>








</div>
</div>



        </>
    )
}
export default Children;