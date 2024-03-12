import { Component } from '@angular/core';
import { StatisticService } from 'src/app/service/thongke.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   
    lineChartData: any;
    lineChartOptions: any;
    doughnutChartData: any;
    doughnutChartOptions: any;
    date: { startDate: Date | string; endDate: Date | string } = {
        startDate: '',
        endDate: '',
      };
    datas:any;
    dataMonth:any
    
   
constructor( private StatisticSV:StatisticService){}
  ngOnInit() {
    // this.ChartLine();
    this.chartdoughnut();
    this.getStatistic();
    this.getMonth();
  }
getStatistic(){
    this.StatisticSV.getStatistics(this.date).subscribe({
        next:(res) =>{
          this.datas=res  ;
        },
    });
    this.getMonth();
}

getMonth(){
    this.StatisticSV.getMonth(this.date).subscribe({
        next:(res) =>{
          this.dataMonth=res  ;
          this.ChartLine(this.dataMonth)

        },
    })
}
reset(){
    this.date.startDate='';
    this.date.endDate='';
    this.getStatistic()
}

  chartdoughnut(){
    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.doughnutChartData = {
          labels: ['A', 'B', 'C'],
          datasets: [
              {
                  data: [540, 325, 702],
                  backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
          ]
      };

      this.doughnutChartOptions = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };

  }

ChartLine(data: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
    const months = data.map((item:any) => item.month);
    const year = data.map((item:any) => item.year);

    const revenues = data.map((item:any) => parseFloat(item.totalRevenue));
  
    this.lineChartData = {
      labels: months,
      datasets: [
        {
          label: 'Doanh số',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          tension: 0.4,
          data: revenues
        },
      ]
    };
  
    this.lineChartOptions = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 1.1,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
      }
    };
  }
  
}
