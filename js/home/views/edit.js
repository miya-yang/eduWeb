/**
 * Author: Miyang
 * Date: 2017-05-17
 * Description: edit.html js
 */

$(function(){
    course.getEditClassify();
    var acen_edit = ace.edit('editor-column');
    acen_edit.setTheme('ace/theme/chrome');
    acen_edit.getSession().setMode('ace/mode/markdown');
    acen_edit.renderer.setShowPrintMargin(false);
    $("#editor-column").keyup(function() {
        $("#preview-column").html(marked(acen_edit.getValue()));
    });
});

$("#submit-btn").on("click", function(){
    course.sendCourse();
});