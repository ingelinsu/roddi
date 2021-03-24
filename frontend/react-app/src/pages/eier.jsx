import React, { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import "./eier.css"

class OwnerPage extends React.Component {

    constructor(){
        super()
        this.state = {
            list: [],
            series: [{
                data: []
              }],
            options: {
                chart: {
                    type: 'bar',
                },
                fill: {
                    colors: ['#FB8D63']
                },
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: ['Parents', 'Siblings', 'Piblings', 'Grandparents', 'Children', 'Grandchildren', 'Others'],
                }
            },
        }
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/general-stats")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    list: data,
                    series: [{
                        data: [data.number_of_parents, data.number_of_siblings, data.number_of_piblings, 
                        data.number_of_grandparents, data.number_of_children, data.grandchildren, data.number_of_others]
                      }] 
                })
            })
    }

    render() {
        return (
            <Fragment className="fragment">
                <div className="brukere">
                    <div>
                        <h1>Oversiktsvindu for eier av Røddi:</h1>
                        <p>Totalt antall brukere:</p>
                        <p className="antall">{this.state.list.number_of_users}</p>
                        <p>Antall aktive brukere denne:</p>
                    </div>
                    <div className="aktiv">
                        <p className="tid">Dagen</p>
                        <p className="tall">{this.state.list.users_active_today}</p>
                    </div>
                    <div className="aktiv">
                        <p className="tid">Uken</p>
                        <p className="tall">{this.state.list.users_active_week}</p>
                    </div>
                    <div className="aktiv">
                        <p className="tid">Måneden</p>
                        <p className="tall">{this.state.list.users_active_month}</p>
                    </div>
                    
                </div>
                <div className="dodsbo_oversikt">
                        <h3>Statistikk over dødsbo:</h3>
                        <p>Antall dødsbo som eksisterer i applikasjonen: <b>{this.state.list.number_of_estates}</b></p>
                        <p>Antall uferdige dødsbo på dette tidspunktet: <b>{this.state.list.unfinished_estates}</b></p>
                        <p>Gjennomsnittelig antall brukere per dødsbo:<b> {this.state.list.users_per_estate}</b></p>
                        <p>Gjennomsnittelig antall eiendeler per dødsbo: <b>{this.state.list.assets_per_estate}</b></p>
                        <p>Prosent av brukere som har brukt kommentarer: <b>{this.state.list.commenting_users_percent}%</b></p>
                </div>
                <h3 className="stats">Statistikk over ulike relasjonstyper:</h3>
                <div className="chart">    
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300} width={700} />
                </div>
                
                
            </Fragment>
        )
        
    }
    
}



export default OwnerPage;


/*<Pie 
                parent = {this.state.list.number_of_parents} 
                sibling = {this.state.list.number_of_siblings} 
                pibling = {this.state.list.number_of_piblings}
                grandP = {this.state.list.number_of_grandparents}
                children = {this.state.list.number_of_children}
                grandC = {this.state.list.number_of_grandchildren}
                others = {this.state.list.number_of_others}
                />*/