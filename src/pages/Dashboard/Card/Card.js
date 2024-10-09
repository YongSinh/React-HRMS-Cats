import './Card.css'
import { Divider } from '@mui/material';
import { Space } from 'antd';
import {
    SyncOutlined,
} from '@ant-design/icons';
const CardCustom = ({
    title = "Hello world",
    bkColor = '#5CC8BE',
    number = 10,
    icon = '',
    status = 'last update 5 min'
}) => {
    return (
        <>

            <div style={{ backgroundColor: bkColor }} className='main-card'>
                <div className='card-top'>
                    <div className='card-title'>
                        <div className='child-card-title'>
                            {title}
                        </div>
                        <div className='card-number'>
                            {number}
                        </div>
                    </div>
                    <div className='card-icon'>
                        {icon}
                    </div>

                </div>
                <Divider color="#fff" sx={{ height: 1.2, width: '100%' }} />
                <div className='card-status'>
                    <Space>
                        <SyncOutlined spin />{status}
                    </Space>

                </div>
            </div>

        </>
    )
}

export default CardCustom;