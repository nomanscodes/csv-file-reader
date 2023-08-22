export function get_chart(kpData, xData) {

    let data = {
      options: {
        chart: {
          id: "basic-line"
        },
        xaxis: {
          categories: kpData
        }
      },
      series: [
        {
          name: "series-1",
          data: xData
        }
      ]

    }
    return data 
  }


  export function get_results(csv_data) {
    let data = {
      x_min: 0, x_max: 0,
      y_min: 0, y_max: 0,
      z_min: 0, z_max: 0,
    }
    let kpData = [];
    let xData = [];
    let yData = [];
    let zData = [];
    for (let i = 1; i < csv_data.length - 1; i++) {
      kpData.push(parseFloat(csv_data[i].KP));
      xData.push(parseFloat(csv_data[i].X));
      yData.push(parseFloat(csv_data[i].Y));
      zData.push(parseFloat(csv_data[i].Z));

    }
    data.x_min = Math.min(...xData); data.x_max = Math.max(...xData);
    data.y_min = Math.min(...yData); data.y_max = Math.max(...yData);
    data.z_min = Math.min(...zData); data.z_max = Math.max(...zData);

    
    return {data:data,kpData:kpData,xData:xData};

  }

