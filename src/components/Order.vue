<template>
  <div class="hello">
    <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
        type="selection">
        </el-table-column>
        <el-table-column
        prop="orderId"
        label="Order List">
        </el-table-column>
        <el-table-column
        prop="name"
        label="Customer">
        </el-table-column>
         <el-table-column
        prop="product"
        label="Product List">
        </el-table-column>
        <el-table-column
        prop="total"
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
        prop="phone"
        label="Phone">
        </el-table-column>
        <el-table-column
        prop="email"
        label="Email">
        </el-table-column>
        <el-table-column prop="tag" label="标签"  :filters="[{ text: 'Paid', value: 'paid' }, { text: 'Unpaid', value: 'unpaid' }, { text: 'Shipping', value: 'shipping' }, { text: 'Done', value: 'done' }]" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag  disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        multipleSelection: []
      }
    },
    computed: {
        tableData(){
						let myData = [];
						// debugger
						let myTag = ['paid', 'unpaid', 'shipping', 'done'];
            for(let i=0 ;i<10;i++){
                myData.push({
                    addCartTime: this.$faker().date.past().toString(),
                    chackTime: this.$faker().date.past().toString(),
                    product: this.$faker().commerce.product() + this.$faker().commerce.price(),
										orderId: i,
										tag: myTag[Math.floor(Math.random() * myTag.length)],
                    name: this.$faker().name.firstName(),
                    phone: this.$faker().phone.phoneNumberFormat(),
                    email: this.$faker().internet.email(),
                    address: this.$faker().address.streetAddress() + ', '+ this.$faker().address.city()

                })
            }
            return myData
        }
    },
    methods: {
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

</style>
