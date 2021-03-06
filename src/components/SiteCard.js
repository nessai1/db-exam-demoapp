import 'bootstrap/js/dist/collapse'
import {useEffect, useState} from "react";
import {SiteService} from "../api";
export default function SiteCard(props) {

    const data = props.siteData;
    const uId = `site-card-${props.siteData.id}`;

    const [state, changeState] = useState({editMode: data.editMode || false, editorData: null, loadEditor: data.loadEditor || false});

    const submitHandler = (event) => {
        if (event.nativeEvent.submitter.name === 'cancel') {
            if (data.id === 0)
            {
                window.location.reload();
            }
            changeState({editMode: false});
        }
        else {
            const formData = new FormData(event.target);
            const requestData = {
                id: data.id,
                title: formData.get('title'),
                desc: formData.get('desc'),
                danger: formData.get('danger') === 'on',
                language: formData.get('language'),
                encode: formData.get('encode')
            };

            if (requestData.title && requestData.language && requestData.encode)
            {
                const siteService = new SiteService();
                siteService.setSite(requestData).then((result) => {
                    if (result.status === 'OK')
                    {
                        window.location.reload();
                    }
                    else
                    {
                        console.log(result);
                    }
                });
            }
        }

        event.preventDefault();
    }

    useEffect(() => {
        if (data.editMode) {
            state.editorData.lang = [];
            state.editorData.encode = [];
            editModeEnable();
        }
    });

    const editModeEnable = () => {
        const siteService = new SiteService();
        siteService.getEditorData().then((data) => {
            changeState({
                editMode: true,
                editorData: data
            });
        });
    }

    if (state.loadEditor) {
        state.editorData = {};
        state.editorData.lang = [];
        state.editorData.encode = [];
        const siteService = new SiteService();
        siteService.getEditorData().then((data) => {
            changeState({
                editMode: true,
                loadEditor: false,
                editorData: data
            });
        });
    }

    const deleteHandler = () => {
        const siteService = new SiteService();
        if (data.id > 0)
        {
            siteService.deleteSite(data.id).then((data) => {
                if (data.status === 'OK') {
                    window.location.reload();
                }
            });
        }
        else
        {
            window.location.reload();
        }
    }


    let haveBanner = '';
    if (!data.danger) {
        haveBanner = <span className='badge bg-success'>?????? ??????????????</span>;
    }
    else {
        haveBanner = <span className='badge bg-danger'>???????? ??????????????</span>;
    }

    if (!state.editMode)
    {
        return (
            <div className='card p-lg-2 m-lg-3'>
                <div className='card-body'>
                    <h5 className='card-title'>{data.title} {haveBanner}</h5>
                    <p className='card-text'>{data.desc}</p>
                    <div className='d-flex flex-column mb-4'>
                        <div className='pe-3'>
                            ???????? ???????????????? <span className='badge bg-dark'>{data.created}</span>
                        </div>
                        <div>
                            ???????? ???????????????????? <span className='badge bg-dark'>{data.updated}</span>
                        </div>
                    </div>
                    <div className="collapse m" id={uId}>
                        <div style={{paddingBottom: '20px'}}>
                            <ul className="list-group list-group-flush w-50">
                                <li className="list-group-item">???????? <span className='badge bg-primary'>{data.language}</span></li>
                                <li className="list-group-item">?????????????????? <span className='badge bg-warning text-black'>{data.encode}</span></li>
                            </ul>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={editModeEnable}>??????????????????????????</button>
                    <button className="btn btn-light mx-2" type="button" data-bs-toggle="collapse" data-bs-target={`#${uId}`} aria-expanded="false" aria-controls={`#${uId}`}>??????????????????</button>
                </div>
            </div>
        );
    }
    else
    {
        return(
            <div className='card p-lg-2 m-lg-3'>
                <div className='card-body'>
                    <button type="button" className="btn-close mb-3" aria-label="Close" onClick={deleteHandler}></button>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="title" className="fw-bold">?????????? ??????????</label>
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Site address"
                            name='title'
                            defaultValue={data.title || ''}
                        />
                        <div className="form-check mt-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={data.danger || false}
                                name="danger"
                            />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    ???????? ???????????????? ??????????????
                                </label>
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="desc" className="form-label fw-bold">????????????????</label>
                            <textarea className="form-control" name="desc" rows="3" defaultValue={data.desc}></textarea>
                        </div>
                        <div className="d-flex flex-row">
                            <select name="language" className="form-select form-select-sm w-25" aria-label=".form-select-sm example">

                                { data.language !== null ? (
                                    state.editorData.lang.map(lang => (
                                        <option selected={lang[1] === data.language} value={lang[0]}>{lang[1]}</option>
                                    ))
                                ) : (
                                    state.editorData.lang.map((lang,index) => (
                                        <option selected={index === 0} value={lang[0]}>{lang[1]}</option>
                                    ))
                                )}
                            </select>
                            <select name="encode" style={{marginLeft: '20px'}} className="form-select form-select-sm w-25" aria-label=".form-select-sm example">

                                { data.language !== null ? (
                                    state.editorData.encode.map(encode => (
                                        <option selected={encode[1] === data.encode} value={encode[0]}>{encode[1]}</option>
                                    ))
                                ) : (
                                    state.editorData.encode.map((encode, index) => (
                                        <option selected={index === 0} value={encode[0]}>{encode[1]}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div className="mt-3">
                        <button className="btn btn-success mx-2" type="submit">??????????????????</button>
                        <button className="btn btn-danger" name="cancel">????????????????</button>
                        </div>
                    </form>
                  </div>
            </div>
        );
    }

}