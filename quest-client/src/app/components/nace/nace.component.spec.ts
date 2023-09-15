import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NaceComponent } from './nace.component';

describe('DashboardComponent', () => {
  let component: NaceComponent;
  let fixture: ComponentFixture<NaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
