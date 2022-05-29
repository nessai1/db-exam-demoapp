import 'bootstrap/js/dist/collapse'
export default function SiteCard(props) {

    const data = props.siteData;
    const uId = `site-card-${props.siteData.id}`;

    let haveBanner = '';
    if (!data.danger) {
        haveBanner = <span className='badge bg-success'>Без рекламы</span>;
    }
    else {
        haveBanner = <span className='badge bg-danger'>Есть реклама</span>;
    }

    return (
        <div className='card p-lg-2 m-lg-3'>
            <div className='card-body'>
                <h5 className='card-title'>{data.title} {haveBanner}</h5>
                <p className='card-text'>{data.desc}</p>
                <div className='d-flex flex-column mb-4'>
                    <div className='pe-3'>
                        Дата создания <span className='badge bg-dark'>05.20.2000</span>
                    </div>
                    <div>
                        Дата обновления <span className='badge bg-dark'>05.20.2000</span>
                    </div>
                </div>
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