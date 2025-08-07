import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteOrder } from './note-order';

describe('NoteOrder', () => {
  let component: NoteOrder;
  let fixture: ComponentFixture<NoteOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
