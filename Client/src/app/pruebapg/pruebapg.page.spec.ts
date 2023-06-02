import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebapgPage } from './pruebapg.page';

describe('PruebapgPage', () => {
  let component: PruebapgPage;
  let fixture: ComponentFixture<PruebapgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PruebapgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
