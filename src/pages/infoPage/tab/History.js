import React from 'react';
import './style/history.css';

// Components from MUI
import Grid from '@mui/material/Unstable_Grid2';

// Components from antd
import { Form, Input } from 'antd';

const History = () => {
    return (
        <div className='charge'>
            <span className='span-case1'>History:</span>
            <div style={{ minWidth: '100%' }}>
                <Grid container spacing={{ xs: 1 }}>
                    <Grid xs={3}>
                        <Form.Item label="Full Name" name={"full_name"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="Department" name={"dep"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="Section" name={"section"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="Position" name={"position"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="Phone" name={"phone"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="Email" name={"email"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="Start work" name={"start_work"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                    <Grid xs={2}>
                        <Form.Item label="End work" name={"end_work"}>
                            <Input />
                        </Form.Item>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default History;
