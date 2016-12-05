import {Component} from '@angular/core'

@Component({
  selector: 'my-app',
  template: `<div>
    {{testName}}
    <table class="table table-striped latest-data">
        <tbody>
        <!-- Database -->
        <tr *ngFor="let db of databases; trackBy db?.dbname">
            <td class="dbname">
                {{db.dbname}}
            </td>
            <!-- Sample -->
            <td class="query-count">
            <span [className]="db.lastSample.countClassName">
              {{db.lastSample.nbQueries}}
            </span>
            </td>
            <!-- Query -->
            <td *ngFor="let q of db.lastSample.topFiveQueries" [className]="q.elapsedClassName">
                {{q.formatElapsed}}
                <div class="popover left">
                    <div class="popover-content">
                        {{q.query}}
                    </div>
                    <div class="arrow"></div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
`
})
export class App {
  databases: Array<any> = [];

  constructor() {
    var load = () => {
      this.databases = (<any>window).ENV.generateData(true).toArray();
      (<any>window).Monitoring.renderRate.ping();
      setTimeout(load, (<any>window).ENV.timeout);
    };
    load();
  }
}