import 'bootstrap/js/dist/collapse'
export default function SiteCard(props) {

    const data = props.siteData;
    const uId = `site-card-${props.siteData.id}`;

    return (
        <div className='card p-lg-2 m-lg-3'>
            <div className='card-body'>
                <h5 className='card-title'>Some site</h5>
                <p className='card-text'>some site description</p>
                <div className="collapse m" id={uId}>
                    <div style={{paddingBottom: '20px'}}>
                        <ul className="list-group list-group-flush w-50">
                            <li className="list-group-item">Язык <span className='badge bg-primary'>{data.language}</span></li>
                            <li className="list-group-item">Кодировка <span className='badge bg-warning text-black'>{data.encode}</span></li>
                        </ul>
                    </div>
                </div>
                <button className="btn btn-primary">Редактировать</button>
                <button className="btn btn-light mx-2" type="button" data-bs-toggle="collapse" data-bs-target={`#${uId}`} aria-expanded="false" aria-controls={`#${uId}`}>Подробнее</button>
            </div>
        </div>
    );
}