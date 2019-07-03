import { ChartService } from './../chart.service';
import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
@Component({
  selector: 'app-chart-statistic',
  templateUrl: './chart-statistic.component.html',
  styleUrls: ['./chart-statistic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartStatisticComponent implements OnInit {
 products:any = [];
  barChartData={};
  chart:Chart= {};
  canvas: any;
  ctx: any;
  typeSearch:any;
  formSearch:any;
  constructor(private chartService:ChartService) { }

  ngOnInit() {
   
  }

  loadChart(){
    this.formSearch= {
      "idPartner":1,
      "fromdate":"2019-05-01",
      "todate":"2019-06-20"
    }; 
    this.chartService.getProduct(this.formSearch).subscribe((response: any) => {
      this.products = response.data;
      this.buildChart();
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data:this.barChartData,
        options: {}
      });
    });
  }

  
  ngAfterViewInit() {
    this.loadChart();
  }
  
  handleChange(type){
    var currentDate =  moment();
    var oldDate;
    if(type === 'month'){
      oldDate = moment().subtract(1,'months');
    }
    else{
      oldDate = moment().subtract(3,'months');
    }
    this.formSearch={
      "idPartner":1,
      "fromdate": oldDate.format('YYYY-MM-DD'),
      "todate":currentDate.format('YYYY-MM-DD')
    }
    this.chartService.getProduct(this.formSearch).subscribe((response: any) => {
      this.products = response.data;
      this.buildChart();
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      // this.chart = new Chart(this.ctx, {
      //   type: 'bar',
      //   data:this.barChartData,
      //   options: {}
      // });
      this.chart.data = this.barChartData;
      this.chart.update();
    });
  }
  prePareDataApi(){
    this.products = [
      {
          "productId": 38,
          "code": "HzKiKmgP",
          "name": "Test12333",
          "productQuantity": 488,
          "numberWeight": 10,
          "totalProductPrice": 188,
          "totalProductSale": 3459,
          "priceIn": 50000
      },
      {
          "productId": 23,
          "code": "5uIKCipD",
          "name": "Banh ran",
          "productQuantity": 1929,
          "numberWeight": 10,
          "totalProductPrice": 488,
          "totalProductSale": 2368,
          "priceIn": 100
      }
  ];
  }

  buildChart(){
    let labels = this.getAllLabel();
    let productQuantity = this.getProductQuantity();
    let totalProductPrice = this.getTotalProductPrice();
    let totalProductSale = this.getTotalProductSale();
    let datasets = this.setUpColumn(productQuantity,totalProductPrice,totalProductSale);
    this.barChartData = {
      labels:labels,
      datasets:datasets
    }
  }

  getAllLabel(){
    return this.products.map((product)=>{
      return product.productId;
    });
  }

  getProductQuantity(){
    return this.products.map((product)=>{
      return product.productQuantity;
    });
  }

  getTotalProductPrice(){
    return this.products.map((product)=>{
      return product.totalProductPrice;
    });
  }

  getTotalProductSale(){
    return this.products.map((product)=>{
      return product.totalProductSale;
    });
  }

  setUpColumn(productQuantity,totalProductPrice,totalProductSale){
    //Set up column
    let datasets= [
      {
        label: "Số Lượng",
        backgroundColor: "pink",
        borderColor: "red",
        borderWidth: 1,
        data: productQuantity
      },
      {
        label: "Doanh Thu",
        backgroundColor: "lightblue",
        borderColor: "blue",
        borderWidth: 1,
        data: totalProductPrice
      },
      {
        label: "Sản Phẩm ĐB",
        backgroundColor: "lightgreen",
        borderColor: "green",
        borderWidth: 1,
        data: totalProductSale
      },
    ]
    return datasets;
  }

  
}
