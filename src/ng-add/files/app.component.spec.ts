import { TestBed, async } from '@angular/core/testing';<% if (routing) { %>
import { RouterTestingModule } from '@angular/router/testing';<% } %>
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { BarChartComponent } from './dashboard/components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './dashboard/components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './dashboard/components/line-chart/line-chart.component';
import { PieChartComponent } from './dashboard/components/pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './dashboard/components/polar-area-chart/polar-area-chart.component';
import { RadarChartComponent } from './dashboard/components/radar-chart/radar-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenubarComponent } from './dashboard/components/menubar/menubar.component';
import { TableComponent } from './dashboard/components/table/table.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [<% if (routing) { %>
        RouterTestingModule,<% } %>
        NoopAnimationsModule,
        PanelModule,
        ChartModule,
        ToastModule,
        MenubarModule,
        TableModule
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
        BarChartComponent,
        DoughnutChartComponent,
        LineChartComponent,
        PieChartComponent,
        PolarAreaChartComponent, 
        RadarChartComponent,
        MenubarComponent,
        TableComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title '<%= name %>'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('<%= name %>');
  });
});