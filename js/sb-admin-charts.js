// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
var labelsforcathedral=[];
var pointspercatheddrals =[];
var labelsperAvearageDate=[];
var valuesperAvarageDate = [];
var colorsRegions = [];
var visitLabels = [];
var visitsValue = [];
var regionsLabels =[];
var regionsvalues = [];
var monthes = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];



// -- Area Chart Example
$.get( "http://localhost:3000/getPointsPerDate")
    .done(function( data ) {	 	
       
      for(var i =0; i<data.length;i++){
        labelsperAvearageDate.push(monthes[data[i]._id.month-1]+" "+data[i]._id.day);
        valuesperAvarageDate.push(Math.round(data[i].averageQuantity))
      }

      var ctx = document.getElementById("myAreaChart");
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          //labels: ["Травень 8", "Травень 9", "Травень 10", "Травень 11", "Травень 12", "Травень 13", "Травень 14", "Травень 15", "Травень 16", "Травень 17", "Травень 18", "Травень 19", "Травень 20"],
          labels:labelsperAvearageDate,
          datasets: [{
            label: "Значення",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 20,
            pointBorderWidth: 2,
           // data: [5, 25, 23, 22, 20, 26, 27, 28, 24, 21, 30, 40, 44],
           data:valuesperAvarageDate
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 50,
                maxTicksLimit: 5
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });



    });


    $.get("http://localhost:3000/getRegions")
    .done(function(data){

      for(var i =0;i< data.length; i++){
      regionsLabels.push(data[i].name);
      regionsvalues.push(data[i].avarage);
      colorsRegions.push(data[i].color);
      }
      var ctx = document.getElementById("regionsChart");
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
        //  labels: ["програмних систем і технологій", "Технологій Управління", "Інформаційних систем", "Мереживих та інтернет технологій"],
        labels:regionsLabels,
          datasets: [{
            data: regionsvalues,
            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745','#e83e8c','#6f42c1'],
          }],
        },
      }); 



    })
    $.get( "http://localhost:3000/getVisitsPerMonth")
    .done(function( data ) {
    //  - Bar Chart Example
    for(var i =0; i < data.length;i++){
      visitLabels.push(monthes[data[i]._id.month-1])
      visitsValue.push(data[i].totalVaulePerGroup);
    }
      var ctx = document.getElementById("myBarChart");
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
         // labels: ["Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень"],
         labels :visitLabels,
          datasets: [{
            label: "Відвідувансть к-сть",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
           // data: [670, 800, 1000, 1300, 1500, 1200],
           data : visitsValue
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'month'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 6
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 3000,
                maxTicksLimit: 5
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });	 	  
    });

    $.get( "http://localhost:3000/getInterestOfCatherdral")
    .done(function( data ) {
     for(var i = 0;i< data.length; i++)	{
      labelsforcathedral.push(data[i].name);
      pointspercatheddrals.push(data[i].avarage);
     }
     var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
  //  labels: ["програмних систем і технологій", "Технологій Управління", "Інформаційних систем", "Мереживих та інтернет технологій"],
  labels:labelsforcathedral,
    datasets: [{
      data: pointspercatheddrals,
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745','#e83e8c','#6f42c1'],
    }],
  },
}); 	  
    });


// -
// -- Pie Chart Example

