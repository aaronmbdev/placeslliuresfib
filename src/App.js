import './App.css';
import './i18n';
import React from "react";
import Select from 'react-select'
import {withTranslation} from "react-i18next";
import Asignaturas from "./Asignaturas";



class Buscador extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error : null,
      showAsignaturas: false,
      isLoaded: false,
      items: [],
      selected: []
    };
    if(localStorage.getItem("lang") === null) {
      localStorage.setItem("lang","es");
    }
  }

  async getInformation() {
    const compare = (a,b) => {
      if(a.label < b.label) {
        return -1;
      }
      if(a.label > b.label) {
        return 1;
      }
      return 0;
    }
    fetch("https://api.fib.upc.edu/v2/assignatures?format=json&client_id=Rk8TSzHGrRidyD4pPwt9fLOCODHFey27hF28Jdh4&pla=GRAU",{
      method: 'get',
      headers: new Headers({
        'Accept-Language':localStorage.getItem("lang")
      })
    })
        .then(res => res.json())
        .then(
            (result) => {
              for(var i = 0; i < result.count; i++) {
                result.results[i].label = result.results[i].id+" - "+result.results[i].nom;
                result.results[i].value = result.results[i].id;
              }
              result.results.sort(compare);
              this.setState({
                isLoaded: true,
                items: result.results
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
  }

  componentDidMount() {
    this.getInformation();
  }

  render() {
    const { t } = this.props;
    const {error,isLoaded,items} = this.state;
    const handleClick = () => {
      this.setState({showAsignaturas:true})
    }
    const handleChange = (event) => {
      localStorage.setItem("sel",JSON.stringify(event));
      this.setState({selected:event});
    }

    const loadData = () => {
      if(this.state.showAsignaturas) {
        return (<Asignaturas data={this.state.selected}/>);
      } else {
        if(localStorage.getItem("sel") != null) {
          return (<Asignaturas data={JSON.parse(localStorage.getItem("sel"))}/>);
        } else {
          return(null);
        }
      }
    }

    const loadSelector = () => {
      if(localStorage.getItem("sel") != null) {
        return (<Select isMulti defaultValue={JSON.parse(localStorage.getItem("sel"))} options={items} onChange={handleChange}/>);
      } else {
        return (<Select isMulti options={items} onChange={handleChange}/>);
      }
    }


    if(error) {
      return (<div>{t('error')}</div>);
    } else if(!isLoaded) {
      return (<div>{t('loading')}</div>);
    } else {
      return (
          <div className="App">
            <div className="row">
              <div className="col-12">
                <div className="card-box">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="form-group">
                        <label htmlFor="status-select" className="mr-2">{t('select.text')}</label>
                        {loadSelector()}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="text-lg-right mt-3 mt-lg-0">
                        <button type="button" onClick={handleClick} className="btn btn-success waves-effect waves-light mr-1">{t('button.text')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {loadData()}
            </div>
          </div>
      );
    }
  }
}

export default withTranslation()(Buscador);
