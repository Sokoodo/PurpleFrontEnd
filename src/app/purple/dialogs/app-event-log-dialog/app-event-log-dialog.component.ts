import { CdkTableDataSourceInput } from "@angular/cdk/table";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import FileSaver, { saveAs } from 'file-saver';
import { MatButtonModule } from "@angular/material/button";

export interface EventLogDialogData {
    width: string,
    data: any
}

@Component({
    selector: 'app-app-event-log-dialog',
    standalone: true,
    imports: [
        CommonModule, MatTableModule, MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './app-event-log-dialog.component.html',
    styleUrl: './app-event-log-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class EventLogDialogComponent implements OnInit {
    displayedColumns: string[] = ['caseId', 'eventName', 'timestamp', 'attributes'];
    dataSource: CdkTableDataSourceInput<any>;

    private data = inject(MAT_DIALOG_DATA);

    constructor(private dialogRef: MatDialogRef<EventLogDialogComponent>) {
        if (this.data && this.data.length > 0) {
            this.dataSource = new MatTableDataSource(this.data);
        } else {
            this.dataSource = [];
        }
    }

    ngOnInit(): void { }

    exportToCsv(): void {
        const csvContent = this.convertToCsv();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'event_log.csv');
    }

    private convertToCsv(): string {
        let csvContent = 'Case ID,Event Name,Timestamp,Attributes\n';
        this.data.forEach((row: any) => {
            csvContent += `${row.caseId},${row.eventName},${row.timestamp},${JSON.stringify(row.attributes)}\n`;
        });
        return csvContent;
    }

    exportToXls(): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'event_log');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}