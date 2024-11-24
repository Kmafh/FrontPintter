import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraDialogComponent } from './obra-dialog.component';

describe('ObraDialogComponent', () => {
  let component: ObraDialogComponent;
  let fixture: ComponentFixture<ObraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObraDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
