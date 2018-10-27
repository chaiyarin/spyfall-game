import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterRoomComponent } from './creater-room.component';

describe('CreaterRoomComponent', () => {
  let component: CreaterRoomComponent;
  let fixture: ComponentFixture<CreaterRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
