import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule, MatTable } from '@angular/material/table';
import { InnerTableComponent } from './inner-table/inner-table.component';
import { GetDataService } from './get-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatExpansionModule,  
    MatCheckboxModule,
    MatChipsModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    InnerTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'angularMaterialTableDemoApp';
  dataSource: any[] = [];
  rowData: any[] = []; // rowData
  columns = [
    {
      columnDef: 'vin',
      header: 'vin',
      cell: (element: any) => `${element.vin}`,
    },
    {
      columnDef: 'brand',
      header: 'Brand',
      cell: (element: any) => `${element.brand}`,
    },
    {
      columnDef: 'year',
      header: 'year',
      cell: (element: any) => `${element.year}`,
    },
    {
      columnDef: 'color',
      header: 'color',
      cell: (element: any) => `${element.color}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  allColumns: string[] = this.columns.map(c => c.columnDef);
  nestedColumn = ['nested'];
  groupByColumns: string[] = ['color', 'brand'];

  dataServiceSub!: Subscription;

  @ViewChild('table', {static: true}) table!: MatTable<any>;

  constructor(private dataService: GetDataService){
    this.dataServiceSub = this.dataService.getData().subscribe({
      next: (data)=>{
        console.log(data);
        this.rowData = data.data?? [];
        if(this.rowData.length){
          this.reArrangeTable();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });   
  }
  
  ngOnInit() {   
  }

  reArrangeTable(){
    this.dataSource = this.groupByAll(this.rowData, 0, this.groupByColumns); 
    this.displayedColumns = this.allColumns.filter((dCol) => !this.groupByColumns.includes(dCol));
  }

  onDrop(event: any) {
    console.log('div', event);
    let droppedColumn = event.item.data;   
    if (!this.groupByColumns.includes(droppedColumn)) {
      this.groupByColumns.push(droppedColumn);
      this.reArrangeTable();
    }
  }

  onDropRow(event: any){
    console.log('on row drop', event);
    const previousIndex = this.dataSource.findIndex(d => d === event.item.data);
    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();
  }


  removeColumn(column: string) {
    const index = this.groupByColumns.indexOf(column);
    if (index >= 0) {
      this.groupByColumns.splice(index, 1);
      this.reArrangeTable();
    }
  }

  groupByAll(arr: any[], level: number, groupByColumns: string[]): any[]{
    if(groupByColumns.length === 0){
        return arr;
    }
    let property = groupByColumns[0];  
    let children: any[] = arr.reduce((previous, value)=>{
        previous[value[property]] = previous[value[property]] ? [...previous[value[property]], value] : [value];
        return previous;
      }, {});
      
      const res = Object.entries(children).map(([label, options]) =>  ({
            label,
            isGroup: true,
            level: level,
            groupByProperty: property,
            propertyValue:  label,
            children: this.groupByAll(options, level + 1, groupByColumns.filter(val => val !== property))
          }))     
      return res;   
       
  }

  ngOnDestroy(){
    this.dataServiceSub.unsubscribe();
  }
  
}
