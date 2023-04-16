import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { wording } from 'src/app/utils/wording';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public wording = wording;

  public countries:string[] = [];
  private _medalsPerCountry: number[] = [];
  public chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';
  public chartPlugins = [ DatalabelsPlugin ];
  public chartData: ChartData<'doughnut', number[], string | string[]> | undefined = undefined;
  public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
        position: 'left',
      },
      datalabels: {
        formatter: (_value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
        font: {
          size: 18,
          family: 'Helvetica'
        }
      },
    },
    cutout: '35%'
  };

  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];
  public dataLoaded:boolean = false;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data)=> {
      this.olympics = data;
      this.olympics.forEach((olympic)=> { 
        this.countries.push(olympic.country);
        let medalsCount:number = 0;
        olympic.participations.forEach((participation) => {
          medalsCount += participation.medalsCount;
        });
        this._medalsPerCountry.push(medalsCount);
      });
      this.chartData = {
        labels: this.countries,
        datasets: [ {
          data: this._medalsPerCountry,
          datalabels: {
            color: [
              '#1B8A44',
              '#711313',
              '#A0811C',
              '#1a0f0f',
              '#324F8C'
            ]
          },
          backgroundColor: [
            '#52D683',
            '#D66363',
            '#FAD45A',
            '#463E3E',
            '#6E96EB'
          ],
          hoverBorderColor: [
            '#1B8A44',
            '#711313',
            '#A0811C',
            '#1a0f0f',
            '#324F8C'
          ]
        } ],
      }
      this.dataLoaded = true;
    });
  }
}
