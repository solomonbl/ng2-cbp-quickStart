import { Injectable }   from '@angular/core';
import * as _           from 'lodash';
import { Observable }   from 'rxjs';

import { MockData }     from  './mock-data';

@Injectable()
export class MockServerService {
    constructor(private _mockData: MockData) {

    }

    public getHeaderData(): any {
        return this._mockData.headerJson;
    }

    public getTreeNodeData(): any {
        return this._mockData.treeNodeJson;
    }

    public getNflData(): any {
        return this._mockData.nflJson;
    }

    public getPayPeriodData(request: any): Observable<any> {
        const year = request.search.paramsMap.get('year')[0];
        const month = request.search.paramsMap.get('month')[0];

        return Observable.of(this._mockData.payPeriodJson[year][month]);
    }

    public getPayPeriodMonthData(): Observable<any> {
        return Observable.of(this._mockData.payPeriodMonthJson);
    }

    public getTableData(request: any): any {
        let query = JSON.parse(request); /* params --> limit -- offset -- pageCount -- page*/
        let header = _.clone(this._mockData.tableJson);

        if(query) {
            let offset = (query.limit * (query.page - 1));
            let data = _.slice<any>(header.data, offset, (offset + query.limit));
            header.data = _.map(data, item => {
                let nItem = _.clone(item);
                nItem.name = item.name.last + ', ' + item.name.first;
                return nItem;
            });
        }

        return header;
    }

    public getUserData(firstName: string, lastName: string, role: string): any[] {
        return this._mockData.userJson.filter(u => {
            return (firstName == null || u.firstName.toUpperCase().includes(firstName.toUpperCase())) &&
                (lastName == null || u.lastName.toUpperCase().includes(lastName.toUpperCase())) &&
                (role == null || u.role === role);
        });
    }
}
