import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

const MODULES = [MatCardModule, MatInputModule, MatRadioModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {}
