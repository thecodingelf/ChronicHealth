import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';


@IonicPage()
@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
export class GraphsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let myChart = HighCharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Daily Graph'
      },
      xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday', 'Sunday']
      },
      yAxis: {
        title: {
          text: 'Pain Severity'
        }
      },
      series: [
      {
        name: 'John',
        data: [5, 7, 3, 1, 10, 2, 6]
      },
      {
        name: 'After',
        data: [2, 4, 5, 6, 4, 1, 10]
      }
    ]
    });
  }

}
