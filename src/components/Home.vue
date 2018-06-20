<template>
  <div>
		<canvas id="myChart" width="400" height="400"></canvas>
    sss
  </div>
</template>

<script>
import {_} from 'vue-underscore'
import Chart from 'chart.js';
export default {
  data() {
    return {

    }
  },
  mounted () {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            },{
                label: '# of Votes',
                data: [1, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
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
