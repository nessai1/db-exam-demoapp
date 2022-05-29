import SiteCard from './SiteCard';
import {useEffect, useState} from "react";
import {SiteService} from "../api";
export default function SitesList() {

    const [state, changeState] = useState([]);

    useEffect(() => {
        const siteService = new SiteService();
        siteService.getPosts().then((data) => {
            changeState(data);
        });
    }, []);

    return (
        <>
            <div className='px-4 py-5 my-5 text-center'>
                <h1 className='display-5 fw-bold'>Список сайтов</h1>
            </div>
            <div className='mx-auto d-flex justify-content-center flex-column mt-xxl-5' style={{width: '1200px'}}>
                {
                    state.map((site, index) => (
                        <SiteCard key={index} siteData={site}/>
                    ))
                }
            </div>
        </>
    )
}