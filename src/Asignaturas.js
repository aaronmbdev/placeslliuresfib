import React from "react";
import {withTranslation} from "react-i18next";
import Moment from 'react-moment';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class Asignaturas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastUpdate : null,
            error : null,
            isLoaded: false,
            items: [],
        };
    }

    componentDidMount() {
        const callApi = () => {
            fetch("https://api.fib.upc.edu/v2/assignatures/places/?format=json&client_id=Rk8TSzHGrRidyD4pPwt9fLOCODHFey27hF28Jdh4&pla=GRAU",{
                method: 'get',
                headers: new Headers({
                    'Accept-Language':'es'
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if(this.state.lastUpdate !== result.data_actualitzacio) {
                            this.setState({
                                isLoaded: true,
                                lastUpdate: result.data_actualitzacio,
                                items: result.results
                            });
                            toastr.options = {
                                positionClass : 'toast-top-full-width',
                                hideDuration: 300,
                                timeOut: 60000
                            }
                            toastr.success("Plazas actualizadas");
                        }
                    },
                    (error) => {
                        console.log(error);
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )

        }
        this.interval = setInterval(() => callApi(), 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { t } = this.props;
        const {error,isLoaded} = this.state;
        const getGrupos = (id,plazas) => {
            let groupos = [];
            for(let i = 0; i < plazas.length; i++) {
                if(id === plazas[i].assig) {
                    groupos.push(plazas[i]);
                }
            }
            return groupos;
        }

        const buildBox = (buttons,nom,id) => {
            if(buttons === false) {
                buttons = <p>{t('noplazas')}</p>;
            }
            return(
                <div className="col-lg-4">
                    <div className="card-box bg-pattern">
                        <div className="text-center">
                            <h4 className="mb-1 font-20">{nom}</h4>
                            <p className="text-muted  font-14">{id}</p>
                        </div>
                        <p/>
                        <div className="row">{buttons}</div>
                    </div>
                </div>
            );
        }

        const buildElements = () => {
            let elems = [];
            for(let j = 0; j < this.props.data.length; j++) {
                let nom = this.props.data[j].nom;
                let id = this.props.data[j].id;
                let grupos = getGrupos(id,this.state.items);
                if(grupos.length === 0) {
                    let box = buildBox(false,nom,id);
                    elems.push(box);
                } else {
                    let ret = [];
                    for(let i = 0; i<grupos.length; i++) {
                        let lliures = grupos[i].places_lliures;
                        let totales = grupos[i].places_totals;
                        let ratio = lliures/totales;
                        if(ratio >= 0.6) {
                            ret.push(<div key={i} className="grupo"><button type="button" className="btn btn-success waves-effect waves-light"><span className="btn-label">{grupos[i].grup}</span> {grupos[i].places_lliures} / {grupos[i].places_totals}</button></div> );
                        } else if(ratio >= 0.25 && ratio < 0.6) {
                            ret.push(<div key={i} className="grupo"><button type="button" className="btn btn-warning waves-effect waves-light"><span className="btn-label">{grupos[i].grup}</span> {grupos[i].places_lliures} / {grupos[i].places_totals}</button></div> );
                        } else {
                            ret.push(<div key={i} className="grupo"><button type="button" className="btn btn-danger waves-effect waves-light"><span className="btn-label">{grupos[i].grup}</span> {grupos[i].places_lliures} / {grupos[i].places_totals}</button></div> );
                        }

                    }
                    let box = buildBox(ret,nom,id);
                    elems.push(box);
                }
            }
            return elems;
        }
        if(error) {
            return (<div>{t('error')}</div>);
        } else if(!isLoaded) {
            return (<div>{t('loading')}</div>);
        } else {
            return(
                <div className="col-md-12">
                    {t('lastupdate')} <Moment date={this.state.lastUpdate} format="DD/MM/YYYY HH:mm:ss"/>
                    <p/>
                    <div className="row">
                        {buildElements()}
                    </div>
                </div>
            );
        }
    }
}
export default  withTranslation()(Asignaturas);
