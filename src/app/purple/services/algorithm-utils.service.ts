import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { EventLogDialogComponent } from '../dialogs/app-event-log-dialog/app-event-log-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AlgorithmUtilsService {

    dialog = inject(MatDialog);

    isBpmnFile(filename: string): boolean {
        return filename.endsWith('.bpmn') || filename.endsWith('.pnml') || filename.endsWith('.xml');
    }

    formatLabel(value: number): string {
        if (value >= 1) {
            return Math.round(value / 1) + '%';
        }
        return `${value}`;
    }

    flattenEventLog(eventLog: any): { caseId: any; eventName: any; timestamp: any; }[] {
        let flattened: { caseId: any; eventName: any; timestamp: any; }[] = [];
        let caseIdCounter = 1;

        if (Array.isArray(eventLog)) {
            eventLog.forEach(trace => {
                let caseId = caseIdCounter++;
                trace.events.forEach((event: any) => {
                    flattened.push({
                        caseId: caseId,
                        eventName: event['concept:name'],
                        timestamp: event['time:timestamp']
                    });
                });
            });
        }
        return flattened;
    }



    openDialog(data: any): void {
        this.dialog.open(EventLogDialogComponent, {
            width: '85%',
            data: data
        });
    }
}