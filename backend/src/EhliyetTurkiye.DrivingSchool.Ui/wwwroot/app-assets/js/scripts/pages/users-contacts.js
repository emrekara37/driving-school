/*=========================================================================================
    File Name: users-contacts.js
    Description: Users contacts configurations
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Version: 1.0
    Author: GeeksLabs
    Author URL: http://www.themeforest.net/user/geekslabs
==========================================================================================*/

$.fn.raty.defaults.path = '../../../app-assets/images/raty/';

$(document).ready(function() {

    var userDataTable = $('#users-contacts').DataTable({
        'order' : [[1,'']]
    });
    // Set the search textbox functionality in sidebar
    $('#search-contacts').on( 'keyup', function () {
        userDataTable.search( this.value ).draw();
    });
    
    // Checkbox & Radio 1
    $('.input-chk').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
    });
        
    userDataTable.on( 'draw.dt', function () {
        // Checkbox & Radio 1
        $('.input-chk').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
        });

        // Favorite initialization and usage
        $('.favorite').on('click', function(){
            $(this).toggleClass('active');
            $('.favorite').raty({
                number: 1,
                hints: ['Favorite']
            });
            $('.favorite.active').raty({
                number: 1,
                hints: ['Favorite'],
                score: 1
            });
        });
        $('.favorite').raty({
            number: 1,
            hints: ['Favorite']
        });
        $('.favorite.active').raty({
            number: 1,
            hints: ['Favorite'],
            score: 1
        });

        // Check All checkbox start
        $('#check-all').on('ifChecked', function (event) {
            $('.check').iCheck('check');
            triggeredByChild = false;
            $('.checked').parents('tr').addClass("selected");
        });

        $('#check-all').on('ifUnchecked', function (event) {
            if (!triggeredByChild) {
                $('.check').iCheck('uncheck');
                $('.check').parents('tr').removeClass("selected");
            }
            triggeredByChild = false;
        });

        // Removed the checked state from "All" if any checkbox is unchecked
        $('.check').on('ifUnchecked', function (event) {
            triggeredByChild = true;
            $('#check-all').iCheck('uncheck');
            $(this).parents('tr').removeClass("selected");
        });

        $('.check').on('ifChecked', function (event) {
            if ($('.check').filter(':checked').length == $('.check').length) {
                $('#check-all').iCheck('check');
            }
            $(this).parents('tr').addClass("selected");
        });

        // Delete row
        $(document).on("click", ".delete", function(){
            userDataTable.row($(this).parents('tr')).remove().draw();
        });

        $(document).on("click", ".delete-all", function(){
            userDataTable.rows('.selected').remove().draw();
            $('#check-all').iCheck('uncheck');
        });
    });

    $('.favorite').on('click', function(){
        $(this).toggleClass('active');
        $('.favorite').raty({
            number: 1,
            hints: ['Favorite']
        });
        $('.favorite.active').raty({
            number: 1,
            hints: ['Favorite'],
            score: 1
        });
    });
    $('.favorite').raty({
        number: 1,
        hints: ['Favorite']
    });
    $('.favorite.active').raty({
        number: 1,
        hints: ['Favorite'],
        score: 1
    });

    // Add new contact
    var counter = 1;
 
    $('#add-contact-item').on( 'click', function (e) {
        e.preventDefault();
        var name = $("#contact-name").val();
        var email = $("#contact-email").val();
        var contact = $("#contact-phone").val();
        var image = $("#user-image").val();
        var fav = $("#favorite:checked").val(),
        favClass = "";
        if(fav == 'on'){
            favClass = " active";
        }

        userDataTable.row.add( [
            '<input type="checkbox" class="input-chk check">',
            '<div class="media">'+
                '<div class="media-left pr-1"><span class="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-2.png" alt="avatar"><i></i></span></div>'+
                '<div class="media-body media-middle">'+
                    '<a class="name" class="media-heading">'+name+'</a>'+
                '</div>'+
            '</div>',
            '<a class="email" href="'+email+'">'+email+'</a>',
            '<span class"phone">'+contact+'</span>',
            '<div class="favorite'+favClass+'" class="mb-1"></div>',
            '<a data-toggle="modal" data-target="#EditContactModal" class="primary mr-1"><i class="la la-pencil"></i></a>'+
                '<a class="danger delete mr-1"><i class="la la-trash-o"></i></a>'+
                '<span class="dropdown">'+
                    '<a id="btnSearchDrop2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="dropdown-toggle dropdown-menu-right"><i class="la la-ellipsis-v"></i></a>'+
                    '<span aria-labelledby="btnSearchDrop2" class="dropdown-menu mt-1 dropdown-menu-right">'+
                        '<a data-toggle="modal" data-target="#EditContactModal" class="dropdown-item edit"><i class="ft-edit-2"></i> Edit</a>'+
                        '<a href="#" class="dropdown-item delete"><i class="ft-trash-2"></i> Delete</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle primary"></i> Projects</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle info"></i> Team</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle warning"></i> Clients</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle success"></i> Friends</a>'+
                    '</span>'+
                '</span>'
        ] ).draw( false );
 
        counter++;
    } );

    var currentRow = null;

    $(document).on('click', '.edit', function () {
        currentRow= $(this).parents('tr');
        $("#name").val($(this).closest('tr').find('td .name').text());
        $("#email").val($(this).closest('tr').find('td .email').text());
        $("#phone").val($(this).closest('tr').find('td.phone').text());
    });
    // Edit item
    /*$('#edit-contact-item').on( 'click', function (e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var contact = $("#phone").val();
        var fav = "",
        favClass = "";

        currentRow= $(this).parents('tr');
        console.log(userDataTable.row( this ).data());
        userDataTable.row(currentRow).edit( [
            '<input type="checkbox" class="input-chk check">',
            '<div class="media">'+
                '<div class="media-left pr-1"><span class="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-2.png" alt="avatar"><i></i></span></div>'+
                '<div class="media-body media-middle">'+
                    '<a class="name" class="media-heading">'+name+'</a>'+
                '</div>'+
            '</div>',
            '<a class="email" href="'+email+'">'+email+'</a>',
            '<span class"phone">'+contact+'</span>',
            '<div class="favorite'+favClass+'" class="mb-1"></div>',
            '<a href="#edit" class="primary mr-1"><i class="la la-pencil"></i></a>'+
                '<a href="#delete" class="danger delete mr-1"><i class="la la-trash-o"></i></a>'+
                '<span class="dropdown">'+
                    '<a id="btnSearchDrop2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="dropdown-toggle dropdown-menu-right"><i class="la la-ellipsis-v"></i></a>'+
                    '<span aria-labelledby="btnSearchDrop2" class="dropdown-menu mt-1 dropdown-menu-right">'+
                        '<a href="#" class="dropdown-item"><i class="ft-edit-2"></i> Edit</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-trash-2"></i> Delete</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle primary"></i> Projects</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle info"></i> Team</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle warning"></i> Clients</a>'+
                        '<a href="#" class="dropdown-item"><i class="ft-plus-circle success"></i> Friends</a>'+
                    '</span>'+
                '</span>'
        ] ).draw( false );
 
        counter++;
    } );*/

    $(".modal").on("hidden.bs.modal", function() {
        $(".modal-body input").val("")
    });

    // Check All checkbox start
    $('#check-all').on('ifChecked', function (event) {
        $('.check').iCheck('check');
        triggeredByChild = false;
        $('.checked').parents('tr').addClass("selected");
    });

    $('#check-all').on('ifUnchecked', function (event) {
        if (!triggeredByChild) {
            $('.check').iCheck('uncheck');
            $('.check').parents('tr').removeClass("selected");
        }
        triggeredByChild = false;
    });

    // Removed the checked state from "All" if any checkbox is unchecked
    $('.check').on('ifUnchecked', function (event) {
        triggeredByChild = true;
        $('#check-all').iCheck('uncheck');
        $(this).parents('tr').removeClass("selected");
    });

    $('.check').on('ifChecked', function (event) {
        if ($('.check').filter(':checked').length == $('.check').length) {
            $('#check-all').iCheck('check');
        }
        $(this).parents('tr').addClass("selected");
    });

    // Delete row
    $('#users-contacts').on("click", ".delete", function(){
        userDataTable.row($(this).parents('tr')).remove().draw();
    });

    // Delete row
    $('#users-contacts').on("click", ".delete", function(){
        userDataTable.row($(this).parents('tr')).remove().draw();
    });

    $(document).on("click", ".delete-all", function(){
        userDataTable.rows('.selected').remove().draw();
        $('#check-all').iCheck('uncheck');
    });
});