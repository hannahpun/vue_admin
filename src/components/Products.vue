<template>
  <div>
		
    <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
				router
				:row-class-name="tableRowClassName"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column 
        type="selection">
        </el-table-column>
        <el-table-column
        prop="name"
        label="Customer">
        </el-table-column>
         <el-table-column
        label="Product List"
				width="160">
				<template slot-scope="scope">
					<div v-for="item in scope.row.product" :key="item.id" class="table-product">
						<div class="product-title">
							<p>{{ item.product }}</p>
							<p class="product-price">{{ item.price }}</p>
						</div>
						<div>
							<p>{{ item.num }}</p>
						</div>
					</div>
				</template>
        </el-table-column>
        <el-table-column 
        prop="total"
				align="center"
        label="Total"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
        prop="addCartTime"
        label="Add to Cart">
        </el-table-column>
        <el-table-column 
        prop="chackTime"
        label="Check-out">
        </el-table-column>
        <el-table-column 
        prop="address"
        label="Address">
        </el-table-column>
        <el-table-column 
				min-width="80"
				prop="tag"
				label="Status" :filters="statusOptions" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
						<el-select v-model="scope.row.tag">
							<el-option
								v-for="item in statusOptions"
								:key="item.value"
								:label="item.text"
								:value="item.value">
							</el-option>
					  </el-select>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
export default {
  data() {
    return {
				multipleSelection: [],
				statusOptions: [
					{ text: 'PAID', value: 'paid' }, 
					{ text: 'UNPAID', value: 'unpaid' }, 
					{ text: 'SHIPPING', value: 'shipping' }, 
					{ text: 'DONE', value: 'done' }
        ]      
      }
    },
    computed: {
        tableData(){
						let myData = [];
						// debugger
						let myTag = ['paid', 'unpaid', 'shipping', 'done'];
            for(let i=0 ;i<10;i++){
								let productPrice1 = this.$faker().commerce.price();
								let productPrice2 = this.$faker().commerce.price();
                myData.push({
                    name: this.$faker().commerce.productName(),
                    origin: productPrice1,
                    discount: productPrice1*0.8,
                    detail: [
                      {Grey: 10, Blue: 20},  //L
                      {Grey: 5, Blue: 30},  //M
                      {Grey: 8, Blue: 9},  //S
                    ],
                    addCartTime: this.$moment(this.$faker().date.past()).format("YYYY/M/D HH:m").toString(),
                    chackTime: this.$moment(this.$faker().date.past()).format("YYYY/M/D HH:m").toString(),
                    // product: this.$faker().commerce.product() + '\n'+  this.$faker().commerce.price(),
                    product: [
											{product: this.$faker().commerce.product(), price: "$" +productPrice1, num: 1}, 
											{product: this.$faker().commerce.product(), price: "$" +productPrice2, num: 1}
										],
										total: "$" + (parseInt(productPrice1) + parseInt(productPrice2)),
										tag: myTag[Math.floor(Math.random() * myTag.length)],
                    name: this.$faker().name.firstName(),
                    address: this.$faker().address.streetAddress() + ', \n'+ this.$faker().address.city()

                })
            }
            return myData
        }
    },
    methods: {
			tableRowClassName({row, rowIndex}) {
        return row.tag;
      },
			filterTab(txt){
				return _.contains(this.sellectTable, txt)
			},
      filterTag(value, row) {
        return row.tag === value;
			},
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.table-product{
		display: flex;
		padding-top: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #fff;
		align-items: center;
		justify-content: space-between;
		&:last-of-type{
			border-width: 0px;
		}
	}
	.filterSelect{
		width: 100%;
    display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.filterTab{
		margin-left: 10px;
	}
	.product-price{
		color: $grey-m;
	}


</style>
