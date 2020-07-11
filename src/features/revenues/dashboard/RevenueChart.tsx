import React, { useContext, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LineChart from '../../../app/common/chart/LineChart';
import { IIncome } from '../../../app/models/income';
import { IRevenue } from '../../../app/models/revenue';

//pass down props from parent
interface IProps {
  statisticsType: string;
}

const RevenueChart: React.FC<IProps> = ({ statisticsType }) => {
  const rootStore = useContext(RootStoreContext);
  const { revenueRegistry, predicate } = rootStore.revenueStore;
  const { productOptionsRegistry } = rootStore.orderOptions;
  const lstRevenue: IRevenue[] = Array.from(revenueRegistry.values());

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
      {lstRevenue.forEach((revenue) => {
        tempLabels.push(`${revenue.month}-${revenue.year}`);
        if (statisticsType === 'Revenue') {
          tempData.push(revenue.totalRevenue);
          tempP_Data.push(revenue.productRevenue);
        } else if (statisticsType === 'Quantity') {
          tempData.push(revenue.totalQuantity);
          tempP_Data.push(revenue.productQuantity);
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

export default observer(RevenueChart);
