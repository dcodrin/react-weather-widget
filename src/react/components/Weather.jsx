var React = require("react");
var Geosuggest = require("react-geosuggest");
var Fetch = require("whatwg-fetch");

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var Weather = React.createClass({
    getInitialState(){
        var date = new Date();
        var day = date.getDate();
        var weekDay = date.getDay();
        var month = date.getMonth();
        return {
            currentDate: dayNames[weekDay] + " " + day + " " + monthNames[month],
            focused: false,
            weather: null
        }
    }, componentWillMount(){
        var weatherData = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=45.5016889&lon=-73.56725599999999&units=metric&mode=json&cnt=7&APPID=380170ad0ee01fe048ecc89e68a8b13d";
        fetch(weatherData).then((res) => {
            return res.json()
        }).then((json) => {
            this.setState({
                weather: json
            })
        });
    }, onSuggestSelect(suggest){
        var weatherData = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + suggest.location.lat + "&lon=" + suggest.location.lng + "&units=metric&mode=json&cnt=7&APPID=380170ad0ee01fe048ecc89e68a8b13d";
        fetch(weatherData).then((res) => {
            return res.json()
        }).then((json) => {
            this.setState({
                weather: json
            })
        });
    },
    show(){
        if (!this.state.focused) {
            this.refs.input.refs.geosuggestInput.focus();
            this.refs.input.clear();
            this.setState({
                focused: true
            })
        } else {
            this.refs.input.refs.geosuggestInput.blur();
            this.setState({
                focused: false
            })
        }
    },
    render: function () {
        if (this.state.weather) {
            console.log(this.state.weather)
            var currentIcon = "http://openweathermap.org/img/w/"+this.state.weather.list[0].weather[0].icon+".png";
            return (
                <div>
                    <div className="col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 weatherApp">
                        <div className="panel panel-body panel-danger">
                            <div className="row">
                                <div className="col-xs-12">

                                    <div className="searchContainer">
                                        <Geosuggest
                                            placeholder={"Search City"}
                                            onSuggestSelect={this.onSuggestSelect}
                                            types={["(cities)"]}
                                            initialValue={"Montreal, QC, Canada"}
                                            ref="input"
                                        />
                                        <div className="searchGlassContainer" onClick={this.show}><i
                                            className="fa fa-search searchGlass"></i></div>
                                    </div>

                                    <div className="currentDate">{this.state.currentDate}</div>
                                </div>
                            </div>
                            <div className="currentWeather">
                                <div className="row">
                                    <div className="col-xs-6 currentIcon">
                                        <img src={currentIcon} alt=""/>
                                    </div>
                                    <div className="col-xs-6 currentTemp">
                                        {Math.floor(this.state.weather.list[0].temp.day)}&deg;
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 currentDescription">{this.state.weather.list[0].weather[0].description}</div>
                                    <div className="col-xs-6 currentWind"><i className="fa fa-cloud fa-2x"></i>&nbsp;{this.state.weather.list[0].speed}&nbsp;MPH</div>
                                </div>
                            </div>
                            <div className="forecastWeather">
                                {this.state.weather.list.map((day, index) => {
                                    var icon = "http://openweathermap.org/img/w/"+day.weather[0].icon+".png";
                                    var divStyle = {
                                        background: ""
                                    };
                                    index % 2 === 0 ? divStyle.background = "#EBEBEB" : divStyle.background = "#F5F5F5";
                                    if(index !== 0){
                                        var today = new Date();
                                        today.setDate(today.getDate() + index);
                                        var newDate = dayNames[today.getDay()];
                                        return (
                                            <div className="row forecastRow" key={day.dt} style={divStyle}>
                                                <div className="col-xs-4 forecastDate">{newDate}</div>
                                                <div className="col-xs-4 forecastIcon"><img src={icon} alt=""/></div>
                                                <div className="col-xs-4 forecastTemp">{Math.floor(day.temp.min)}&deg;&nbsp;/&nbsp;{Math.floor(day.temp.max)}&deg;</div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div>Loading...</div>)
    }
});

module.exports = Weather;