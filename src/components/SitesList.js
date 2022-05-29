import SiteCard from './SiteCard';
export default function SitesList() {
    return (
        <>
            <div className='px-4 py-5 my-5 text-center'>
                <h1 className='display-5 fw-bold'>Список сайтов</h1>
            </div>
            <div className='mx-auto d-flex justify-content-center flex-column mt-xxl-5' style={{width: '1200px'}}>
                <SiteCard siteData={{id: 12, language: 'Русский', encode: 'windows-1251'}}/>
                <SiteCard siteData={{id: 13, language: 'Русский', encode: 'windows-1251'}}/>
                <SiteCard siteData={{id: 14, language: 'Русский', encode: 'windows-1251'}}/>
            </div>
        </>
    )
}