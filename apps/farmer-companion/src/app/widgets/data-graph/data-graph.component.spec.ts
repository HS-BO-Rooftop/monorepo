import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGraphComponent } from './data-graph.component';

describe('DataGraphComponent', () => {
  let component: DataGraphComponent;
  let fixture: ComponentFixture<DataGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
