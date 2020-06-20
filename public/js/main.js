$ (function(){
   
    if($("textarea").length) {
        CKEDITOR.replace("ta");
    }
    $("a.confirmDeletion").on("click",function(){
        if(!confirm("Confirm Deletion"))
        return false;
    });
});