import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistrarComponent } from './formulario-registrar.component';

describe('FormularioRegistrarComponent', () => {
  let component: FormularioRegistrarComponent;
  let fixture: ComponentFixture<FormularioRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
