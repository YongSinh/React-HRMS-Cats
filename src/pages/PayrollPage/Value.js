import React from 'react';
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


const ValuePage = () =>{
    
        const [form] = Form.useForm();
        return (
            <>
    
                {/* <h2>Preference</h2>
                <div className="info">
                    <h3>How payrun works?</h3>
                    <ol>
                        <li>Default pay run is applicable to generate payslip for all employees (Except those are updated individually) whenever it executes from the Payrun module.</li>
                        <li>You can set pay run individually over the default from the Employees details.</li>
                    </ol>
                </div> */}
    
                <div >
                    <div style={{ minWidth: '95rem' }}>
                 
                        <Grid container spacing={{ xs: 2 }} >
    
                            <Grid xs={9} >
    
    
                                <div className='border-box form-entry'>
    
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        // layout="horizontal"
                                        //  onFinish={onFinish}
                                        //  onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
    
                                        <Grid container spacing={1}>
                                            <Grid xs={9}>
                                                <Form.Item label="Allowance" name={"allowance"}>
                                                    <Space  >
    
                                                        <Select
                                                            style={{
                                                                width: 1000,
                                                                height: 30,
    
                                                            }}
                                                            Select
    
                                                            options={[
                                                                {
                                                                    value: 'monthly',
                                                                    label: 'Monthly',
                                                                },
                                                                {
                                                                    value: 'first of month',
                                                                    label: 'First of Month',
                                                                },
                                                                {
                                                                    value: 'second of month',
                                                                    label: 'Second of Month',
                                                                },
                                                            ]}
                                                        />
                                                    </Space>
                                                </Form.Item>
                                            </Grid>
                                            <Grid xs={9}>
                                                <Form.Item label="Deduction" name={"deduction"}>
                                                <Space  >
    
                                <Select
                                    style={{
                                        width: 1000,
                                        height: 30,
    
                                    }}
                                    Select
    
                                    options={[
                                        {
                                            value: 'monthly',
                                            label: 'Monthly',
                                        },
                                        {
                                            value: 'first of month',
                                            label: 'First of Month',
                                        },
                                        {
                                            value: 'second of month',
                                            label: 'Second of Month',
                                        },
                                    ]}
                                />
                                                </Space>
                                                </Form.Item>
                                            </Grid>
                                            
                                        </Grid>
                                        <Button  type='primary' >Save</Button>
    
                                        <Button style={{margin: 10}}  >Cancel</Button>
                                    </Form>
                                </div>
                            </Grid>
                        </Grid>
                     
    
    
    
    
    
    
    
                    </div>
                </div>
    
    
    
            </>
        );
    }
    


export default ValuePage;