import { Component } from '@angular/core';
import { RapportService } from '../../services/rapport.service';
import {Chart, registerables} from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  colorValue : any[]= [];
  CA_source : any[] = [];
  CA_frequence : any[] = [];
  CA_type : any[] = [];

	constructor(private _rapportService :RapportService){}

	ngOnInit():void{
    
    let date_du !:Date
    let date_au !:Date

    this.rapportCAPourGraphique()

    this.renderChart("pie", "pieChart_1");

    this.renderChart("pie", "pieChart");

    this.renderChart("doughnut", "doughnutChart");

    //this.renderChart("polarArea", "polarareaChart");

    //this.renderChart("bar", "barChart");

    this.renderBubbleChart("bubble", "bubbleChart");

    this.renderLineChart("line", "lineChart");

    this.renderMixedChart("bar", "mixeChart");

    this.renderScatterChart("scatter", "scatterChart");

    this.renderAreaChart("scatter", "areaChart");

	}

  renderAreaChart(type:any, id:any){

    

  }
  
  rapportCAPourGraphique(){
    
    let date_du !:Date
    let date_au !:Date  
    
    this._rapportService.rapportChiffresAffairesGraphique(2, date_du, date_au).subscribe((data:any[]) => {
      
      this.CA_source = data
      
      console.log(this.CA_source)

     // this.renderChart("pie", "pieChart",  this.CA_source);
      
    });

    this._rapportService.rapportChiffresAffairesGraphique(3, date_du, date_au).subscribe((data:any[]) => {
      this.CA_frequence =data
    });

    this._rapportService.rapportChiffresAffairesGraphique(1, date_du, date_au).subscribe((data:any[]) => {
      this.CA_type =data
    });

  }

  renderMixedChart(type:any, id:any){

    const mixedChart = new Chart(id, {
      data: {
          datasets: [{
              type: 'bar',
              label: 'Bar Dataset',
              data: [10, 20, 30, 40]
          }, {
              type: 'line',
              label: 'Line Dataset',
              data: [25, 25, 25, 25],
          }],
          labels: ['January', 'February', 'March', 'April']
      },
    });

  }

  renderScatterChart(type:any, id:any){

    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    }

    new Chart(id, {
			type: type,
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
		});

  }

   renderLineChart(type:any, id:any){
    //Utils.months({count: 7});
    const labels = ['Janiver', 'Fervrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    new Chart(id, {
			type: type,
			data: data,
		});

   }

  renderBubbleChart(type:any, id:any){

    const data = {
      datasets: [{
        label: 'First Dataset',
        data: [{
          x: 20,
          y: 20,
          r: 15
        }, {
          x: 40,
          y: 10,
          r: 10
        },{
          x: 10,
          y: 15,
          r: 15
        }, {
          x: 40,
          y: 30,
          r: 12
        }
      ],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    };

    new Chart(id, {
			type: type,
			data: data,
			options: {
			  scales: {
				y: {
				  beginAtZero: true
				}
			  }
			}
		});

  }
  
  renderChart(type:any, id:any){

		this.colorValue.push(12);
		this.colorValue.push(19);
		this.colorValue.push(3);
		this.colorValue.push(5);
		this.colorValue.push(2);
		this.colorValue.push(3);

		new Chart(id, {
			type: type,
			data: {
			  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			  datasets: [{
				label: '# of Votes',
				data: this.colorValue,
				borderWidth: 1
			  }]
			},
			options: {
			  scales: {
				y: {
				  beginAtZero: true
				}
			  }
			}
		});

	}

	renderChart_(type:any, id:any,  raw_data :any[]){
    
    
		
   let data : any[];
    let label : any[];
    
    for (let index = 0; index < raw_data.length; index++) {
      const element = raw_data[index];
      label.push(element.critere);
      data.push(element.total_facture);
    }

		new Chart(id, {
			type: type,
			data: {
			  labels: label,
			  datasets: [{
			label: '# of Votes',
				data: data,
				borderWidth: 1
			  }]
			},
			options: {
			  scales: {
				y: {
				  beginAtZero: true
				}
			  }
			}
		});

	}

}
