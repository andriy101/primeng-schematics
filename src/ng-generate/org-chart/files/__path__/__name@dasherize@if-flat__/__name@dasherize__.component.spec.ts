import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OrganizationChartModule } from 'primeng/organizationchart';
import { GrowlModule } from 'primeng/growl';

import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

describe('<%= classify(name) %>Component', () => {
  let component: <%= classify(name) %>Component;
  let fixture: ComponentFixture<<%= classify(name) %>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        NoopAnimationsModule, 
        OrganizationChartModule, 
        GrowlModule 
      ],
      declarations: [ <%= classify(name) %>Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(<%= classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // TODO: fails with 'Error: 1 timer(s) still in the queue.'
  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});