var effectObj={
    effectSettings:[],
};

var panoEffect = (function () {

    //1，init effect var div et..;
    //2, effect div add;
    //3, effect din inline add location spot;
    //4, controll relation of spot and krpano;
    var snowCurName;
    var plugSnowStr;
    var currentScene;
    var applyAllStatus;
    var mapSpotXml = "";
    var memnum=0;
    var pub = {
        effectInit: function () {
            //1，init effect var div et..;
            console.log("effectInit===========================================>>");

            $("#effectApplyOn input").change(function (){
                $("#effectApplyAll").html('应用到全部场景');
                console.log("effectApplyOn  input--------");
                //console.log($(this).is(':checked'));
                //console.log($(this).prop("checked"));
                currentScene = krpano.get("xml.scene");
                snowCurName="snow"+currentScene;

                if($(this).is(':checked')){
                    console.log("effectApplyOn---checked");
                    // add html xml
                    krpano.call('addEffect(rain)');
                    var newAddEffect = {sceneName: currentScene, isOpen: true, effectType: "rain",effectImgPath:""};
                    effectObj.effectSettings.push(newAddEffect);
                    $("#effectList label input").eq(0).prop("checked",true);
                }
                else{
                    console.log("effectApplyOff---unchecked");
                    krpano.call("removeplugin(snow)");
                    effectObj.effectSettings.forEach(function(item) {
                        if(item.sceneName == currentScene){
                            item.isOpen = false;
                        }
                    })
                    $("#effectList label input").prop("checked",false);
                    $("#effectImgList li").removeClass('listSelected');
                }
            });

            $("#effectApplyAll").click(function (){

                applyAllStatus=1;
                var thisCheckedValue;
                var thisIdNow,oImgUrl;
                if($("#effectList label input:checked").length == 1){
                   thisIdNow = $("#effectList label input:checked").attr('effctid');
                   thisCheckedValue=$("#effectList label input:checked").val();
                }else{
                    thisIdNow = $("#selectImage img").attr('rel_id');
                    oImgUrl = $("#selectImage img").attr('src');
                    thisCheckedValue = "custom";
                }
                $("#effectApplyAll").html('已应用到全部场景');
                krpano.call('addEffect("'+thisCheckedValue+'","'+oImgUrl+'")');
                console.log(thisIdNow);
                
                // if(thisIdNow == undefined){
                //     panoEffect.switchEffect("0",thisIdNow,oImgUrl);
                // }else{
                //     panoEffect.switchEffect(thisCheckedValue,thisIdNow);
                // }


                /*currentScene = krpano.get("xml.scene");
                var snowCurName="snow"+currentScene;
                // add html xml
                var plugSnowStr='<plugin name="+snowCurName+" zorder="8998" floor="0.7"'+
                    ' url="%SWFPATH%/plugins/snow.swf" alturl="%SWFPATH%/plugins/snow.js"'+
                    ' onloaded="snowballs();"/>';
                $(currentScenesXml).find('scene').append(plugSnowStr);

                // add krpano xml
                krpano.call("addplugin("+snowCurName+")");
                krpano.call("set(plugin["+snowCurName+"].zorder,'8998')");
                krpano.call("set(plugin["+snowCurName+"].floor,'0.7')");
                krpano.call("set(plugin["+snowCurName+"].url,'%SWFPATH%/plugins/snow.swf')");
                krpano.call("set(plugin["+snowCurName+"].alturl,'%SWFPATH%/plugins/snow.js')");
                krpano.call("set(plugin["+snowCurName+"].onloaded,'snowballs();')");

                console.log(krpano.get("plugin["+snowCurName+"].name"));
                //console.log(krpano.get("xml.scene"));

                //console.log(krpano.get("plugin[snow].parent"));
                console.log(krpano.get("plugin["+snowCurName+"].zorder"));
                console.log(krpano.get("plugin["+snowCurName+"].floor"));
                console.log(krpano.get("plugin["+snowCurName+"].url"));
                console.log(krpano.get("plugin["+snowCurName+"].alturl"));
                console.log(krpano.get("plugin["+snowCurName+"].onloaded"));

                loadLocalXml(currentScenesXml, currentScene);

                console.log(currentScenesXml);*/
            });

            $("body").on('click', '#effectList label input', function(event) {
                $("#effectApplyAll").html('应用到全部场景');
                var thisValue=$(this).val();
                var thisIdNow = $(this).attr('effctid');
                // console.log($(this).attr('effctid'));
                $("#effectApplyOn input").prop("checked",true);
                $("#effectImgList li").removeClass('listSelected');
                panoEffect.switchEffect(thisValue,thisIdNow);
                // event.preventDefault();
                /* Act on the event */
            });
            // $("#effectList label input").click(function (){
            //     var thisValue=$(this).val();
            //     console.log(thisValue);
            //     //krpano.call("snowballs();");
            //     panoEffect.switchEffect(thisValue);
            // });
            
            $(".effectUpload button.titleBarClose,.effectBnt button.effectCancle").click(function() {
                $(".effectUpload").hide();
            });

            $(".effectBnt button.effectSubmit").click(function() {
                    $("#effectApplyAll").html('应用到全部场景');
                    $(".effectUpload").hide();
                    if($("#effectImgList").children('li.listSelected').length == 1){

                        var newImg = $("#effectImgList").children('li.listSelected').html();
                        $("#customImage").addClass('isImgEffect');
                        $("#selectImage").empty();
                        $("#selectImage").append(newImg);
                        if($("#customImg").prop('checked')){
                            var oImgUrl = $("#effectImgList").children('li.listSelected').children('img').attr('src');
                            var oId = $("#effectImgList").children('li.listSelected').children('img').attr('rel_id');
                            $("#effectList label input").prop("checked",false);
                            panoEffect.switchEffect("0",oId,oImgUrl);
                        }
                        
                    }

            });
            // $("#selectImage").click(function (){
            //     $("#fileUpload").click();
            // });
            // $("#fileUpload").click(function (){
            //     console.log("fileUpload");
            // });
            $("#customImg").change(function() {
                currentScene = krpano.get("xml.scene");
                if($(this).is(':checked')){
                    var checkEffectBoo = $("#selectImage").children('img').attr('rel_id');
                    if(checkEffectBoo){
                        var EffectUrlImg = $("#selectImage").children('img').attr('src');
                        panoEffect.switchEffect("0",checkEffectBoo,EffectUrlImg);
                        $("#effectList label input").prop("checked",false);
                        $("#effectApplyAll").html('应用到全部场景');
                    }else{
                        $(".effectUpload").show();
                    }
                }else{
                    // console.log("effectApplyOff---unchecked");
                    krpano.call("removeplugin(snow)");
                    $(currentScenesXml).find('scene[name='+currentScene+']').find('plugin[name="snow"]').remove();
                    loadLocalXml(currentScenesXml, currentScene);
                }
            });

            $(".selectImage,.changeImg").click(function() {
                $(".effectUpload").show();
            });

            $("body").on('click', '#effectImgList li', function(event) {
                $(this).addClass('listSelected')
                        .siblings().removeClass('listSelected');
                event.preventDefault();
            });


            // $("#fileUpload").change(function(){

            //     var fileUploadUrl=$("#fileUpload").val();
            //     console.log("fileUploadUrl=="+fileUploadUrl);

            //     //var convertedUrl = getPath(document.getElementById("fileUpload"));
            //     //console.log("convertedUrl=="+convertedUrl);

            //     $("#selectedImage").attr("src","themes/images/"+fileUploadUrl)
            // });
            getEffectDefaultAjax();
            getEffectListAjax();
            panoEffect.effectDefault();
            jQuery('#effectImgList').slimscroll({height: '180px',width: '360px'});

        },

        switchEffect: function (value,thisIdNow,newImg) {
            //console.log(value);
            var funcStr;
            switch(value){
                case "rain":
                    console.log("value=Rain");
                    funcStr="rain";
                    //krpano.call("rain();");
                    break;
                case "heavyrain":
                    console.log("value=Heavy Rain");
                    funcStr="heavyrain";
                    //krpano.call("heavyrain();");
                    break;
                case "snow":
                    console.log("value=Default Snow");
                    funcStr="defaultsnow";
                    //krpano.call("defaultsnow();");
                    break;
                case "snowballs":
                    console.log("value=Snow Balls");
                    funcStr="snowballs";
                    //krpano.call("snowballs();");
                    break;
                case "snowflakes":
                    console.log("value=Snow Flakes");
                    funcStr="snowflakes";
                    //krpano.call("snowflakes();");
                    break;
                case "smileys":
                    console.log("value=Smileys");
                    funcStr="smileys";
                    //krpano.call("smileys()");
                    break;
                case "money":
                    console.log("value=Money");
                    funcStr="money";
                    //krpano.call("money();");
                    break;
                case "hearts":
                    console.log("value=Hearts");
                    funcStr="hearts";
                    //krpano.call("hearts();");
                    break;
                case "goldenstars":
                    console.log("value=Golden Stars");
                    funcStr="goldenstars";
                    //krpano.call("goldenstars()");
                    break;
                case "redpackets":
                    console.log("value=Red Packets");
                    funcStr="redpackets";
                    //krpano.call("redpackets();");
                    break;
                default :
            }

            plugSnowStr='<plugin type="1" effectId="'+thisIdNow+'" name="snow" zorder="8998" floor="0.7"'+
                ' url="%SWFPATH%/plugins/snow.swf" alturl="%SWFPATH%/plugins/snow.js"'+
                ' onloaded="'+funcStr+'();"/>';
            if(newImg != undefined){
                plugSnowStr='<plugin type="2" effectId="'+thisIdNow+'" name="snow" zorder="8998" floor="0.7"'+
                    ' url="%SWFPATH%/plugins/snow.swf" alturl="%SWFPATH%/plugins/snow.js"'+
                    ' onloaded="customize('+newImg+');"/>';
            }

                // console.log(thisIdNow);
            //console.log(plugSnowStr);
            currentScene = krpano.get("xml.scene");

            krpano.call("removeplugin(snow)");
            console.log("applyAllStatus==="+applyAllStatus);
            if(applyAllStatus==1){
                console.log("applyAllStatus===1");
                applyAllStatus=0;
                $(currentScenesXml).find('scene').find('plugin[name="snow"]').remove();
                var onCheckedIs=$("#effectApplyOn input").is(':checked');
                console.log("onCheckedIs==="+onCheckedIs);

                if(onCheckedIs==true){
                    $(currentScenesXml).find('scene').append(plugSnowStr);
                }
            }else{
                console.log("applyAllStatus===0");
                $(currentScenesXml).find('scene[name='+currentScene+']').find('plugin[name="snow"]').remove();
                $(currentScenesXml).find('scene[name='+currentScene+']').append(plugSnowStr);
            }
            loadLocalXml(currentScenesXml, currentScene);
        },

        effectDefault: function () {
            var nowScene = krpano.get("xml.scene");
            var oEffectNow = $(currentScenesXml).find('scene[name='+nowScene+']').find('plugin[name="snow"]');
            var bEffect = oEffectNow.length;
            if(bEffect == 1){
                $("#effectApplyOn input").prop('checked',true);
                var oClassEffect = oEffectNow.attr('type');
                var oInput = oEffectNow.attr('effectId');
                if(oClassEffect == 1){
                    $("#effectList input[effctid="+oInput+"]").prop('checked', true);
                }else if(oClassEffect == 2){
                    $("#effectImgList li").removeClass('listSelected');
                    $("#effectImgList li img[rel_id="+oInput+"]").parent("li").addClass('listSelected');
                    var oAppendStr = $("#effectImgList li.listSelected").html();
                    $("#customImage").addClass('isImgEffect');
                    $("#selectImage").empty();
                    $("#selectImage").append(oAppendStr);
                }
            }else{
                $("#effectApplyOn input").prop('checked',false);
                $("#effectList input").prop('checked', false);
                $("#effectList input").eq(0).prop('checked',true);
                $("#effectImgList li").removeClass('listSelected');
                $("#customImage").removeClass('isImgEffect');
                $("#selectImage").empty();
                $("#selectImage").append('<span>添加照片</span>');
            }
        }

    };
    //console.log(effectPro);
    return pub;
})();

/*
function getPath(obj) {
    if (obj) {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}*/
