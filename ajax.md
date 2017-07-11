# ajax
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("post",getImages,true);
    httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == XMLHttpRequest.DONE){
            if(httpRequest.status == 200){
                var oBox = $("#myTabContent").children('div#pic');
                oBox.empty();
                var oHtmlStr = "";
                var data = JSON.parse(httpRequest.responseText);
                for(var i in data){
                    oHtmlStr += '<div class="imgMist"><img class="img" src="'+data[i].images_path+'" imgId="'+data[i].id+'" size="'+data[i].size+'" title="'+data[i].title+'" type="custom"></div>';
                }
                oBox.append(oHtmlStr);
            }else{
                console.log(httpRequest.status);
            }
        }
    }
    var str = "custom";
    // httpRequest.send({type:"custom"});
    httpRequest.send('type='+str+'&qqq=a');
