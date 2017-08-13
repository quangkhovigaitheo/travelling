
    
    $(".addDropzone").click(function(){
        $(this).parentsUntil(".add_comment").find("form").toggle();
    });
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#image_upload", { 
        maxFilesize : 4,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        addRemoveLinks: true,  
        autoProcessQueue: false,
        parallelUploads: 5,
        maxFiles: 5,
        init: function() {
            var zone = this;
            console.log(zone);
            this.on("removedfile", function(file) {
                $.ajax({
                    type: 'POST',
                    url: '/comment/image/delete',
                    data: {file: file.serverFileName},
                    dataType: 'html',
                    success: function(data){
                    }
                });
            });
            $(".commentSubmit").click(function(e){
                e.preventDefault();
                var imageList = [];
                zone.on("success", function(file,serverFileName) {
                });
                zone.on("complete", function (file) {
                        file.previewElement.remove("slow");
                }); 
                var data = {
                    parent_id: $(this).val(),
                    trip_id: $('#trip_id').val(),
                    user_id: $('#user_id').val(),
                    text:    $(this).parentsUntil(".add_comment").find("textarea").val(),
                }
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: '/comment/add',
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        console.log(data);
                        $(that).parentsUntil(".add_comment").find("textarea").val("");
                        var comment_id = data.comment.id;
                        var userName = data.user.name;
                        var avatar = data.user.avatar;
                        var user_id = data.user.id;
                        var comment_text = data.comment.text;
                        console.log(data);
                        console.log(userName);
                        console.log(comment_text);
                        zone.on("sending", function(file, xhr, formData) { 
                            formData.append("comment_id", comment_id);  
                        });
                        zone.processQueue();
                        
                        zone.on("success", function(file,respond) {
                            imageList.push(respond.url);
                        });
                        function print(){
                            
                            var comment = createComment(userName,avatar,comment_text,imageList,user_id);
                            $("#commentList").prepend(comment);
                        }
                        setTimeout(print,2000);
                    },
                });
            });
        }
    });

   
    function createComment(userName,avatar,comment_text,imageList,user_id) {
        function getImageList(){
            var images = '';
            console.log(imageList);
            for(var k = 0; k< imageList.length; k++){
                images += '<img src="/'+imageList[k]+'" class="comment_avatar">';
            }
            return images;
        }
         var comment = '<div class="comment">'
            +        '<div class = "row">'
            +            '<div class="col-lg-1">'
            +                '<img src="/'+avatar+'" class="comment_avatar">'
            +            '</div>'
                    
            +            '<div class="col-lg-9">'
            +                '<div class="commentContent">'
            +                  '<a href="/profile/'+user_id+'">'
            +                    '<strong style="color: blue">'
            +                        userName+'&nbsp'
            +                    '</strong>'+'</a>'
            +                    comment_text
            +                '</div>'
            +                '<div class="imageContent">'
            +                 getImageList(imageList)                                          
            +                '</div>'
            +                '<br>'
            +                '<div class = "respond" style="display: inline;">'
            +                    '&nbsp&nbsp&nbsp'
            +                    '<a href=""javascript:;""> Like </a>'
            +                    '&nbsp&nbsp&nbsp&nbsp&nbsp'
            +                    '<a href=""javascript:;""> Reply</a>'
            +                '</div>'
            +                '<textarea rows="4" cols="100" class="commentContent" style="display: none">'
            +                    '{{$comment->text}}'
            +                '</textarea>'
            +                '<form action="/load" method = "post" file = "true" enctype="maltipart/form-data" class="dropzone" id = "image-upload" style="display: none">'
            +                    '{{ csrf_field() }}'
            +                '</form>'
            +            '</div>'
            +            '<div class="col-lg-2">'
            +                'dfj'
            +            '</div>'
            +            '<br><br>'
            +         '</div>'
            +    '</div>';
            return comment;
    }
