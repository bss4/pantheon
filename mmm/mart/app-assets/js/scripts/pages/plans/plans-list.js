/*=========================================================================================
    File Name: app-user.js
    Description: User page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function () {
  
  var url,columnDefs,uID;
  var editPlans    = json_obj.plan_edit;
  var viewPlans    = json_obj.plan_view;
  var deletePlans  = json_obj.plan_delete;

  var editStoreType = json_obj.storetype_edit;
  var deleteStoreType = json_obj.storetype_delete;

  var editCategory = json_obj.category_edit;
  var deleteCategory = json_obj.category_delete;

  var store_catalogue_details = json_obj.store_catalogue_details;
  var store_catalogue_edit    = json_obj.store_catalogue_edit;
  var store_catalogue_delete  = json_obj.store_catalogue_delete;
  
  var store_product_details = json_obj.store_product_details;
  var store_product_edit    = json_obj.store_product_edit;
  var store_product_delete  = json_obj.store_product_delete;

  var store_details = json_obj.store_details;
  var store_edit    = json_obj.store_edit;
  var store_delete  = json_obj.store_delete;

  var themes_view = json_obj.themes_view;
  var themes_edit    = json_obj.themes_edit;
  var themes_delete  = json_obj.themes_delete;

  var order_view = json_obj.order_view;
  var order_delete  = json_obj.order_delete;

  var all_single_order_view = json_obj.all_single_order_view;
  var all_single_order_delete  = json_obj.all_single_order_delete;

  var all_single_payment_view = json_obj.all_single_payment_view;
  var all_single_payment_delete  = json_obj.all_single_payment_delete;

  var seller_payment_view  = json_obj.seller_payment_view;

  let catCount;

  var type         = $(".mart_type").val();
  
 
  if(type == "plan")
  {
    
    url = json_obj.base_url;
    catCount = $("input[name='plans_count']").val();

  }else if(type == "category")
  {
     url = json_obj.category;
     catCount = $("#cat_count").val();
  }
  else if(type == "storetype")
  {
    
    url = json_obj.storetype;
    catCount = $("input[name='storetype_count']").val();
  }
  else if(type == "affilate")
  {
    
    url = $("#affilate_ajax").val();
    catCount = $("input[name='affilate_count']").val();

  }else if(type == "catalogue")
  {
    
    var catalogue_url = $('.site_url').val();
    url = catalogue_url;
  }
  else if(type == "product")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
  }else if(type == "store")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
  }else if(type == "themes")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
    catCount = $("input[name='theme_count']").val();
  
  }else if(type == "order")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
  }
  else if(type == "allorder")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
  }
  else if(type == "allpayment")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
  }
  else if(type == "sellerpayment")
  {
    
    var product_url = $('.site_url').val();
    url = product_url;
  }
  else
  {
    
    url = "";
  }

  
  var isRtl;
  if ( $('html').attr('data-textdirection') == 'rtl' ) {
    isRtl = true;
  } else {
    isRtl = false;
  }

  //  Rendering badge in status column
  var customBadgeHTML = function (params) {
    var color = "";
    if (params.value == "active") {
      color = "success"
      return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    } else if (params.value == "blocked") {
      color = "danger";
      return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    } else if (params.value == "deactivated") {
      color = "warning";
      return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    }
  }

  //  Rendering bullet in verified column
  var customBulletHTML = function (params) {
    var color = "";
    if (params.value == true) {
      color = "success"
      return "<div class='bullet bullet-sm bullet-" + color + "' >" + "</div>"
    } else if (params.value == false) {
      color = "secondary";
      return "<div class='bullet bullet-sm bullet-" + color + "' >" + "</div>"
    }
  }

  // Renering Icons in Actions column
  var customIconsHTML = function (params) {
    var usersIcons = document.createElement("span");
    var editIconHTML = "<a href='app-user-edit.html'><i class= 'users-edit-icon feather icon-edit-1 mr-50'></i></a>"
    var deleteIconHTML = document.createElement('i');
    var attr = document.createAttribute("class")
    attr.value = "users-delete-icon feather icon-trash-2"
    deleteIconHTML.setAttributeNode(attr);
    // selected row delete functionality
    deleteIconHTML.addEventListener("click", function () {
      deleteArr = [
        params.data
      ];
      // var selectedData = gridOptions.api.getSelectedRows();
      gridOptions.api.updateRowData({
        remove: deleteArr
      });
    });
    usersIcons.appendChild($.parseHTML(editIconHTML)[0]);
    usersIcons.appendChild(deleteIconHTML);
    return usersIcons
  }

  //  Rendering avatar in username column
  var actionEditDelete = function (params) {
    editPlans     = editPlans.replace(':id', '');
    viewPlans     = viewPlans.replace(':id', '');
    deletePlans   = deletePlans.replace(':id', '');
    var html = "";
    html += "<a  href="+editPlans+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+viewPlans+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    html += "<a  href="+deletePlans+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    return html;
  }


  var storeTypeEditDelete = function (params) {
      
    editStoreType     = editStoreType.replace(':id', '');
    deleteStoreType   = deleteStoreType.replace(':id', '');
    var html = "";
    html += "<a  href="+editStoreType+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+deleteStoreType+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    return html;
    
  }

  var affiliateEditDelete = function (params) {
    
    let affiliate_edit = $("#edit_affilate").val();
    let affiliate_dele = $("#delete_affilate").val();
    let affiliate_sellerview = $("#view_affilate_seller").val();
    affiliate_edit        = affiliate_edit.replace(':id', '');
    affiliate_dele        = affiliate_dele.replace(':id', '');
    affiliate_sellerview  = affiliate_sellerview.replace(':id', '');
    var html = "";
    html += "<a  href="+affiliate_edit+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+affiliate_sellerview+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    html += "<a  href="+affiliate_dele+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    return html;
  }


  var categoryEditDelete = function (params) {
    
    editCategory     = editCategory.replace(':id', '');
    deleteCategory   = deleteCategory.replace(':id', '');
    var html = "";
    html += "<a  href="+editCategory+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+deleteCategory+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    return html;
  }

  var catalogueList = function (params){

    store_catalogue_details   = store_catalogue_details.replace(':id', '');
    store_catalogue_edit   = store_catalogue_edit.replace(':id', '');
    store_catalogue_delete   = store_catalogue_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+store_catalogue_edit+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+store_catalogue_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+store_catalogue_details+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }
  
  var productList = function (params){

    store_product_details   = store_product_details.replace(':id', '');
    store_product_edit      = store_product_edit.replace(':id', '');
    store_product_delete    = store_product_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+store_product_edit+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+store_product_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+store_product_details+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }
  var storelist = function (params){

    store_details   = store_details.replace(':id', '');
    store_edit      = store_edit.replace(':id', '');
    store_delete    = store_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+store_edit+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+store_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+store_details+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }

  var themeslist = function (params){

    themes_view      = themes_view.replace(':id', '');
    themes_edit      = themes_edit.replace(':id', '');
    themes_delete    = themes_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+themes_edit+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+themes_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+themes_view+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }


  var orderlist = function (params){

    order_view      = order_view.replace(':id', '');
    order_delete    = order_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+order_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+order_view+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }

  var allorderlist = function (params){

    all_single_order_view      = all_single_order_view.replace(':id', '');
    all_single_order_delete    = all_single_order_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+all_single_order_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+all_single_order_view+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }

  var allpaymentlist = function (params){

    all_single_payment_view      = all_single_payment_view.replace(':id', '');
    all_single_payment_delete    = all_single_payment_delete.replace(':id', '');

    var html = "";
    html += "<a  href="+all_single_payment_delete+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+all_single_payment_view+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }

  var sellerpaymentlist = function (params){

    seller_payment_view      = seller_payment_view.replace(':id', '');
  
    var html = "";
    html += "<a  href="+seller_payment_view+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    return html;

  }

  var i= (catCount != undefined) ? catCount: 10;
  
  var increment = function(params){
    i--;
    
    html = '<span>'+(i+1)+'</span>';
    html += '<input type="hidden" name="delete_id[]" value="'+params.data.id+'">';
    //nut--;
    return html;

  }
  
  // ag-grid
  /*** COLUMN DEFINE ***/
  
  var columnCatalogueDefs = [{
      headerName: 'ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,

    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 175,
    },
    
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: catalogueList
    }
  ];
  
   var columnProductDefs = [{
      headerName: 'ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,

    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Sku',
      field: 'sku',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Description',
      field: 'description',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Type',
      field: 'type',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Price',
      field: 'price',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Discount price',
      field: 'discount_price',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Stock',
      field: 'product_stock_qty',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: productList
    }
  ];

  var columnStoreDefs = [{
      headerName: 'ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,

    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'City',
      field: 'city',
      filter: true,
      width: 175,
    },
    {
      headerName: 'State',
      field: 'state',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Country',
      field: 'country',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: storelist
    }
  ];

  var columnThemesDefs = [{
      headerName: 'ID',
      field: "idd",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      cellRenderer: increment
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Theme Folder Name',
      field: 'theme_folder_name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: themeslist
    }
  ];

  var columnOrderDefs = [{
      headerName: 'Order ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      //cellRenderer: increment
    },
    {
      headerName: 'Seller Name',
      field: 'sellers.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'User Name',
      field: 'users.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Total Price',
      field: 'price',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: orderlist
    }
  ];

  var columnAllorderDefs = [{
      headerName: 'Order ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      //cellRenderer: increment
    },
    {
      headerName: 'Seller Name',
      field: 'sellers.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'User Name',
      field: 'users.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Total Price',
      field: 'price',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: allorderlist
    }
  ];

  var columnAllpaymentDefs = [{
      headerName: 'Order ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      //cellRenderer: increment
    },
    {
      headerName: 'Seller Name',
      field: 'sellers.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'User Name',
      field: 'users.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Transaction ID',
      field: 'transaction_id',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Payment Mode',
      field: 'payment_mode',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: allpaymentlist
    }
  ];

  var columnSellerpaymentDefs = [{
      headerName: 'Order ID',
      field: "id",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      //cellRenderer: increment
    },
    {
      headerName: 'Seller Name',
      field: 'sellers.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'User Name',
      field: 'users.name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Transaction ID',
      field: 'transaction_id',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Payment Mode',
      field: 'payment_mode',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: sellerpaymentlist
    }
  ];

  var columnPlanDefs = [{
      headerName: 'ID',
      field: "idd",
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      cellRenderer: increment
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 175,
    },
    {
      headerName: 'Price',
      field: 'price',
      filter: true,
      width: 175,
      
    },
    
    
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: actionEditDelete
    }
  ];

  var columnStoreTypeDefs = [{
      headerName: 'ID',
      field:'id',
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      cellRenderer: increment

    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 225,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: storeTypeEditDelete
    }
  ];


  var columnAffiliateDefs = [{
      headerName: 'ID',
      field:'id',
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      cellRenderer: increment
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 225,
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      width: 225,
    },
    {
      headerName: 'App Id',
      field: 'affiliate_id',
      filter: true,
      width: 225,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: affiliateEditDelete
    }
  ];

  var columncategoryDefs = [{
      headerName: 'ID',
      field:'id',
      width: 175,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
      cellRenderer: increment
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 225,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 175,
      cellRenderer: categoryEditDelete
    }
  ];

  //alert(columnDefs);

  if(type == "plan")
  {
    columnDefs = columnPlanDefs;
    uID        = "plansGrid";
  }
  else if(type == "storetype")
  {
    columnDefs = columnStoreTypeDefs;
    uID        = "storeTypeGrid";
  }
  else if(type == "affilate")
  {
    columnDefs = columnAffiliateDefs;
    uID        = "affilateGrid";
  }else if(type == "category")
  {
    columnDefs = columncategoryDefs;
    uID        = "categoryGrid";

  }else if(type == "catalogue")
  {
    columnDefs = columnCatalogueDefs;
    uID        = "sellerCatalogueGrid";
    
  }else if(type == "product")
  {
    columnDefs = columnProductDefs;
    uID        = "sellerProductGrid";

  }else if(type == "store")
  {
    columnDefs = columnStoreDefs;
    uID        = "storesGrid";

  }else if(type == "themes")
  {
    columnDefs = columnThemesDefs;
    uID        = "themesGrid";

  }else if(type == "order")
  {
    columnDefs = columnOrderDefs;
    uID        = "sellerOrderGrid";
  }
  else if(type == "allorder")
  {
    columnDefs = columnAllorderDefs;
    uID        = "AllorderGrid";

  }else if(type == "allpayment")
  {
    columnDefs = columnAllpaymentDefs;
    uID        = "paymentsGrid";

  }else if(type == "sellerpayment")
  {
    columnDefs = columnSellerpaymentDefs;
    uID        = "sellerPaymentGrid";
  }

  /*** GRID OPTIONS ***/
  var gridOptions = {
    defaultColDef: {
      sortable: true
    },
    defaultExportParams:{
      columnGroups: true
    },
    enableRtl: isRtl,
    columnDefs: columnDefs,
    rowSelection: "multiple",
    floatingFilter: true,
    filter: true,
    pagination: true,
    paginationPageSize: 10,
    pivotPanelShow: "always",
    colResizeDefault: "shift",
    animateRows: true,
    resizable: true,
  };



  if (document.getElementById(uID)) {
    /*** DEFINED TABLE VARIABLE ***/
    var gridTable = document.getElementById(uID);

    /*** GET TABLE DATA FROM URL ***/
    agGrid
      .simpleHttpRequest({
        url: url
      })
      .then(function (data) {
        
        gridOptions.api.setRowData(data);
      });

    /*** FILTER TABLE ***/
    function updateSearchQuery(val) {
      gridOptions.api.setQuickFilter(val);
    }

    $(".ag-grid-filter").on("keyup", function () {
      updateSearchQuery($(this).val());
    });

    /*** CHANGE DATA PER PAGE ***/
    function changePageSize(value) {
      gridOptions.api.paginationSetPageSize(Number(value));
    }

    $(".sort-dropdown .dropdown-item").on("click", function () {
      var $this = $(this);
      changePageSize($this.text());
      $(".filter-btn").text("1 - " + $this.text() + " of 200");
    });

    /*** EXPORT AS CSV BTN ***/
    $(".ag-grid-export-btn").on("click", function (params) {
      gridOptions.api.exportDataAsCsv();
    });

    

    /*** PRINT TABLE FUNCTION***/
    function onBtPrint() {
      const api = gridOptions.api;

      setPrinterFriendly(api);

      setTimeout(function () {
        print();
        //setNormal(api);
      }, 2000);
    }

    function setPrinterFriendly(api) {
      const eGridDiv = document.querySelector('#'+uID);
      eGridDiv.style.height = '';
      api.setDomLayout('print');
    }

   
    $(".ag-grid-print-btn").on("click", function (params) {
      onBtPrint();
    });


    //  filter data function
    var filterData = function agSetColumnFilter(column, val) {
      var filter = gridOptions.api.getFilterInstance(column)
      var modelObj = null
      if (val !== "all") {
        modelObj = {
          type: "equals",
          filter: val
        }
      }
      filter.setModel(modelObj)
      gridOptions.api.onFilterChanged()
    }
    //  filter inside role
    $("#users-list-role").on("change", function () {
      var usersListRole = $("#users-list-role").val();
      filterData("role", usersListRole)
    });
    //  filter inside verified
    $("#users-list-verified").on("change", function () {
      var usersListVerified = $("#users-list-verified").val();
      filterData("is_verified", usersListVerified)
    });
    //  filter inside status
    $("#users-list-status").on("change", function () {
      var usersListStatus = $("#users-list-status").val();
      filterData("status", usersListStatus)
    });
    //  filter inside department
    $("#users-list-department").on("change", function () {
      var usersListDepartment = $("#users-list-department").val();
      filterData("department", usersListDepartment)
    });
    // filter reset
    $(".users-data-filter").click(function () {
      $('#users-list-role').prop('selectedIndex', 0);
      $('#users-list-role').change();
      $('#users-list-status').prop('selectedIndex', 0);
      $('#users-list-status').change();
      $('#users-list-verified').prop('selectedIndex', 0);
      $('#users-list-verified').change();
      $('#users-list-department').prop('selectedIndex', 0);
      $('#users-list-department').change();
    });

    /*** INIT TABLE ***/
    new agGrid.Grid(gridTable, gridOptions);
  }
  // users language select
  if ($("#users-language-select2").length > 0) {
    $("#users-language-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users music select
  if ($("#users-music-select2").length > 0) {
    $("#users-music-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users movies select
  if ($("#users-movies-select2").length > 0) {
    $("#users-movies-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users birthdate date
  if ($(".birthdate-picker").length > 0) {
    $('.birthdate-picker').pickadate({
      format: 'mmmm, d, yyyy'
    });
  }
  // Input, Select, Textarea validations except submit button validation initialization
  if ($(".users-edit").length > 0) {
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
  }
});
