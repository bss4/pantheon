/*=========================================================================================
    File Name: app-user.js
    Description: User page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function () {
  var base_url = $("#base_url").val();
  //var full_url = json_obj.base_url;

  var catalogueSeller = seller.store_catalogue;
  var editSeller    = seller.store_edit;
  var deleteSeller  = seller.store_delete;
  var viewSeller    = seller.store_view;
  var storeSeller   = seller.store_stores;
  var orderSeller   = seller.store_orders;
  var paymentSeller = seller.store_payments;
  var store_catalogue_product = seller.store_catalogue_product;
  let catCount = $("input[name='seller_count']").val();
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
    catalogueSeller = catalogueSeller.replace(':id', '');
    editSeller    = editSeller.replace(':id', '');
    deleteSeller  = deleteSeller.replace(':id', '');
    viewSeller    = viewSeller.replace(':id', '');
    storeSeller   = storeSeller.replace(':id', '');
    orderSeller   = orderSeller.replace(':id', '');
    paymentSeller = paymentSeller.replace(':id', '');
    store_catalogue_product = store_catalogue_product.replace(':id', '');
    var html = "";

    html += "<a  href="+catalogueSeller+params.data.id+"><span class='fa fa-shopping-basket'></span></a>";
    html += "<a  href="+store_catalogue_product+params.data.id+"><span class='fa fa-product-hunt'></span></a>";
    html += "<a  href="+editSeller+params.data.id+"><span class='fa fa-edit fa-fw'></span></a>";
    html += "<a  href="+deleteSeller+params.data.id+"><span class='fa fa-trash fa-fw'></span></a>";
    html += "<a  href="+viewSeller+params.data.id+"><span class='fa fa-eye fa-fw'></span></a>";
    html += "<a  href="+storeSeller+params.data.id+"><span class='fa fa-shopping-bag fa-fw'></span></a>";
    html += "<a  href="+orderSeller+params.data.id+"><span class='fa fa-first-order fa-fw'></span></a>";
    html += "<a  href="+paymentSeller+params.data.id+"><span class='fa fa-money fa-fw'></span></a>";
    return html;
  }
  var i= 0;
  
  var increment = function(params){
    i++;
    
    html = '<span>'+i+'</span>';
    //nut--;
    return html;

  }
  
  // ag-grid
  /*** COLUMN DEFINE ***/

  var columnDefs = [{
      headerName: 'ID',
      field: 'id',
      width: 125,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true,
     
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      width: 225,
    },
    {
      headerName: 'Contact',
      field: 'phone',
      filter: true,
      width: 175,
      //cellRenderer: customAvatarHTML,
    },
    {
      headerName: 'Verify',
      field: 'is_verify',
      filter: true,
      width: 125,
      //cellRenderer: customAvatarHTML,
    },
    {
      headerName: 'Actions',
      field: 'action',
      filter: false,
      width: 350,
      cellRenderer: actionEditDelete
    }
  ];

  //alert(columnDefs);

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



  if (document.getElementById("sellerGrid")) {
    /*** DEFINED TABLE VARIABLE ***/
    var gridTable = document.getElementById("sellerGrid");

    /*** GET TABLE DATA FROM URL ***/
    agGrid
      .simpleHttpRequest({
        url: base_url
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

    
    
    function printDoc() {
      console.log("Exporting to PDF...");
       var docDefinition;
        var text = []
        for (var vin = 0; vin < this.selected.length; vin++) {
          var nestedArr = new Array(this.selected);

          var s = nestedArr[0][vin].LAST_M + "\n" + nestedArr[0][vin].MEMB_N;
          text.push(s)
        }
        docDefinition = {
          pageSize: "A6",
          pageMargins: [0, 0, 0, 0],
          content: { text: text.join("\n") }
        };
        pdfMake.createPdf(docDefinition).print();
    }

    $(document).on("click", ".ag-grid-pdf-btn", function(){
      printDoc();
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
      const eGridDiv = document.querySelector('#'+id);
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
