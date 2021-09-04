import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventLog } from 'src/app/core/models/event-logs/event-log';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { EventLogDetailsComponent } from './components/event-log-details/event-log-details.component';
import { EventLogParams } from './models/eventLogParams';
import { EventLogService } from './services/event-log.service';
@Component({
  selector: 'app-event-logs',
  templateUrl: './event-logs.component.html',
  styleUrls: ['./event-logs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EventLogsComponent implements OnInit {
  eventLogs: PaginatedResult<EventLog>;
  eventLogColumns: TableColumn[];
  eventLogParams = new EventLogParams();
  dataSource = new MatTableDataSource<EventLog>([]);
  searchString: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventLogService: EventLogService, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEventLogs();
    this.initColumns();
  }
  initColumns(): void {
    this.eventLogColumns = [
      { name: 'Event', dataKey: 'messageType', isSortable: true, isShowable: true },
      { name: 'Description', dataKey: 'eventDescription', isSortable: true, isShowable: true },
      { name: 'Invoked By', dataKey: 'email', isSortable: true, isShowable: true },
      { name: 'Time Stamp', dataKey: 'timestamp', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  public reload(): void {
    this.searchString = this.eventLogParams.searchString = '';
    this.eventLogParams.pageNumber = 0;
    this.eventLogParams.pageSize = 0;
    this.getEventLogs();
  }
  getEventLogs(): void {
    this.eventLogService.getEventLogs(this.eventLogParams).subscribe((result) => {
      this.eventLogs = result;
      this.dataSource.data = this.eventLogs.data.filter(data => (data.timestamp = this.datePipe.transform(data.timestamp, 'MM/dd/yyyy hh:mm:ss a', data.messageType = data.messageType.replace(/([A-Z])/g, ' $1').replace('Event', '').trim())));
    });
  }
  handlePageChange(event: PaginatedFilter): void {
    this.eventLogParams.pageNumber = event.pageNumber;
    this.eventLogParams.pageSize = event.pageSize;
    this.getEventLogs();
  }
  doSort(sort: Sort): void {
    this.eventLogParams.orderBy = sort.active + ' ' + sort.direction;
    this.getEventLogs();
  }

  public filter($event: string): void {

    this.eventLogParams.searchString = $event.trim().toLocaleLowerCase();
    this.eventLogParams.pageNumber = 0;
    this.eventLogParams.pageSize = 0;
    console.log(this.eventLogParams);
    this.getEventLogs();
  }
  viewDetails(log?: EventLog): void {
    const dialogRef = this.dialog.open(EventLogDetailsComponent, {
      data: log
    });
  }
}
