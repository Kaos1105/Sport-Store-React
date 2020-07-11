import React, { useContext, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LineChart from '../../../app/common/chart/LineChart';
import { IIncome } from '../../../app/models/income';

//pass down props from parent
interface IProps {
  statisticsType: string;
}

const IncomeChart: React.FC<IProps> = ({ statisticsType }) => {
  const rootStore = useContext(RootStoreContext);
  const { incomeRegistry, predicate } = rootStore.incomeStore;
  const { productOptionsRegistry } = rootStore.orderOptions;
  const lstIncome: IIncome[] = Array.from(incomeRegistry.values());

  //   const [labels, setLabels] = useState<string[]>([]);
  //   const [data, setData] = useState<number[]>([]);
  //   const [p_data, setP_Data] = useState<number[]>([]);

  var tempLabels: string[] = [];
  var tempData: number[] = [];
  var tempP_Data: number[] = [];

  var p_name =
    productOptionsRegistry.find((element) => element.key == predicate.get('id'))?.text || 'Product';

  //Line data sample
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //const data = [70, 30, 20, 90, 70, 80, 200];
  //const p_data = [65, 0, 80, 81, 56, 55, 40];

  return (
    <Fragment>
      {lstIncome.forEach((income) => {
        tempLabels.push(`${income.month}-${income.year}`);
        if (statisticsType === 'Income') {
          tempData.push(income.totalIncome);
          tempP_Data.push(income.productIncome);
        } else if (statisticsType === 'Cost') {
          tempData.push(income.totalCost);
          tempP_Data.push(income.productCost);
        }
      })}
      <Grid centered>
        <Grid.Column width='12'>
          {' '}
          <LineChart
            labels={tempLabels}
            label='Total'
            p_label={p_name}
            text={statisticsType + ' chart'}
            data={tempData}
            p_data={tempP_Data}
          />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(IncomeChart);
