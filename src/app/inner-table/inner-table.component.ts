import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-inner-table',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule,
    MatTableModule,
    MatExpansionModule  
  ],
  templateUrl: './inner-table.component.html',
  styleUrl: './inner-table.component.css'
})
export class InnerTableComponent {
  @Input() dataSource: any[] = [];
  @Input() columns: any[] = [];
  @Input() displayedColumns: any[]= [];
  nestedColumn = ['nested'];

}
