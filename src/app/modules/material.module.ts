import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

const MODULES = [MatCardModule, MatInputModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {}
