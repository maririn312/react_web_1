import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

const MainPage:FunctionComponent = () => {
    
  return (
    <PageLayout>
      <div>
        <div className='container mx-auto mb-10 mt-10'>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default MainPage;