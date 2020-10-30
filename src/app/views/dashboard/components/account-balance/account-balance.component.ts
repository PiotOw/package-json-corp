import {Component, OnInit} from '@angular/core';
import {ChartOptions} from '../../../../domain/balance/models/chart-options';
import {mockBalance} from '../../../../domain/balance/mocks/mock-balance';


@Component({
    selector: 'jsn-account-balance',
    templateUrl: './account-balance.component.html',
    styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
    public chartOptions: Partial<ChartOptions>;

    accountBalance = mockBalance;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: 'Balance',
                    data: this.accountBalance
                }
            ],
            chart: {
                height: 350,
                type: 'radar',
                toolbar: {
                    show: false
                }
            },
            title: {
                text: '',
            },
            xaxis: {
                categories: ['Cash on Delivery', 'Ref links', 'Online Payments', 'Returns']
            },
            fill: {
                opacity: 0.5,
                colors: ['#3febbd']
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['#3febbd'],
                dashArray: 0
            },
            markers: {
                size: 0,
                strokeWidth: 0,
                radius: 0
            },
            yaxis: {
                tickAmount: 4,
                min: 0,
                max: Math.ceil(Math.max.apply(null, this.accountBalance) / 100) * 100,
                labels: {
                    formatter: (value) => {
                        return '$' + value;
                    }

                }
            },
            tooltip: {
                enabled: false
            },
        };
    }

    ngOnInit() {
    }

    totalBalance(): number {
        let sum = 0;
        this.accountBalance.forEach(b => {
            sum += b;
        });
        return sum;
    }


}
