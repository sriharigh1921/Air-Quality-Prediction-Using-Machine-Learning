import React from 'react';
import '../App.css';
import Popup from 'reactjs-popup';
import pimg from '../assets/pollution.png'



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      loading: false,
      city: 'Mumbai',
      formData: {
        T: 0,
        TM: 0,
        Tm: 0,
        H: 0,
        PP: 0,
        VV: 0,
        V: 0,
        VM: 0
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getCityDataAndPopulateForm(this.state.city);
  }

  getCityDataAndPopulateForm(cityName) {
    this.setState({ loading: true });
    fetch(`city?city=${cityName}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        const formData = this.state.formData;
        formData['T'] = Number(response.main.temp);
        formData['TM'] = Number(response.main.temp_max);
        formData['Tm'] = Number(response.main.temp_min);
        formData['H'] = Number(response.main.humidity);
        let pp = 0;
        if (response) {
          if (response.rain && response.rain['3h']) {
            pp = response.rain['3h'];
          }
          else if (response.snow && response.snow['3h']) {
            pp = response.snow['3h'];
          }
        }
        formData['PP'] = Number(pp);
        formData['VV'] = Number((Number(response.visibility) / 1000).toFixed(2));
        formData['V'] = Number((Number(response.wind.speed) * 1000 / 3600).toFixed(2));
        formData['VM'] = Number((Number(response.wind.speed) * 1000 / 3600).toFixed(2));
        this.setState({ formData });
        this.setState({ loading: false });
        this.setState({ result: null });
      });
  }

  handleInput(event) {
    const formData = this.state.formData;
    formData[event.target.id] = Number(event.target.value);
    this.setState({ formData });
  }

  handleSelect(event) {
    const cityName = event.target.value;
    this.setState({ city: cityName }, () => {
      this.getCityDataAndPopulateForm(cityName);
    });
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    this.setState({ result: null });
    event.preventDefault();
    fetch('predict', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state.formData)
    })
      .then(response => response.json())
      .then(response => this.setState({
        result: response,
        loading: false
      }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div className='head'>
                <h3>Air Quality Prediction</h3>
            </div>
          <p className='m-10'>
            Default form filled for { this.state.city } data. Edit as required and submit.
          </p>
          <form onSubmit={this.handleSubmit}>

            <div className='w-100'>
                <label>Enter Average Temperature (&deg;C):</label>
                <input type='number' value={this.state.formData.T} id='T' onChange={this.handleInput} step="1"/>
            </div>
            <br /><br />


            <div className='w-100'>
               <label>Enter Max Temperature (&deg;C):</label>
                <input type='number' value={this.state.formData.TM} id='TM' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <div className='w-100'>
               <label>Enter Min Temperature (&deg;C):</label>
               <input type='number' value={this.state.formData.Tm} id='Tm' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <div className='w-100'>
               <label>Enter Average Relative Humidity (%):</label>
               <input type='number' value={this.state.formData.H} id='H' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <div className='w-100'>
               <label>Enter Total Rainfall/Snowmelt (mm):</label>
               <input type='number' value={this.state.formData.PP} id='PP' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <div className='w-100'>
               <label>Enter Average Visibility (km):</label>
               <input type='number' value={this.state.formData.VV} id='VV' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <div className='w-100'>
               <label>Enter Average Wind Speed (km/h):</label>
               <input type='number' value={this.state.formData.V} id='V' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <div className='w-100'>
               <label>Enter Maximum Sustained Wind Speed (km/h):</label>
               <input type='number' value={this.state.formData.VM} id='VM' onChange={this.handleInput} step="1" />
            </div> 
            <br /><br />

            <Popup trigger=
                {<input type='submit' disabled={this.state.loading} className='m-b-20 s-btn'/>}
                modal nested>
                {
                    close => (
                        <div className='modal popup'>
                            <div>
                             {
                              this.state.result && !this.state.loading &&
                              <div>
                                <h4>AQI Prediction is</h4> 
                                <h5>{this.state.result}</h5>
                                <h3 style={{color: 
                                  this.state.result > 0 && this.state.result < 50? "green"
                                  : this.state.result > 50 && this.state.result < 100 ? "Yellow" 
                                  : this.state.result > 100 && this.state.result < 150 ? "orange" 
                                  : this.state.result > 150 && this.state.result < 200 ? "red"
                                  : this.state.result > 200 && this.state.result < 300 ? "purple" 
                                  : "brown"
                                }}>
                                  {this.state.result > 0 && this.state.result < 50? "good"
                                  : this.state.result > 50 && this.state.result < 100 ? "Moderate" 
                                  : this.state.result > 100 && this.state.result < 150 ? "Unhealthy for sensitive Groups" 
                                  : this.state.result > 150 && this.state.result < 200 ? "Unhealthy"
                                  : this.state.result > 200 && this.state.result < 300 ? "Very unhealthy" 
                                  : "Hazardous"}

                                </h3>
                              </div>
                             }
                             {
                              this.state.loading &&
                              <div><h5>Loading... Please wait...</h5></div>
                              }
                            </div>
                        </div>
                    )
                }
            </Popup><div></div>

            

          </form>
          
        </header>
      </div>
    );
  }
}