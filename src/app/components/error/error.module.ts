import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error-routing.module';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, ErrorRoutingModule, MatIconModule],
  declarations: [ErrorComponent],
})
export class ErrorModule {}
