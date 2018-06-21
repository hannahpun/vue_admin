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
        label="Product List"
				width="200">
				<template slot-scope="scope">
					<div class="table-img">
              <img :src="scope.row.img" alt="">
							<p>{{ scope.row.name }}</p>
					</div>
				</template>
        </el-table-column>
        <el-table-column
        prop="origin"
        align="center"
        label="Origin">
        </el-table-column>
        <el-table-column 
        prop="discount"
				align="center"
        label="Discount"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
        prop="detail"
        label="Size">
        <template slot-scope="scope">
					<div v-for="(items, key, index) in scope.row.detail" :key="items.id" class="table-product">
						<p class="product-size">{{ items.size }}</p>
						<div class="product-color">
              <div class="product-detail" v-for="(item, key, index) in items.details" :key="item.id">
                <p>{{ item.color }}</p>
                <p>{{ item.stock }}</p>
              </div>
              
            </div>
						<div>
							<!-- <p>{{ item.num }}</p> -->
						</div>
					</div>
				</template>
        </el-table-column>
        <el-table-column 
				width="150"
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
					{ text: 'PUBLISH', value: 'publish' }, 
					{ text: 'UNPUBLISH', value: 'unpublish' }
        ]
      }
    },
    computed: {
        tableData(){
						let myData = [];
						// debugger
						let myTag = ['publish', 'unpublish'];
            for(let i=0 ;i<10;i++){
								let productPrice1 = this.$faker().commerce.price();
								let productPrice2 = this.$faker().commerce.price();
                myData.push({
                    img: `https://picsum.photos/50/50?image=${_.random(980, 1000)}`,
                    name: this.$faker().commerce.productName(),
                    origin: Math.floor(productPrice1),
                    discount: Math.floor(parseInt(productPrice1)*0.8),
                    detail: [{
                      size: 'L',
                      details: [{
                        color: 'Grey',
                        stock: 10
                      },{
                        color: 'Blue',
                        stock: 20
                      }]},{
                      size: 'M',
                      details: [{
                        color: 'Grey',
                        stock: 8
                      },{
                        color: 'Blue',
                        stock: 6
                      }]},{
                      size: 'S',
                      details: [{
                        color: 'Grey',
                        stock: 10
                      },{
                        color: 'Blue',
                        stock: 2
                      }]}],
										tag: myTag[Math.floor(Math.random() * myTag.length)],
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
  .table-img{
    display: flex;
    align-items: center;
    img{
      padding-right: 10px;
    }
  }
  .product-color{
    flex: 2;
  }
  .product-size{
    flex: 1;
  }
  .product-detail{
    display: flex;
        justify-content: space-around;
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
