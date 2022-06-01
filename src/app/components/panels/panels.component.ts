import { Component, ViewChild,OnInit  } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType, ChartData } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { HojarutaService } from 'src/app/services/hojaruta.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Hojaruta } from 'src/app/models/hojaruta';
import { Segui } from 'src/app/models/seguimiento';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.css']
})
export class PanelsComponent implements OnInit {
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  public seguis: Segui[] = [];
  cant: string = "";
  canten:number = 0;
  cantre:number = 0;
  cantrec:number = 0;
  cantpro:number = 0;
  destino: string="";
  cantderp:number = 0;
  cantenp:number = 0;
  cantrecp:number = 0;
  cantfinp:number = 0;
  totalp:number = 0;
  totalarcp:number = 0;
  public identity: any = [];
  public token: any;


  constructor(
    private _hojaService: HojarutaService,
    private _seguiService: SeguimientoService,
    public _authService: AuthService,


  ) { this.loadUser();}
  ngOnInit(): void {
    this.getHojas();
    this.obtenertotal();
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');

  }
  obtenertotal(){
    let RegExp = /[^()]*/g
    this.destino = this.identity.post;
    let destino1: any = RegExp.exec(this.destino);
    this._seguiService.obtenerSeguiO(destino1).subscribe(data => {
    this.seguis = data;
    this.totalp = this.seguis.length;
    this.cantrecp = this.seguis.filter(list => list.estado === 'RECIBIDO').length;
    this.cantderp = this.seguis.filter(list => list.estado === 'DERIVADO').length;
    this.cantenp = this.seguis.filter(list => list.estado === 'ENVIADO').length;
    this.cantfinp = this.seguis.filter(list => list.estado === 'MALETIN').length;
    this.totalarcp = this.seguis.filter(list => list.estado === 'ARCHIVADO').length;
   }, error => {
     console.log(error);
   })
  }
  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
      this.hojas = data.serverResponse;
      this.cantre = this.hojas.filter(list => list.estado === 'REGISTRADO').length;
      this.canten = this.hojas.filter(list => list.estado === 'ENVIADO').length;
      this.cantrec = this.hojas.filter(list => list.estado === 'RECIBIDO').length;
    }, error => {
      console.log(error);
    })
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40, 23, 43, 54, 24, 84 ],
        label: 'MAE',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90, 23, 43, 54, 24, 84  ],
        label: 'ADMINISTRACION',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400, 23, 43, 54, 24, 84  ],
        label: 'CONCEJO',

        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',

      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400, 23, 43, 54, 24, 84  ],
        label: 'RR.HH.',


      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400, 23, 43, 54, 24, 84  ],
        label: 'PLANIFICACION',


      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400, 23, 43, 54, 24, 84  ],
        label: 'DESARROLLO HUMANO',


      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400, 23, 43, 54, 24, 84  ],
        label: 'DESARROLLO ECONOMICO',
      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400, 23, 43, 54, 24, 84  ],
        label: 'INFRAESTRUCTURA',
      },


    ],
    labels: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },

    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chartL?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * 1000) + 1);
  }

  public randomizeL(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = PanelsComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClickedL({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHoveredL({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = PanelsComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[1].borderColor = 'green';
    this.lineChartData.datasets[1].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = [ '1st Line', '2nd Line' ];
    }

    this.chart?.update();
  }

  //--------------barras
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }

    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [

  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'MAE' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'ADMINISTRACION' },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'CONCEJO' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'RR.HH.' },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'PLANIFICACION' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'DESARROLLO HUMANO' },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'DESARROLLO ECONOMICO' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'INFRAESTRUCTURA' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40];

    this.chart?.update();
  }

  // Doughnut
  public doughnutChartLabels: string[] = [ 'MAE', 'ADMINISTRACION', 'CONCEJO', 'RR.HH.', 'PLANIFICACION', 'DESARROLLO HUMANO', 'DESARROLLO ECONOMICO','INFRAESTRUCTURA' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40,78] },

    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClickedD({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHoveredD({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  //torta

  @ViewChild(BaseChartDirective) chartt: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [  'MAE', 'ADMINISTRACION', 'CONCEJO', 'RR.HH.', 'PLANIFICACION', 'DESARROLLO HUMANO', 'DESARROLLO ECONOMICO','INFRAESTRUCTURA'],
    datasets: [ {
      data: [ 300, 500, 100, 34,56,86,87,56 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];




}
