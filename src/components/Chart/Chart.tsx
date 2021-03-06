import React from 'react';
import {Bar} from 'react-chartjs-2';
import './Chart.css'

interface IChartProps {
  text: string;
}

interface IDataObject {
  [key: string]: number;
}

const CHART_OPTIONS = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      stacked: true,
      gridLines: {
        offsetGridLines: true
      }
    }],
    yAxes: [{
      stacked: true
    }]
  },
  title:{
    display:true,
    text:'Characters Frequency of Encrypted Text',
    fontSize: 15,
  },
  legend: {
    display:true,
    position:'bottom'
  }
}

const Chart = (props: IChartProps) => (
  <div className="chart">
    <Bar
      data={getPrettyData(getCharFreq(props.text), props.text.length)}
      height={400}
      options={CHART_OPTIONS}
    />
  </div>
)

// Get frequency of chars in text for Chart
const getCharFreq = (text: string): IDataObject => {
  text = text.replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "")
    .replace(/[0-9]/g, ""); // remove all punctation and numbers
  text = text.split(' ').join(''); // remove spaces
  text = text.toLowerCase(); // all with small case
  const data: IDataObject = {};
  for (let i=0; i<text.length; i++) {
    let char = text[i];
    if (!(char in data)) {
      data[char] = 1;
    } else {
      data[char]++;
    }
  }
  return data
};

interface IDatasets {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface IPrettyData {
  labels: string[];
  datasets: IDatasets[];
}

const getPrettyData = (dirtyData: IDataObject, textLength: number) => {
  const prettyData: IPrettyData = {
    labels: [],
    datasets:[{
      label: 'Characters frequency',
      data: [],
      backgroundColor: '#00ebcb',
    }]
  };
  let $labels = [];
  for (let key in dirtyData) {
    $labels.push(key);
  }
  prettyData.datasets[0].data = $labels.map((key) => dirtyData[key]*100/textLength);
  prettyData.labels = $labels.sort();
  return prettyData
};

export default Chart;