import React, { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
//import Pie from "../components/PieChart.js"
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
            <Fragment>
                <h1>Statistikk for eier</h1>
                <div className="brukere">
                    <p>Totalt antall brukere: {this.state.list.number_of_users}</p>
                    <p>Antall aktive brukere i dag: {this.state.list.users_active_today}</p>
                    <p>Antall aktive brukere denne uken: {this.state.list.users_active_week}</p>
                    <p>Antall aktive brukere denne måneden: {this.state.list.users_active_month}</p>
                </div>
                <div className="dodsbo">
                    <p>Antall dødsbo: {this.state.list.number_of_estates}</p>
                    <p>Antall uferdige dødsbo: {this.state.list.unfinished_estates}</p>
                    <p>Gjennomsnittelig antall brukere per dødsbo: {this.state.list.users_per_estate}</p>
                    <p>Gjennomsnittelig antall eiendeler per dødsbo: {this.state.list.assets_per_estate}</p>
                    <p>Prosent av brukere som har brukt kommentarfunskjon: {this.state.list.commenting_users_percent}</p>
                </div>
                <div className="chart">    
                <p>Her er en oversikt over ulike relasjoner:</p>
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