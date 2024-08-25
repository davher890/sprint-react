import React from 'react';
import { useLocation } from 'react-router-dom';

const PageView: React.FC<any> = () => {

    const location = useLocation();

    React.useEffect(() => {
        (window as any).dataLayer.push({
            event: 'page_view'
        })
    }, [location])

    return <></>
}

export default PageView;