var url = "http://localhost:8000/api/";

$(document).ready( function () {

    $("#form-edit").empty();

    $.ajax({
        url: url + 'client',
        type: 'GET',

        success: function (response) {
            $.each(response, function(k, v){
                $('#select-client').append('<option value='+v.client_id+'>'+v.client_name+'</option>');
                $('#select-client-add').append('<option value='+v.client_id+'>'+v.client_name+'</option>')
            })
        },
        error: function (error) {
            console.log(error);
        }
    })

    $("#clear").click(function(){
        $('#project-name').val('')
        $('#select-client').val('0').change()
        $('#select-status').val('0').change()
        dataTable('project', 'GET', '');
    });

    

    dataTable('project', 'GET', '');
} );

function dataTable(surl, method, data){
    // console.log(data);
    $('#table').empty();
    $("#form-edit").empty();
    
    $('#table').append(
        '<table id="dataTable" class="table table-bordered display">' +
        '<thead>' +
            '<tr>' +
                '<th><input type="checkbox" id="selected-all-datatable"></th>'+
                '<th>Action</th>'+
                '<th>Project Name</th>' +
                '<th>Client</th>'+
                '<th>Project Start</th>'+
                '<th>Project End</th>'+
                '<th>Status</th>'+
            '</tr>'+
        '</thead>'+
        '<tbody id="columns"></tbody>'+
        '</table>'+
    '');

    $('#dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'New',
                action: function ( e, dt, node, config ) {
                   formAdd();
                }
            },
            {
                text: 'Delete',
                action: function ( e, dt, node, config ) {
                    destroySelected();
                }
            }
        ],
        order: false,
        columnDefs: [{
            targets: "_all",
            orderable: false
        }],
        pageLength: 5,
        processing: true,
        serverSide: false,
        searching: false,
        ajax: {
            url: url + surl,
            data: data,
            dataSrc:'',
            type: method,

        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        columns: [
            { data: "project_id", render: function(dataField){return '<input type="checkbox" id="customCheck" data-id='+dataField+'></input>';}},
            { data: "project_id", render: function(dataField){return '<a href="' + dataField + '" data-toggle="modal" data-target="#EditModal" onclick="formEdit('+ dataField +');">Edit</a>';}},
            { data: "project_name"},
            { data: "client_name"},
            { data: "project_start"},
            { data: "project_end"},
            { data: "project_status"},
        ]
    });
}
$(document).ready( function () {
    $("#selected-all-datatable").click(function () {
            
        if($(this).is(':checked', true)){
            $('input:checkbox').not(this).prop('checked', true);
        }else{
            $('input:checkbox').not(this).prop('checked', false);
        }
    });
})

function searchProject(){
    var data = $('#formSearch').serialize();
    $('#table').empty();
    $("#form-edit").empty();

    $('#table').append(
        '<table id="dataTable" class="table table-bordered display">' +
        '<thead>' +
            '<tr>' +
                '<th><input type="checkbox" id="selected-all"></th>'+
                '<th>Action</th>'+
                '<th>Project Name</th>' +
                '<th>Client</th>'+
                '<th>Project Start</th>'+
                '<th>Project End</th>'+
                '<th>Status</th>'+
            '</tr>'+
        '</thead>'+
        '<tbody id="columns"></tbody>'+
        '</table>'+
    '');

    $.ajax({
        url: url + 'searchProject/',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (response) {
            // console.log(response)
            $('#dataTable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'New',
                        action: function ( e, dt, node, config ) {
                           formAdd();
                        }
                    },
                    {
                        text: 'Delete',
                        action: function ( e, dt, node, config ) {
                            destroySelected();
                        }
                    }
                ],
                data: response.data,
                pageLength: 5,
                processing: true,
                serverSide: false,
                searching: false,
                columns: [
                    { data: "project_id", render: function(dataField){return '<input type="checkbox" id="customCheck" data-id='+dataField+'"></input>';}},
                    { data: "project_id", render: function(dataField){return '<a href="' + dataField + '" data-toggle="modal" data-target="#logoutModal" onclick="formEdit('+ dataField +');">Edit</a>';}},
                    { data: "project_name"},
                    { data: "client_name"},
                    { data: "project_start"},
                    { data: "project_end"},
                    { data: "project_status"},
                ]
            });
            
        },
        error: function (error) {
            console.log(error);
        }
    })

    
}

function formAdd(){
    $("#myModal").modal('show');
    $("#form-edit").empty();

}
function formEdit(id){

    $("#form-edit").empty();

    $.ajax({
        url: url + 'project/'+id,
        type: 'get',
        data: '1',
        success: function (response) {
            // console.log(response)
            $("#form-edit").append('<form id="editform" method="post">'+
            '<div class="mb-3">'+
                '<label for="editInputEmail1" class="form-label">Project Name</label>'+
                '<input type="text" name="project_name" class="form-control" id="editInputEmail1" value="'+ response.data[0].project_name +'" aria-describedby="emailHelp" required>'+
            '</div>'+
            '<div class="mb-3">'+
                '<select class="form-select" name="client_id" id="select-client-edit" aria-label=".form-select-sm example" required>'+
                    '<option selected="selected" disabled="disabled" value="0">All Client</option>'+
                '</select>'+
            '</div>'+
            '<div class="mb-3">'+
                '<select class="form-select" name="project_status" id="select-status-edit" aria-label=".form-select-sm example" required>'+
                '<option selected="selected" disabled="disabled" value="0">All Status</option>'+
                '<option value="DONE">DONE</option>'+
                '<option value="ONGOING">ONGOING</option>'+
                '<option value="OPEN">OPEN</option>'+
                '</select>'+
            '</div>'+
            '<a class="btn btn-primary" id="editbtn" onclick=editData('+ response.data[0].project_id+')>submit</a>'+
            '<a class="btn btn-secondary" id="cancelbtn" onclick=cancel()>cancel</a>'+
        '</form>')
        }
    })

    $.ajax({
        url: url + 'client',
        type: 'GET',

        success: function (response) {
            $.each(response, function(k, v){
                $('#select-client-edit').append('<option value='+v.client_id+'>'+v.client_name+'</option>')
            })
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function cancel(){
    $("#form-edit").empty();
}

function createData(){
    $('#formAdd').validate();

    if($('#formAdd').valid()){
        var data = $('#formAdd').serialize();
        $.ajax({
            url: url + 'project/',
            type: 'POST',
            data: data,
            success: function (response) {
                if(response){
                    alert('berhasil');
                    window.location.reload()
                }else{
                    alert('Gagal')
                }
                
            },
            error: function (error) {
                console.log(error);
            }
        })
    }else{
        console.log("required")
    }
    
}
function editData(id){
    $('#editform').validate();

    if($('#editform').valid()){
        var data = $('#editform').serialize();
        $.ajax({
            url: url + 'project/'+id,
            type: 'PUT',
            data: data,
            success: function (response) {
                if(response){
                    alert('berhasil');
                    window.location.reload()
                }else{
                    alert('Gagal')
                }
                
            },
            error: function (error) {
                console.log(error);
            }
        })
    }else{
        console.log("required")
    }
}

function destroySelected(){
    var value = []
    $('#customCheck:checked').each(function(){
        value.push($(this).attr('data-id'))
    })

    if(value.length <= 0){
        alert('select row frist')
    }


    var selected = value.join(",")
    console.log(selected)

    var check = confirm('Apakah yakin menghapus data?')


    if(check == true){
        $.ajax({
            url: url + 'projectall/',
            type: "DELETE",
            data: 'ids=' + selected,
            success: function(response){
                if(response){
                    alert('success')
                    window.location.reload()
                }else{
                    alert("kesalahan")
                }
            },
            error: function(error){
                console.log(error)
            }
        })
    }

    console.log(value)
    

}