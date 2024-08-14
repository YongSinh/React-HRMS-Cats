import { useState } from 'react';

import './style/special.css';

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



const Special =() =>{
    return(
        <>
         <div className='charge'>

<span className='span-case1'> Special:</span>
<div style={{ minWidth: '100%' }}>
<Grid container spacing={{ xs: 1 }} >
    

                        <Grid xs={3}>
                                <Form.Item label="Foreign Language" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Reading" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Speaking" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Listening" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                            <Grid xs={2}>
                                <Form.Item label="Writing" name={""}>
                                    
                                </Form.Item>
                            </Grid>
                           
                           
    
    
</Grid>








</div>
</div>
        </>
    )
}
export default Special;