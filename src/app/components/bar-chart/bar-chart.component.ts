import { Component } from '@angular/core';

import { Chart, registerables} from 'node_modules/chart.js'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent {

	chartData :any[]=[];
	chartLabel: any[]=[];
	
  	colorValue : any[]= [];

	constructor(){}

	ngOnInit():void{

		this.renderChart()

	}

	renderChart(){

		this.colorValue.push(12);
		this.colorValue.push(19);
		this.colorValue.push(3);
		this.colorValue.push(5);
		this.colorValue.push(2);
		this.colorValue.push(3);

		console.log(this.colorValue)

		new Chart("barChart", {
			type: 'bar',
			data: {
			  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			  datasets: [{
				label: '# of Votes',
				data: this.colorValue,
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
        ],
				borderWidth: 1
			  },
        {
				label: '# of Votes',
				data: this.colorValue,
        backgroundColor: [
          'rgba(154, 162, 135, 0.5)',
        ],
				borderWidth: 1
			  }
      ]
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
