/*=========================================================================================
    File Name: dashboard-analytics.js
    Description: dashboard analytics page content with Apexchart Examples
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(window).on("load", function () {
  var urlBase = base_url;
  var $primary = '#7367F0';
  var $danger = '#EA5455';
  var $warning = '#FF9F43';
  var $info = '#0DCCE1';
  var $primary_light = '#8F80F9';
  var $warning_light = '#FFC085';
  var $danger_light = '#f29292';
  var $info_light = '#1edec5';
  var $strok_color = '#b9c3cd';
  var $label_color = '#e7eef7';
  var $white = '#fff';

  //packages ajax function start
  var total_packages = [];
  

  // Subscribers Gained Chart starts //
  // ----------------------------------

  var gainedChartoptions = {
    chart: {
      height: 100,
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
    },
    colors: [$primary],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },
    series: [{
      name: 'Subscribers',
      data: [28, 40, 36, 52, 38, 60, 55]
    }],

    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      }
    },
    yaxis: [{
      y: 0,
      offsetX: 0,
      offsetY: 0,
      padding: { left: 0, right: 0 },
    }],
    tooltip: {
      x: { show: false }
    },
  }

  var gainedChart = new ApexCharts(
    document.querySelector("#subscribe-gain-chart"),
    gainedChartoptions
  );

  gainedChart.render();

  // Subscribers Gained Chart ends //



  // Orders Received Chart starts //
  // ----------------------------------
  

  var orderChartoptions = {
    chart: {
      height: 100,
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
    },
    colors: [$warning],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },
    series: [{
      name: 'Orders',
      data: [28, 40, 36, 52, 38, 60, 55]
    }
    ],

    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      }
    },
    yaxis: [{
      y: 0,
      offsetX: 0,
      offsetY: 0,
      padding: { left: 0, right: 0 },
    }],
    tooltip: {
      x: { show: false }
    },
  }

  var orderChart = new ApexCharts(
    document.querySelector("#orders-received-chart"),
    orderChartoptions
  );

  orderChart.render();


  // Orders Received Chart ends //



  // Avg Session Chart Starts
  // ----------------------------------

  var sessionChartoptions = {
    chart: {
      id: "chart2",
      type: 'bar',
      height: 200,
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    states: {
      hover: {
        filter: 'none'
      }
    },
    colors: [$info, $warning, $primary, $info_light, $warning_light, $primary_light],
    series: [{
      name: 'Sessions',
      data: []
    }],
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0
      }
    },

    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded'
      }
    },
    tooltip: {
      x: { show: false }
    },
    xaxis: {
      type: 'numeric',
    }
  }

  var sessionChart = new ApexCharts(
    document.querySelector("#avg-session-chart"),
    sessionChartoptions
  );
  var storeSession = [];
  sessionChart.render();
  function getTotalStoreType()
  {
    var url = window.location.origin+window.location.pathname+"/store-type";
    var html = '';

    $.ajax({
      type : 'get',
      data : {_token :$("#token").val()},
      url : url,
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType : 'json',
      success : function(response){
       let stores = response.data;
       let total_store_type = response.stores;
       let avg,j; let colors = response.colors;
       j=0;
       for(var i=0; i < stores.length; i++)
       {
        j++;
          storeSession.push(stores[i].count);

          avg = (parseInt(stores[i].count)/parseInt(total_store_type))*100;
        
          html += '<div class="col-6">';
          html += '<p class="mb-0">'+stores[i].name+'</p>';
          html += '<div class="progress '+colors[j]+' mt-25">';
          html += '<div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="50" aria-valuemax="100" style="width:'+Math.ceil(avg)+'%"></div>';
          html +='</div></div>';
       }
       $("#avg_stores").html(html);
       ApexCharts.exec('chart2', 'updateSeries', [{
          data: storeSession
        }], true);
      }
    });
  }
  getTotalStoreType();
  // Avg Session Chart ends //

// Packages Pie Chart starts
  // -----------------------------
  

  
   var options = {
      series: total_packages,
      chart: {
      id: "chart1",
      width: 400,
      type: 'pie',
      margin:10
    },
    labels: ['Free', 'VIP', 'Ultimate'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var pieChart = new ApexCharts(document.querySelector("#package-pie-chart"), options);
  pieChart.render();

  function display_total_package(type='')
  {

    var url = window.location.origin+window.location.pathname+"/dashboard-json";
    
    $.ajax({
      type : 'get',
      data : {_token :$("#token").val(), type:type},
      url : url,
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType : 'json',
      success : function(response){
       //pass the event data to fullCalendar via the provided callback function
        // total_packages = response.data.total_first_plan;
        let package = response.data;
         if(response.type == 'Monthly')
         {
            total_packages = [];
         }
         else if(response.type == 'Weekly')
         {
            total_packages = [];
         }
        else if(response.type == 'Today')
         {
            total_packages = [];
         }
        for(var i=0; i < package.length; i++)
        {

          if(response.type == 'Monthly' || package[i].all_package)
          {
            total_packages.push(package[i].all_package);
          }
          else if(response.type == 'Weekly')
          {
            total_packages.push(package[i].all_package);
          }
          else if(response.type == 'Today')
          {
            total_packages.push(package[i].all_package);
          }
          else
          {
            //console.log(package[i].all_package);
            total_packages.push(package[i].all_package);
          }
          
        }
        ApexCharts.exec('chart1', "updateSeries", total_packages  );
      }
    });
  }
  display_total_package();
  $(document).on('click', ".package_list .dropdown-menu-right a", function(){
    var name = $(this).text();
    $("#dropdownItem5").text(name);
    display_total_package(name);
  });
// Packages Pie Chart ends


  // Support Tracker Chart starts
  // -----------------------------

  var supportChartoptions = {
    chart: {
      height: 270,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        size: 150,
        startAngle: -150,
        endAngle: 150,
        offsetY: 20,
        hollow: {
          size: '65%',
        },
        track: {
          background: $white,
          strokeWidth: '100%',

        },
        dataLabels: {
          value: {
            offsetY: 30,
            color: '#99a2ac',
            fontSize: '2rem'
          }
        }
      },
    },
    colors: [$danger],
    fill: {
      type: 'gradient',
      gradient: {
        // enabled: true,
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [$primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      },
    },
    stroke: {
      dashArray: 8
    },
    series: [83],
    labels: ['Completed Tickets'],

  }

  var supportChart = new ApexCharts(
    document.querySelector("#support-tracker-chart"),
    supportChartoptions
  );

  supportChart.render();

  // Support Tracker Chart ends


  // Product Order Chart starts
  // -----------------------------
  let products = [];
  let all_total = 1000; 
  var options = {
    series: products,
      chart: {
      id: "chart3",
      width: 480,
      type: 'donut',
    },
    labels: ['Pending','Inprogress','Return','Delivered','Shipped','Cancelled'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
    },
    colors: [$primary, $info, $warning, $primary_light, $info_light, $danger],
    legend: {
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Orders',
              formatter: (val, opts) => {
                
                return all_total;
              }
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };
  var chart = new ApexCharts(document.querySelector("#product-order-chart"), options);
  chart.render();
  function displayAllProducts()
  {
    var url = window.location.origin+window.location.pathname+"/orders";
    $.ajax({
      type : 'get',
      data : {_token :$("#token").val()},
      url : url,
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType : 'json',
      success : function(response){
        let orders = response.data;
        let totals = response.total[0].count;
        for(var i=0; i < orders.length; i++)
        {
          products.push(orders[i].status_count);
          all_total = totals;
        }
        ApexCharts.exec('chart3', "updateSeries", products  );
      }
    });
  }
  displayAllProducts();

  // Product Order Chart ends //


  // Sales Chart and Line Chart starts 
  // -----------------------------

  /*var salesChartoptions = {
    chart: {
      height: 400,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 8,
        left: 1,
        top: 1,
        opacity: 0.2
      },
      toolbar: {
        show: false
      },
    },
    toolbar: { show: false },
    series: [{
      name: 'Sales',
      data: [90, 50, 86, 40, 100, 20],
    }, {
      name: 'Visit',
      data: [70, 75, 70, 76, 20, 85],
    }],
    stroke: {
      width: 0
    },
    colors: [$primary, $info],
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: ['#e8e8e8', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
          connectorColors: 'transparent'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#9f8ed7', $info_light],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '16px',
      markers: {
        width: 10,
        height: 10,
      }
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    dataLabels: {
      style: {
        colors: [$strok_color, $strok_color, $strok_color, $strok_color, $strok_color, $strok_color]
      }
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },

  }

  var salesChart = new ApexCharts(
    document.querySelector("#sales-chart"),
    salesChartoptions
  );

  salesChart.render();*/
  var saledata = [];
  var salelabel = [];


  function salesChartDisplayData()
  {
    var url = window.location.origin+window.location.pathname+"/sales";
    $.ajax({
      type : 'get',
      data : {_token :$("#token").val()},
      url : url,
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType : 'json',
      success : function(response){
       //pass the event data to fullCalendar via the provided callback function
        saledata = response.data;
        salelabel = response.label;
        
      }
    });
  }
  salesChartDisplayData();

  var saleOptions = {
 
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {show:false}
    },
    series: [{
      name: 'Sales',
      data: saledata,
    }],
    dataLabels: {
      enabled: false
    },
    
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: salelabel,
    }
  };

  var salesChart = new ApexCharts(document.querySelector("#line-chart"), saleOptions);
  salesChart.render();


  // Sales Chart and Line Chart ends //

  /***** TOUR ******/
  var tour = new Shepherd.Tour({
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true
  })

  // tour steps
 /* tour.addStep('step-1', {
    text: 'Toggle Collapse Sidebar.',
    attachTo: '.modern-nav-toggle .collapse-toggle-icon bottom',
    buttons: [

      {
        text: "Skip",
        action: tour.complete
      },
      {
        text: 'Next',
        action: tour.next
      },
    ]
  });*/

  /*tour.addStep('step-2', {
    text: 'Create your own bookmarks. You can also re-arrange them using drag & drop.',
    attachTo: '.bookmark-icons .icon-mail bottom',
    buttons: [

      {
        text: "Skip",
        action: tour.complete
      },

      {
        text: "previous",
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      },
    ]
  });

  tour.addStep('step-3', {
    text: 'You can change language from here.',
    attachTo: '.dropdown-language .flag-icon bottom',
    buttons: [

      {
        text: "Skip",
        action: tour.complete
      },

      {
        text: "previous",
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      },
    ]
  });

  tour.addStep('step-4', {
    text: 'Try fuzzy search to visit pages in flash.',
    attachTo: '.nav-link-search .icon-search bottom',
    buttons: [

      {
        text: "Skip",
        action: tour.complete
      },

      {
        text: "previous",
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      },
    ]
  });

  tour.addStep('step-5', {
    text: 'Buy this awesomeness at affordable price!',
    attachTo: '.buy-now bottom',
    buttons: [

      {
        text: "previous",
        action: tour.back
      },

      {
        text: "Finish",
        action: tour.complete
      },
    ]
  });*/

  if ($(window).width() > 1200 && !$("body").hasClass("menu-collapsed")) {
    tour.start()
  }
  else {
    tour.cancel()
  }
  if($("body").hasClass("horizontal-menu")){
    tour.cancel()
  }
  $(window).on("resize", function () {
    tour.cancel()
  })

});
