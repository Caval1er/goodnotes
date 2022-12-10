<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-form :model="tableData" :rules="tableData.Rules" ref="tableData">
            <el-row>
              <el-table :data="tableData.data" border style="width: 100%">
                <el-table-column prop="date" label="时间" align="center">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="工作时长(hr)"
                  prop="workTime"
                >
                  <!--
                 scope的其他使用方法
                 <template slot-scope="scope">
                   {{scope.row.workTime}}
                  </template>
                -->
                </el-table-column>
                <el-table-column prop="aBox" align="center" label="A仓库">
                </el-table-column>
                <el-table-column prop="bBox" align="center" label="B仓库">
                </el-table-column>

                <el-table-column align="center" label="A仓库人数">
                  <template #default="scope">
                    <el-form-item
                      :rules="tableData.Rules.Ack"
                      :prop="'data.' + scope.$index + '.Ack'"
                    >
                      <el-input size="small"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="B仓库人数">
                  <template #default="scope">
                    <el-form-item
                      :rules="tableData.Rules.Bck"
                      :prop="'data.' + scope.$index + '.Bck'"
                    >
                      <el-input v-model="scope.row.Bck" size="small"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-form>
          <el-row>
            <el-button size="small" type="danger" @click="ScheduleBudget()"
              >发送</el-button
            >
          </el-row>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        data: [
          {
            date: '2022/04/02',
            workTime: '8',
            aBox: '200台',
            bBox: '158台',
          },
        ],
        Rules: {
          Ack: [{ required: true, message: '必填', trigger: 'blur' }],
          Bck: [{ required: true, message: '必填', trigger: 'blur' }],
        },
      },
    }
  },
  methods: {
    ScheduleBudget() {
      this.$refs['tableData'].validate((a, b, c) => {
        if (a) {
          console.log(a, b, c)
        } else {
          console.log(a, b, c)
          return false
        }
      })
    },
  },
}
</script>
<style scoped></style>
