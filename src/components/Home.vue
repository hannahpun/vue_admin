<template>
  <div>
		<canvas id="myChart" width="400" height="100"></canvas>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
import Chart from 'chart.js';
export default {
  data() {
    return {
        fakeRevenue: [],
        fakeCost: [],
        fakeDate: []
    }
  },
  created () {
      console.log(this.$moment())
    // push fake data
    for(let i = 0; i <=30; i++ ){
        this.fakeRevenue.push(_.random(45000, 55000))
        this.fakeCost.push(_.random(35000, 45000))
    }
  },
  mounted () {    
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: 'Revenu',
                data: this.fakeRevenue.slice(0,6),
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    '#7ED321'
                ],
                borderWidth: 2
            },{
                label: '# of Votes',
                data: this.fakeCost.slice(0,6),
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    '#4A90E2'
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
    console.log('hannah')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	

</style>
