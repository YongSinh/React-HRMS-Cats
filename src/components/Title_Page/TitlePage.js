import './Pagetitle.css'
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const PageTitle = ({
    PageTitle = "Page-Title",
    props
}) => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    useEffect(() => {
        // Function to generate dynamic breadcrumbs based on the current route
        const generateBreadcrumbs = () => {
          const paths = location.pathname.split('/').filter((path) => path !== '');
    
          const dynamicBreadcrumbs = paths.map((path, index) => {
            const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
            return (
              <Breadcrumb.Item key={routeTo}>
               {path}
              </Breadcrumb.Item>
            );
          });
    
          setBreadcrumbs(dynamicBreadcrumbs);
        };
    
        generateBreadcrumbs();
      }, [location]);


    return (
        <>
        <div className='main-page'>
            <span className='page-title'>{PageTitle}</span>
            <Breadcrumb
            className='breadcrumb'
            separator='>'
            >
               <Breadcrumb.Item>HRMS</Breadcrumb.Item>
              {breadcrumbs}
            </Breadcrumb>
        </div>

        </>
    );
}
export default PageTitle;