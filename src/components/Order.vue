<template>
  <div>
		
		<div class="filterSelect">
			<label class="subTitle">EDIT SECTION</label>
			<el-select 
			class="filterTab"
			v-model="sellectTable" 
			multiple
			collapse-tags
			placeholder="请选择" >
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.text"
				:value="item.value">
			</el-option>
		</el-select>
		</div>
		
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
        <el-table-column  v-if="filterTab('orderId')"
        prop="orderId"
        label="Order List">
        </el-table-column>
        <el-table-column  v-if="filterTab('name')"
        prop="name"
        label="Customer">
        </el-table-column>
         <el-table-column v-if="filterTab('product')"
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
        <el-table-column v-if="filterTab('total')"
        prop="total"
				align="center"
        label="Total"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column v-if="filterTab('addCartTime')"
        prop="addCartTime"
        label="Add to Cart">
        </el-table-column>
        <el-table-column  v-if="filterTab('chackTime')"
        prop="chackTime"
        label="Check-out">
        </el-table-column>
        <el-table-column  v-if="filterTab('address')"
        prop="address"
        label="Address">
        </el-table-column>
        <el-table-column  v-if="filterTab('phone')"
        prop="phone"
        label="Phone">
        </el-table-column>
        <el-table-column  v-if="filterTab('email')"
        prop="email"
        label="Email">
        </el-table-column>
        <el-table-column  v-if="filterTab('tag')"
				prop="tag" label="Status" :filters="[{ text: 'Paid', value: 'paid' }, { text: 'Unpaid', value: 'unpaid' }, { text: 'Shipping', value: 'shipping' }, { text: 'Done', value: 'done' }]" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.tag}}</el-tag>
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
				options: [
					{ text: 'addCartTime', value: 'addCartTime' }, 
					{ text: 'chackTime', value: 'chackTime' }, 
					{ text: 'product', value: 'product' }, 
					{ text: 'total', value: 'total' },
					{ text: 'orderId', value: 'orderId' },
					{ text: 'tag', value: 'tag' },
					{ text: 'name', value: 'name' },
					{ text: 'phone', value: 'phone' },
					{ text: 'email', value: 'email' },
					{ text: 'address', value: 'address' },
				],
				sellectTable: ["name", "product", "total", "addCartTime", "chackTime", "address", "tag"]
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
                    addCartTime: this.$moment(this.$faker().date.past()).format("YYYY/M/D HH:m").toString(),
                    chackTime: this.$moment(this.$faker().date.past()).format("YYYY/M/D HH:m").toString(),
                    // product: this.$faker().commerce.product() + '\n'+  this.$faker().commerce.price(),
                    product: [
											{product: this.$faker().commerce.product(), price: "$" +productPrice1, num: 1}, 
											{product: this.$faker().commerce.product(), price: "$" +productPrice2, num: 1}
										],
										total: "$" + (parseInt(productPrice1) + parseInt(productPrice2)),
										orderId: i,
										tag: myTag[Math.floor(Math.random() * myTag.length)],
                    name: this.$faker().name.firstName(),
                    phone: this.$faker().phone.phoneNumberFormat(),
                    email: this.$faker().internet.email(),
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

	//status
	.done td .cell{
		text-decoration: line-through;
	}
</style>
