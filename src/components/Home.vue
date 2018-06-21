<template>
	<div>
		<div class="filter-header">
			<h1>OVERVIEW</h1>
			<div class="filter-date">
				<div class="note-date">
					<p>{{$moment().subtract(selectDate, 'days').format("YYYY/MM/DD")}}</p>
					<i class="el-icon-caret-right"></i>
					<p>{{$moment().format("YYYY/MM/DD")}}</p>
				</div>
				<el-select v-model="filterDate" @change="FilterDate(filterDate)" placeholder="请选择">
					<el-option
						v-for="item in dateOptions"
						:key="item.id"
						:label="item"
						:value="item">
					</el-option>
				</el-select>
			</div>
		
		</div>
		<div class="total-price">
			<div class="price-box box">
				<h3>Total Revenue</h3>
				<p class="price green">{{myR | currency}}</p>
			</div>
			<div class="price-box box">
				<h3>Total Cost</h3>
				<p class="price red">{{myC | currency}}</p>
			</div>
			<div class="price-box box">
				<h3>Total Income</h3>
				<p class="price blue">{{myR - myC | currency}}</p>
			</div>
		</div>
    <div class="box">
			<h1>Activity</h1>
			<canvas id="myChart" width="400" height="100"></canvas>
		</div>
		<div class="summery-footer">
			<div class="box">
				<h1>Transaction Website</h1>
				<div class="summery-content">
					<p class="name">Facebook.com</p>
					<p class="number">45,836</p>
					<p class="increase"><i class="el-icon-back"></i>20%</p>
				</div>
				<div class="summery-content">
					<p class="name">Google.com</p>
					<p class="number">23,582</p>
					<p class="increase"><i class="el-icon-back"></i>18%</p>
				</div>
				<div class="summery-content">
					<p class="name">Shopify.com</p>
					<p class="number">2,489</p>
					<p class="increase"><i class="el-icon-back"></i>10%</p>
				</div>
				<div class="summery-content">
					<p class="name">Wordpress.com</p>
					<p class="number">1,057</p>
					<p class="increase"><i class="el-icon-back"></i>30%</p>
				</div>
			</div>
			<div class="box">
				<h1>Latest Orders</h1>
			</div>
		</div>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
import Chart from 'chart.js'
import Vue from "vue"

Vue.filter('currency', function (value) {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
});

export default {
  data() {
    return {
        fakeRevenue: [],
        fakeCost: [],
        fakeIncome: [],
        fakeDate: [],
				selectDate: 6,
				filterDate: 'Weekly',
				dateOptions: ['Weekly', 'Monthly'],
				totalR: 0,
				totalC: 0,
				totalRWeek: 0,
				totalCWeek: 0
    }
  },
  created () {
    //   console.log(this.$moment().subtract(10, 'days'))
    // push fake data
    for(let i = 0; i <=30; i++ ){
        let random1 = _.random(3000, 8000);
				let random2 = _.random(100, 3000);
				this.totalR += random1;
				this.totalC += random2
				if(i<=6){
					this.totalRWeek += random1;
					this.totalCWeek += random2
				}
        this.fakeRevenue.push(random1)
        this.fakeCost.push(random2)
        this.fakeIncome.push(random1 - random2)
        this.fakeDate.push(this.$moment().subtract(30 - i, 'days').format("DD MMM"))
    }
  },
  mounted () {    
    this.FilterDate('Weekly')
	},
	computed: {
		myR (){
			return this.filterDate=='Weekly' ? this.totalRWeek : this.totalR
		},
		myC () {
			return this.filterDate=='Weekly' ? this.totalCWeek : this.totalC
		}
	},
	methods: {
		FilterDate (value) {
			if(value=='Weekly'){this.selectDate = 6}
			else{this.selectDate = 30}
			var ctx = document.getElementById("myChart");
    	var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.fakeDate.slice(31 - this.selectDate,31),
            datasets: [{
                label: 'Revenue',
                data: this.fakeRevenue.slice(31 - this.selectDate,31),
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    '#7ED321'
                ],
                borderWidth: 2
            },{
                label: 'Cost',
                data: this.fakeCost.slice(31 - this.selectDate,31),
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    '#D0021B'
                ],
                borderWidth: 2
            },{
                label: 'Income',
                data: this.fakeIncome.slice(31 - this.selectDate,31),
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    '#4A90E2 '
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.filter-header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}
	.filter-date{
		display: flex;
		align-items: center;
	}
	.note-date{
		margin-right: 15px;
		display: flex;
		color: $grey-l;
		p{
			padding: 0 5px;
		}
	}
	.total-price{
		display: flex;
	}
	.box{
		padding: 30px;
		box-shadow: 0 0 10px 1px #EBEBEB;
		border-radius: 3px;
		margin-top: 20px;
	}
	.price-box{
		flex: 1;
		text-align: center;
		margin: 0 10px;
		&:first-of-type{
			margin-left: 0;
		}
		&:last-of-type{
			margin-right: 0;
		}
		.price{
			padding-top: 15px;
			font-size: 36px;
			font-weight: bold;
		}
	}
	.green{
		color: $green;
	}
	.red{
		color: $red;
	}
	.blue{
		color: $blue;
	}
	.summery-footer{
		display: flex;
		h1{
			margin-bottom: 20px;
		}
		.box{
			flex: 1;
			margin: 20px 10px;
			&:first-of-type{
				margin-left: 0;
			}
			&:last-of-type{
				margin-right: 0;
			}
			
		}
		.summery-content{
			display: flex;
			align-items: center;
			border-bottom: 1px solid $grey;
			padding: 20px 0;
			// margin-bottom: 10px;
		}
		.name{
			font-size: 16px;
			color: $grey-l;
			flex: 3;
		}
		.number{
			font-size: 20px;
			flex: 1;
		}
		.increase{
			font-size: 16px;
			color: $green;
			.el-icon-back{
				transform: rotate(90deg);
			}
		}
	}
</style>
