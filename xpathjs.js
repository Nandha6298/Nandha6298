
var positiondata;
//var HostingPath = "https://192.168.0.12";
// Live
// var HostingPath = "https://apps.informationevolution.com:8111";
// var HostingPath1 = "https://apps.informationevolution.com:8193";
// Test
//var HostingPath = "https://apps.informationevolution.com:8188";
//var HostingPath1 = "https://apps.informationevolution.com:8189";

  var HostingPath = "http://localhost:3000";
//   var HostingPath1 = "http://localhost:8190";
 var HostingPath1 = "http://localhost:8190";
var LoopFound = []
var LastActionText = "";
var LoopStepText = "";
var Segeration = "";
var NextLoopText = "";
var FinalSourceStep = "";
var ThirdLoopText = "";
var ThirdSourceStep = "";
var SourceStepFinal = "";
var FinalResult = [];
var RulesSave = [];
var arrSplitted = [];
var StartsWitharr ="";
var Rules = {};
var FinalRuleJSON = [];
var IndexCollectionofStartsWith =[];
var select_val = "";
var DataPointText = "";
var FinalDataSteps = "";
$(function () {
    debugger;
   
    SchemaData.CustomSelect()
    $(".select2").select2();
    
    
    chrome.storage.local.get(['Username', 'UserID', 'ROLEID', 'AgentURL','Fac_URL','Domain_URL'], function (result) {
        // if(result.Fac_URL == undefined){

        // }
        // else{
        //     alert(result.Fac_URL)
        // }
         debugger
        //  alert(result.Fac_URL)
        //  alert(result.Domain_URL)
        $("#SpnUserName").text(result.Username)
        $("#SpnUserID").text(result.UserID);
        $("#SpnRoleID").text(result.ROLEID);
        $("#spnhrefdetailsURL").text(result.AgentURL);
     $("#spnDomain").text(result.Domain_URL)
        $("#inpMainURL").val(result.AgentURL)
        if ($("#inpMainURL").val() != "" && $("#inpAgentName").val().trim() != "") {
            $("#inpMainURL").change()
        }
        if(result.Fac_URL != "" || result.Fac_URL !=  undefined){
           
        }
       
        //injectDiviframe("panel.html")
    });
   
    $("#divListingAgent").find("input[name='inpPageLevel']").prop("checked",true).change()

    // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //     console.log(tabs[0].url)
      
    //    debugger
       
    //     chrome.tabs.sendMessage(tabs[0].id, { type: "PreviousURLs",Datapoint:"1"}
        
    //     )

       

    // })
   
    

   $("#btnTargetAdd").off().on("click", function(){
       debugger;
       var LastSegmentDiv = $('.segmentdiv[style*="block"]:last');
       $('.segmentdiv[style*="block"]:last').next().css("display","block")
       
       $('.segmentdiv[style*="block"]:last').find(".drpExtractionURL").css("display","block")

   })
   $("#Btntest").off().on("click", function(){
    debugger;
    var url = $("#txtTargetURL").val();
        window.open(url, '_blank');
        document.location.reload()
        })
   $("#inpAgentName").change(function(){
       
    if($(this).val() != ""){
       var obj = new Object();
       obj.strAgentName = $("#inpAgentName").val().trim()
       obj.intUserID = $("#SpnUserID").text();
       var val = $('#schemalist').val()
       if(val == ""){
        SchemaData.ShowPanel("error","Enter schema Name") 
        $("#inpAgentName").val("") 
       }
       var SchemamasterID = $('#ddlSchemaList option').filter(function () {
         return this.value == val;
     }).data('schemamasterid');
     obj.intSchemaMasterID = SchemamasterID;
     obj.flag = 17;
     $.ajax({
         type: "POST",
         url: HostingPath + "/api/SaveSchemaFinal",
         dataType: 'json',
         async: false,
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(obj),
         success: function (data) {
             debugger;
           if(data.response[0][0].RESULT != "0"){
            SchemaData.ShowPanel("error","Agent Name Already Exists")
            $("#inpAgentName").val("")
           }
           
         }
     })
   

   }
  
})


   $("#btnSaveSchedule").off().on("click", function(){
       if($("#drpFrequencyCD option:selected").val() == "0"){
        SchemaData.ShowPanel("error","Please select schedule type")
       }
       else if($("#Agentlist").val().trim() == ""){
        SchemaData.ShowPanel("error","Please enter agent name")
       }
       else if($("#hdnURLScheduleSchemaID").val() == ""){
        SchemaData.ShowPanel("error","You can't schedule the agent. Kindly train the agent")
       }
       else{
           SchemaData.UpdateorSaveSchedule()
       }
   })
   $("#btnRemoveSchedule").off().on("click", function(){
  
        SchemaData.UpdateorSaveSchedule("2")
    
    
})
   


$("#BtnSaveasNewYes").off().on("click", function(){
    var SegmentDiv = $('.segmentdiv[style*="block"]');
    $.each(SegmentDiv, function(SegmentIteration,objSegmentID){
        debugger;
if(SegmentIteration==0){
var URLSchemaID = $(objSegmentID).find("details").find("#tblSavedSteps").attr("data-urlschemaid");
var ExecutionID = $(objSegmentID).find("details").find("#tblSavedSteps").attr("data-executionid");
var primaryurlschemaid = $(objSegmentID).find("details").find("#tblSavedSteps").attr("data-primaryurlschemaid");
var mainurlschemaid = $(objSegmentID).find("details").find("#tblSavedSteps").attr("data-mainurlschemaid");




}
else{
    if($(objSegmentID).find("input[name='inpPageLevel']").is(":checked")){
        if($(objSegmentID).find("details").find(".tblSavedSteps > tbody").length > 0){
            var URLSchemaID = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-urlschemaid");
            var ExecutionID = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-executionid");
            var primaryurlschemaid = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-primaryurlschemaid");
            var mainurlschemaid = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-mainurlschemaid");
        }
        else{
            var URLSchemaID = $(objSegmentID).find("details").find(".tblStepsCreations").attr("data-urlschemaid");
            var ExecutionID = $(objSegmentID).find("details").find(".tblStepsCreations").attr("data-executionid");
            var primaryurlschemaid = $(objSegmentID).find("details").find(".tblStepsCreations").attr("data-primaryurlschemaid");
            var mainurlschemaid = $(objSegmentID).find("details").find(".tblStepsCreations").attr("data-mainurlschemaid");
        }
        
    }
    else{
        var URLSchemaID = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-urlschemaid");
        var ExecutionID = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-executionid");
        var primaryurlschemaid = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-primaryurlschemaid");
        var mainurlschemaid = $(objSegmentID).find("details").find(".tblSavedSteps").attr("data-mainurlschemaid");
    }
    
}
    })
})
    // CD Dropdown CHange

    $("#drpFrequencyCD").change(function(){
        var SelectedText = $("#drpFrequencyCD option:selected").text();
        if(SelectedText == "Others"){
            $("#divFrequencyPeriod").css("display","inline-block")
        }
        else{
            $("#divFrequencyPeriod").css("display","none")
        }
    })

    $("#btnAPI").off().on("click", function(){   
            var obj = new Object();
            obj.ExecutionID = $("#hdnUserAuditID").val();
        $.ajax({
            type: "POST",
            url: HostingPath1 + "/api/Parsing",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;

            }
        })
    })

    

    $("#inpExecuteStatus").change(function(){
        if($(this).prop("checked") == false){
            $("#drpFrequencyCD").attr("disabled",true)
            $("#drpFrequencyCD").val(0).change()
        }
        else{
            $("#drpFrequencyCD").attr("disabled",false)
            $("#divFrequencyPeriod").css("display","none")
            $("#drpValueFqPeriodDays").val(0)
            $("#drpValueFqPeriod").val(0)
        }
    })

    $("#btnDownloadAgentMultiple").off().on("click", function(){
        var obj = new Object();
        obj.intFlag = "3";
        obj.strAgentURL = $("#spnhrefdetailsURL").text().trim()
        obj.intUserID = $("#SpnUserID").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                var arr = [];
               var resOp = ""
                var AgentList = data.response[0]
                $.each(AgentList, function (i, obj) {
                    resOp =   SchemaData.DecryptDataOPSchemaFromMongoToDownload(obj.ExecutionID,obj.AgentName,"Multiple");
                    var SplitterData = JSON.parse(resOp);
                  var Splitted32000 =  SchemaData.Morethan32000(SplitterData);
                    var arrdrp = []
                    $.each($("#drpSchemaAssign > option"), function(i,obj){
                        arrdrp.push($(obj).text())
                    })
                   // SchemaData.ConvertToCSVDownload(Splitted32000,AgentName,arr);
                   var newarr = []
                   $.each(Splitted32000, function(i,objAdd){
                            delete objAdd['Is_detail_extraction_done'];
                            newarr.push(objAdd)
                   })
arr.push(newarr)

                })
                SchemaData.APIDownload(arr,"test")

                
               
            }
        })
    })

    $("#ancAgentList").off().on("click", function () {
        debugger;
        $(".loadersection").css('display','flex')
        var obj = new Object();
        obj.intFlag = "3";
        obj.strAgentURL = $("#spnhrefdetailsURL").text().trim()
        obj.intUserID = $("#SpnUserID").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                var AgentList = data.response[0]
                $("#tblAgentList > tbody").empty();
                $.each(AgentList, function (i, obj) {
                    var CreatedDate = obj.CreatedDate;
                    var CreatedDate =  CreatedDate.split("-");
                    var CreatedDate = CreatedDate[1] + " " +CreatedDate[2];
                    if(obj.StatusID == "3"){
                        var CountData =  SchemaData.GetHarvestedCount(obj.ExecutionID);
                       
                            $("#tblAgentList > tbody").append(`
                            <tr data-schemamasterid=${obj.SchemaMasterID}  data-AgentURL=${obj.AgentURL} data-mainurlschemaid=${obj.MainURLSchemaID} data-userauditid=${obj.ExecutionID} data-URLSchemaID=${obj.URLSchemaID}> <td style='width: 74%;'>
                            <div class="AgentDetailsList">
                           
                            <div class="popover__wrapper">
      <a href="#">
        <span class="popover__title"> <i class='fa fa-info-circle' title='Info' style='color:#298279'></i>  </span>
      </a>
      <div class="popover__content">
      
        <li> <b> Extracted On </b> - ${obj.HarvestedDate}</li>
        <li> <b> Trained By </b> - ${obj.UserName}</li>
        <li> <b> Schedule Type </b> - ${obj.ScheduleType == "" ? "" : obj.ScheduleType}</li>
        <li> <b> Next Schedule Date </b> - ${obj.NextRunDate == "" ? "" : obj.NextRunDate}</li>
        
      </div>
    </div>
    <div>
    <span class ='spnAgentName'>${obj.AgentName}</span>
    <span class="CreatedDate"
    >${CreatedDate}</span>
    </div>
    </div>
    
                          
                            </td> <td class="flex-between"> 
                            <i title="Click to Download" style="cursor:pointer;font-size:17px" class='fa fa-download icnedit'></i>
                            <i class='fa fa-edit inceditAgent' style='cursor:pointer' title='Edit'></i>
                            <img class="icons-size applyrule" src="./images/parse.png"  style='cursor:pointer' title="Click to Parsing and Download" />
                            </td> </tr>
                            `)

                            $(".inceditAgent").off().on("click", function(){
                                debugger;
                              
                                var ExecutionID = $(this).closest('tr').attr("data-userauditid");
                                var AgentName = $(this).closest("tr").find("span.spnAgentName").text().trim();
                                var SchemaMasterID = $(this).closest("tr").attr("data-schemamasterid")
                                $("#hdnSchemaMasterID").val(SchemaMasterID)
                                var AgentDetails_URLSchemaID = $(this).closest('tr').attr("data-urlschemaid")
                                var AgentDetails_MainURLSchemaID = $(this).closest('tr').attr("data-mainurlschemaid")
                                if(AgentDetails_MainURLSchemaID != 0){
                                    AgentDetails_URLSchemaID = AgentDetails_MainURLSchemaID
                                }
                                var DataURL = $(this).closest('tr').attr("data-agenturl")
                               
                                if(DataURL == $("#spnhrefdetailsURL").text().trim()){
                                    
                                    $(".removepage").css("pointer-events","auto")
                                // $("#icndelete").css("display","none")
                                $("#tblStepsCreations >tbody").empty();
                                $("#tblStepsCreations").css("display","none");
                                $("#tblSavedSteps").empty();
                                $("#ancTrainedAgent").click()
                                $("#inpEditType").val("1")
                                $("input[name='rdnAgentType'][value='2']").prop("checked",true).change()
                                $("#divSubmit").css("display","block")
                                $("#Agentlist").val(AgentName)
                                $("#hdnURLSchemaID").val($(this).closest('tr').attr("data-urlschemaid"))
                                SchemaData.GetListDetailsofAgentURLAgentDetails(AgentDetails_URLSchemaID,"Edit")
                                SchemaData.GetAgentScheduleDetails(AgentDetails_URLSchemaID)
                                $("#schemalist").change()
                                }
                                else{
                                    SchemaData.ShowPanel("error","Edit option not enabled for the URL")
                                }
                                  
                                
                            })
                        
                    }
                    else if(obj.StatusID == "4"){
                        $("#tblAgentList > tbody").append(`
                        <tr data-schemamasterid=${obj.SchemaMasterID} data-AgentURL=${obj.AgentURL} data-mainurlschemaid=${obj.MainURLSchemaID} data-userauditid=${obj.ExecutionID} data-URLSchemaID=${obj.URLSchemaID}> <td style='width: 74%;'>
                        <div class="AgentDetailsList">
                        
                        <div class="popover__wrapper">
                        <a href="#">
                          <span class="popover__title"> <i class='fa fa-info-circle' style='color:#298279' title='Info'></i>  </span>
                        </a>
                        <div class="popover__content">
                         
                          <li> <b> Extracted On </b> - ${obj.HarvestedDate}</li>
                          <li> <b> Trained By </b> - ${obj.UserName}</li>
                          <li> <b> Schedule Type </b> - ${obj.ScheduleType == "" ? "" : obj.ScheduleType}</li>
        <li> <b> Next Schedule Date </b> - ${obj.NextRunDate == "" ? "" : obj.NextRunDate}</li>
                        </div>
                      </div>
                      <div>
                      <span class ='spnAgentName'>${obj.AgentName}</span> 
                      <span class="CreatedDate"
                      >${CreatedDate}</span>
                      </div>
                      </div>
                      
                     
                        </td> <td data-info = "${obj.Comments}" class="flex-between">  <i class="fa fa-exclamation-circle errorinfo" style='cursor:pointer;color:#d84c4c;font-size:23px' aria-hidden="true"></i> 
                        <i class='fa fa-edit inceditAgent' style='cursor:pointer' title='Edit'></i>
                        <i class='fa fa-download icnedit' style='cursor:pointer; ${obj.Comments == "Download and Stopped" ? "display:block":"display:none"}' title='Edit'></i>
                       
                        </td> </tr>
                        `)
                        $(".inceditAgent").off().on("click", function(){
                            debugger;
                          
                            var ExecutionID = $(this).closest('tr').attr("data-userauditid");
                            var AgentName = $(this).closest("tr").find("span.spnAgentName").text().trim();
                            var SchemaMasterID = $(this).closest("tr").attr("data-schemamasterid")
                            $("#hdnSchemaMasterID").val(SchemaMasterID)
                            var AgentDetails_URLSchemaID = $(this).closest('tr').attr("data-urlschemaid")
                            var AgentDetails_MainURLSchemaID = $(this).closest('tr').attr("data-mainurlschemaid")
                            if(AgentDetails_MainURLSchemaID != 0){
                                AgentDetails_URLSchemaID = AgentDetails_MainURLSchemaID
                            }
                            var DataURL = $(this).closest('tr').attr("data-agenturl")
                           
                            if(DataURL == $("#spnhrefdetailsURL").text().trim()){    
                            $(".removepage").css("pointer-events","auto")
                            // $("#icndelete").css("display","none")
                            $("#tblStepsCreations >tbody").empty();
                            $("#tblStepsCreations").css("display","none");
                            $("#tblSavedSteps").empty();
                            $("#ancTrainedAgent").click()
                            $("#inpEditType").val("1")
                            $("input[name='rdnAgentType'][value='2']").prop("checked",true).change()
                            $("#divSubmit").css("display","block")
                            $("#Agentlist").val(AgentName)
                            $("#hdnURLSchemaID").val($(this).closest('tr').attr("data-urlschemaid"))
                            SchemaData.GetListDetailsofAgentURLAgentDetails(AgentDetails_URLSchemaID,"Edit")
                            SchemaData.GetAgentScheduleDetails(AgentDetails_URLSchemaID)
                            $("#schemalist").change()
                            }
                            else{
                                SchemaData.ShowPanel("error","Edit option not enabled for the URL")
                            }
                              
                            
                        })
                    }
                    else if(obj.StatusID == "5"){
                        $("#tblAgentList > tbody").append(`
                        <tr data-schemamasterid=${obj.SchemaMasterID} data-AgentURL=${obj.AgentURL} data-mainurlschemaid=${obj.MainURLSchemaID} data-userauditid=${obj.ExecutionID} data-URLSchemaID=${obj.URLSchemaID}> <td style='width: 74%;'>
                        <div class="AgentDetailsList">
                        
                        <div class="popover__wrapper">
                        <a href="#">
                          <span class="popover__title"> <i class='fa fa-info-circle' style='color:#298279' title='Info'></i>  </span>
                        </a>
                        <div class="popover__content">
                         
                          <li> <b> Extracted On </b> - ${obj.HarvestedDate}</li>
                          <li> <b> Trained By </b> - ${obj.UserName}</li>
                          <li> <b> Schedule Type </b> - ${obj.ScheduleType == "" ? "" : obj.ScheduleType}</li>
        <li> <b> Next Schedule Date </b> - ${obj.NextRunDate == "" ? "" : obj.NextRunDate}</li>
                        </div>
                      </div>
                      <div>
                      <span class ='spnAgentName'>${obj.AgentName}</span> 
                      <span class="CreatedDate"
                      >${CreatedDate}</span>
                      </div>
                      </div>
                      
                     
                        </td> <td data-info = "${obj.Comments}" class="flex-between">  <i class="fa fa-exclamation-circle errorinfo" style='cursor:pointer;color:#d84c4c;font-size:23px' aria-hidden="true"></i> 
                        <i class='fa fa-edit inceditAgent' style='cursor:pointer' title='Edit'></i>
                        <i class='fa fa-download icnedit' style='cursor:pointer;${obj.Comments == "Download and Stopped" ? "display:block":"display:none"}' title='Download'></i>
                       <i class='fa fa-refresh waitandrefresh' title='Wait and Refresh' style='cursor:pointer;font-size:17px;${obj.Comments == "Download and Stopped" ? "display:none":"display:block"}'></i>
                        </td> </tr>
                        `)

                        $(".waitandrefresh").off().on("click", function(){
                            var ExecutionID = $(this).closest('tr').attr("data-userauditid");
                             var Comments =    SchemaData.GetHarvestedStatusIDOnRUn(ExecutionID,"Refresh")
                             Comments = Comments.split("||")[1];
                                if(Comments == "Download and Stopped" ){
                                    $(this).closest('tr').find("td").find(".icnedit").css("display","block")
                                    $(this).closest('tr').find("td").find(".waitandrefresh").css("display","none")
                                }
                                else if(Comments == "Stopped"){
                                    $(this).closest('tr').find("td").find(".icnedit").css("display","none")
                                    $(this).closest('tr').find("td").find(".waitandrefresh").css("display","none")
                                }
                                
                        })
                        $(".inceditAgent").off().on("click", function(){
                            debugger;
                          
                            var ExecutionID = $(this).closest('tr').attr("data-userauditid");
                            var AgentName = $(this).closest("tr").find("span.spnAgentName").text().trim();
                            var SchemaMasterID = $(this).closest("tr").attr("data-schemamasterid")
                            $("#hdnSchemaMasterID").val(SchemaMasterID)
                            var AgentDetails_URLSchemaID = $(this).closest('tr').attr("data-urlschemaid")
                            var AgentDetails_MainURLSchemaID = $(this).closest('tr').attr("data-mainurlschemaid")
                            if(AgentDetails_MainURLSchemaID != 0){
                                AgentDetails_URLSchemaID = AgentDetails_MainURLSchemaID
                            }
                            var DataURL = $(this).closest('tr').attr("data-agenturl")
                           
                            if(DataURL == $("#spnhrefdetailsURL").text().trim()){    
                            $(".removepage").css("pointer-events","auto")
                            // $("#icndelete").css("display","none")
                            $("#tblStepsCreations >tbody").empty();
                            $("#tblStepsCreations").css("display","none");
                            $("#tblSavedSteps").empty();
                            $("#ancTrainedAgent").click()
                            $("#inpEditType").val("1")
                            $("input[name='rdnAgentType'][value='2']").prop("checked",true).change()
                            $("#divSubmit").css("display","block")
                            $("#Agentlist").val(AgentName)
                            $("#hdnURLSchemaID").val($(this).closest('tr').attr("data-urlschemaid"))
                            SchemaData.GetListDetailsofAgentURLAgentDetails(AgentDetails_URLSchemaID,"Edit")
                            SchemaData.GetAgentScheduleDetails(AgentDetails_URLSchemaID)
                            $("#schemalist").change()
                            }
                            else{
                                SchemaData.ShowPanel("error","Edit option not enabled for the URL")
                            }
                              
                            
                        })
                    }
                    else if(obj.StatusID == "2") {
                    //    var PrimaryExecutionID = SchemaData.GetPrimaryRexecutionID(obj.ExecutionID);
                     //   if(PrimaryExecutionID != "0"){
                          var CountData =  SchemaData.GetHarvestedCount(obj.ExecutionID);
                      //  var Finalop =     CountData.split("||")[1]+" / "+CountData.split("||")[0]
                   //     }
                    //    else{
                           Finalop = CountData; 
                     //   }
                        $("#tblAgentList > tbody").append(`
                        <tr data-schemamasterid=${obj.SchemaMasterID} data-AgentURL=${obj.AgentURL} data-userauditid=${obj.ExecutionID} data-URLSchemaID=${obj.URLSchemaID}> <td style='width: 74%;'>
                        <div class="AgentDetailsList">              
                        <div style="padding-left: 35px;">
                        <span class ='spnAgentName'>${obj.AgentName}</span>
                        <span class="CreatedDate">${CreatedDate}</span>
                        </div></div>
     
                        </td> <td>
                        <div class="flex-con">       
     <span class='badge'>${Finalop}</span> <i class="fa fa-spinner fa-spin" title='WIP' aria-hidden="true"></i>
     <i class='fa fa-stop stopurl' style='cursor:pointer;${obj.IsScheduledExecution == "1" ? "display:none" : "display:block" }' title='Stop' aria-hidden="true"></i>
    
     </div>
                        </td> </tr>
                        `)
                      
                        // fa fa-spinner fa-spin progress  
                    }
                    else if(obj.StatusID == "1"){
                        $("#tblAgentList > tbody").append(`
                        <tr data-schemamasterid=${obj.SchemaMasterID} data-AgentURL=${obj.AgentURL} data-mainurlschemaid=${obj.MainURLSchemaID} data-userauditid=${obj.ExecutionID} data-URLSchemaID=${obj.URLSchemaID}> <td style='width: 74%;'>
                        <div class="AgentDetailsList">
                       
                        <div class="popover__wrapper">
  <a href="#">
    <span class="popover__title"> <i class='fa fa-info-circle' title='Info' style='color:#298279'></i>  </span>
  </a>
  <div class="popover__content">
    <li> <b> Trained By </b> - ${obj.UserName}</li>
    <li> <b> Schedule Type </b> - ${obj.ScheduleType == "" ? " " : obj.ScheduleType}</li>
    <li> <b> Next Schedule Date </b> - ${obj.NextRunDate == "" ? " " : obj.NextRunDate}</li>
    
  </div>
</div>
<div>
<span class ='spnAgentName'>${obj.AgentName}</span>
<span class="CreatedDate"
>${CreatedDate}</span>
</div>
</div>

                      
                        </td> <td class="flex-between"> 
                        
                        <i class='fa fa-edit inceditAgent' style='cursor:pointer' title='Edit'></i>
                        </td> </tr>
                        `)

                        $(".inceditAgent").off().on("click", function(){
                            debugger;
                          
                            var ExecutionID = $(this).closest('tr').attr("data-userauditid");
                            var AgentName = $(this).closest("tr").find("span.spnAgentName").text().trim();
                           var SchemaMasterID = $(this).closest("tr").attr("data-schemamasterid")
                           $("#hdnSchemaMasterID").val(SchemaMasterID)
                            var AgentDetails_URLSchemaID = $(this).closest('tr').attr("data-urlschemaid")
                            var AgentDetails_MainURLSchemaID = $(this).closest('tr').attr("data-mainurlschemaid")
                            if(AgentDetails_MainURLSchemaID != 0){
                                AgentDetails_URLSchemaID = AgentDetails_MainURLSchemaID
                            }
                            var DataURL = $(this).closest('tr').attr("data-agenturl")
                           
                            if(DataURL == $("#spnhrefdetailsURL").text().trim()){
                               
                                $(".removepage").css("pointer-events","auto")
                            // $("#icndelete").css("display","none")
                            $("#tblStepsCreations >tbody").empty();
                            $("#tblStepsCreations").css("display","none");
                            $("#tblSavedSteps").empty();
                            $("#ancTrainedAgent").click()
                            $("#inpEditType").val("1")
                            $("input[name='rdnAgentType'][value='2']").prop("checked",true).change()
                            $("#divSubmit").css("display","block")
                            $("#Agentlist").val(AgentName)
                            $("#hdnURLSchemaID").val($("#hdnURLSchemaID").val($(this).closest('tr').attr("data-urlschemaid")))
                            SchemaData.GetListDetailsofAgentURLAgentDetails(AgentDetails_URLSchemaID,"Edit")
                            SchemaData.GetAgentScheduleDetails(AgentDetails_URLSchemaID)
                            //$("#schemalist").change()
                            }
                            else{
                                SchemaData.ShowPanel("error","Edit option not enabled for the URL")
                            }
                              
                            
                        })
                    }
                   
                   
                 })

                 $(".refresh").off().on("click", function(){
                    $("#ancAgentList").click()
                 })
                 $(".errorinfo").off().on("click", function(){
                    debugger;
                  //  var errorDetails = $(this).parent().attr("data-info");
                    var errortext = "";
                    var Userinfo = $(this).parent().attr("data-info").split("#||#");
                    if( $(this).parent().attr("data-info") == "Download and Stopped"){
   SchemaData.ShowPanel("error",$(this).parent().attr("data-info"))

   errortext = "1"
                    }
                    else{
                        errortext = "1"
                        SchemaData.ShowPanel("error",$(this).parent().attr("data-info"))
                    }
                    if(errortext != "1"){
                        $.each(Userinfo, function(i,objError){
                            if(i == "1"){
                                if(objError.split("##").length > 1){
                                 var StepsText =   objError.split("@@@")[1]
                                 if(objError.split("@@@").length > 1){
                                   errortext = objError.split("@@@");
                                   if(StepsText == undefined){
                                       errortext = errortext[0].split("##")[1];
                                   }
                                   else{
                                       errortext = StepsText + " : " + errortext[0].split("##")[1];
                                   }
                                   
                                 }
                                 else{
                                   errortext = objError.split("@@@");
                                   if(StepsText == undefined){
                                       errortext = errortext[0].split("##")[1];
                                   }
                                   else{
                                       errortext = StepsText + " : " + errortext[0].split("##")[1];
                                   }
                                  // errortext = StepsText + objError.split("@@@")[1];
                                 }
                                  
                                }
                                else{
                                
                                   var StepsText =   objError.split("@@@")[1]
                                   errortext = objError.split("@@@");
                                //   errortext = StepsText + errortext.split("##")[1];
                                if(StepsText == undefined){
                                   errortext = errortext[0].split("##")[0];
                               }
                               else{
                                   errortext = StepsText + " : " + errortext[0].split("##")[0];
                               }
                                }
                              
                       
                            }
                            else if(i != "0") {
                               if(objError.split("##").length > 1){
                                   var StepsText =   objError.split("@@@")[1]
                                   if(objError.split("@@@").length > 1){
                                   var  errortext1 = objError.split("@@@");
                                   if(StepsText == undefined){
                                       errortext1 = errortext1[0].split("##")[0];
                                   }
                                   else{
                                       errortext1 =  StepsText + " : " + errortext1[0].split("##")[0];
                                   }
                                  
                                   }
                                   else{
                                   var  errortext1 = objError.split("@@@");
                                   if(StepsText == undefined){
                                       errortext1 = errortext1[0].split("##")[0];
                                   }
                                   else{
                                       errortext1 =  StepsText + " : " + errortext1[0].split("##")[0];
                                   }
                                 //  errortext1 = StepsText + " : " + errortext1[0].split("##")[0];
                                  //   errortext = StepsText + objError.split("@@@")[1];
                                   }
                                    
                                  }
                                  else{
                                  
                                     var StepsText =   objError.split("@@@")[1]
                                 var    errortext1 = objError.split("@@@");
                                 if(StepsText == undefined){
                                   errortext1 = errortext1[0].split("##")[0];
                               }
                               else{
                                   errortext1 =  StepsText + " : " + errortext1[0].split("##")[0];
                               }
                                //  errortext1 = StepsText +" : " + errortext1[0].split("##")[0];
                                  }
                               errortext = errortext + " or " +  errortext1;
    
                            }
                        })
                    }
                    if(errortext != "1"){
                        SchemaData.ShowPanel("error",""+errortext+"")
                    }
                    
                 //   errorDetails = errorDetails.split("#||#")[1];
                  //  SchemaData.ShowPanel("error",""+errorDetails+"")

                })

                $(".applyrule").off().on("click", function () {
                    debugger;
                    var AuditID = $(this).closest("tr").attr("data-userauditid");
                    var AgentName = $(this).closest("tr").find("td").find(".spnAgentName").text()
                  var ValueData = SchemaData.ApplyRule(AuditID,AgentName); 
                  var FinalData = SchemaData.ApplyRuleJSON1(ValueData,AuditID,AgentName);
                //      var StatusApplied = SchemaData.GetParsedHarvestedStatusID(AuditID)
                  //                             if(StatusApplied.split("||")[1] == "1" ){
                    //                            SchemaData.DecryptDataOPSchemaFromMongoToDownload(AuditID,AgentName,"Parsed");
                      //                         }
                        //                       else{
                      //  SchemaData.ShowPanel("info","Parsing is inprogress")
                        //                       }

                })
                
                $(".stopurl").off().on("click", function(){
                    var ExecutionID =   $(this).closest("tr").attr("data-userauditid");
                    $("#hdnStopExecutionID").val(ExecutionID)
                    $("#StopProcessModal").modal("show")
                })

                $(".icnedit").off().on("click", function () {
                    debugger;
                    var AuditID =   $(this).closest("tr").attr("data-userauditid");
                    var AgentName = $(this).closest("tr").find("td").find(".spnAgentName").text();
                    $(".loadersection").css('display','flex')
                    SchemaData.DecryptDataOPSchemaFromMongoToDownload(AuditID,AgentName);

                })
                $(".loadersection").css('display','none')
            }
        })

    })

    $("#btnstopprocess").off().on("click", function(){
        $(".loadersection").show()
        var StatusID = SchemaData.GetHarvestedStatusIDOnRUn($("#hdnStopExecutionID").val())
        if(StatusID == "3"){
          //  SchemaData.ShowPanel("info","")
            $("#StopProcessModal").modal("hide")
            $("#ancAgentList").click()
        }
        else{
           var Stopped =  SchemaData.StopURL($("#hdnStopExecutionID").val());
     
        }
        
        
        
    })

   
    
    $(".removepage").off().on("click", function(){
        debugger;
        $('#RemovepageModal').modal('show'); 
        $('#txtGetDeleteId').val($(this).closest("details").parent().attr("id"))
        var id =   $('#txtGetDeleteId').val()
        var text = $("#" + id).find(".summarytagcss").text()
        text = text.trim()
        $('#lblRemovePageName').text(text)
    })
    $("#BtnRemovepageYes").off().on("click", function(){
        debugger;
        var obj = new Object();
        // var id = $(this).closest("details").parent().attr("id");
        var id =   $('#txtGetDeleteId').val();
        // var Control = $(this).closest("details")
        var Control = $("#" + id).find("details")
        var URLSchemaID;
        if(id == "divListingAgent"){
                URLSchemaID = $("#" + id).find("#tblsavedsteps").attr("data-urlschemaid");   
         }
         else{
              URLSchemaID = $("#" + id).find(".tblsavedsteps").attr("data-urlschemaid");
         }
         var PageLevel = $("#" + id).find("summary").attr("page-level")
         obj.intURLSchemaID = URLSchemaID;
         obj.flag = "9";
         $.ajax({
             type: "POST",
             url: HostingPath + "/api/GetSchemaDetails",
             dataType: 'json',
             async: false,
             contentType: "application/json; charset=utf-8",
             data: JSON.stringify(obj),
             success: function (data) {
                 debugger;
                var PageLevelEnd = data.response[0][0].PageLevel;
                 if(PageLevel == PageLevelEnd ){
                        SchemaData.RemoveTargetPage(URLSchemaID,Control)
                 }
                   else{
                 SchemaData.ShowPanel("error","You can't remove next  level target page ")
                  }

             }
         })
         $('#RemovepageModal').modal('hide');
    })
    $("#BtnRemovepageNo").off().on("click", function(){
        $('#RemovepageModal').modal('hide');
    })


    $("input[name='rdnAgentType']").change(function(){
        if($(this).val() == "1"){
            $("#DivUploadType").css("display","none")
            $("#divApplyTo").css("display","none")
            $("#Agentlist").css("display","none")
            $("#inpAgentName").css("display","block")
            $("#btnSaveAsNew").css("display","none")
            $("#divNextrun").css("display","none")
        }
        else if($(this).val() == "2"){
            $("#DivUploadType").css("display","none")
            $("#divApplyTo").css("display","block")
           $("#Agentlist").css("display","block")
            $("#inpAgentName").css("display","none")
            $("#divNextrun").css("display","block")
            $("#btnSaveAsNew").css("display","inline-block")
            SchemaData.AuditIDList("CopyAgents")

        }
    })

    $("input[name='rdnSegmentationUploadType']").change(function(){
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        if($(this).val() == "2"){
           $(CtrlField).find(".divUploadAgent").css("display","block");
           $(CtrlField).find(".divSegmentSelectSchema").css("display","none");
           $(CtrlField).find(".divEnterURLs").css("display","none");
           
        }
        else if($(this).val() == "1"){
            $(CtrlField).find(".divUploadAgent").css("display","none");
            $(CtrlField).find(".divSegmentSelectSchema").css("display","block");
            $(CtrlField).find(".divEnterURLs").css("display","none");
         }
         else if($(this).val() == "4"){
            $(CtrlField).find(".divUploadAgent").css("display","none");
            $(CtrlField).find(".divSegmentSelectSchema").css("display","none");
            $(CtrlField).find(".divEnterURLs").css("display","block");
         }
    })

     


    // $("#Agentlist").change(function(){
    //     $("#inpselectAgent").val("")
       
       
    //     if($(this).val() != ""){
    //         var val = $(this).val();
    //        var AuditID = $('#ddlAgentnamelist option').filter(function () {
    //            return this.value == val;
    //        }).data('auditid');
    //        if(AuditID != "" && AuditID != undefined){
    //         var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"2");
    //         // console.log(DataPointList)
    //         $("#inpselectAgent").val("1");
    //          var Updatedarr = [];
    //          $.each(DataPointList,function(i,obj){
    //              debugger
                
    //              if(obj.Actions == "Onload"){
    //                  obj["ValueInput"] = $("#inpMainURL").val().trim()
    //               Updatedarr.push(obj)
    //              }
    //              else{
    //               Updatedarr.push(obj)
    //              }
             
                 
    //          })
    //          console.log(Updatedarr)
    //          $("#hdnSavedSteps").val(JSON.stringify(Updatedarr))
    //         $("#tblSavedSteps").empty();
    //         $("#tblSavedSteps").css("display","inline-table")
    //         $("#divshowtable").css("display","block")
    //          SchemaData.constructTable("#tblSavedSteps",Updatedarr)
    //          $("#divSubmit").css("display","block")
    //        $("#tblStepsCreations").css("display","none")
    //        $("#tblSavedSteps > tbody > tr").each(function () {
    //           debugger;
    //           if($(this).find(".ActionsVal").text() == "Onload" || $(this).find(".ActionsVal").text() == "MongoDB_red" || $(this).find(".ActionsVal").text() == "Timer" || $(this).find(".ActionsVal").text() == "MongoDB_write" || $(this).find(".ActionsVal").text() == "MongoDB_commit" || $(this).find(".ActionsVal").text() == "Exit" || $(this).find(".ActionsVal").text() == "Loop" ){
    //               $(this).addClass("DN");
    //           }
    //       })
    //        }
    //        else{
    //         $("#inpMainURL").change();
    //        }
        
    //    }
    //    else if($(this).val() == ""){
    //     $("#tblSavedSteps").css("display","none")
    //     $("#tblSavedSteps > thead").remove()
    //     $("#tblSavedSteps > tbody").remove()
    //    }
    // })

    $("#Agentlist").change(function(){
        $("#inpselectAgent").val("")
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
       
        if($(this).val() != ""){
            var val = $(this).val();
           var URLSchemaID = $('#ddlAgentnamelist option').filter(function () {
               return this.value == val;
           }).data('urlschemaid');
                   
          
           if(URLSchemaID != "" && URLSchemaID != undefined){
            SchemaData.GetListDetailsofAgentURLAgentDetails(URLSchemaID,"Load")
           }
         
       }
      
    })


    function parseFullName(nameToParse, partToReturn, fixCase, stopOnError, useLongLists) {
        var parsedName = {
            title: '', first: '', middle: '', last: '', nick: '', suffix: '', error: [], fullname: ''
        };
        var originalFullname = nameToParse;
        var i, j, k, l, m, n, part, comma, titleList, suffixList, prefixList, regex,
          partToCheck, partFound, partsFoundCount, firstComma, remainingCommas,
          nameParts = [], nameCommas = [null], partsFound = [],
          conjunctionList = ['&', 'and', 'et', 'e', 'of', 'the', 'und', 'y'],


        // Validate inputs, or set to defaults
        partToReturn = partToReturn && ['title', 'first', 'middle', 'last', 'nick',
          'suffix', 'error'].indexOf(partToReturn.toLowerCase()) > -1 ?
          partToReturn.toLowerCase() : 'all';
        // 'all' = return object with all parts, others return single part
        if (fixCase === false) fixCase = 0;
        if (fixCase === true) fixCase = 1;
        fixCase = fixCase !== 'undefined' && (fixCase === 0 || fixCase === 1) ?
            fixCase : -1; // -1 = fix case only if input is all upper or lowercase
        if (stopOnError === true) stopOnError = 1;
        stopOnError = stopOnError && stopOnError === 1 ? 1 : 0;
        // false = output warnings on parse error, but don't stop
        if (useLongLists === true) useLongLists = 1;
        useLongLists = useLongLists && useLongLists === 1 ? 1 : 0; // 0 = short lists

        // If stopOnError = 1, throw error, otherwise return error messages in array
        function handleError(errorMessage) {
            if (stopOnError) {
                throw 'Error: ' + errorMessage;
            } else {
                // parsedName.error.push('Error: ' + errorMessage);
            }
        }

        // If fixCase = 1, fix case of parsedName parts before returning
        function fixParsedNameCase(fixedCaseName, fixCaseNow) {
            var forceCaseList = ['e', 'y', 'av', 'af', 'da', 'dal', 'de', 'del', 'der', 'di',
              'la', 'le', 'van', 'der', 'den', 'vel', 'von', 'II', 'III', 'IV', 'J.D.', 'LL.M.',
              'M.D.', 'D.O.', 'D.C.', 'Ph.D.', ];


            var forceCaseListIndex;
            var namePartLabels = [];
            var namePartWords;
            if (fixCaseNow) {
                namePartLabels = Object.keys(parsedName)
                  .filter(function (v) { return v !== 'error'; });
                for (i = 0, l = namePartLabels.length; i < l; i++) {
                    if (fixedCaseName[namePartLabels[i]]) {
                        namePartWords = (fixedCaseName[namePartLabels[i]] + '').split(' ');
                        for (j = 0, m = namePartWords.length; j < m; j++) {
                            forceCaseListIndex = forceCaseList
                              .map(function (v) { return v.toLowerCase(); })
                              .indexOf(namePartWords[j].toLowerCase());
                            if (forceCaseListIndex > -1) { // Set case of words in forceCaseList
                                namePartWords[j] = forceCaseList[forceCaseListIndex];
                            } else if (namePartWords[j].length === 1) { // Uppercase initials
                                namePartWords[j] = namePartWords[j].toUpperCase();
                            } else if (
                                namePartWords[j].length > 2 &&
                                namePartWords[j].slice(0, 1) ===
                                  namePartWords[j].slice(0, 1).toUpperCase() &&
                                namePartWords[j].slice(1, 2) ===
                                  namePartWords[j].slice(1, 2).toLowerCase() &&
                                namePartWords[j].slice(2) ===
                                  namePartWords[j].slice(2).toUpperCase()
                              ) { // Detect McCASE and convert to McCase
                                namePartWords[j] = namePartWords[j].slice(0, 3) +
                                  namePartWords[j].slice(3).toLowerCase();
                            } else if (
                                namePartLabels[j] === 'suffix' &&
                                namePartWords[j].slice(-1) !== '.' &&
                                !suffixList.indexOf(namePartWords[j].toLowerCase())
                              ) { // Convert suffix abbreviations to UPPER CASE
                                if (namePartWords[j] === namePartWords[j].toLowerCase()) {
                                    namePartWords[j] = namePartWords[j].toUpperCase();
                                }
                            } else { // Convert to Title Case
                                namePartWords[j] = namePartWords[j].slice(0, 1).toUpperCase() +
                                  namePartWords[j].slice(1).toLowerCase();
                            }
                        }
                        fixedCaseName[namePartLabels[i]] = namePartWords.join(' ');
                    }
                }
            }
            return fixedCaseName;
        }

        // If no input name, or input name is not a string, abort
        if (!nameToParse || typeof nameToParse !== 'string') {
            handleError('No input');
            parsedName = fixParsedNameCase(parsedName, fixCase);
            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        }

        // Auto-detect fixCase: fix if nameToParse is all upper or all lowercase
        if (fixCase === -1) {
            fixCase = (
              nameToParse === nameToParse.toUpperCase() ||
              nameToParse === nameToParse.toLowerCase() ? 1 : 0
            );
        }

        // Initilize lists of prefixs, suffixs, and titles to detect
        // Note: These list entries must be all lowercase
        if (useLongLists) {

            // Bulk
            suffixList = ['esq', 'esquire', 'jr', 'jnr', 'sr', 'snr', '2', 'ii', 'iii', 'iv',
              'v', 'clu', 'chfc', 'cfp', 'md', 'phd', 'j.d.', 'll.m.', 'm.d.', 'd.o.', 'd.c.',
              'p.c.', 'ph.d.', 'vice chair', 'chair'];


            prefixList = ['a', 'ab', 'antune', 'ap', 'abu', 'al', 'alm', 'alt', 'bab', 'bäck',
              'bar', 'bath', 'bat', 'beau', 'beck', 'ben', 'berg', 'bet', 'bin', 'bint', 'birch',
              'björk', 'björn', 'bjur', 'da', 'dahl', 'dal', 'de', 'degli', 'dele', 'del',
              'della', 'der', 'di', 'dos', 'du', 'e', 'ek', 'el', 'escob', 'esch', 'fleisch',
              'fitz', 'fors', 'gott', 'griff', 'haj', 'haug', 'holm', 'ibn', 'kauf', 'kil',
              'koop', 'kvarn', 'la', 'le', 'lind', 'lönn', 'lund', 'mac', 'mhic', 'mic', 'mir',
              'na', 'naka', 'neder', 'nic', 'ni', 'nin', 'nord', 'norr', 'ny', 'o', 'ua', 'ui\'',
              'öfver', 'ost', 'över', 'öz', 'papa', 'pour', 'quarn', 'skog', 'skoog', 'sten',
              'stor', 'ström', 'söder', 'ter', 'ter', 'tre', 'türk', 'van', 'väst', 'väster',
              'vest', 'von'];

            titleList = ['mr', 'mrs', 'ms', 'miss', 'dr', 'herr', 'monsieur', 'hr', 'frau',
              'a v m', 'admiraal', 'admiral', 'air cdre', 'air commodore', 'air marshal',
              'air vice marshal', 'alderman', 'alhaji', 'ambassador', 'baron', 'barones',
              'brig', 'brig gen', 'brig general', 'brigadier', 'brigadier general',
              'brother', 'canon', 'capt', 'captain', 'cardinal', 'cdr', 'chief', 'cik', 'cmdr',
              'coach', 'col', 'col dr', 'colonel', 'commandant', 'commander', 'commissioner',
              'commodore', 'comte', 'comtessa', 'congressman', 'conseiller', 'consul',
              'conte', 'contessa', 'corporal', 'councillor', 'count', 'countess',
              'crown prince', 'crown princess', 'dame', 'datin', 'dato', 'datuk',
              'datuk seri', 'deacon', 'deaconess', 'dean', 'dhr', 'dipl ing', 'doctor',
              'dott', 'dott sa', 'dr', 'dr ing', 'dra', 'drs', 'embajador', 'embajadora', 'en',
              'encik', 'eng', 'eur ing', 'exma sra', 'exmo sr', 'f o', 'father',
              'first lieutient', 'first officer', 'flt lieut', 'flying officer', 'fr',
              'frau', 'fraulein', 'fru', 'gen', 'generaal', 'general', 'governor', 'graaf',
              'gravin', 'group captain', 'grp capt', 'h e dr', 'h h', 'h m', 'h r h', 'hajah',
              'haji', 'hajim', 'her highness', 'her majesty', 'herr', 'high chief',
              'his highness', 'his holiness', 'his majesty', 'hon', 'hr', 'hra', 'ing', 'ir',
              'jonkheer', 'judge', 'justice', 'khun ying', 'kolonel', 'lady', 'lcda', 'lic',
              'lieut', 'lieut cdr', 'lieut col', 'lieut gen', 'lord', 'm', 'm l', 'm r',
              'madame', 'mademoiselle', 'maj gen', 'major', 'master', 'mevrouw', 'miss',
              'mlle', 'mme', 'monsieur', 'monsignor', 'mr', 'mrs', 'ms', 'mstr', 'nti', 'pastor',
              'president', 'prince', 'princess', 'princesse', 'prinses', 'prof', 'prof dr',
              'prof sir', 'professor', 'puan', 'puan sri', 'rabbi', 'rear admiral', 'rev',
              'rev canon', 'rev dr', 'rev mother', 'reverend', 'rva', 'senator', 'sergeant',
              'sheikh', 'sheikha', 'sig', 'sig na', 'sig ra', 'sir', 'sister', 'sqn ldr', 'sr',
              'sr d', 'sra', 'srta', 'sultan', 'tan sri', 'tan sri dato', 'tengku', 'teuku',
              'than puying', 'the hon dr', 'the hon justice', 'the hon miss', 'the hon mr',
              'the hon mrs', 'the hon ms', 'the hon sir', 'the very rev', 'toh puan', 'tun',
              'vice admiral', 'viscount', 'viscountess', 'wg cdr', 'ind', 'misc', 'mx'];

        } else {


            // Specific
            suffixList = ['esq', 'esquire', 'jr', 'jnr', 'sr', 'snr', '2', 'ii', 'iii', 'iv',
              'md', 'phd', 'j.d.', 'll.m.', 'm.d.', 'd.o.', 'd.c.', 'p.c.', 'ph.d.', 'vice chair', 'chair'];

            prefixList = ['ab', 'bar', 'bin', 'da', 'dal', 'de', 'de la', 'del', 'della', 'der',
              'di', 'du', 'ibn', 'l\'', 'la', 'le', 'san', 'st', 'st.', 'ste', 'ter', 'van',
              'van de', 'van der', 'van den', 'vel', 'ver', 'vere', 'von'];


            titleList = ['dr', 'miss', 'mr', 'mrs', 'ms', 'prof', 'sir', 'frau', 'herr', 'hr',
              'monsieur', 'captain', 'doctor', 'judge', 'officer', 'professor', 'ind', 'misc',
              'mx'];
        }

        // Nickname: remove and store parts with surrounding punctuation as nicknames
        regex = /\s(?:[‘’']([^‘’']+)[‘’']|[“”"]([^“”"]+)[“”"]|\[([^\]]+)\]|\(([^\)]+)\)),?\s/g;
        partFound = (' ' + nameToParse + ' ').match(regex);
        if (partFound) partsFound = partsFound.concat(partFound);
        partsFoundCount = partsFound.length;
        if (partsFoundCount === 1) {
            parsedName.nick = partsFound[0].slice(2).slice(0, -2);
            if (parsedName.nick.slice(-1) === ',') {
                parsedName.nick = parsedName.nick.slice(0, -1);
            }
            nameToParse = (' ' + nameToParse + ' ').replace(partsFound[0], ' ').trim();
            partsFound = [];
        } else if (partsFoundCount > 1) {
            handleError(partsFoundCount + ' nicknames found');
            for (i = 0; i < partsFoundCount; i++) {
                nameToParse = (' ' + nameToParse + ' ')
                  .replace(partsFound[i], ' ').trim();
                partsFound[i] = partsFound[i].slice(2).slice(0, -2);
                if (partsFound[i].slice(-1) === ',') {
                    partsFound[i] = partsFound[i].slice(0, -1);
                }
            }
            parsedName.nick = partsFound.join(', ');
            partsFound = [];
        }
        if (!nameToParse.trim().length) {
            parsedName = fixParsedNameCase(parsedName, fixCase);
            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        }

        // Split remaining nameToParse into parts, remove and store preceding commas
        for (i = 0, n = nameToParse.split(' '), l = n.length; i < l; i++) {
            part = n[i];
            comma = null;
            if (part.slice(-1) === ',') {
                comma = ',';
                part = part.slice(0, -1);
            }
            nameParts.push(part);
            nameCommas.push(comma);
        }

        // Suffix: remove and store matching parts as suffixes
        for (l = nameParts.length, i = l - 1; i > 0; i--) {
            partToCheck = (nameParts[i].slice(-1) === '.' ?
              nameParts[i].slice(0, -1).toLowerCase() : nameParts[i].toLowerCase());
            if (
                suffixList.indexOf(partToCheck) > -1 ||
                suffixList.indexOf(partToCheck + '.') > -1
              ) {
                partsFound = nameParts.splice(i, 1).concat(partsFound);
                if (nameCommas[i] === ',') { // Keep comma, either before or after
                    nameCommas.splice(i + 1, 1);
                } else {
                    nameCommas.splice(i, 1);
                }
            }
        }
        partsFoundCount = partsFound.length;
        if (partsFoundCount === 1) {
            parsedName.suffix = partsFound[0];
            partsFound = [];
        } else if (partsFoundCount > 1) {
            handleError(partsFoundCount + ' suffixes found');
            parsedName.suffix = partsFound.join(', ');
            partsFound = [];
        }
        if (!nameParts.length) {
            parsedName = fixParsedNameCase(parsedName, fixCase);
            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        }

        // Title: remove and store matching parts as titles
        for (l = nameParts.length, i = l - 1; i >= 0; i--) {
            partToCheck = (nameParts[i].slice(-1) === '.' ?
              nameParts[i].slice(0, -1).toLowerCase() : nameParts[i].toLowerCase());
            if (
                titleList.indexOf(partToCheck) > -1 ||
                titleList.indexOf(partToCheck + '.') > -1
              ) {
                partsFound = nameParts.splice(i, 1).concat(partsFound);
                if (nameCommas[i] === ',') { // Keep comma, either before or after
                    nameCommas.splice(i + 1, 1);
                } else {
                    nameCommas.splice(i, 1);
                }
            }
        }
        partsFoundCount = partsFound.length;
        if (partsFoundCount === 1) {
            parsedName.title = partsFound[0];
            partsFound = [];
        } else if (partsFoundCount > 1) {
            handleError(partsFoundCount + ' titles found');
            parsedName.title = partsFound.join(', ');
            partsFound = [];
        }
        if (!nameParts.length) {
            parsedName = fixParsedNameCase(parsedName, fixCase);
            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        }

        // Join name prefixes to following names
        if (nameParts.length > 1) {
            for (i = nameParts.length - 2; i >= 0; i--) {
                if (prefixList.indexOf(nameParts[i].toLowerCase()) > -1) {
                    nameParts[i] = nameParts[i] + ' ' + nameParts[i + 1];
                    nameParts.splice(i + 1, 1);
                    nameCommas.splice(i + 1, 1);
                }
            }
        }

        // Join conjunctions to surrounding names
        if (nameParts.length > 2) {
            for (i = nameParts.length - 3; i >= 0; i--) {
                if (conjunctionList.indexOf(nameParts[i + 1].toLowerCase()) > -1) {
                    nameParts[i] = nameParts[i] + ' ' + nameParts[i + 1] + ' ' + nameParts[i + 2];
                    nameParts.splice(i + 1, 2);
                    nameCommas.splice(i + 1, 2);
                    i--;
                }
            }
        }

        // Suffix: remove and store items after extra commas as suffixes
        nameCommas.pop();
        firstComma = nameCommas.indexOf(',');
        remainingCommas = nameCommas.filter(function (v) { return v !== null; }).length;
        if (firstComma > 1 || remainingCommas > 1) {
            for (i = nameParts.length - 1; i >= 2; i--) {
                if (nameCommas[i] === ',') {
                    partsFound = nameParts.splice(i, 1).concat(partsFound);
                    nameCommas.splice(i, 1);
                    remainingCommas--;
                } else {
                    break;
                }
            }
        }
        if (partsFound.length) {
            if (parsedName.suffix) {
                partsFound = [parsedName.suffix].concat(partsFound);
            }
            parsedName.suffix = partsFound.join(', ');
            partsFound = [];
        }

        // Last name: remove and store last name
        if (remainingCommas > 0) {
            if (remainingCommas > 1) {
                handleError((remainingCommas - 1) + ' extra commas found');
            }
            // Remove and store all parts before first comma as last name
            if (nameCommas.indexOf(',')) {
                parsedName.last = nameParts.splice(0, nameCommas.indexOf(',')).join(' ');
                nameCommas.splice(0, nameCommas.indexOf(','));
            }
        } else {
            // Remove and store last part as last name
            parsedName.last = nameParts.pop();
        }
        if (!nameParts.length) {
            parsedName = fixParsedNameCase(parsedName, fixCase);

            parsedName.fullname = originalFullname.toString();
            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        }

        // First name: remove and store first part as first name
        parsedName.first = nameParts.shift();
        if (!nameParts.length) {
            parsedName = fixParsedNameCase(parsedName, fixCase);

            parsedName.fullname = originalFullname.toString();

            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        }

        // Middle name: store all remaining parts as middle name
        if (nameParts.length > 2) {
            handleError(nameParts.length + ' middle names');
        }
        parsedName.middle = nameParts.join(' ');


        debugger;
        parsedName = fixParsedNameCase(parsedName, fixCase);
        parsedName.fullname = originalFullname.toString();
        return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
    }


    $("input[name='rdnApplyTo']").change(function(){
        $("#DivUploadType").css("display","block")
    })

    $("input[name='rdnApplyToSegmentation']").change(function(){
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
       $(CtrlField).find(".DivSegmentationUploadType").css("display","block")
        SchemaData.AuditIDList("Segmentation",CtrlField);
    })

    $("input[name=inpPageLevel]").change(function(){
        $("input[name=inpPageLevel]").prop("checked",false);
        $(this).prop("checked",true);
      
        chrome.storage.local.get(['Username', 'UserID', 'ROLEID', 'AgentURL'], function (result) {
            var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        
            $(CtrlField).find(".inpSegementaionURLDetailedURL").val(result.AgentURL); 

           
            

        })
    })

    $("#btnSaveandExit").off().on("click", function(){
        $("#btnSubmitft").click()
    })

    $("#drpExtractionURL").change(function(){
        if( $("#drpExtractionURL option:selected").val() != " -- Select Extraction URL Field --"){
            $("#spnExtractionURL").text($("#drpExtractionURL option:selected").val())
        }

    })

    $(".drpExtractionURL").change(function(){
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
      
        if($(this).val() != "-- Select Extraction URL Field --"){
            var CtrlFieldNotChecked = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:not(:checked)").parent().parent()
            var CtrlInput;
            var LastTarget;
            var FinalDataPointText = "";      
if(CtrlFieldNotChecked.length > 1){
    CtrlInput = $(this);
        LastTarget = $(CtrlInput).closest("details").parent().prev();
   $.each(CtrlFieldNotChecked, function(i,objTblData){
       if($(objTblData).parent().css('display') == 'block' || $(objTblData).parent().css('display') == 'inline-block'){
       
           if(i == "0"){
            var AuditID = $(objTblData).find("#tblSavedSteps").attr("data-executionid")
            var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
            console.log(DataPointList)
         
            FinalDataPointText = DataPointList;
           }
           else {
            var AuditID = $(objTblData).find(".tblSavedSteps").attr("data-executionid")
            var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
            console.log(DataPointList)
            FinalDataPointText = FinalDataPointText  + "," +DataPointList;
           }
       }
     
  
   })
}
else{
    CtrlInput = $(this);
    LastTarget = $(CtrlInput).closest("details").parent().prev();
}

         //   var LastTarget = $(CtrlInput).closest("details").parent().prev();
            if(LastTarget.length > 0){
                if($(LastTarget).find("summary").attr("page-level") == "1"){
                    
                    if($(LastTarget).find("#tblSavedSteps").attr("data-executionid") != "" && $(LastTarget).find("#tblSavedSteps").attr("data-executionid") != undefined){
                        var AuditID = $(LastTarget).find("#tblSavedSteps").attr("data-executionid")
                        var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
                        console.log(DataPointList)
                        DataPointText = DataPointList;
                        var ExtractionURL = $(CtrlField).find(".drpExtractionURL option:selected").val();
                      //  DataPointText = ExtractionURL + DataPointText;
                        $(CtrlField).find(".tblStepsCreations > tbody").append(`
                         <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                                         <td></td>
                                         <td style='display:none'>4</td>
                                         <td style='display:none'>4</td>
                                         <td style='display:none'>1</td>
                                         <td>3</td>
                                         <td class ='configaction'><span>MongoDB_read</span></td>
                                         <td class ="Dn">${ExtractionURL}</td>
                                         <td><span id="spnSimilarPath" class ="inputVal">${AuditID}</span> </td>
                                         <td style="display:none"></td>
                                         <td> <span id="spnSchemaListSimilar">${DataPointText}</span></td>
                                         <td><span id="spnSimilarFileName">${DataPointText}</span></td> 
                                         <td style="display:none"></td>
                                         <td style="display:none">0</td>
                                         <td style="display:none"></td>
                                         <td style="display:none">0</td>
                                         <td style="display:none"></td>
                                         <td style="display:none"></td>
                                        
                                     </tr>
                                     
                         `)
                    }
                   }
                   else{
                    if($(LastTarget).find(".tblSavedSteps").attr("data-executionid") != "" && $(LastTarget).find(".tblSavedSteps").attr("data-executionid") != undefined){
                        var AuditID = $(LastTarget).find(".tblSavedSteps").attr("data-executionid")
                        var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
                        console.log(DataPointList)
                        if(FinalDataPointText != ""){
                            DataPointText = FinalDataPointText;
                        }
                        else{
                            DataPointText = DataPointList;
                        }
                       
                        var ExtractionURL = $(CtrlField).find(".drpExtractionURL option:selected").val();
                      //  DataPointText = ExtractionURL + DataPointText ;
                        $(CtrlField).find(".tblStepsCreations > tbody").append(`
                         <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                                         <td></td>
                                         <td style='display:none'>4</td>
                                         <td style='display:none'>4</td>
                                         <td style='display:none'>1</td>
                                         <td>3</td>
                                         <td class ='configaction'><span>MongoDB_read</span></td>
                                         <td class ="Dn">${ExtractionURL}</td>
                                         <td><span id="spnSimilarPath" class ="inputVal">${AuditID}</span> </td>
                                         <td style="display:none"></td>
                                         <td> <span id="spnSchemaListSimilar">${DataPointText}</span></td>
                                         <td><span id="spnSimilarFileName">${DataPointText}</span></td> 
                                         <td style="display:none"></td>
                                         <td style="display:none">0</td>
                                         <td style="display:none"></td>
                                         <td style="display:none">0</td>
                                         <td style="display:none"></td>
                                         <td style="display:none"></td>
                                        
                                     </tr>
                                     
                         `)
                    }
                   }
            }
            else{

            }
        }
    })
    
    $("input[name='rdnCopyAgent']").change(function(){
        if($("#inpAgentName").val().trim() != ""){
            $("#divsimilarSteps").css("display","block")
           
        }
        else if($("#inpAgentName").val().trim() == ""){
             SchemaData.ShowPanel("error","Please enter Agent Name")
             $("input[name='rdnCopyAgent']").prop("checked",false)
        }
       
    })

    $("input[name='rdnUploadType']").change(function(){
        if($(this).val() == "1"){
            $("#divSelectAgent").css("display","block")
            $("#divUploadAgent").css("display","none")
            $("#divsimilarSteps").css("display","none")
            $("#divEnterURLs").css("display","none")
            SchemaData.AuditIDList();
            $("#similarurl").attr("readonly",false)

        }
        else if($(this).val() == "2"){
            $("#divSelectAgent").css("display","none")
            $("#divUploadAgent").css("display","block")
            $("#divsimilarSteps").css("display","none")
            $("#divEnterURLs").css("display","none")
        }
        else if($(this).val() == "3"){
          
            $("#divsimilarSteps").css("display","block")
            $("#divSelectAgent").css("display","none")
            $("#divUploadAgent").css("display","none")
            $("#divEnterURLs").css("display","none")
        }
        else if($(this).val() == "4"){
          
            $("#divsimilarSteps").css("display","none")
            $("#divSelectAgent").css("display","none")
            $("#divUploadAgent").css("display","none")
            $("#divEnterURLs").css("display","block")
            
        }
    })
   




    $("#HarvestList").off().on("click", function(){
        $(".loadersection").css("display","flex");
    var URLSchemaID =  SchemaData.GetAuditIDandSchemaID()
    var PrimaryExecutionID = SchemaData.GetPrimaryRexecutionID();
    
        var obj = new Object();
        obj.intFlag = "15";
        obj.intURLSchemaID = URLSchemaID
        obj.intUserID = $("#SpnUserID").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                $(".RdoAllHarvest").prop("checked",false)
                $("#tblHarvestedData > tbody").empty();
                if(data.response[0].length > 0){
                    var HarvestList = data.response[0]
                    
                    $.each(HarvestList, function(i,objHarvestList){
                        if(objHarvestList.StatusID == "2"){
                            $("#tblHarvestedData > tbody").append(`
                            <tr data-userauditid = ${objHarvestList.ExecutionID}> <td><input type="checkbox" class="RdoHarvest" name="RdoHarvest"></td> 
                            <td class="SchemaName"> ${objHarvestList.AgentName} <span class='badge' id='spnCountData'></span>   <i class="fa fa-spinner fa-spin"></i></td>
                            </tr>
                            `)
                        }
                        else{
                            $("#tblHarvestedData > tbody").append(`
                            <tr data-userauditid = ${objHarvestList.ExecutionID}> <td><input type="checkbox" class="RdoHarvest" name="RdoHarvest"></td> 
                            <td class="SchemaName"> ${objHarvestList.AgentName} <span class='badge' id='spnCountData'></span>   <i class="fa fa-spinner fa-spin ProgressRule" style='display:none'></i></td>
                            </tr>
                            `)
                        }
                        
                    })
                 
                }
                else{
                    $("#tblHarvestedData > tbody").append(`
                    <tr> <td colspan=2> No Records Found </td> </tr>
                    `) 
                }
                // if(PrimaryExecutionID != "0"){
                //     SchemaData.GetHarvestedCount(PrimaryExecutionID)
                // }
            }
        })
    })

    $("#btnParsingType").click(function(){
        if($( "#btnParsingType" ).hasClass( "active" )){
            $("#OtherTypeParsing").css("display","none")
            $("#NameParsing").css("display","block")
           var ParsedSchemaFields =  SchemaData.NameParsingAPI("","1");
           $("#drpPrasingField").empty();
           $("#drpPrasingField").append(`<option> -- Select Parsing Fields </option>`)
           $("#drpMultiSelectData").empty();
          
           ParsedSchemaFields =   Object.keys(ParsedSchemaFields);
           $.each(ParsedSchemaFields, function(i,objParsedFields){
               if(objParsedFields != "error"){
                $("#drpPrasingField").append(`
                <option>${objParsedFields}</option>
                 `)
                 $("#drpMultiSelectData").append(`
                 <option>${objParsedFields}</option>
                  `)

               }
            
           })
           

        }
        else{
            $("#NameParsing").css("display","none")
            $("#OtherTypeParsing").css("display","block")
        }
    })

    $("#btnNameParsing").off().on("click", function(){
        debugger;
        $("#tblNameParsed > tbody").empty()
        var TestNames = [];
         var ParsedCtrl = $("#tabelCollectionList > tbody > tr");
        
        $.each(ParsedCtrl, function(i,objParsedCtrl){
            var Names = $(objParsedCtrl).find("td > span.dataCollList").text().trim()
            TestNames.push(Names)
        })
        for (var i = 0; i < TestNames.length; i++) {
            debugger;
            var parsedName = {
                title: '', first: '', middle: '', last: '', nick: '', suffix: '', error: [], fullname: ''
            };
            parsedName = parseFullName(TestNames[i].toString(), 'all', 1, 0, 1);
                $("#tblNameParsed > tbody").append(`
                <tr> <td>${parsedName.fullname}</td> <td>${parsedName.first}</td> <td>${parsedName.middle}</td> <td>${parsedName.Title == undefined ? "" : parsedName.Title}</td>  </tr>
                `)
           
            console.log("Full Name: " + parsedName.fullname + "\n" + "Title: " + parsedName.title + "\n" + "First Name: " + parsedName.first + "\n" + "Middle Name: " + parsedName.middle + "\n" + "Last Name: " + parsedName.last + "\n" + "Nick Name: " + parsedName.nick + "\n" + "Suffix: " + parsedName.suffix + "\n" + "Error: " + parsedName.error)
           // alert("Full Name: " + parsedName.fullname + "\n" + "Title: " + parsedName.title + "\n" + "First Name: " + parsedName.first + "\n" + "Middle Name: " + parsedName.middle + "\n" + "Last Name: " + parsedName.last + "\n" + "Nick Name: " + parsedName.nick + "\n" + "Suffix: " + parsedName.suffix + "\n" + "Error: " + parsedName.error)
        }
    })

    $("#ancParsingList").off().on("click", function () {
        debugger;
        SchemaData.ResetParsingTab();
        $(".loadersection").css("display","flex");
        $("#ParsingStepTime").timer({
            action: 'reset',
            seconds: 0
        })
        $("#ParsingStepTime").timer({
            action: 'pause',
            seconds: 0
        })
        $("#ParsingStepTime").css('display','none')
        var obj = new Object();
        obj.intFlag = "13";
        obj.strAgentURL = $("#spnhrefdetailsURL").text().trim()
        obj.intUserID = $("#SpnUserID").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                setTimeout(function(){ 
                    $(".loadersection").css("display","none")
                   
                    if(data.response[0][0] == undefined){
                         SchemaData.ShowPanel("info","No rules found")
                         $("#liParsing").css("opacity","0.4")
                         $("#liParsing").css("pointer-events","none")

                    }
                    else{
                        $("#liParsing").css("opacity","1")
                        $("#liParsing").css("pointer-events","auto")
                        var AuditID = data.response[0][0].ExecutionID;
                        var URLSchemaID = data.response[0][0].URLSchemaID;
                        $("#hdnUserAuditID").val(AuditID)
                        $("#hdnURLSchemaID").val(URLSchemaID)
                        SchemaData.DecryptDataOPSchemaFromMongo(AuditID);
                    }
                   
                }, 3000);
            }
        })

    })
     
    $("#btnUpdateValue").off().on("click", function(){
        debugger
    })

    $(".icneditXpath").off().on("click", function(){
        debugger;
        var CtrlAutoEntry = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
        var CheckedTable = $("#tblStepsCreations input:checkbox:checked").map(function () {
            debugger;
                return $(this);
            }).get();
if(CheckedTable.length > 0){
    $.each(CtrlAutoEntry, function(i,objctrl) {
        if($(objctrl).find("td:first > input:checked").length > 0){
          if($(objctrl).find("td.configaction > span").text() == "Oncollection" || $(objctrl).find("td.configaction > span").text() == "Onclick" || $(objctrl).find("td.configaction > span").text() == "Get"){
             $("#inpValueinput").val($(objctrl).find("td > span.inputVal").text())   
              $("#btnAddSteps").css("display","none")
              $("#btnUpdateValue").css("display","block")
              
          }
          else{
            SchemaData.ShowPanel("error","No option to edit")
          }
        }  

          
  })
}
else{
    SchemaData.ShowPanel("error","Please checkbox to Edit value")
}
        
    })

    $("#icnAddSteps").off().on("click", function(){
        debugger;
        if($("#tblStepsCreations > tbody > tr").length > 2 ){
            var contentData = $("#tblStepsCreations > tbody > tr");
            id = "tblStepsCreations"
        }
        else if ($("#tblSavedSteps > tbody > tr").length > 0){
            id = "tblSavedSteps"
            var contentData = $("#tblSavedSteps > tbody > tr"); 
        }
        var FindLoop = ""
        var FindCheckBox = ""
        $.each(contentData, function () {
           debugger
           if($(this).find("input").is(":checked")){
            FindCheckBox = "Checked";
           }
           if( FindCheckBox == "Checked"){
            if ($(this).find(".configaction > span").text() == "Loop" || $(this).find(".configaction > span").text() == "Oncollection") {
                FindLoop = FindLoop + 1;
               } 
           }
           
        })
        if(FindLoop != ""){
            SchemaData.ShowPanel("error","You can't Add Get data")
           FindLoop = ""
           FindCheckBox = ""
           $("input[name='chkdata']").prop("checked",false)
            return false;
        }
      else{
         if($("#tblSavedSteps > tbody > tr").length > 0){
         if ($("#tblSavedSteps > tbody > tr").find("input").is(":checked")){
             // $("#tblStepsCreations > tbody > tr").find("input").is(":checked")
              debugger;
              var contentData = $("#tblSavedSteps > tbody > tr");
              $.each(contentData, function () {
                  debugger
                  if ($(this).find("td:first").find("input").is(":checked")) {
                      if($("#inpActionItem").val() == ""){
                         SchemaData.ShowPanel("error","Kindly select focus and add steps")
                       
                     }
                     $("#TrainingData").attr("open","open")
                      
                  }  
          })
      }
      else{
          SchemaData.ShowPanel("error","Please click checkbox to add value to next step")
      }
     }
    }
    })
 
    $(".icnAddSteps").off().on("click", function(){
     debugger;
     var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
   
      if($(CtrlField).find(".tblSavedSteps > tbody > tr").length > 0){
      if ($(CtrlField).find(".tblSavedSteps > tbody > tr").find("input").is(":checked")){
          // $("#tblStepsCreations > tbody > tr").find("input").is(":checked")
           debugger;
           var contentData = $(CtrlField).find(".tblSavedSteps > tbody > tr");
           $.each(contentData, function () {
               debugger
               if ($(this).find("td:first").find("input").is(":checked")) {
                   if($("#inpActionItem").val() == ""){
                      SchemaData.ShowPanel("error","Kindly select focus and add steps")
                    
                  }
                  $("#TrainingData").attr("open","open")
                   
               }  
       })
   }
   else{
       SchemaData.ShowPanel("error","Please click checkbox to add value to next step")
   }
  }
 })



    $("#icndEdit").off().on("click", function () {
        if($("#tblStepsCreations > tbody > tr").length > 2){
            if ($("#tblStepsCreations > tbody > tr").find("input").is(":checked")){
                // $("#tblStepsCreations > tbody > tr").find("input").is(":checked")
                 debugger;
                 var contentData = $("#tblStepsCreations > tbody > tr");
                 $.each(contentData, function () {
                     debugger
                     if ($(this).find("td:first").find("input").is(":checked")) {
                      
                         if($(this).find(".configaction > span").text() != "Loop"){
                             $("#btnUpdateSteps").css('display','block');
                             $("#btnAddSteps").css('display','none')
                             $("#btnCancelSteps").css('display','block');
                             $("#inpValueinput").val($(this).find(".inputVal").text())
                         }
                         else{
                             SchemaData.ShowPanel("error", "You can't edit the Loop value");
                         }
                     }  
             })
         }
         else{
             SchemaData.ShowPanel("error","Please click checkbox to Edit value")
         }
        }
        else if($("#tblSavedSteps > tbody > tr").length > 0){
            if ($("#tblSavedSteps > tbody > tr").find("input").is(":checked")){
                // $("#tblStepsCreations > tbody > tr").find("input").is(":checked")
                 debugger;
                 var contentData = $("#tblSavedSteps > tbody > tr");
                 $.each(contentData, function () {
                     debugger
                     if ($(this).find("td:first").find("input").is(":checked")) {
                         var res = $(this).find("td")[5];
                         res =  $(res).find(".ActionsVal").text();
                         var inpValue = $(this).find("td")[7];
                         var attvalue = $(this).find("td")[8].innerText;
                         var atttext = $(this).find("td")[9].innerText;
                         $("#drpAttributeType").attr("disabled",false)
                         $("#spnAttrtext").text(atttext)
                         $("#spnAttrtext").css("display","none")
                         if(res != "Loop"){
                             $("#btnUpdateSteps").css('display','block');
                             $("#btnAddSteps").css('display','none')
                             $("#btnCancelSteps").css('display','block');
                             $("#inpValueinput").val($(inpValue).find("span").text())
                         }
                         else{
                             SchemaData.ShowPanel("error", "You can't edit the Loop value");
                         }
                     }  
             })
         }
         else{
             SchemaData.ShowPanel("error","Please click checkbox to Edit value")
         }
        }
      
        })

        $(".icndEdit").off().on("click", function () {
            var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
            if($(CtrlField).find(".tblStepsCreations > tbody > tr").length > 3){
                if ($(CtrlField).find(".tblStepsCreations > tbody > tr").find("input").is(":checked")){
                    // $("#tblStepsCreations > tbody > tr").find("input").is(":checked")
                     debugger;
                     var contentData = $(CtrlField).find(".tblStepsCreations > tbody > tr");
                     $.each(contentData, function () {
                         debugger
                         if ($(this).find("td:first").find("input").is(":checked")) {
                          
                             if($(this).find(".configaction > span").text() != "Loop"){
                                 $("#btnUpdateSteps").css('display','block');
                                 $("#btnAddSteps").css('display','none')
                                 $("#btnCancelSteps").css('display','block');
                                 $("#inpValueinput").val($(this).find(".inputVal").text())
                             }
                             else{
                                 SchemaData.ShowPanel("error", "You can't edit the Loop value");
                             }
                         }  
                 })
             }
             else{
                 SchemaData.ShowPanel("error","Please click checkbox to Edit value")
             }
            }
            else if($(CtrlField).find(".tblSavedSteps > tbody > tr").length > 0){
                if ($(CtrlField).find(".tblSavedSteps > tbody > tr").find("input").is(":checked")){
                    // $("#tblStepsCreations > tbody > tr").find("input").is(":checked")
                     debugger;
                     var contentData = $(CtrlField).find(".tblSavedSteps > tbody > tr");
                     $.each(contentData, function () {
                         debugger
                         if ($(this).find("td:first").find("input").is(":checked")) {
                             var res = $(this).find("td")[5];
                             res =  $(res).find(".ActionsVal").text();
                             var inpValue = $(this).find("td")[7];
                             var attvalue = $(this).find("td")[8].innerText;
                             var atttext = $(this).find("td")[9].innerText;
                             $("#drpAttributeType").attr("disabled",false)
                             $("#spnAttrtext").text(atttext)
                             $("#spnAttrtext").css("display","none")
                             if(res != "Loop"){
                                 $("#btnUpdateSteps").css('display','block');
                                 $("#btnAddSteps").css('display','none')
                                 $("#btnCancelSteps").css('display','block');
                                 $("#inpValueinput").val($(inpValue).find("span").text())
                             }
                             else{
                                 SchemaData.ShowPanel("error", "You can't edit the Loop value");
                             }
                         }  
                 })
             }
             else{
                 SchemaData.ShowPanel("error","Please click checkbox to Edit value")
             }
            }
          
            })   

        $("#btnUpdateSteps").off().on("click", function () {
            debugger;
            if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){
                if($("#tblStepsCreations > tbody > tr").length > 2){
                    var contentData = $("#tblStepsCreations > tbody > tr");
                    $.each(contentData, function () {
                        debugger
                        if ($(this).find("td:first").find("input").is(":checked")) {
                            $("#btnUpdateSteps").css('display','none');
                            $("#btnAddSteps").css('display','block')
                            $("#btnCancelSteps").css('display','none');
                            var res = $(this).find("td")[5];
                            res =  $(res).find("span").text();
                            var attvalue = $(this).find("td")[8];
                            var atttext = $(this).find("td")[9];
                             var Schemaname = $(this).find("td")[10];
                            if($(this).find(".configaction > span").text() != "Loop"){
                                $(this).find(".inputVal").text($("#inpValueinput").val())
                                if($(this).find(".configaction > span").text() == "Oncollection"){
                                    $("#inpValueinput").attr("data-attrcollection", $("#inpValueinput").val())
                                }
                                else if(res == "Get"){
                                    if($("#inpTargetAttr").val() != ""){
                                        if($("#inpTargetAttr").val() == "text"){
                                            $(attvalue).text("no")
                                            $(atttext).text($("#inpTargetAttr").val())
                                           
                                            
                                        }
                                        else{
                                            $(attvalue).text("yes")
                                            $(atttext).text($("#inpTargetAttr").val())
                                            
                                        }
                                    }
                                    if($("#ddlSchemaAssign").val() != ""){
                                        $(Schemaname).find("span").text($("#ddlSchemaAssign").val())
                                    }
                                   
                                }
                                $("#inpValueinput").val("")
                                $("#drpAttributeType").val("-1").change()
                                $("#ddlSchemaAssign").val("")
                                $('#tblStepsCreations tbody tr td input[type="checkbox"]').prop('checked', false);
                            }
                        }  
                })
                }
                else{
                    var contentData = $("#tblSavedSteps > tbody > tr");
                    $.each(contentData, function () {
                        debugger
                        if ($(this).find("td:first").find("input").is(":checked")) {
                            var res = $(this).find("td")[5];
                            res =  $(res).find(".ActionsVal").text();
                            var inpvalue = $(this).find("td")[7];
                            var attvalue = $(this).find("td")[8];
                            var atttext = $(this).find("td")[9];
                            var Schemaname = $(this).find("td")[10];
                            $("#btnUpdateSteps").css('display','none');
                            $("#btnAddSteps").css('display','block')
                            $("#btnCancelSteps").css('display','none');
                            if(res != "Loop"){
                                $(inpvalue).find("span").text($("#inpValueinput").val())
                                if(res == "Oncollection"){
                                    $("#inpValueinput").attr("data-attrcollection", $("#inpValueinput").val())
                                }
                                else if(res == "Get"){
                                    if($("#inpTargetAttr").val() != ""){
                                        if($("#inpTargetAttr").val() == "text"){
                                            $(attvalue).text("no")
                                            $(atttext).text($("#inpTargetAttr").val())
                                           
                                            
                                        }
                                        else{
                                            $(attvalue).text("yes")
                                            $(atttext).text($("#inpTargetAttr").val())
                                            
                                        }
                                    }
                                    if($("#ddlSchemaAssign").val() != ""){
                                        $(Schemaname).find("span").text($("#ddlSchemaAssign").val())
                                    }
                                   
                                }
                                $("#inpValueinput").val("")
                                $('#tblSavedSteps tbody tr td input[type="checkbox"]').prop('checked', false);
                                $("#spnAttrtext").text("")
                                $("#spnAttrtext").css("display","none")
                                $("#drpAttributeType").val("-1").change()
                                $("#ddlSchemaAssign").val("")
                            }
                        }  
                })
                }
            }
            else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
                if( $(CtrlField).find(".tblStepsCreations > tbody > tr").length > 3){
                    var contentData = $(CtrlField).find(".tblStepsCreations > tbody > tr");
                    $.each(contentData, function () {
                        debugger
                        if ($(this).find("td:first").find("input").is(":checked")) {
                            $("#btnUpdateSteps").css('display','none');
                            $("#btnAddSteps").css('display','block')
                            $("#btnCancelSteps").css('display','none');
                            var res = $(this).find("td")[5];
                            res =  $(res).find("span").text();
                            var attvalue = $(this).find("td")[8];
                            var atttext = $(this).find("td")[9];
                             var Schemaname = $(this).find("td")[10];
                            if($(this).find(".configaction > span").text() != "Loop"){
                                $(this).find(".inputVal").text($("#inpValueinput").val())
                                if($(this).find(".configaction > span").text() == "Oncollection"){
                                    $("#inpValueinput").attr("data-attrcollection", $("#inpValueinput").val())
                                }
                                else if(res == "Get"){
                                    if($("#inpTargetAttr").val() != ""){
                                        if($("#inpTargetAttr").val() == "text"){
                                            $(attvalue).text("no")
                                            $(atttext).text($("#inpTargetAttr").val())
                                           
                                            
                                        }
                                        else{
                                            $(attvalue).text("yes")
                                            $(atttext).text($("#inpTargetAttr").val())
                                            
                                        }
                                    }
                                    if($("#ddlSchemaAssign").val() != ""){
                                        $(Schemaname).find("span").text($("#ddlSchemaAssign").val())
                                    }
                                   
                                }
                                $("#inpValueinput").val("")
                                $("#drpAttributeType").val("-1").change()
                                $("#ddlSchemaAssign").val("")
                                $(CtrlField).find('.tblStepsCreations tbody tr td input[type="checkbox"]').prop('checked', false);
                            }
                        }  
                })
                }
                else{
                    var contentData = $(CtrlField).find(".tblSavedSteps > tbody > tr");
                    $.each(contentData, function () {
                        debugger
                        if ($(this).find("td:first").find("input").is(":checked")) {
                            var res = $(this).find("td")[5];
                            res =  $(res).find(".ActionsVal").text();
                            var inpvalue = $(this).find("td")[7];
                            var attvalue = $(this).find("td")[8];
                            var atttext = $(this).find("td")[9];
                            var Schemaname = $(this).find("td")[10];
                            $("#btnUpdateSteps").css('display','none');
                            $("#btnAddSteps").css('display','block')
                            $("#btnCancelSteps").css('display','none');
                            if(res != "Loop"){
                                $(inpvalue).find("span").text($("#inpValueinput").val())
                                if(res == "Oncollection"){
                                    $("#inpValueinput").attr("data-attrcollection", $("#inpValueinput").val())
                                }
                                else if(res == "Get"){
                                    if($("#inpTargetAttr").val() != ""){
                                        if($("#inpTargetAttr").val() == "text"){
                                            $(attvalue).text("no")
                                            $(atttext).text($("#inpTargetAttr").val())
                                           
                                            
                                        }
                                        else{
                                            $(attvalue).text("yes")
                                            $(atttext).text($("#inpTargetAttr").val())
                                            
                                        }
                                    }
                                    if($("#ddlSchemaAssign").val() != ""){
                                        $(Schemaname).find("span").text($("#ddlSchemaAssign").val())
                                    }
                                   
                                }
                                $("#inpValueinput").val("")
                                $('#tblSavedSteps tbody tr td input[type="checkbox"]').prop('checked', false);
                                $("#spnAttrtext").text("")
                                $("#spnAttrtext").css("display","none")
                                $("#drpAttributeType").val("-1").change()
                                $("#ddlSchemaAssign").val("")
                            }
                        }  
                })
                }
            }
           
           
        
        })

        $("#btnCancelSteps").off().on("click", function(){
            if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){
                $('#tblStepsCreations tbody tr td input[type="checkbox"]').prop('checked', false);
                $("#btnUpdateSteps").css('display','none');
                $("#btnCancelSteps").css('display','none');
                        $("#btnAddSteps").css('display','block')
                        $("#inpValueinput").val("")
            }
            else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
               $(CtrlField).find('.tblStepsCreations tbody tr td input[type="checkbox"]').prop('checked', false);
                $("#btnUpdateSteps").css('display','none');
                $("#btnCancelSteps").css('display','none');
                        $("#btnAddSteps").css('display','block')
                        $("#inpValueinput").val("")
            }
          
        })

        $(".select-items").click(function () {
            debugger;
            // if($(this).closest(".custom-select").find("select").val() != "-1"){
            //     $(this).closest(".custom-select").find("select").change()
            //   }
        })
        $("#rdoNoEndWord").click(function () {
            debugger;
            if ($(this).prop("checked") == true) {
             $("#inpEndswith").val("lastword");
             $('input[name *= inpEnd]').prop('checked', false);    
             $('input[name *= inpEnd]').attr("disabled", true)  
            }
            else {
                $("#inpEndswith").val("") 
                $('input[name *= inpEnd]').attr("disabled", false)          
            }
    
        })

    $("#drpDataParsing").change(function () {
        debugger;
        $("#divStartswith").css("display","none")
        $("#divApplyUSNumber").css("display","none")
 if ($(this).val() == "Index") {
    $("#AddRuleCon").css("display", "flex")
    $(".drpSelectIndex").css("display", "block")
    $("#txtareaReplaceTo").css("display", "none")
    $("#txtareaSplit").attr("readonly", true)
    $("#txtareaSplit").css("display", "none")
    
    
}
     else if($(this).val() == "PhoneNumber"){
        $("#AddRuleCon").css("display", "flex")
        $(".drpSelectIndex").css("display", "none")
        $("#txtareaReplaceTo").css("display", "none")
        $("#txtareaSplit").attr("readonly", true)
        $("#txtareaSplit").css("display", "none")
        $("#divApplyUSNumber").css("display","block")
     }  
else if ($(this).val() == "Position") {
    $("#AddRuleCon").css("display", "flex")
    $(".drpSelectIndex").css("display", "block")
    $("#txtareaReplaceTo").css("display", "none")
    $("#txtareaSplit").attr("readonly", true)
    $("#txtareaSplit").css("display", "none")
}
else if ($(this).val() == "Replace") {
    $("#AddRuleCon").css("display", "flex")
    $("#txtareaReplaceTo").css("display", "block")
    $(".drpSelectIndex").css("display", "none")
    $("#txtareaSplit").attr("readonly", false)
    $("#txtareaSplit").css("display", "block")
}
else if($(this).val() == "Between Words"){
    $("#AddRuleCon").css("display", "none")
    $("#divStartswith").css("display","flex")

}
else if ($(this).val() == "Split" || $(this).val() == "StartsWith" || $(this).val() == "Excludes" || $(this).val() == "Includes") {
    $("#txtareaSplit").css("display", "block");
    $("#AddRuleCon").css("display", "flex");
    $("#txtareaReplaceTo ,.drpSelectIndex").css("display", "none")
    $("#txtareaSplit").attr("readonly", false)
    $(".drpSelectIndex").css("display", "none")
}
else if ($(this).val() != "0") {
    $("#txtareaReplaceTo").css("display", "none")
    $("#AddRuleCon").css("display", "flex")
    $(".drpSelectIndex").css("display", "none")
    $("#txtareaSplit").attr("readonly", false)
    $("#txtareaSplit").css("display", "none")
}
else {
    $("#AddRuleCon").css("display", "flex")
    $(".drpSelectIndex").css("display", "none")
    $("#txtareaReplaceTo").css("display", "none")
    $("#txtareaSplit").attr("readonly", false)
    $("#txtareaSplit").css("display", "none")
}

        // if ($('option:selected', this).attr('data-avoid') != undefined) {
        //     $("#drpIncludeavoid").attr("disabled", false)
        //     $("#drpIncludeavoid").css("display", "inline-block")
        //     $("#txtareaSplit").css("display", "none")
        //     $("#txtareaReplaceTo").css("display", "none")

        // }
        // else {
        //     $("#drpIncludeavoid").attr("disabled", true)
        //     $("#drpIncludeavoid").css("display", "none")
        //     $("#txtareaSplit").css("display", "inline-block")
        //     //  $("#txtareaReplaceTo").css("display", "inline-block")

        // }
    })
    $("#drpSelectIndex").on("select2:select", function (e) { 
         select_val = $(e.currentTarget).val();
        console.log(select_val.toString())
      });
    $("#btnAddRule").off().on("click", function () {
        debugger;

        var drpvalue = $("#drpDataParsing option:selected").val();
      
        if (drpvalue == "Index") {
            var convalue = select_val.toString()
          
        }
        
       else if (drpvalue == "Position") {
            var convalue = select_val.toString()
          
        }
        else if (drpvalue == "Replace") {
            var convalue = $("#txtareaSplit").val() == " " ? "space" + "|RW|" + $("#txtareaReplaceTo").val() : $("#txtareaSplit").val() + "|RW|" + $("#txtareaReplaceTo").val();
        }
        else if(drpvalue == "Between Words" && ($("#inpStartswith").val() == "" || $("#inpEndswith").val() == "")){
         
          SchemaData.ShowPanel("error","Please enter value")
        }
        else {
            var convalue = $("#txtareaSplit").val() == " " ? "space" : $("#txtareaSplit").val();
        }
         if($("#TblSchemaList > tbody > tr > td").find("input:checked").length == "0"){
            SchemaData.ShowPanel("error", "Please select Schema to Add rule")
         }
       else if (drpvalue == "0") {
            SchemaData.ShowPanel("error", "Please select Rule")
        }
        else if (drpvalue == "Replace" && ($("#txtareaSplit").val() == "")) {
            SchemaData.ShowPanel("error", "Please select value")
        }
        else if (drpvalue == "Index" && $("#drpSelectIndex option:selected").val() == "-1") {
            SchemaData.ShowPanel("error", "Please select Index")
        }
        
        else if (drpvalue != "Index" && drpvalue != "Position" && drpvalue != "Between Words"  && drpvalue != "Email" && drpvalue != "City" && drpvalue != "URL" && drpvalue != "PhoneNumber" && drpvalue != "Zipcode"  && $("#txtareaSplit").val() == "") {
            SchemaData.ShowPanel("error", "Please enter value")
        }
        else {
            var bool = SchemaData.RuleExistsValidation();
            if (drpvalue != "0" && convalue != "" && bool == true && drpvalue != "Between Words") {
                var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                $("#tblRule").css("display", "table")
                $("#tblRule > tbody").append(`
            <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>${drpvalue}</label></td> <td><label class ='condition'>${convalue}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
            `)

                $("#txtareaSplit").val("")
                $("#drpDataParsing").val("0")
                $("#drpSelectIndex").val("-1")
                $("#txtareaReplaceTo").val("")
                $("#txtareaReplaceTo").css("display", "none")
                $("#inpStartswith ,#inpEndswith").val("")
                $("input[name=inpstart]").prop("checked", false)
                $("input[name=inpEnd]").prop("checked", false)
                $("#divStartswith").css("display", "none")
                $(".incdelete").off().on("click", function () {
                    debugger;
                    var CtrlPrev = $(this).closest("tr");
                    //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                    //    CtrlPrev.prev().remove()
                    //    $(this).closest("tr").remove()
                    //}
                    if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                        CtrlPrev.next().remove()
                        $(this).closest("tr").remove()
                    }

                    else {
                        $(this).closest("tr").remove()
                    }
                    $(".ulParsedCase > li").remove()
                    if ($("#tblRule > tbody > tr").length > 0) {
                        var Control = $("#tblRule > tbody > tr");
                        $.each(Control, function (i, objIndexRule) {
                            var Index = parseInt(i) + 1;
                            $(objIndexRule).find("td > .ruleindex").text(Index)
                        })

                        SchemaData.RuleDefine(Control);
                    }
                    else{
                        $("#ParsingStepTime").timer({
                            action: 'reset',
                            seconds: 0
                        })
                        $("#ParsingStepTime").timer({
                            action: 'pause',
                            seconds: 0
                        })
                        $("#ParsingStepTime").css('display','none')
                    }
                })
            }
            else if(drpvalue == "Between Words"){
                var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                $("#tblRule").css("display", "table")
                if($("input[name='inpstart']").is(":checked")){
                   var IncludesStartsWithText = "1"
                }
                else{
                    var IncludesStartsWithText = "0"
                }
                if($("input[name='inpEnd']").is(":checked")){
                  var  IncludesEndsWithText = "1"
                }
                else{
                    var IncludesEndsWithText = "0"
                }
               
                convalue = $("#inpStartswith").val() +"|"+ $("#inpEndswith").val();
                $("#tblRule > tbody").append(`
            <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>${drpvalue}</label></td> <td><label class ='condition' data-includes="${IncludesStartsWithText} | ${IncludesEndsWithText}">${convalue}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
            `)

                $("#txtareaSplit").val("")
                $("#drpDataParsing").val("0")
                $("#drpSelectIndex").val("-1")
                $("#txtareaReplaceTo").val("")
                $("#txtareaReplaceTo").css("display", "none")
                $("#divStartswith").css("display", "none")
                $("#inpStartswith ,#inpEndswith").val("")
                $("input[name=inpstart]").prop("checked", false)
                $("input[name=inpEnd]").prop("checked", false)
                $(".incdelete").off().on("click", function () {
                    debugger;
                    var CtrlPrev = $(this).closest("tr");
                    //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                    //    CtrlPrev.prev().remove()
                    //    $(this).closest("tr").remove()
                    //}
                    if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                        CtrlPrev.next().remove()
                        $(this).closest("tr").remove()
                    }

                    else {
                        $(this).closest("tr").remove()
                    }
                    $(".ulParsedCase > li").remove()
                    if ($("#tblRule > tbody > tr").length > 0) {
                        var Control = $("#tblRule > tbody > tr");
                        $.each(Control, function (i, objIndexRule) {
                            var Index = parseInt(i) + 1;
                            $(objIndexRule).find("td > .ruleindex").text(Index)
                        })

                        SchemaData.RuleDefine(Control);
                    }
                    else{
                        $("#ParsingStepTime").timer({
                            action: 'reset',
                            seconds: 0
                        })
                        $("#ParsingStepTime").timer({
                            action: 'pause',
                            seconds: 0
                        })
                        $("#ParsingStepTime").css('display','none')
                    }
                })
            }
            else {
                var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                $("#tblRule").css("display", "table")
                $("#tblRule > tbody").append(`
            <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>${drpvalue}</label></td> <td><label class ='condition'>${convalue}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
            `)

                $("#txtareaSplit").val("")
                $("#drpDataParsing").val("0")
                $("#drpSelectIndex").val("-1")
                $("#txtareaReplaceTo").val("")
                $("#txtareaReplaceTo").css("display", "none")
                $("#inpStartswith ,#inpEndswith").val("")
                $("input[name=inpstart]").prop("checked", false)
                $("input[name=inpEnd]").prop("checked", false)
                $("#divStartswith").css("display", "none")

                $(".incdelete").off().on("click", function () {
                    debugger;
                    var CtrlPrev = $(this).closest("tr");
                    //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                    //    CtrlPrev.prev().remove()
                    //    $(this).closest("tr").remove()
                    //}
                    if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                        CtrlPrev.next().remove()
                        $(this).closest("tr").remove()
                    }

                    else {
                        $(this).closest("tr").remove()
                    }
                    $(".ulParsedCase > li").remove()
                    if ($("#tblRule > tbody > tr").length > 0) {
                        var Control = $("#tblRule > tbody > tr");
                        $.each(Control, function (i, objIndexRule) {
                            var Index = parseInt(i) + 1;
                            $(objIndexRule).find("td > .ruleindex").text(Index)
                        })

                        SchemaData.RuleDefine(Control);
                    }
                }) 
            }
            if ($("#tblRule > tbody > tr").length > 0) {
                var Control = $("#tblRule > tbody > tr");
                SchemaData.RuleDefine(Control);
            }
          
           // $("#divStartswith").css("display", "none")
        }


    })

    $("#btnHarvest").off().on("click", function(){
        if ($(".RdoHarvest").is(":checked")) {
            $(".RdoHarvest").each(function () {
                if ($(this).prop("checked") == true) {
                   debugger;
                   $(this).closest("tr").find(".ProgressRule").css('visibility','visible')  
               var PrimaryExecutionID =  SchemaData.GetPrimaryRexecutionID($(this).closest("tr").attr("data-userauditid"));
               if(PrimaryExecutionID != "0"){
                var Reexecution = SchemaData.Reexecution(PrimaryExecutionID)
               }
                  
                   SchemaData.PythonURL($(this).closest("tr").attr("data-userauditid"))  
                }
                else{
                    $(this).closest("tr").find(".ProgressRule").css('visibility','hidden')  
                }
            })    
        //  SchemaData.PythonURL()
        }
        else {
            SchemaData.ShowPanel("error", "Please Select the checkbox")
            $(".ProgressRule").css('visibility','hidden')                        
        }
    })
    
    // $(".applyrule").off().on("click", function () {
    //     if ($(".RdoHarvest").is(":checked")) {
    //         var ValueData = SchemaData.ApplyRule(); 
    //         var FinalData = SchemaData.ApplyRuleJSON1(ValueData);
    //     }
    //     else {
    //         SchemaData.ShowPanel("error", "Please Select the checkbox")
                                
    //     }
     
    // })


    $(".RdoAllHarvest").off().on("click", function () {
        if ($(this).prop("checked") == true) {
            $(".RdoHarvest").prop('checked', true)
      } 
      else{
        $(".RdoHarvest").prop('checked', false)
      }
    })
    var $tdCheckbox = $(".RdoHarvest");
    var tdCheckboxChecked = 0;
    $('.RdoAllHarvest').on('click', function () {
      $tdCheckbox.prop('checked', this.checked);
    });
    $tdCheckbox.on('change', function(e){
      tdCheckboxChecked =  $(".RdoHarvest:checked").length;
      $('.RdoAllHarvest').prop('checked', (tdCheckboxChecked === $tdCheckbox.length));
    })
    $(".applyrule").off().on("click", function () {
        debugger;
        
        if ($(".RdoHarvest").is(":checked")) {
            $(".RdoHarvest").each(function () {
                if ($(this).prop("checked") == true) {
                   debugger;
                   $(this).closest("tr").find(".ProgressRule").css('visibility','visible')    
                }
                else{
                    $(this).closest("tr").find(".ProgressRule").css('visibility','hidden')  
                }
            })    
            var ValueData = SchemaData.ApplyRule(); 
            var FinalData = SchemaData.ApplyRuleJSON1(ValueData);
        }
        else {
            SchemaData.ShowPanel("error", "Please Select the checkbox")
            $(".ProgressRule").css('visibility','hidden')                        
        }
     
    })



    $("#btnApplyRule").off().on("click", function () {
        var ValueData = SchemaData.ApplyRule();
        var FinalData = SchemaData.ApplyRuleJSON1(ValueData);
        let group = FinalData.reduce((r, a) => {
            console.log("a", a);
            console.log('r', r);
            r[a.SchemaName] = [...r[a.SchemaName]||[], a];
            return r;
        }, {});
        //  console.log("group", group);
        SchemaData.GetRules();
        SchemaData.ApplyLogic(group);
    })

    $("#btnCheckParsing").off().on("click", function (test) {
        debugger;
        var LastItem = $("#tblRule > tbody > tr:last");
        if($(LastItem).find("td >label.drpconditionvalue").text() == "Between Words"){
            $("#drpParsingList").css('display','flex')
        }
        else{
            $("#drpParsingList").css('display','none')
        }
        $(".ulParsedCase > li").remove();
        $(".ulParsedCase > ul").remove()
        
        if ($("#tblRule > tbody > tr").length > 0) {
            if ($("#tblRule > tbody > tr").length > 0) {
                var Control = $("#tblRule > tbody > tr");
                $.each(Control, function (i, objIndexRule) {
                    var Index = parseInt(i) + 1;
                    $(objIndexRule).find("td > .ruleindex").text(Index)
                })

                SchemaData.RuleDefine(Control);
            }
            var ConditionList = JSON.parse($("#hdnParsingCondition").val());
          //  var HeaderList = $("#ddlSchemaAssign").val();
          var HeaderList;
             var ctrl = $("#TblSchemaList > tbody > tr");

             $.each(ctrl, function(i,objctrl){
                 if($(objctrl).find("td > input").is(":checked")){
                    HeaderList =  $(objctrl).find("td > .dataCollList").text().trim()
                 }
             })
             Rules[HeaderList] = ConditionList;
           // Rules[HeaderList] = "value3";

         // SchemaData.ReadCSVFile();
         
          
             console.log(Rules)

             $("#hdnRules").val(JSON.stringify(Rules))
          //  localStorage.setItem("Rules", JSON.stringify(Rules));
          
            SchemaData.segregation(ConditionList);

            SchemaData.OldValues();
           
        }
        else {
            SchemaData.ShowPanel("error", "Please add rule")
        }
        // var res1 = JSON.parse(res);
        //  alert("")
    })

    $("#drpParsingList").off().on("change", function(){
        debugger;          
       var Pos =  $("#drpParsingList").val();
       var LastItem = $("#tblRule > tbody > tr:last");
       if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
           $(LastItem).remove()
       }
       $("#tblRule").css("display", "table")
     
       if(Pos == "-1"){
        $(".UlPreviewlist").css("display","flex")
       }
       else{
        $(".UlPreviewlist").each(function () {
            if($(this).attr("data-pos") != $("#drpParsingList").val()){
                $(this).css('display','none')
            }
            else{
                $(this).css('display','flex')
            }
         })
         var RuleAdd = $("#tblRule > tbody > tr")
         var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
         $.each(RuleAdd, function(i,obj){
             debugger;
             if($(obj).find(".drpconditionvalue").text() != "Position_Index"){
                $("#tblRule > tbody").append(`
                <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                `)
             }
           
         })
       }
        

       $("#txtareaSplit").val("")
       $("#drpDataParsing").val("0")
       $("#drpSelectIndex").val("-1")
       $("#txtareaReplaceTo").val("")
       $("#txtareaReplaceTo").css("display", "none")
       $(".incdelete").off().on("click", function () {
           debugger;
           var CtrlPrev = $(this).closest("tr");
           //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
           //    CtrlPrev.prev().remove()
           //    $(this).closest("tr").remove()
           //}
           if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
               CtrlPrev.next().remove()
               $(this).closest("tr").remove()
           }

           else {
               $(this).closest("tr").remove()
           }
           $(".ulParsedCase > li").remove()
           if ($("#tblRule > tbody > tr").length > 0) {
               var Control = $("#tblRule > tbody > tr");
               $.each(Control, function (i, objIndexRule) {
                   var Index = parseInt(i) + 1;
                   $(objIndexRule).find("td > .ruleindex").text(Index)
               })

               SchemaData.RuleDefine(Control);
           }
           else{
               $("#ParsingStepTime").timer({
                   action: 'reset',
                   seconds: 0
               })
               $("#ParsingStepTime").timer({
                   action: 'pause',
                   seconds: 0
               })
               $("#ParsingStepTime").css('display','none')
           }
       })
       $("#btnCheckParsing").click()
   })
   $("#drpParsingMultiList").off().on("change", function(){
    debugger; 
    if($("#drpParsingMultiList") != -1){
        SchemaData.CustomSelect();
        $("#drpParsingMultiList").closest(".custom-select").css("display","none")
        $("#drpParsingList").closest(".custom-select").css("display","block");
        $("#drpParsingList").css("display","none")
        var Pos =  $("#drpParsingMultiList").val();
           var LastItem = $("#tblRule > tbody > tr:last");
           if($(LastItem).find("td >label.drpconditionvalue").text() == "Index"){
               $(LastItem).remove()
           }
           $("#tblRule").css("display", "table")
         
           if(Pos == "-1"){
            $(".UlPreviewlist").css("display","flex")
           }
           else{
            $(".UlPreviewlist").each(function () {
                if($(this).attr("data-pos") != $("#drpParsingMultiList").val()){
                    $(this).css('display','none')
                }
                else{
                    $(this).css('display','flex')
                }
             })
             var RuleAdd = $("#tblRule > tbody > tr")
             var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
             $.each(RuleAdd, function(i,obj){
                 $("#tblRule > tbody").append(`
                 <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position_Index</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                 `)
             })
           }
            
    
    
    
        var count =  $("#drpParsingMultiList").val();  
        count = count + 1  
        var StartWord = $(".ulParsedCase > ul:nth-child(" + count + ")").find("li").text().trim()
        var StartWord = StartWord.split(' ').slice(0,2).join(' ');
        $("#inpParsingMultiList").val(StartWord)
        // $("#drpParsingList").css("display","flex")
        // var LastItem = $("#tblRule > tbody > tr:last");
        // if($(LastItem).find("td >label.drpconditionvalue").text() == "Between Words"){
        //     var NewParsing = $(LastItem).find("td >label.condition").text().split("|")
        //     var newText = NewParsing[0] + " " + StartWord + "|" + NewParsing[1];  
        //     $(LastItem).find("td >label.condition").text(newText)
        // }
        // $("#btnCheckParsing").click()
        SchemaData.MultiStartWord(StartWord);
    }
  

})


    $("#btnSaveRule").off().on("click", function(){
        debugger;
        var bool = true;
        $("#ParsingStepTime").css('display','block')
        $("#ParsingStepTime").timer({
            action: 'start',
            seconds: 0
        })

        var Ruleexists = $("#tblRule > tbody > tr");
        $.each(Ruleexists, function(i,objSelect){
           debugger;
          if($(objSelect).find("td").find(".drpconditionvalue").text() == "Between Words"){
              if($(objSelect).next().find("td").find(".drpconditionvalue").text() != "Position" && $(objSelect).next().find("td").find(".drpconditionvalue").text() != "Position_Index"){
                bool = false;
                     return bool;
              }
          }
        })

          if(bool == true){
            var CheckedTableSchema = $("#TblSchemaList > tbody > tr");
            $.each(CheckedTableSchema, function(i,objChkTbl){
                if($(objChkTbl).find("td > input").is(":checked")){
                  $(objChkTbl).find("td > .spnremoverule").attr("data-rule",$("#hdnParsingCondition").val())
                  $(objChkTbl).find("td > .spnremoverule").css("display","inline-block")
                  $(objChkTbl).find("td > .viewrule").css("display","inline-block")
                  $(objChkTbl).find("td > .viewrule").attr("data-rule",$("#hdnParsingCondition").val())
                  
                }
            })
  
             $("#tblRule > tbody").empty();
             $("#tblParsedData > tbody > tr").remove();
             $("#tblParsedData > thead > tr").remove();
             $(".ulParsedCase").empty();
          }
           
    })

    $("#btnSaveAsNew").off().on("click", function () {
        debugger;
        $("#DivModalAgentName").css('display','block')
        if ($("#tblStepsCreations > tbody > tr:last").find(".configaction").text() == "MongoDB_write" || $("#tblStepsCreations > tbody > tr:last").find(".configaction").text() == "Onclick" || $("#tblStepsCreations > tbody > tr:last").find(".configaction").text() == "Timer" ) {
            // AgentWorkArea.FinalValidation();
            $("#ApproveModal").modal("show")
            //  exportTableToCSV($("#spnFIleName").text().trim())
           }
           else if($("#tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
            $("#ApproveModal").modal("show")
           }
           else if($("#hdnSavedSteps").val() != ""){
                  
            $("#ApproveModal").modal("show")
          
           }
           else{
               SchemaData.ShowPanel("error", "Kindly check there is no Loop End Action")
           }
   
    })


    $(".btnSaveAsNew").off().on("click", function () {
        debugger;
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        $("#DivModalAgentName").css('display','block')
        if($(CtrlField).find(".tblStepsCreations > tbody > tr").length > 2){
            if ($(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text() == "MongoDB_write" || $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text() == "Onclick" || $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text().includes("Get") == true || $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text().includes("Timer") == true) {
                // AgentWorkArea.FinalValidation();
                $("#ApproveModal").modal("show")
                //  exportTableToCSV($("#spnFIleName").text().trim())
               }
               else if($(CtrlField).find(".tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
                $("#ApproveModal").modal("show")
               }
               else if($("#hdnSavedSteps").val() != ""){
                      
                $("#ApproveModal").modal("show")
              
               }
               else{
                   SchemaData.ShowPanel("error", "Kindly check there is no Loop End Action")
               }
        }
        else{
            SchemaData.ShowPanel("error", "Kindly add training steps")
        }
        
   
    })

    $("#btnSubmitRule").off().on("click", function(){
       
        
        debugger;
        var obj = new Object();
        obj.intFlag = "14";
        obj.intExecutionID = $("#hdnUserAuditID").val();
        obj.strParsingStepsTimeTaken = $("#ParsingStepTime").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
            }

        })
        var FinalRuleForParsing = [];
        var FinalRuleObject = {};
        var GetSavedRule = $("#TblSchemaList > tbody > tr");
        $.each(GetSavedRule, function(i,objSavedRule){
            if($(objSavedRule).find("td > .spnremoverule").attr("data-rule") != ""){
                var SchemaName = $(objSavedRule).find("td > .dataCollList").text() 
              FinalRuleObject = {
                  [SchemaName]:$(objSavedRule).find("td > .spnremoverule").attr("data-rule")
              }
              FinalRuleForParsing.push(FinalRuleObject)
            }
        })
        if(FinalRuleForParsing.length > 0){
           var bool = SchemaData.CheckforInsertionorUpdate();
           if(bool == false){
            SchemaData.InsertRuleinMongo(FinalRuleForParsing,bool)
           }
           else{
            SchemaData.DeletRuleinMongo()   
            SchemaData.InsertRuleinMongo(FinalRuleForParsing,bool)
           }
            
            console.log(FinalRuleForParsing)
            SchemaData.ShowPanel("success", "Rule Inserted Successfully")
            $("#ParsingStepTime").timer({
                action: 'reset',
                seconds: 0
            })
            $("#ParsingStepTime").timer({
                action: 'pause',
                seconds: 0
            })
            $("#ParsingStepTime").css('display','none')
        }
        else{
            SchemaData.ShowPanel("error","No Rule to save")
        }
       
    })

    $("input[name=inpschemacreation]").change(function () {
        if ($(this).val() == "1") {
            $("#divExisting").css("display", "none")
            $("#divNew").css("display", "block")
            $("#inpschemaname").val("")
            $("#divAppendedData").css("display", "none")
            $("#spnEdit").css("display", "none")
            $("#spnAdd").css("display", "inline-block")
            $("#hdnSchemavalue").val("")
            $("#hdnURLSchemaID").val("")
            $("#hdnAppendData").val("")
            $("#inpschemaname").attr("readonly", false)
            $("#inpSchemafielldname").attr("readonly", false)
            $("#tblRootData > tbody").empty()
            //$("#btnUse").attr("disabled", true)
            //$("#btnExecutedisp").attr("disabled", true)
            $("#divSave").css("display", "inline-block")
            $("#divEdit").css("display", "none")
            $("#spnAdd").css("display", "inline-block")
            $("#spnreset").css("display", "none")
            $("#inpdatalistschemaname").empty()
        }
        else {
            //    alert(HostingPath);
            $("#divExisting").css("display", "none")
            $("#divNew").css("display", "block")
            $("#inpschemaname").attr("readonly", false)
            $("#inpSchemafielldname").attr("readonly", false)
            $("#inpSchemafielldname").val("")
            //$("#btnUse").attr("disabled", false)
            //$("#btnExecutedisp").attr("disabled", false)
            $("#spnEdit").css("display", "none")
            $("#divAgentname").css("display", "block")
            $("#spnAdd").css("display", "inline-block")
            $("#divCustomizeURL").css("display", "block")
            SchemaData.LoadSchemaList()
        }

    })

    $("#inpschemaname").off().on("change", function () {



        if ($(this).val().trim() != "") {

            if ($(this).val().trim().length <= 3) {   //"09 - Nov"
                SchemaData.ShowPanel("error", "Kindly enter valid schema name")
            }

            else if ($("input[name='inpschemacreation']:checked").val() == "2") {
                //  $("#divAgentname").css("display","block")

                //    AgentWorkArea.ExistingSchemaName(2, "Exists");
                SchemaData.LoadSchemaHeaderList(2, "Exists");

            }
            else if ($(this).val().trim() != "") {
                SchemaData.ExistingSchemaName();
                //  $("#divAgentname").css("display","none")
            }
        }
        else {
            //  $("#tblRootData > thead").empty()
            $("#tblRootData > tbody").empty()
        }



    })

    $("#btnSave").off().on("click", function () {
        var CheckforRootSchema = $("#tblRootData > tbody > tr");
        var rootfieldnames = [];
        var bool = SchemaData.SaveDataVaidation();
        if (bool == true) {
            // SchemaFieldNameValues
            $.each(CheckforRootSchema, function (i, objRootschemaNames) {
                if ($(objRootschemaNames).find("input[class=inprdnschemaprimaryfield]").is(":checked")) {
                    var arrschemananmes = $(objRootschemaNames).find("td:first > span").text().trim();
                    arrschemananmes = arrschemananmes + ":1";
                    rootfieldnames.push(arrschemananmes)
                }
                else {
                    var arrschemananmes = $(objRootschemaNames).find("td:first > span").text().trim();
                    rootfieldnames.push(arrschemananmes)
                }
            })
            var outputschemalist = rootfieldnames.join(",");
            SchemaData.SaveSchemaDetails(outputschemalist);

        }
    })

    $("#spnAddRule").off().on("click", function(){
        debugger;
        var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
        var SchemaField = $("#drpSchemaField option:selected").val()
        var ParsingField = $("#drpPrasingField option:selected").val()
        var NameParsingField = $("#drpConditionNameParsing option:selected").val()
        var ParsingSchemaFieldData = $('#drpMultiSelectData').val().toString()
        
        $("#tblRule").css("display", "table")
        $("#tblRule > tbody").append(`
    <tr data-save="new" data-samerule="${RuleIndex}"  > <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>${ParsingField}</label></td> <td><label class ='condition'>${SchemaField}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
    `)
    if($("#drpConditionNameParsing option:selected").val() != "0"){
      var  NewRuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
        $("#tblRule > tbody").append(`
        <tr data-save="new" data-samerule="${RuleIndex}" > <td><label class='ruleindex'>${NewRuleIndex}</label></td> <td><label class='drpconditionvalue'>${NameParsingField}</label></td> <td><label class ='condition'>${ParsingSchemaFieldData}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
        `)
    }
    
    
    $(".incdelete").off().on("click", function () {
        debugger;
        var CtrlPrev = $(this).closest("tr");
        //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
        //    CtrlPrev.prev().remove()
        //    $(this).closest("tr").remove()
        //}
        if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
            CtrlPrev.next().remove()
            $(this).closest("tr").remove()
        }

        else {
            $(this).closest("tr").remove()
        }
      
        if ($("#tblRule > tbody > tr").length > 0) {
            var Control = $("#tblRule > tbody > tr");
            $.each(Control, function (i, objIndexRule) {
                var Index = parseInt(i) + 1;
                $(objIndexRule).find("td > .ruleindex").text(Index)
            })

            SchemaData.RuleDefine(Control);
        }
        else{
            $("#ParsingStepTime").timer({
                action: 'reset',
                seconds: 0
            })
            $("#ParsingStepTime").timer({
                action: 'pause',
                seconds: 0
            })
            $("#ParsingStepTime").css('display','none')
        }
    })
  SchemaData.RuleDefine( $("#tblRule > tbody > tr"))
    })

    // Save Existing Schema details

    $("input[name=rdnoverwriteorupdate]").off().on("change", function () {
        if ($("#spnAdd").css("display") == "inline-block" || $("#spnAdd").css("display") == "block") {
            if ($(this).val() == "1") { // Overwrite
                $("#inpschemaname").attr("readonly", true)
                $("#inpschemaname").val($("#hdnSchemavalue").val())
                if ($("#hdnURLSchemaCollection").val() != $("#tblRootData > tbody > tr").length) {

                }
                else {
                    // alert("Not Changed")
                }

            }
            else if ($(this).val() == "0") {
                $("input[name=rdnoverwriteorupdate][value='4']").prop("checked", false)
                $("#btnSave").attr("disabled", true)
                $("#inpschemaname").val("")
                $("#inpdatalistschemaname").empty()
                $("#inpschemaname").attr("readonly", false)
                $("#btnExistsSave").attr("disabled", false)
                // $("#tblRootData > tbody >tr").empty()
                // $("#divAppendedData").css("display","none")
            }
            else if ($(this).val() == "4") {
                $("#inpschemaname").val("")
                $("#inpschemaname").attr("readonly", false)
                $("#btnSaveasNew").attr("disabled", true)
                $("#btnSave").attr("disabled", false)
                $("#divEdit").css("display", "none")
                SchemaData.ResetSchemaData();

            }
        }
        else if ($("#hdnURLSchemaCollection").val() != $("#tblRootData > tbody > tr").length) {
            //   SchemaData.ShowPanel("error", "Kindly add new schema details")
            //   $("#btnSaveasNew").attr("disabled", false)
            if ($(this).val() == "1") {
                $("#inpschemaname").val($("#hdnSchemavalue").val())
                $("#btnSaveasNew").attr("disabled", true)
                $("#btnUpdate").attr("disabled", false)
                $("#btnExistsSave").attr("disabled", true)
            }
            else if ($(this).val() == "0") {
                $("input[name=rdnoverwriteorupdate][value='4']").prop("checked", false)
                $("#btnSave").attr("disabled", true)
                $("#inpschemaname").val("")
                $("#inpdatalistschemaname").empty()
                $("#inpschemaname").attr("readonly", false)
                $("#btnExistsSave").attr("disabled", false)
            }
            else if ($(this).val() == "4") {
                $("#inpschemaname").val("")
                $("#btnSaveasNew").attr("disabled", true)
                $("#btnSave").attr("disabled", false)
                $("#divEdit").css("display", "none")
                SchemaData.ResetSchemaData();

            }
        }
        else {
            $("#inpschemaname").val($("#hdnSchemavalue").val())
            if ($(this).val() == "2") {
                $("#btnSaveasNew").attr("disabled", true)
                $("#btnUpdate").attr("disabled", true)
            }
            else if ($(this).val() == "0") {
                $("#inpschemaname").val("")
                $("#inpschemaname").attr("readonly", false)
                $("#inpdatalistschemaname").empty()
                $("#inpschemaname").attr("readonly", true)
                $("#btnExistsSave").attr("disabled", false)
            }
            else {
                //    SchemaData.ShowPanel("error", "Kindly update new schema details")
                $("#inpschemaname").attr("readonly", true)
                $("input[name=rdnoverwriteorupdate][value='1']").prop("checked", true)

            }
        }


    })

    $("#btnExistsSave").off().on("click", function () {
        var ArrangeRootValue = $("#tblDefaultValue > tbody > tr").length;
        if (ArrangeRootValue == "0") {
            //AgentWorkArea.SaveExists()
            SchemaData.UpdateSchemaData()
        }
        else {
            $("#SchemaDefaultValueAlert").modal("show")
        }


    })


    $("#spnAdd").off().on("click", function () {
        if ($("#inpschemaname").val().trim() == "") {
            //  SchemaData.ShowPanel("error","Please enter schema name")
            SchemaData.ShowPanel("error", "Please enter Schema Field")
        }
        else if ($("#inpSchemafielldname").val().trim() == "") {
            //SchemaData.ShowPanel("error","Please enter schema field name")
            SchemaData.ShowPanel("error", "Please enter Schema Field")
        }
        else if ($("#inpSchemafielldname").val().trim().length <= 3) {
            //SchemaData.ShowPanel("error","Please enter schema field name")
            SchemaData.ShowPanel("error", "Please enter valid Schema Field")
        }
        else {
            var bool = SchemaData.AddSchemaNameandFieldValidationExist()
            if (bool == true) {
                SchemaData.ShowPanel("error", "Already Field Name Found")
            }
            else if (bool == "Default") {
                SchemaData.ShowPanel("error", "We can't add default Schema Field name values")
            }
            else if (bool == false) {
                if ($("#chkRootschema").is(":checked")) {
                    SchemaData.AddSchemaNameandField(1)
                }
                else {
                    SchemaData.AddSchemaNameandField(0)
                }

            }
        }


    })


    // Edit

    $("#spnEdit").off().on("click", function () {
        $("#spnAdd").css({
            "display": "inline-block"
        })
        $("#spnreset").css({
            "display": "inline-block"
        })
        $(this).css("display", "none")
        $("#tblRootData").css({
            "pointer-events": "auto",
            "opacity": "1",
            "background": "none"
        })
        $("#divOverwrite").css("display", "inline-block")
        $("#divSaveasNew").css("display", "inline-block")
        if ($("input[name=rdnoverwriteorupdate]:checked").val() == "0") {
            $("#inpschemaname").attr("readonly", false)
        }
        else {
            $("#inpschemaname").attr("readonly", true)
            $("input[name=rdnoverwriteorupdate][value=1]").prop("checked", true)
        }
        $("#divDefaultSchemaValue").css("display", "none")

    })



    // Reset

    $("#spnreset").off().on("click", function () {


        $("#changedSchema").text("")
        SchemaData.LoadSchemaDropdown();
        //  SchemaData.Loadexistingschemadetails("reset")
        $("#spnAdd").css({
            "display": "none"
        })
        $("#spnEdit").css({
            "display": "block"
        })
        $("#btnExistsSave").attr("disabled", false);
        $("#inpschemaname").attr("readonly", false)
        $("input[name=rdnoverwriteorupdate][value=1]").prop("checked", false)
        $("input[name=rdnoverwriteorupdate]").prop("checked", false)
        $(this).css("display", "none")

        $("#tblRootData").css({
            "pointer-events": "none",
            "opacity": "0.7",
            "background": "#ece5e5 !important"
        })
        $("#divOverwrite").css("display", "none")
        $("#divSaveasNew").css("display", "none")
        $("#divDefaultSchemaValue").css("display", "block")

    })

    function jsondata() {

        var myRows = [];

        var $headers = $("#tblStepsCreations > thead > tr > th.needed");
        var $rows = $("#tblStepsCreations > tbody >  tr").each(function (index) {

            $cells = $(this).find("td:not(:first)");
            myRows[index] = {};
            $cells.each(function (cellIndex) {
                myRows[index][$($headers[cellIndex]).html()] = $(this).text();
            });


        });


        var datares = JSON.stringify(myRows);



        return datares;
    }
    // $("#schemalist").val("Resolute_AI");
    debugger
    SchemaData.LoadSchemaList()
  
    SchemaData.LoadScheduleMaster();
   // SchemaData.ListofFiles("Completed");
   $("#schemalist").change(function(){
       debugger;

       SchemaData.ExistingSchemaName("", "DropdownHeader", "#schemalist")
   })


    $("#drpConfigAction").change(function () {
        debugger;
        if($("#drpConfigAction").val() != "0"){
            $(".DivdrpConfigSetAction").css('display','none');
            if($("#drpConfigAction option:selected").val() == "Select") {
                $("#divRdoAction").css('display','flex');
                $("#rdoThisData").attr('checked', 'checked');
                $("#ddlSchemaAssign").prop('disabled', false);
              $("#inpTargetAttr").prop('disabled', false);
            // $("#inpTargetAttr,#ddlSchemaAssign").val("");
            $("#inpTargetAttr, #ddlSchemaAssign").val("");
            var Lastactionset = $("#tblStepsCreations > tbody > tr:last > td.configaction > span")
            Lastactionset = $(Lastactionset).text().toLowerCase()
            if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop") {
                $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            }
            else if (Lastactionset != "MongoDB_write") {
                if ($("#similarTRUrl").length > 0) {
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
                else {
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }

            }
            else {
                $("#drpSubfield").val("xpath").prop('disabled', true)
            }

            }
            else{
                $("#divRdoAction").css('display','none')  
            }
        }
        else{
            
            $(".DivdrpConfigSetAction").css('display','block');
            $("#divRdoAction").css('display','none')
        }
        //$("#ddlSchemaAssign ,#inpTargetAttr").prop('disabled', true);
        $("#inpValueinput").prop('disabled', false);
        $("#inpValueinput ,#inpTargetAttr,#ddlSchemaAssign").val("");

        var res = $("#similarTRUrl")

        var PrevData = $("#tblStepsCreations > tbody > tr:last > td")[5]
        PrevData = $(PrevData).text()
        if ($('option:selected', this).attr('attr') == "xpath") {
            $("#drpSubfield").val("xpath").prop('disabled', true)

            //if ($("#drpConfigAction").val() == "Get") {
            //    $("#ddlSchemaAssign").prop('disabled', false);
            //}
            if ($("#drpConfigAction").val() == "Get") {
                $("#ddlSchemaAssign").prop('disabled', false);
                $("#ddlSchemaAssign ,#inpTargetAttr").prop('disabled', false);
                // $("#inpTargetAttr,#ddlSchemaAssign").val("");
            }
        }
        else if ($('option:selected', this).attr('attr') == "action") {
            $("#drpSubfield").val("action").prop('disabled', true)
        }
        else if ($('option:selected', this).attr('attr') == "Loop") {
            //$("#drpSubfield").val("source").prop('disabled', true)
            if ($("#tblStepsCreations > tbody > tr:last-child").find(".configaction > span").text() == "Oncollection") {
                $("#drpSubfield").val("source").prop('disabled', true);
            }
            else {
                //  $("#drpSubfield").val("").prop('disabled', false);
            }
        }

        else if ($('option:selected', this).attr('attr') == "Url_Request") {
            $("#drpSubfield").val("variable").prop('disabled', true)
        }
        else if ($('option:selected', this).attr('attr') == "sec") {
            $("#drpSubfield").val("sec").prop('disabled', true)
            $("#inpValueinput").val("7");

        }
        else if ($('option:selected', this).attr('attr') == "Set_Navigation_Limit") {
            $("#drpSubfield").val("action").prop('disabled', true)
            $("#inpValueinput").val("10");
        }
        else if ($('option:selected', this).attr('attr') == "value") {
            $("#drpSubfield").val("value").prop('disabled', true)
          
        }

        if ($('option:selected', this).val().trim().toLowerCase() == "oncollection") {
            debugger;
            $("#inpTargetAttr").val("row_element").prop('disabled', true)
            $("#ddlSchemaAssign").val("rowcollection_" + Math.floor(Math.random() * 1000)).prop('disabled', true)
        }
        if ($('option:selected', this).val().trim().toLowerCase() == "onclick") {
            debugger;
            $("#drpSubfield").val("").prop('disabled', false);
        }
        if ($('option:selected', this).val().trim().toLowerCase() == "loop") {

            var DataPointLabel = $("#tblStepsCreations > tbody > tr:last > td")[10]
            if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Oncollection") {
                DataPointLabel = $(DataPointLabel).text()
                $("#inpValueinput").val(DataPointLabel).prop('disabled', true)
                $("#ddlSchemaAssign").val("eachrow").prop('disabled', true)
            }
            else if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "MongoDB_read") {
                DataPointLabel = $(DataPointLabel).text()
                $("#inpValueinput").val(DataPointLabel).prop('disabled', true)
                $("#drpSubfield").val("source_dict").prop('disabled', true)
                $("#inpTargetAttr").val($("#spnSchemaListSimilar").text()).prop('disabled', true)
                $("#ddlSchemaAssign").val($("#hdnLoopSimilarHeader").val()).prop('disabled', true)
            }


        }
        var Lastactionset = $("#tblStepsCreations > tbody > tr:last > td.configaction > span")
        Lastactionset = $(Lastactionset).text().toLowerCase()
        if ($('option:selected', this).val().trim().toLowerCase() == "get") {
            if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop") {
                $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            }
            else if (Lastactionset != "MongoDB_write") {
                if ($("#similarTRUrl").length > 0) {
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
                else {
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }

            }
            else {
                $("#drpSubfield").val("xpath").prop('disabled', true)
            }
        }
        else if ($("#drpConfigAction").val().trim().toLowerCase() == Lastactionset) {
            debugger;
            if (Lastactionset != "onclick") {
                SchemaData.ShowPanel("error", "Alert! Repeated Action Found")
                $("#drpConfigAction").val("0")
            }

        }


    })
    $("#divRdoAction").change(function () {
        debugger;
        if($('#rdoThisData').is(':checked')) { 
            $("#ddlSchemaAssign").prop('disabled', false);
            $("#inpTargetAttr").prop('disabled', false);
            // $("#inpTargetAttr,#ddlSchemaAssign").val("");
            $("#inpTargetAttr, #ddlSchemaAssign").val("");
            var Lastactionset = $("#tblStepsCreations > tbody > tr:last > td.configaction > span")
            Lastactionset = $(Lastactionset).text().toLowerCase()
            if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop") {
                $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            }
            else if (Lastactionset != "MongoDB_write") {
                if ($("#similarTRUrl").length > 0) {
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
                else {
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }

            }
            else {
                $("#drpSubfield").val("xpath").prop('disabled', true)
            }
         }
         else{
            $("#drpSubfield").val("xpath").prop('disabled', true)
            $("#inpTargetAttr").val("row_element").prop('disabled', true)
            $("#ddlSchemaAssign").val("rowcollection_" + Math.floor(Math.random() * 1000)).prop('disabled', true)
         }
    })
    $("#drpConfigSetAction").change(function () {
        debugger;
        if($("#drpConfigSetAction").val() != "0" && $("#drpConfigSetAction").val() != "value"){
            $(".DivdrpConfigAction").css('display','none');
            $("#drpAttributeType").prop('disabled', true);
            $("#ddlSchemaAssign ,#inpTargetAttr").prop('disabled', true);
        }
        else if($("#drpConfigSetAction").val() == "value"){
            $("#drpAttributeType").prop('disabled', true);
            $("#ddlSchemaAssign").prop('disabled',false)
        }
        else{
            $(".DivdrpConfigAction").css('display','none');
            $("#drpAttributeType").prop('disabled', false);
            $("#ddlSchemaAssign ,#inpTargetAttr").prop('disabled', true);
        }
      //  $("#ddlSchemaAssign ,#inpTargetAttr").prop('disabled', true);
        $("#inpValueinput").prop('disabled', false);
        $("#inpValueinput ,#inpTargetAttr,#ddlSchemaAssign").val("");

        var res = $("#similarTRUrl")

        var PrevData = $("#tblStepsCreations > tbody > tr:last > td")[5]
        PrevData = $(PrevData).text()
       if ($('option:selected', this).attr('attr') == "sec") {
            $("#drpSubfield").val("sec").prop('disabled', true)
            $("#inpValueinput").val("7");

        }
        else if ($('option:selected', this).attr('attr') == "Set_Navigation_Limit") {
            $("#drpSubfield").val("action").prop('disabled', true)
            $("#inpValueinput").val("10");
        }
    })
    $("#drpAttributeType").change(function () {
        debugger;
        var Link = ["src","srcset","href"];
        var Text = ["text","alt","title"];
        if($("#drpAttributeType option:selected").val() == "Link"){
            $("#inpTargetAttr").css('display','block')
            $("#inpTargetAttr").attr("disabled",false)
            $("#ddlSchemaAssign").attr("disabled",false)
            
            $("#lisinpTargetAttr").empty();
            $.each(Link, function(i, item) {
                $('#lisinpTargetAttr').append("<option value='" + Link[i] + "'>");
              });    
        }
        else if($("#drpAttributeType option:selected").val() == "Text"){
            $("#inpTargetAttr").css('display','block')
            $("#inpTargetAttr").attr("disabled",false)
            $("#ddlSchemaAssign").attr("disabled",false)
            $("#lisinpTargetAttr").empty();
            $.each(Text, function(i, item) {
                $('#lisinpTargetAttr').append("<option value='" + Text[i] + "'>");
              });
        }
        else{
            $("#inpTargetAttr").css('display','none')
        }
    })


    $("#inpRemovedIndex").keypress(function () {
        debugger;
        $(this).val("");
        return false;
    });

    $(".icnreset").off().on("click", function () {
        $("#txtSearch").val("");
        var value = $("#txtSearch").val().toLowerCase();
        $("#tblDownloadAgent tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })
    
    $("#txtSearch").change(function () {
        var value = $(this).val().toLowerCase();
        $("#tblDownloadAgent tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })


    $("#icndelete").off().on("click", function () {
        // alert("1")
        debugger;
        var id = ""
        if($("#tblStepsCreations > tbody > tr").length > 2 ){
            var contentData = $("#tblStepsCreations > tbody > tr");
            id = "tblStepsCreations"
        }
        else if ($("#tblSavedSteps > tbody > tr").length >= 7){
            id = "tblSavedSteps"
            var contentData = $("#tblSavedSteps > tbody > tr"); 
        }
        var FindLoop = ""
        var FindCheckBox = ""
        $.each(contentData, function () {
           debugger
           if($(this).find("input").is(":checked")){
            FindCheckBox = "Checked";
           }
           if( FindCheckBox == "Checked"){
            if ($(this).find(".configaction > span").text() == "Loop" || $(this).find(".configaction > span").text() == "Oncollection") {
                FindLoop = FindLoop + 1;
               } 
           }
           
        })
        if(FindLoop != ""){
            SchemaData.ShowPanel("error","You can't remove Get data")
           FindLoop = ""
           FindCheckBox = ""
            return false;
        }
        else{
            if($("#tblStepsCreations > tbody > tr").length > 2 ){
                var contentData = $("#tblStepsCreations > tbody > tr");
                id = "tblStepsCreations"
                if ($("#tblStepsCreations > tbody > tr").length == 3){
                    $("#divLoop").css('display','none');
                    $("#divSubmit").css('display','none');
                }
            }
            else if ($("#tblSavedSteps > tbody > tr").length >= 7){
                id = "tblSavedSteps"
                var contentData = $("#tblSavedSteps > tbody > tr"); 
                if ($("#tblSavedSteps > tbody > tr").length == 7){
                    $("#divLoop").css('display','none');
                    $("#divSubmit").css('display','none');
                }
            }
            else{
                $("#divLoop").css('display','none');
                $("#divSubmit").css('display','none');   
                
            }
            $.each(contentData, function (i, objData) {
                if(id == "tblStepsCreations"){
                    if ($(objData).find("td:first").find("input").is(":checked")) {
                        debugger;
                        if ($(objData).next().find(".configaction").text() == "MongoDB_write") {
                            $(objData).next().remove()
                            $(objData).remove();
                            // $("#inpCheckboxLoopEnd").prop("disabled", false)
                            // $("#inpCheckboxLoopEnd").prop("checked", false)
                            var StepCountRemove = $(objData).find("td.stepscount").text();
                            SchemaData.ReframeTableSteps(StepCountRemove);
                        }
                       else if($(objData).find("td.configaction > span").text() == "Oncollection" || $(objData).find("td.configaction > span").text() == "Loop"){
                        SchemaData.ShowPanel("error","You can't remove similar data")
                        $(objData).find("td:first").find("input").prop("checked",false)
                       }
                        else {
                            $(objData).remove();
                            var StepCountRemove = $(objData).find("td.stepscount").text();
                            SchemaData.ReframeTableSteps(StepCountRemove);
                          
                        }
                        //var StepCountRemove = $(objData).find("td.stepscount").text();
                        //$(objData).remove();
                        //AgentWorkArea.ReframeTableSteps(StepCountRemove);
                    }
                    else {
        
                    }
                }
                else if(id= "tblSavedSteps"){
                    if ($(objData).find("td:first").find("input").is(":checked")) {
                        debugger;
                        if ($(objData).next().find(".configaction").text() == "MongoDB_write") {
                            $(objData).next().remove()
                            $(objData).remove();
                            // $("#inpCheckboxLoopEnd").prop("disabled", false)
                            // $("#inpCheckboxLoopEnd").prop("checked", false)
                            var StepCountRemove = $(objData).find("td.stepscount").text();
                            SchemaData.ReframeTableSteps(StepCountRemove);
                        }
                       else if($(objData).find(".ActionsVal").text() == "Oncollection" || $(objData).find(".ActionsVal").text() == "Loop"){
                          SchemaData.ShowPanel("error","You can't remove similar data")
                          $(objData).find("td:first").find("input").prop("checked",false)
                       }
                        else {
                            $(objData).remove();
                            var StepCountRemove = $(objData).find("td.stepscount").text();
                            SchemaData.ReframeTableSteps(StepCountRemove);
                          
                        }
                        //var StepCountRemove = $(objData).find("td.stepscount").text();
                        //$(objData).remove();
                        //AgentWorkArea.ReframeTableSteps(StepCountRemove);
                    }
                    else {
        
                    }
                }
               
            })
    
            if($("#tblStepsCreations > tbody > tr").length == 2){
                $("#TrainStepTime").timer({
                    action: 'reset',
                    seconds: 0
                })
                $("#TrainStepTime").timer({
                    action: 'pause',
                    seconds: 0
                })
                $("#TrainStepTime").css('display','none')
            }
        }
        

       

    })

    $(".icndelete").off().on("click", function () {
        debugger;
        var id = "";
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        var Pagelevel = $(CtrlField).find("summary").attr("page-level");
        if($(CtrlField).find(".tblStepsCreations > tbody > tr").length > 2 ){
            var contentData = $(CtrlField).find(".tblStepsCreations > tbody > tr");
            id = "tblStepsCreations"
        }
        else if ($("#tblSavedSteps > tbody > tr").length >= 7){
            id = "tblSavedSteps"
            var contentData = $("#tblSavedSteps > tbody > tr"); 
        }
        var FindLoop = ""
        var FindCheckBox = ""
        $.each(contentData, function () {
           debugger
           if($(this).find("input").is(":checked")){
            FindCheckBox = "Checked";
           }
           if( FindCheckBox == "Checked"){
            if ($(this).find(".configaction > span").text() == "Loop" || $(this).find(".configaction > span").text() == "Oncollection") {
                FindLoop = FindLoop + 1;
               } 
           }
           
        })
        if(FindLoop != ""){
            SchemaData.ShowPanel("error","You can't remove Get data")
           FindLoop = ""
           FindCheckBox = ""
            return false;
        }
        else{
        if($(CtrlField).find(".tblStepsCreations > tbody > tr").length > 2 ){
            var contentData = $(CtrlField).find(".tblStepsCreations > tbody > tr");
            id = "tblStepsCreations"
            if ($(CtrlField).find(".tblStepsCreations > tbody > tr").length == 3){
                $(CtrlField).find(".divLoop").css('display','none');
                $(CtrlField).find(".divSubmit").css('display','none');
            }
        }
        else if ($("#tblSavedSteps > tbody > tr").length >= 7){
            id = "tblSavedSteps"
            var contentData = $("#tblSavedSteps > tbody > tr"); 
            if ($("#tblSavedSteps > tbody > tr").length == 7){
                $("#divLoop").css('display','none');
                $("#divSubmit").css('display','none');
            }
        }
        else{
            $(CtrlField).find(".divLoop").css('display','none');
            $(CtrlField).find(".divSubmit").css('display','none');   
            
        }
        if(Pagelevel == "2"){
            contentData =  $(".tblSavedSteps > tbody > tr");
            id= "tblSavedSteps"
        }
        $.each(contentData, function (i, objData) {
            if(id == "tblStepsCreations"){
                if ($(objData).find("td:first").find("input").is(":checked")) {
                    debugger;
                    if ($(objData).next().find(".configaction").text() == "MongoDB_write") {
                        $(objData).next().remove()
                        $(objData).remove();
                        // $("#inpCheckboxLoopEnd").prop("disabled", false)
                        // $("#inpCheckboxLoopEnd").prop("checked", false)
                        var StepCountRemove = $(objData).find("td.stepscount").text();
                        SchemaData.ReframeTableSteps(StepCountRemove,CtrlField);
                    }
                   else if($(objData).find("td.configaction > span").text() == "Oncollection" || $(objData).find("td.configaction > span").text() == "Loop"){
                    SchemaData.ShowPanel("error","You can't remove similar data")
                    $(objData).find("td:first").find("input").prop("checked",false)
                   }
                    else {
                        $(objData).remove();
                        var StepCountRemove = $(objData).find("td.stepscount").text();
                        SchemaData.ReframeTableSteps(StepCountRemove,CtrlField);
                      
                    }
                    //var StepCountRemove = $(objData).find("td.stepscount").text();
                    //$(objData).remove();
                    //AgentWorkArea.ReframeTableSteps(StepCountRemove);
                }
                else {
                    // SchemaData.ShowPanel("error","Please click checkbox to Delete the value")
                }
            }
            else if(id= "tblSavedSteps"){
                if($(".tblSavedSteps  > tbody > tr").find("input").is(":checked")){
                    if ($(objData).find("td:first").find("input").is(":checked")) {
                        debugger;
                        if ($(objData).next().find(".configaction").text() == "MongoDB_write") {
                            $(objData).next().remove()
                            $(objData).remove();
                            // $("#inpCheckboxLoopEnd").prop("disabled", false)
                            // $("#inpCheckboxLoopEnd").prop("checked", false)
                            var StepCountRemove = $(objData).find("td.stepscount").text();
                            SchemaData.ReframeTableSteps(StepCountRemove);
                        }
                       else if($(objData).find(".ActionsVal").text() == "Oncollection" || $(objData).find(".ActionsVal").text() == "Loop"){
                          SchemaData.ShowPanel("error","You can't remove similar data")
                          $(objData).find("td:first").find("input").prop("checked",false)
                       }
                        else {
                            $(objData).remove();
                            var StepCountRemove = $(objData).find("td.stepscount").text();
                            SchemaData.ReframeTableSteps(StepCountRemove);
                          
                        }
                        //var StepCountRemove = $(objData).find("td.stepscount").text();
                        //$(objData).remove();
                        //AgentWorkArea.ReframeTableSteps(StepCountRemove);
                    }
                   
                }
                
                else {
                    SchemaData.ShowPanel("error","Please click checkbox to Delete the value")
                }
            }
           
        })

        if($("#tblStepsCreations > tbody > tr").length == 2){
            $("#TrainStepTime").timer({
                action: 'reset',
                seconds: 0
            })
            $("#TrainStepTime").timer({
                action: 'pause',
                seconds: 0
            })
            $("#TrainStepTime").css('display','none')
        }
    }
    })
    


    $("#btnUpload").off().on("click", function(){
        if($("#inpFileUpload").val() == ""){
            SchemaData.ShowPanel("error","Please choose file")
        }
        else if ($("#inpAgentName").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "1" ) {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent Name")
        }
        else if($("#Agentlist").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "2" ){
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent Name")
        }
        
        else if($("#inpFileUpload").val() != ""){
            var fileInput = document.getElementById("inpFileUpload");
            var reader = new FileReader();
            reader.readAsText(fileInput.files[0]);
            reader.onload = function () {
                const text = reader.result;
                var csvToJson = csvJSONUpload(text);
                var FinalJSON = [];
                
               
                debugger;
                if(csvToJson == "0"){
                    SchemaData.ShowPanel("error","Please choose valid file")
                }
                else{
                    $.each(csvToJson, function(i,objAdd){
                    if(objAdd.hasOwnProperty("ExecutionID") == false){
                        obj = {
                            "Is_detail_extraction_done":"No",
                            "ExecutionID":""
                            }
                        var res = Object.assign(objAdd,obj)
                        FinalJSON.push(res);
                    }   
                    else{
                        obj = {
                            "Is_detail_extraction_done":"No"
                            }
                        var res = Object.assign(objAdd,obj)
                        FinalJSON.push(res);
                    } 
                      
                        if(objAdd.Actions == "MongoDB_read"){
                            $("#hdnProgressCount").val(objAdd.ValueInput.trim())
                        }
                    })
                  //  console.log(FinalJSON)
                    SchemaData.SaveRecordDetailsForSupportingFiles(FinalJSON)
                    
                }
    
            }
        }
        
    })

    $(".btnUpload").off().on("click", function(){
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        if($(CtrlField).find(".inpFileUpload").val() == ""){
            SchemaData.ShowPanel("error","Please choose file")
        }
        else if ($("#inpAgentName").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "1" ) {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent Name")
        }
        else if($("#Agentlist").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "2" ){
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent Name")
        }
        
        else if($(CtrlField).find(".inpFileUpload").val()!= ""){
            var GetFileID = $(CtrlField).find(".inpFileUpload").attr("id")
            var fileInput = document.getElementById(GetFileID)
            var reader = new FileReader();
            reader.readAsText(fileInput.files[0]);
            reader.onload = function () {
                const text = reader.result;
                var csvToJson = csvJSONUpload(text);
                var FinalJSON = [];
                
               
                debugger;
                if(csvToJson == "0"){
                    SchemaData.ShowPanel("error","Please choose valid file")
                }
                else{
                    $.each(csvToJson, function(i,objAdd){
                    if(objAdd.hasOwnProperty("ExecutionID") == false){
                        obj = {
                            "Is_detail_extraction_done":"No",
                            "ExecutionID":""
                            }
                        var res = Object.assign(objAdd,obj)
                        FinalJSON.push(res);
                    }   
                    else{
                        obj = {
                            "Is_detail_extraction_done":"No"
                            }
                        var res = Object.assign(objAdd,obj)
                        FinalJSON.push(res);
                    } 
                      
                        if(objAdd.Actions == "MongoDB_read"){
                            $("#hdnProgressCount").val(objAdd.ValueInput.trim())
                        }
                    })
                  //  console.log(FinalJSON)
                    SchemaData.SaveRecordDetailsForSupportingFiles(FinalJSON)
                    
                }
    
            }
        }
        
    })

    
    $(".btnUploadviaText").off().on("click", function(){
        debugger;
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        var ExtractionField = $(".drpExtractionURL option:selected").val()
        if($(CtrlField).find(".txtAreaSimilarURLs").val().trim() != ""){
              var URLsList = SchemaData.CheckForPIPE($(CtrlField).find(".txtAreaSimilarURLs").val());
              var ValidURL = SchemaData.ValidateURL(URLsList);
              if(ValidURL.length > 0){
                  SchemaData.ShowPanel("error","Please enter valid similar URLs")
              }
              else{
                  var URLsarr = []
                  $.each(URLsList, function(i,objURLs){
                      var objListURLs = {
                          [ExtractionField]: objURLs.trim(),
                          "Is_detail_extraction_done":"No",
                           "ExecutionID":""
                      }
                      URLsarr.push(objListURLs)
                  })
              }
           var LastValue =   URLsarr.slice(-1).pop()
            $("#inpFacultyList").val(URLsarr.slice(-1).pop()[ExtractionField]) 
              SchemaData.SaveRecordDetailsForSupportingFiles(URLsarr)
              SchemaData.ShowPanel("success","Similar URLs Saved Successfully");
            //   $("#divEnterURLs").css('display','none')
              
        }
        else{
            SchemaData.ShowPanel("error","Please enter Similar URLs")
        }
  })


    $("#btnUploadviaText").off().on("click", function(){
        var ExtractionField = $("#drpExtractionURL option:selected").val()
          if($("#txtAreaSimilarURLs").val().trim() != ""){
                var URLsList = SchemaData.CheckForPIPE($("#txtAreaSimilarURLs").val());
                var ValidURL = SchemaData.ValidateURL(URLsList);
                if(ValidURL.length > 0){
                    SchemaData.ShowPanel("error","Please enter valid similar URLs")
                }
                else{
                    var URLsarr = []
                    $.each(URLsList, function(i,objURLs){
                        var objListURLs = {
                            [ExtractionField]: objURLs.trim(),
                            "Is_detail_extraction_done":"No",
                             "ExecutionID":""
                        }
                        URLsarr.push(objListURLs)
                    })
                }
             var LastValue =   URLsarr.slice(-1).pop()
              $("#inpFacultyList").val(URLsarr.slice(-1).pop()[ExtractionField]) 
                SchemaData.SaveRecordDetailsForSupportingFiles(URLsarr);
                SchemaData.ShowPanel("success","Similar URLs Saved Successfully");
                // $("#divEnterURLs").css('display','none')
          }
          else{
              SchemaData.ShowPanel("error","Please enter Similar URLs")
          }
    })

    var fileInput = document.getElementById("inpFileUpload"),
    readFile = function () {
      
        var reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.onload = function () {
            const text = reader.result;
            const csvToJson = csvJSON(text);
           
            var obj = new Object()
         

            var objSupportingFiles = {
                "Original_json_output": csvToJson,
                "IssupportingFiles" : "1"
    
            }
    
            obj.JSONData = objSupportingFiles
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/SupportingFiles",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger;
                }    
            })
            
        }
    };

   // fileInput.addEventListener('change', readFile);



    function csvJSON(csvText) {
        debugger
        let lines = [];
        const linesArray = csvText.split('\n');
        // for trimming and deleting extra space 
        linesArray.forEach((e) => {
            const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
            lines.push(row);
        });
        $.each(lines, function(i,obj){
           
            if(i == 0){
                lines = []
                lines.push(obj +",Is_detail_extraction_done")
            }
            else{
                lines.push(obj +",no")
            }
        })
        
        // for removing empty record
        lines.splice(lines.length - 1, 1);
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {

            const obj = {};
            const currentline = lines[i].split(",");

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        //return result; //JavaScript object
        // return JSON.stringify(result); //JSON
        return result;
    }

    function csvJSONUpload(csvText) {
        debugger
        $("#inpFacultyList").val("")
        var ExtractionURL = $("#spnExtractionURL").text()
        let lines = [];
        var Position = "";
        const result = [];
        const linesArray = csvText.split('\n');
        // for trimming and deleting extra space 
        linesArray.forEach((e) => {
            const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
            lines.push(row);
        });
        var FoundFacultyURLPOs = lines[0].split(",");
        $.each(FoundFacultyURLPOs, function(i,objPos){
            debugger;
            if(objPos == ExtractionURL){
                Position = i;
                return false
            }
            
        })
      var FileValid = lines[0].split(",").includes(ExtractionURL);
      var FacultyURL = lines[lines.length-2].split(",")[Position];
      var finalData = FacultyURL.replace(/['"]+/g, '');
      $("#inpFacultyList").val(finalData)
if(FileValid == true){
    // $.each(lines, function(i,obj){
           
    //     if(i == 0){
    //         lines = []
    //         lines.push(obj +",Is_detail_extraction_done")
    //     }
    //     else{
    //         lines.push(obj.replace(/['"]+/g, '')+"No")
    //     }
    // })
    
    // for removing empty record
    lines.splice(lines.length - 1, 1);
    
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

        const obj = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
}
else{
    result = "0"
}
       
        //return result; //JavaScript object
        // return JSON.stringify(result); //JSON
        return result;
    }
    $("#btnSubmit").off().on("click", function () {
        var id = $('.segmentdiv[style*="block"]:last').prev().attr("id");
        var ExecutionStatus = "";
if( id == "divListingAgent") {
   var ExecutionID =  $('.segmentdiv[style*="block"]:last').prev().find("details").find("#tblSavedsteps").attr("data-executionid")
     ExecutionStatus = SchemaData.GetHarvestedStatusID(ExecutionID);
}
else if(id != undefined && id != "btnTargetAdd"){
    var ExecutionID = $('.segmentdiv[style*="block"]:last').prev().find("details").find(".tblSavedsteps").attr("data-executionid")
     ExecutionStatus = SchemaData.GetHarvestedStatusID(ExecutionID);
}
else{
    ExecutionStatus = "3";
}
 if(ExecutionStatus == "3" || ExecutionStatus == "4"){
    if ($("#tblStepsCreations > tbody > tr:last").find(".configaction").text() == "MongoDB_write" || $("#tblStepsCreations > tbody > tr:last").find(".configaction").text().includes("Onclick") == true || $("#tblStepsCreations > tbody > tr:last").find(".configaction").text().includes("Timer") == true ) {
        // AgentWorkArea.FinalValidation();
        $("#ApproveModal").modal("show")
        //  exportTableToCSV($("#spnFIleName").text().trim())
       }
       else if($('#divLoop').css('display') == 'none')
       {
        $("#ApproveModal").modal("show")
       }
       else if($("#tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
        $("#ApproveModal").modal("show")
       }
       else if($("#hdnSavedSteps").val() != ""){
           


           
        $("#ApproveModal").modal("show")
       }
       
       else{
           SchemaData.ShowPanel("error", "Kindly check there is no Loop End Action")
       }
 }
 else{
    SchemaData.ShowPanel("error","Previous Page URL is inprogress")
 }
        
    
        
   
    })

    $(".btnSubmit").off().on("click", function () {
        var id = $('.segmentdiv[style*="block"]:last').prev().attr("id");
        var ExecutionStatus = "";
if( id == "divListingAgent") {
   var ExecutionID =  $('.segmentdiv[style*="block"]:last').prev().find("details").find("#tblSavedsteps").attr("data-executionid")
     ExecutionStatus = SchemaData.GetHarvestedStatusID(ExecutionID);
}
else if(id != undefined){
 var ExecutionID =    $('.segmentdiv[style*="block"]:last').prev().find("details").find(".tblSavedsteps").attr("data-executionid")
     ExecutionStatus = SchemaData.GetHarvestedStatusID(ExecutionID);
}
else{
    ExecutionStatus = "3";
}

if(ExecutionStatus == "3" || ExecutionStatus == "4"){
    var CtrlField = $(this).closest("details")
    if( $(CtrlField).find(".tblStepsCreations > tbody > tr").length > 2 || $(CtrlField).find(".tblSavedSteps > tbody > tr").length > 2 ){
     if ( $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text() == "MongoDB_write" || $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text() == "Onclick" || $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find(".configaction").text() == "Timer" ) {
         // AgentWorkArea.FinalValidation();
         $("#ApproveModal").modal("show")
         //  exportTableToCSV($("#spnFIleName").text().trim())
        }
        else if($(CtrlField).find('.divLoop').css('display') == 'none')
        {
         $("#ApproveModal").modal("show")
        }
        else if($(CtrlField).find(".tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
         $("#ApproveModal").modal("show")
        }
        else if($("#hdnSavedSteps").val() != ""){
            


            
         $("#ApproveModal").modal("show")
        }
        
        else{
            SchemaData.ShowPanel("error", "Kindly check there is no Loop End Action")
        }
    }
else{
    SchemaData.ShowPanel("error","Please add training steps")
}
}
else{
    SchemaData.ShowPanel("error","Previous Page URL is inprogress")
}


          
   
    })




    //  $("input[name='inpSimilarURLchk']").change(function(){
    //      if($(this).prop("checked") == true){
    //          SchemaData.AuditIDList();
    //          $("#similarurl").attr("readonly",false)
    //      }
    //      else{
    //         $("#similarurl").attr("readonly",true)
    //         $("#similarurl").val("")
    //      }
    //  })
     $("input[name='inpSimilarURLStepschk']").change(function(){
        if($(this).prop("checked") == true){
            SchemaData.AuditIDList("SimilarType");
            $("#similarurlsteps").attr("readonly",false)
        }
        else{
           $("#similarurlsteps").attr("readonly",true)
           $("#similarurlsteps").val("")
        }
    })

    $("#similarurlsteps").change(function(){
       
         if($(this).val() != ""){
             var val = $(this).val();
            var AuditID = $('#similarurlssteps option').filter(function () {
                return this.value == val;
            }).data('auditid');
         var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"2");
          // console.log(DataPointList)

           var Updatedarr = [];
           $.each(DataPointList,function(i,obj){
               debugger
              
               if(obj.Actions == "Onload"){
                   obj["ValueInput"] = $("#inpMainURL").val().trim()
                Updatedarr.push(obj)
               }
               else{
                Updatedarr.push(obj)
               }
            //    if(i>1){
            //     if(obj.Actions != "Initialize"){
            //         Updatedarr.push(obj)
            //        }
            //    }
               
           })
           console.log(Updatedarr)
           $("#hdnSavedSteps").val(JSON.stringify(Updatedarr))
          $("#tblSavedSteps").empty();
          $("#divshowtable").css("display","block")
           SchemaData.constructTable("#tblSavedSteps",Updatedarr)
           $("#divSubmit").css("display","block")
         $("#tblStepsCreations").css("display","none")
         $("#tblSavedSteps > tbody > tr").each(function () {
            debugger;
            if($(this).find(".ActionsVal").text() == "Onload" || $(this).find(".ActionsVal").text() == "Timer" || $(this).find(".ActionsVal").text() == "MongoDB_write" || $(this).find(".ActionsVal").text() == "MongoDB_commit" || $(this).find(".ActionsVal").text() == "Exit" || $(this).find(".ActionsVal").text() == "Loop" ){
                $(this).addClass("DN");
            }
        })
        }
    })

    $("#similarurl").change(function(){
        DataPointText = "";
         if($(this).val() != "" && $("#inpselectAgent").val() == ""){
         if($("#tblStepsCreations >tbody > tr").length > 0){
             var relength = $("#tblStepsCreations >tbody > tr").length
            for(i=1;i<=relength;i++){
                var res = $("#tblStepsCreations >tbody > tr")[1];
                $(res).next().remove()
               
             }
         }
         
             var val = $(this).val();
            var AuditID = $('#similarurls option').filter(function () {
                return this.value == val;
            }).data('auditid');

           if(AuditID != undefined){
         var obj = new Object();
         obj.AuditID = AuditID;
         $.ajax({
            type: "POST",
            url: HostingPath + "/api/URLandFacultURLCount",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                $("#lblUrlCount").text(data.response["URLCount"][0].total);
               $("#lblCountdiv").css("display","block")
            }
        })
           }

         var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
           console.log(DataPointList)
           DataPointText = DataPointList;
           var ExtractionURL = $("#drpExtractionURL option:selected").val();
            $("#tblStepsCreations > tbody").append(`
            <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                            <td></td>
                            <td style='display:none'>4</td>
                            <td style='display:none'>4</td>
                            <td style='display:none'>1</td>
                            <td>3</td>
                            <td class ='configaction'><span>MongoDB_read</span></td>
                            <td class ="Dn">${ExtractionURL}</td>
                            <td><span id="spnSimilarPath" class ="inputVal">${AuditID}</span> </td>
                            <td style="display:none"></td>
                            <td> <span id="spnSchemaListSimilar">${DataPointText}</span></td>
                            <td><span id="spnSimilarFileName">${ExtractionURL}</span></td> 
                            <td style="display:none"></td>
                            <td style="display:none">0</td>
                            <td style="display:none"></td>
                            <td style="display:none">0</td>
                            <td style="display:none"></td>
                            <td style="display:none"></td>
                           
                        </tr>
                        
            `)
         //   $("#drpConfigAction").val("Loop").change();
         //   $("#btnAddSteps").click()
         //   SchemaData.AutomaticLoopStepAdded()

            


         }
         else if($("#inpselectAgent").val() == "1"){
            var val = $(this).val();
            var AuditID = $('#similarurls option').filter(function () {
                return this.value == val;
            }).data('auditid');
             var ControlSavedSteps = $("#tblSavedSteps > tbody >tr");
             $.each(ControlSavedSteps, function(i,objSteps){
                 if($(objSteps).find("td").find("span.ActionsVal").text() == "MongoDB_read"){
                   var res = $(objSteps).find("td")[7];
                   $(res).find("span").text(AuditID)
                 }
             })
         }
     })

     
$(".inpSegmentationAgent").change(function(){
    debugger;
    var Idctrl =  $(this).parent().find("datalist").attr("id")
    DataPointText = "";
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        if($(this).val() != "" && $("#inpselectAgent").val() == ""){
        if($(CtrlField).find(".tblStepsCreations >tbody > tr").length > 0){
            var relength = $(CtrlField).find(".tblStepsCreations >tbody > tr").length
           for(i=1;i<=relength;i++){
               var res = $(CtrlField).find(".tblStepsCreations >tbody > tr")[1];
               $(res).next().remove()
              
            }
        }
        
            var val = $(this).val();
           var AuditID = $(CtrlField).find("#"+Idctrl+" option").filter(function () {
               return this.value == val;
           }).data('auditid');

           var URLSchemaval = $(this).val();
           var URLSchemaID = $(CtrlField).find("#"+Idctrl+" option").filter(function () {
               return this.value == URLSchemaval;
           }).data('urlschemaid');
         //   SchemaData.GetListDetailsofAgentURLAgentDetails(URLSchemaID)
        //   SchemaData.GetURLSchemaIDandAgentID(AuditID)
          if(AuditID != undefined){
        var obj = new Object();
        obj.AuditID = AuditID;
        $.ajax({
           type: "POST",
           url: HostingPath + "/api/URLandFacultURLCount",
           dataType: 'json',
           async: false,
           contentType: "application/json; charset=utf-8",
           data: JSON.stringify(obj),
           success: function (data) {
               debugger;
               $("#lblUrlCount").text(data.response["URLCount"][0].total);
              $("#lblCountdiv").css("display","block")
           }
       })
          }

        var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
          console.log(DataPointList)
          DataPointText = DataPointList;
          var ExtractionURL = $(CtrlField).find(".drpExtractionURL option:selected").val();
          $(CtrlField).find(".tblStepsCreations > tbody").append(`
           <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                           <td></td>
                           <td style='display:none'>4</td>
                           <td style='display:none'>4</td>
                           <td style='display:none'>1</td>
                           <td>3</td>
                           <td class ='configaction'><span>MongoDB_read</span></td>
                           <td class ="Dn">${ExtractionURL}</td>
                           <td><span id="spnSimilarPath" class ="inputVal">${AuditID}</span> </td>
                           <td style="display:none"></td>
                           <td> <span id="spnSchemaListSimilar">${DataPointText}</span></td>
                           <td><span id="spnSimilarFileName">${ExtractionURL}</span></td> 
                           <td style="display:none"></td>
                           <td style="display:none">0</td>
                           <td style="display:none"></td>
                           <td style="display:none">0</td>
                           <td style="display:none"></td>
                           <td style="display:none"></td>
                          
                       </tr>
                       
           `)
     


        }
        else if($("#inpselectAgent").val() == "1"){
           var val = $(this).val();
           var AuditID = $('#similarurls option').filter(function () {
               return this.value == val;
           }).data('auditid');
            var ControlSavedSteps = $("#tblSavedSteps > tbody >tr");
            $.each(ControlSavedSteps, function(i,objSteps){
                if($(objSteps).find("td").find("span.ActionsVal").text() == "MongoDB_read"){
                  var res = $(objSteps).find("td")[7];
                  $(res).find("span").text(AuditID)
                }
            })
        }

})

     $("#inpSegmenationAgentName").change(function(){
        DataPointText = "";
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        if($(this).val() != "" && $("#inpselectAgent").val() == ""){
        if($(CtrlField).find(".tblStepsCreations >tbody > tr").length > 0){
            var relength = $(CtrlField).find(".tblStepsCreations >tbody > tr").length
           for(i=1;i<=relength;i++){
               var res = $(CtrlField).find(".tblStepsCreations >tbody > tr")[1];
               $(res).next().remove()
              
            }
        }
        
            var val = $(this).val();
           var AuditID = $(CtrlField).find("#ddlinpSegmenationAgentName option").filter(function () {
               return this.value == val;
           }).data('auditid');

           SchemaData.AuditIDList("CopyAgents")
          if(AuditID != undefined){
        var obj = new Object();
        obj.AuditID = AuditID;
        $.ajax({
           type: "POST",
           url: HostingPath + "/api/URLandFacultURLCount",
           dataType: 'json',
           async: false,
           contentType: "application/json; charset=utf-8",
           data: JSON.stringify(obj),
           success: function (data) {
               debugger;
               $("#lblUrlCount").text(data.response["URLCount"][0].total);
              $("#lblCountdiv").css("display","block")
           }
       })
          }

        var DataPointList =   SchemaData.DecryptDataOPSchemaFromMongo(AuditID,"1");
          console.log(DataPointList)
          DataPointText = DataPointList;
          var ExtractionURL = $(CtrlField).find(".drpExtractionURL option:selected").val();
          $(CtrlField).find(".tblStepsCreations > tbody").append(`
           <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                           <td></td>
                           <td style='display:none'>4</td>
                           <td style='display:none'>4</td>
                           <td style='display:none'>1</td>
                           <td>3</td>
                           <td class ='configaction'><span>MongoDB_read</span></td>
                           <td class ="Dn">${ExtractionURL}</td>
                           <td><span id="spnSimilarPath" class ="inputVal">${AuditID}</span> </td>
                           <td style="display:none"></td>
                           <td> <span id="spnSchemaListSimilar">${DataPointText}</span></td>
                           <td><span id="spnSimilarFileName">${ExtractionURL}</span></td> 
                           <td style="display:none"></td>
                           <td style="display:none">0</td>
                           <td style="display:none"></td>
                           <td style="display:none">0</td>
                           <td style="display:none"></td>
                           <td style="display:none"></td>
                          
                       </tr>
                       
           `)
     


        }
        else if($("#inpselectAgent").val() == "1"){
           var val = $(this).val();
           var AuditID = $('#similarurls option').filter(function () {
               return this.value == val;
           }).data('auditid');
            var ControlSavedSteps = $("#tblSavedSteps > tbody >tr");
            $.each(ControlSavedSteps, function(i,objSteps){
                if($(objSteps).find("td").find("span.ActionsVal").text() == "MongoDB_read"){
                  var res = $(objSteps).find("td")[7];
                  $(res).find("span").text(AuditID)
                }
            })
        }


     })
   


    $("#btnSubmitft").off().on("click", function () {
       
       
        
if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
     var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
     var URL = $(CtrlField).find(".inpSegementaionURLDetailedURL").val();
     if($("#inpEditType").val() == "" && $("#inpNewAgentName").val() == ""){
        SchemaData.RemoveAlreadySaveURLDetails(URL)
     }
    
    $(".configactionShow").remove();
    $(".ActionsValShow").remove();
   
   if($(CtrlField).find(".tblSavedSteps > tbody > tr").length > 2 ){
    if($(CtrlField).find(".tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
        var bool = SchemaData.SaveRecordDetails("EditAgent"); 
     //  var bool = SchemaData.SaveRecordDetails();
       }
       else if($("#similarurlsteps").val() == ""){
        var bool = SchemaData.SaveRecordDetails();
       }
      else{
        var bool = SchemaData.SaveRecordDetails("1"); 
      }
   }
    
  else if($("#similarurlsteps").val() == ""){
    var bool = SchemaData.SaveRecordDetails();
   }
  else{
    var bool = SchemaData.SaveRecordDetails("1"); 
  }



}   
else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){
    var bool = true;
    var URL = $("#inpMainURL").val();
    if($("#DivModalAgentName").css("display") == "block"){
        if($("#inpNewAgentName").val() == ""){
             SchemaData.ShowPanel("error","Please enter Agent Name")
        }
        else if($("#inpNewAgentName").val() != "" &&  (bool == SchemaData.AgentNameExists())){
            $(".configactionShow").remove();
            $(".ActionsValShow").remove();

            if($("#inpEditType").val() == "" && $("#inpNewAgentName").val() == ""){
                SchemaData.RemoveAlreadySaveURLDetails(URL)
             }
           if($("#tblSavedSteps > tbody > tr").length > 2 ){
            if($("#tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
                var bool = SchemaData.SaveRecordDetails("EditAgent"); 
               }
               else if($("#similarurlsteps").val() == ""){
                var bool = SchemaData.SaveRecordDetails();
               }
              else{
                var bool = SchemaData.SaveRecordDetails("1"); 
              }
           }
            
          else if($("#similarurlsteps").val() == ""){
            var bool = SchemaData.SaveRecordDetails();
           }
          else{
            var bool = SchemaData.SaveRecordDetails("1"); 
          }
        }
        else {
SchemaData.ShowPanel("error","Agent Name Already Exists")
        }
        
    }
    else {
        $(".configactionShow").remove();
        $(".ActionsValShow").remove();
        
        if($("#inpEditType").val() == "" && $("#inpNewAgentName").val() == ""){
            SchemaData.RemoveAlreadySaveURLDetails(URL)
         }
       if($("#tblSavedSteps > tbody > tr").length > 2 ){
        if($("#tblSavedSteps > tbody > tr:last").find(".ActionsVal").text() == "Exit"){
            var bool = SchemaData.SaveRecordDetails("EditAgent"); 
           }
           else if($("#similarurlsteps").val() == ""){
            var bool = SchemaData.SaveRecordDetails();
           }
          else{
            var bool = SchemaData.SaveRecordDetails("1"); 
          }
       }
        
      else if($("#similarurlsteps").val() == ""){
        var bool = SchemaData.SaveRecordDetails();
       }
      else{
        var bool = SchemaData.SaveRecordDetails("1"); 
      }
    }
}     
$("input[name='rdnApplyTo']").prop("checked",false)
$("#divUploadAgent ,#divEnterURLs ,#DivUploadType").css('display','none')   

    })
    $("#btnCloseModal").off().on("click", function(){
        $("#ApproveModal").modal('hide');
    })

    $(".inpCheckboxLoopEnd").change(function () {
        debugger;
        var CtrlField = $(this).closest("details");
        var chkloopend = $(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.configaction > span").text();
        if (chkloopend == "Loop") {
            SchemaData.ShowPanel("error", "Kindly check there is no GET Action")
            $(this).prop("checked", false)
        }
        else {
           // SchemaData.SegmetationAppendData("LoopEnds",CtrlField)   
            //  AgentWorkArea.AppendNewData("LoopEnds")
            if ($(this).prop("checked") == true) {
                       
            }
            else {
                $(this).closest(".row").find('input[type!=checkbox],select').prop('disabled', true);                        
            }
    
        }


    })

    $("#inpCheckboxLoopEnd").change(function () {
        var chkloopend = $("#tblStepsCreations > tbody > tr:last > td.configaction > span").text();
        if (chkloopend == "Loop") {
            SchemaData.ShowPanel("error", "Kindly check there is no GET Action")
            $(this).prop("checked", false)
        }
        else {
           
            //  AgentWorkArea.AppendNewData("LoopEnds")
            if ($(this).prop("checked") == true) {
                SchemaData.AppendData("LoopEnds")
            }
            else if($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "MongoDB_write") {
                $("#tblStepsCreations > tbody > tr:last").remove();                  
            }
        }


    })

    $(".btncopydiff").off().on("click", function () {
        debugger;
        copyToClipboard($(this).prev())
    })


        $("#btnAddSteps").off().on("click", function () {
            debugger;
            $(".DivParsingCon").css('display','flex')
         if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){       if($("#rdoSimilarData:checked").length > 0){
                $("#inpValueinput").attr("data-attrcollection",$("#inpValueinput").val())
               }
               
       var bool3;
       var bool;
       var bool1;
       var bool4;
       var bool5;
       if($("#tblSavedSteps > tbody > tr").length > 0 ){
           bool3 = "SavedData";
           bool5 = SchemaData.ValidationSavedSteps()
        //    bool4 = SchemaData.AlreadySchemaExists("SavedData");
        bool4 = true;
          
       }
       else{
           bool3 = "InsertData"
       }
       if(bool3 == "InsertData"){
            bool = SchemaData.Validation();
            // bool1 = SchemaData.AlreadySchemaExists("InsertData");
            bool1 = true;
       }
             
               if (bool == true && bool1 == true && bool3 == "InsertData") {
                   debugger;
                   var StepAdded = "";
       
                   var Tbllength =  $("#tblStepsCreations > tbody > tr").length;
                   var StepPush = []
                    for(i=Tbllength;i>1;--i){
                      
                  
                           var CtrlData = $("#tblStepsCreations > tbody > tr")[i];
                           if($(CtrlData).find("td.configaction").text() == "MongoDB_write"){
                              var StepAdded = $(CtrlData).find(".sourcestep").text();
                              var NextIteratedData = parseInt(i) + 1;
                              break;
                           }
                          
           
                    }
                     if(StepAdded != ""){
                         for(j=NextIteratedData;j<100;j++){
                            if($("#tblStepsCreations > tbody > tr")[j] != undefined){
                               var Lengdata = "1"
                               StepPush.push(Lengdata)
                               var IfLoopData = $("#tblStepsCreations > tbody > tr")[j];
           
                               if($(IfLoopData).find("td.configaction").text().includes("Loop") == true){
                                   break;                                
                               }
                            }
                            else{
                                break;
                            }
                         }
                     }
                     if(StepAdded != "" && StepPush.length > 0){
                        FinalDataSteps = parseInt(StepAdded) + parseInt(StepPush.length)
                     }
                   $("#TrainStepTime").css('display','block')
                   $("#TrainStepTime").timer({
                       action: 'start',
                       seconds: 0
                   })
                   if ($("#tblRule > tbody > tr").length > 0) {
                       var Control = $("#tblRule > tbody > tr");
                       SchemaData.RuleDefine(Control, "FinalSave");
                   }
                   $("#tblStepsCreations").css('display', 'inline-table');
                   var IndexApp = $("#tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex")
                   $("#hdnSourceStep").val(IndexApp)
                   if($("#inpSeperateLoop").val() == "0" || $("#inpSeperateLoop").val() == ""){
                    SchemaData.AppendData();
                   }
                   else if($("#inpSeperateLoop").val() == "1"){
                  
                    SchemaData.AppendData("Timer");
                    LoopStepText = ""
                }
                //    SchemaData.AppendData();
                   $("#icndelete").css("display", "block")
                   var DatapointParameter = $("#tblStepsCreations > tbody > tr:last > td")[6];
                   DatapointParameter = $(DatapointParameter).text().toLowerCase()
                   if (DatapointParameter == "source_dict") {
                       SchemaData.AppendData("urlrequest")
                   }
                   if($("#inpHiddenLoop").val() == "1"){
                   SchemaData.AutomaticLoopStepAdded();  
                   }
                   SchemaData.ResetData();
                   var numOfVisibleRows = $("#tblStepsCreations > tbody > tr:visible").length;
               $("#StepsData").text(numOfVisibleRows)
                   if ($("#tblStepsCreations > tbody").length > 0) {
       
                       $("#divSubmit").css("display", "block")
                      if($("input[name='rdnAgentType']:checked").val() == "1"){
                        $("#btnSaveAsNew").css("display","none")   
                      }
                      else{
                       $("#btnSaveAsNew").css("display","block")   
                      }
                   }
                   // Added
                   if ($("#tblStepsCreations > tbody > tr:last").find(".configaction > span").text() == "Oncollection") {
                       $("#txtCollectionList").val($("#tblStepsCreations > tbody > tr:last").find(".inputVal").text())
                   }
                   else if ($("#tblStepsCreations > tbody > tr:last").find(".configaction > span").text() == "Get") {
                       var Option = $("#tblStepsCreations > tbody > tr:last").find(".inputVal").text();
                       $("#txtDataList").append(`<option value="${Option}">${Option}</option>`)
                   }
       
       
               }
               else if(bool3 == "SavedData" && bool4 == true && bool5 == true){
                   $.each($("#tblSavedSteps > tbody > tr"), function(i,objInsertStep){
                       if($(objInsertStep).find("td > input").is(":checked")){
                           var copyelement =  $(objInsertStep).clone();
                           $.each(copyelement, function(i,objUpdateCopyelement){
                               debugger;
                            //   var Steps = $(objUpdateCopyelement).find("td")[4].innerText;
                              // $(objUpdateCopyelement).find("td")[4].innerText = parseInt(Steps) + 1;
                              if($("#inpActionItem").val() == "Onclick"){
                               var ActionItem = $(objUpdateCopyelement).find("td > span.actionsval").text($("#inpActionItem").val())
                               var ActionItemRenamed = $(objUpdateCopyelement).find("td > span.ActionsValShow").text($("#inpActionItem").val())
                              }
                              
                               var res = $(objUpdateCopyelement).find("td")[7];
                               $(res).find("span").text($("#inpValueinput").val())
                               var res2 = $(objUpdateCopyelement).find("td")[10];
                               $(res2).find("span").text($("#ddlSchemaAssign").val())
                              // $(objUpdateCopyelement).find("td")[7].innerText = $("#inpValueinput").val()
                              // $(objUpdateCopyelement).find("td")[10].innerText = $("#ddlSchemaAssign").val()
                               if($("#inpTargetAttr").val() == "text"){
                               
                                 $(objUpdateCopyelement).find("td")[8].innerText = "no"
                                 $(objUpdateCopyelement).find("td")[9].innerText = $("#inpTargetAttr").val()
                                
                             }
                             else{
                                
                                 $(objUpdateCopyelement).find("td")[8].innerText = "yes"
                                 $(objUpdateCopyelement).find("td")[9].innerText = $("#inpTargetAttr").val()
                                 
                             }
                           })
                           $(copyelement).insertAfter($(objInsertStep))
                           $("#tblSavedSteps > tbody > tr > td").find("input").prop("checked",false)
                           SchemaData.ResetData();
                       }
                     
                     
                   })
               }
         }   
         else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
           
            if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]").is(":checked")){
                var bool3;
                var bool;
                var bool1;
                var bool4;
                var bool5;
                var CtrlSegementation = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
                if($(CtrlSegementation).find(".tblSavedSteps > tbody > tr").length > 0 ){
                    bool3 = "SavedData";
                    bool5 = SchemaData.ValidationSavedSteps(CtrlSegementation)
                    bool4 = SchemaData.AlreadySchemaExists("SavedData",CtrlSegementation);
                   
                }
                else{
                    bool3 = "InsertData"
                }

                 if(bool3 == "SavedData" && bool4 == true && bool5 == true){
                    $.each( $(CtrlSegementation).find(".tblSavedSteps > tbody > tr"), function(i,objInsertStep){
                        if($(objInsertStep).find("td > input").is(":checked")){
                            var copyelement =  $(objInsertStep).clone();
                            $.each(copyelement, function(i,objUpdateCopyelement){
                                debugger;
                             //   var Steps = $(objUpdateCopyelement).find("td")[4].innerText;
                               // $(objUpdateCopyelement).find("td")[4].innerText = parseInt(Steps) + 1;
                               if($("#inpActionItem").val() == "Onclick"){
                                var ActionItem = $(objUpdateCopyelement).find("td > span.actionsval").text($("#inpActionItem").val())
                                var ActionItemRenamed = $(objUpdateCopyelement).find("td > span.ActionsValShow").text($("#inpActionItem").val())
                               }
                               
                                var res = $(objUpdateCopyelement).find("td")[7];
                                $(res).find("span").text($("#inpValueinput").val())
                                var res2 = $(objUpdateCopyelement).find("td")[10];
                                $(res2).find("span").text($("#ddlSchemaAssign").val())
                               // $(objUpdateCopyelement).find("td")[7].innerText = $("#inpValueinput").val()
                               // $(objUpdateCopyelement).find("td")[10].innerText = $("#ddlSchemaAssign").val()
                                if($("#inpTargetAttr").val() == "text"){
                                
                                  $(objUpdateCopyelement).find("td")[8].innerText = "no"
                                  $(objUpdateCopyelement).find("td")[9].innerText = $("#inpTargetAttr").val()
                                 
                              }
                              else{
                                 
                                  $(objUpdateCopyelement).find("td")[8].innerText = "yes"
                                  $(objUpdateCopyelement).find("td")[9].innerText = $("#inpTargetAttr").val()
                                  
                              }
                            })
                            $(copyelement).insertAfter($(objInsertStep))
                            $(CtrlSegementation).find(".tblSavedSteps > tbody > tr > td").find("input").prop("checked",false)
                            SchemaData.ResetData();
                        }
                      
                      
                    })
                }
                else{
                    $(CtrlSegementation).find(".tblStepsCreations").css('display', 'inline-table');
                    var IndexApp =  $(CtrlSegementation).find(".tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex")
                    $("#hdnSourceStep").val(IndexApp)
                    SchemaData.SegmetationAppendData("",CtrlSegementation);
                    $("#icndelete").css("display", "block")
                    var DatapointParameter = $(CtrlSegementation).find(".tblStepsCreations > tbody > tr:last > td")[6];
                    DatapointParameter = $(DatapointParameter).text().toLowerCase()
                    if (DatapointParameter == "source_dict") {
                        SchemaData.SegmetationAppendData("urlrequest",CtrlSegementation)
                    }
                    if($("#inpHiddenLoop").val() == "1"){
                    SchemaData.AutomaticLoopStepAdded(CtrlSegementation);  
                    }
                    if ($(CtrlSegementation).find(".tblStepsCreations > tbody").length > 0) {
            
                     $(CtrlSegementation).find(".divSubmit").css("display", "block")
                    if($("input[name='rdnAgentType']:checked").val() == "1"){
                     $(CtrlSegementation).find(".btnSaveAsNew").css("display","none")   
                    }
                    else{
                     $(CtrlSegementation).find(".btnSaveAsNew").css("display","block")   
                    }
                 }
                 SchemaData.ResetData();
                }
               
              
             
            }
         }
       
    })

})



$("#btnCheck").off().on("click", function () {

    if ($("#divshowtable").css("display") == "block" || $("#divshowtable").css("display") == "flex" ) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            console.log(tabs[0].url)
            $("#spnhrefdetailsiframe").text(tabs[0].url)
            chrome.tabs.sendMessage(tabs[0].id, { type: "SchemaDetails" }, function (tmpClickedforXpath) {

                if (tmpClickedforXpath != undefined) {
                    //  $("#spnhrefdetails").text(hrefDetails.hrefDetails)
                    $("#btnselecttag").attr("disabled", true)
                }
                else {
                    $("#btnselecttag").attr("disabled", false)
                }
            }

                );

        })
    }
    else {
        SchemaData.ShowPanel("error", "Kindly enter agent details")
    }



})





$("#btnselecttag").off().on("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        debugger
        console.log(tabs[0].url)
        $("#spnhrefdetailsiframe").text(tabs[0].url)
        chrome.tabs.sendMessage(tabs[0].id, { type: "SchemaDetails" }, function (tmpClickedforXpath) {

            if (tmpClickedforXpath != undefined) {
                //  $("#spnhrefdetails").text(hrefDetails.hrefDetails)
                $("#btnselecttag").attr("disabled", true)
            }
            else {
                $("#btnselecttag").attr("disabled", false)
            }
        }

            );

    })

})

$(".spncloseframe").off().on("click", function () {

    chrome.storage.local.remove(['Username', 'UserID'], function (result) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

            chrome.tabs.sendMessage(tabs[0].id, { type: "Removeiframe", Removeframe: "1" })
        });


    })
})

$("#btnCopyCollection").off().on("click", function () {
    copyToClipboard($("#CollectionValue"))
    //alert("text copied")
})
$("#btnCopy").off().on("click", function () {
    copyToClipboard($("#XpathValue"))
    // alert("text copied")
})
$("#removeindexcopy").off().on("click", function () {
    copyToClipboard($("#inpRemovedIndex"))
    // alert("text copied")
})



$(".spnarrow").off().on("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];

        if (positiondata == undefined) {
            positiondata = "right";
            $(".leftarrow").css("display", "none")
            $(".rightarrow").css("display", "block")
        }
        else if (positiondata == "left") {
            positiondata = "right"
            $(".leftarrow").css("display", "none")
            $(".rightarrow").css("display", "block")
        }
        else if (positiondata == "right") {
            positiondata = "left"
            $(".leftarrow").css("display", "block")
            $(".rightarrow").css("display", "none")
        }
        chrome.tabs.sendMessage(activeTab.id, { type: "TogglePosition", positiondata: positiondata });

        //  chrome.runtime.sendMessage({type: "setCount", count: AgentSchemaCollection[0].SchemaCollection});

    })
})

$("#btnExport").off().on("click", function () {
    var OmittedData = $("#ULInnerText > li").find("input:checked");
    var Omittedarr = [];
    $.each(OmittedData, function (i, objOmitteddata) {
        debugger;
        var strOmittedIndex = $(objOmitteddata).parent("li").attr("data-omitedtextindex");
        Omittedarr.push(strOmittedIndex)
    })

})

$("#drpClassCollectionList").change(function () {

    if ($("#drpClassCollectionList option:selected").val() == "HTML") {
        $("#ULInnerText").css("display", "none")
        $("#ULInnerHTML").css("display", "block")
    }
    else if ($("#drpClassCollectionList option:selected").val() == "Text") {
        $("#ULInnerText").css("display", "block")
        $("#ULInnerHTML").css("display", "none")
    }
})


$("#btnXpathValue").off().on("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];

        var XpathData = $("input[name=rdnxpathresult]:checked").next().val();
        var CollectionData = $("#CollectionValue").val().trim();
        if (XpathData != "") {
            var Xpathelements = XpathData;
            $("#spnhrefdetails").text(activeTab.url)
            chrome.tabs.sendMessage(activeTab.id, { type: "Checkxpathelements", Xpathelements: Xpathelements, CollectionData: CollectionData, hrefDetails: $("#spnhrefdetails").text() });
        }



    })
})

$("#btnCheckXpathGet").off().on("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        //  if($("#drpConfigAction option:selected").val() == "Oncollection"){
        //      $("#drpConfigAction option:selected").val()
        //      $("#inpValueinput").attr("data-attrcollection",$("#inpValueinput").val().trim())
        //  }
        var XpathData = $("#inpValueinput").val().trim();
        if($("#inpActionItem").val() == "Oncollection"){
            $("#inpValueinput").attr("data-attrcollection",$("#inpValueinput").val().trim())    
        }
        //  var CollectionData = $(".collectionlist").text().trim();
        var CollectionData = $("#inpValueinput").attr("data-attrcollection");
        if (XpathData != "") {
            var Xpathelements = XpathData;
            $("#spnhrefdetails").text(activeTab.url)
            chrome.tabs.sendMessage(activeTab.id, { type: "Checkxpathelements", actiontype:$("#drpConfigAction option:selected").val(), Xpathelements: Xpathelements, CollectionData: CollectionData, hrefDetails: $("#spnhrefdetails").text() });
        }



    })
})



$("#btnCollectionValue").off().on("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        var Xpathelements = $("#CollectionValue").val().trim();

        chrome.tabs.sendMessage(activeTab.id, { type: "Checkxpathelements", Xpathelements: Xpathelements, hrefDetails: $("#spnhrefdetails").text(), typedata: "collection" });


    })
})

$("#inpValueinput").change(function(){
    if($(this).val() != ""){
       
    }
})


$("#inpMainURL").change(function () {
    var re = new RegExp("^(http|https)://", "i");
    var strMainURL = $(this).val().trim();
    var match = re.test(strMainURL);

    if ($(this).val().trim() != "") {
        $("#spnAgentURL").attr("title", $(this).val().trim())
        $("#spnAgentURL").text($(this).val().trim())
    }
    if($("input[name='rdnAgentType']:checked").val() == "1"){
        if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                   $(".tblStepsCreations").css("display","block")
        }
        else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){

        }
        if ($("#inpAgentName").val() != "" && $("#inpMainURL").val() != "" && match == true && $("#inpMainURL").val().trim() != "https://" && $("#inpMainURL").val().trim() != "http://") {
            if($("#tblSavedSteps > tbody > tr").length < 2){
                $("#tblStepsCreations").css("display", "inline-table");
            //    $("#drpConfigAction, #inpValueinput, #inpTargetAttr ,#btnAddSteps").prop("disabled", false)
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", false)
            $("#divshowtable").css("display", "block")
            }
            
            // $("#icndelete").css("display","block")
        }
        else {
            $("#tblStepsCreations").css("display", "none");
            $("#divshowtable").css("display", "none")
            $("#icndelete").css("display", "none")
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", true)
            SchemaData.ShowPanel("error", "Please enter valid URL")
        }
    }
    else if($("input[name='rdnAgentType']:checked").val() == "2"){
        if ($("#Agentlist").val() != "" && $("#inpMainURL").val() != "" && match == true && $("#inpMainURL").val().trim() != "https://" && $("#inpMainURL").val().trim() != "http://") {
            if($("#tblSavedSteps > tbody > tr").length < 2){
                $("#tblStepsCreations").css("display", "inline-table");
            //    $("#drpConfigAction, #inpValueinput, #inpTargetAttr ,#btnAddSteps").prop("disabled", false)
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", false)
            $("#divshowtable").css("display", "block")
            }
            
            // $("#icndelete").css("display","block")
        }
        else {
            $("#tblStepsCreations").css("display", "none");
            $("#divshowtable").css("display", "none")
            $("#icndelete").css("display", "none")
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", true)
            SchemaData.ShowPanel("error", "Please enter valid URL")
        }
    }
    


})

$(".inpSegementaionURLDetailedURL").change(function () {
    var re = new RegExp("^(http|https)://", "i");
    var strMainURL = $(this).val().trim();
    var match = re.test(strMainURL);
    var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
    if ($(this).val().trim() != "") {
        $(CtrlField).find(".SegmentationspnAgentURL").attr("title", $(this).val().trim())
        $(CtrlField).find(".SegmentationspnAgentURL").text($(this).val().trim())
    }
    if($("input[name='rdnAgentType']:checked").val() == "1"){
        if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                   $(".tblStepsCreations").css("display","block")
        }
        else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){

        }
        if ($("#inpAgentName").val() != "" && $(CtrlField).find(".inpSegementaionURLDetailedURL").val() != "" && match == true && $(CtrlField).find(".inpSegementaionURLDetailedURL").val().trim() != "https://" && $(CtrlField).find(".inpSegementaionURLDetailedURL").val().trim() != "http://") {
            if($("#tblSavedSteps > tbody > tr").length < 2){
                $("#tblStepsCreations").css("display", "inline-table");
            //    $("#drpConfigAction, #inpValueinput, #inpTargetAttr ,#btnAddSteps").prop("disabled", false)
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", false)
            $("#divshowtable").css("display", "block")
            }
            
            // $("#icndelete").css("display","block")
        }
        else {
            $(CtrlField).find(".tblStepsCreations").css("display", "none");
          //  $("#divshowtable").css("display", "none")
         //   $("#icndelete").css("display", "none")
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", true)
            SchemaData.ShowPanel("error", "Please enter valid URL")
        }
    }
    else if($("input[name='rdnAgentType']:checked").val() == "2"){
        if ($("#Agentlist").val() != "" && $("#inpMainURL").val() != "" && match == true && $("#inpMainURL").val().trim() != "https://" && $("#inpMainURL").val().trim() != "http://") {
            if($("#tblSavedSteps > tbody > tr").length < 2){
                $("#tblStepsCreations").css("display", "inline-table");
            //    $("#drpConfigAction, #inpValueinput, #inpTargetAttr ,#btnAddSteps").prop("disabled", false)
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", false)
            $("#divshowtable").css("display", "block")
            }
            
            // $("#icndelete").css("display","block")
        }
        else {
            $("#tblStepsCreations").css("display", "none");
            $("#divshowtable").css("display", "none")
            $("#icndelete").css("display", "none")
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", true)
            SchemaData.ShowPanel("error", "Please enter valid URL")
        }
    }
    


})


$("#inpAgentName").change(function () {
    if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
        if( $(CtrlField).find(".inpSegementaionURLDetailedURL").val().trim() != "" ){
            $(CtrlField).find(".inpSegementaionURLDetailedURL").change()
        }

    }
    else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){
        if($("#inpMainURL").val().trim() != ""){
            $("#inpMainURL").change();
        }
        
    }
    
})




// $("#inpMainURL").change(function () {
//     var re = new RegExp("^(http|https)://", "i");
//     var strMainURL = $(this).val().trim();
//     var match = re.test(strMainURL);

//     if ($(this).val().trim() != "") {
//         $("#spnAgentURL").attr("title", $(this).val().trim())
//         $("#spnAgentURL").text($(this).val().trim())
//     }
//     if ($("#inpAgentName").val() != "" && $("#inpMainURL").val() != "" && match == true && $("#inpMainURL").val().trim() != "https://" && $("#inpMainURL").val().trim() != "http://") {
//         $("#tblStepsCreations").css("display", "inline-table");
//         //    $("#drpConfigAction, #inpValueinput, #inpTargetAttr ,#btnAddSteps").prop("disabled", false)
//         $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", false)
//         // $("#icndelete").css("display","block")
//     }
//     else {
//         $("#tblStepsCreations").css("display", "none");
//         $("#icndelete").css("display", "none")
//         $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", true)
//         SchemaData.ShowPanel("error", "Please enter valid URL")
//     }


// })
$("#inpAgentName").change(function () {
    //   $("#spnPath").text("\\192.168.0.3\IT_Devp\Projects\AgentTrainingFiles\Output Agent")

    //\\192.168.0.3\IT_Devp\Projects\Test_AgentTrainingFiles
    var SaveURL = "\\\\192.168.0.3\\IT_Live_Projects\\Devp_AgentTrainingFiles\\Output Agent";
    var Filename = $(this).val().trim();
    $("#spnPath").text(SaveURL + "\\" + Filename + ".csv")
    $("#spnPath").attr("title", SaveURL + "\\" + Filename + ".csv")
    $("#spnFIleName").text(Filename)
    if ($("#inpAgentName").val() != "" && $("#inpMainURL").val() != "") {
        if($("#tblSavedSteps > tbody > tr").length < 2){
            $("#tblStepsCreations").css("display", "inline-table");
            $("#drpConfigAction, #inpValueinput ,#btnAddSteps").prop("disabled", false)
            $("#icndelete").css("display", "block")
        }
      
    }

})


$("#btnNo").off().on("click", function(){
    $("#MappedModal").modal("show")
})

$("#btnContinue").off().on("click", function(){
    debugger
    if($(".drpSelectExtractionURL").val() == "0"){
        SchemaData.ShowPanel("error","Please select the Extraction URL Field to Continue")
    }
    else{
        $("#btnSubmitft").click()
    }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.type === "OutputResult" && $("#spnhrefdetailsiframe").text() == request.hrefDetails) {
        alert(request.hrefDetails)
        debugger
        $("#ULInnerHTML > li").remove()
        $("#ULInnerText > li").remove()
        $("#drpIndex > option").remove()
        $(".divexternalget").remove();
        // $("#divbox").empty();
        $("#spnhrefdetails").text(request.hrefDetails)
        if (request.setIntermediateSchemasaveandOutput.split("||").length > 1) {
            $.each(request.setIntermediateSchemasaveandOutput.split("||"), function (i, objdata) {
                if (i == 0) {
                    $("#XpathValue").val(request.setIntermediateSchemasaveandOutput.split("||")[0])
                }
                else {
                    $("#divbox").append(`<div class="divexternalget"> <span style="float:left;width:19%;color:#fff"></span>
                    <input  type='radio' name='rdnxpathresult'/>
                    <input style="width:49%" class='inpcls form-control xpathvaluediff' type="text" value="${objdata}" placeholder="Xpath Value" />
                    <button  type="button" class="custombtn btncopydiff">
                    <i class="fa fa-clone" title="Copy" aria-hidden="true"></i>
                </button></div>
                    `)
                }

            })
            $(".btncopydiff").off().on("click", function () {
                debugger;
                copyToClipboard($(this).prev())
            })

            $("input[name=rdnxpathresult]").change(function () {

            })
        }
        else {
            $("#XpathValue").val(request.setIntermediateSchemasaveandOutput.split("||")[0])
        }
        if (request.CollectionList != undefined) {
            $("#CollectionValue").val(request.CollectionList)
            $("#CollectionValue").attr("data-attrcollection", request.CollectionList)
        }

        var ElementsDataXpathSelected = JSON.parse(request.ElementsData);
        $("#spnCollectionlength").text(ElementsDataXpathSelected.length)

        if (request.CollectionIndexLength != "1") {
            $("#drpIndex").append(`<option value='${request.CollectionIndexLength}'>All</option>`)
            //$.each(request.CollectionIndexLength)
            for (i = 0; i <= request.CollectionIndexLength; i++) {
                var indexloop = parseInt(i) + 1;
                $("#drpIndex").append(`<option>${indexloop}</option>`)
            }


        }
        $("#drpIndex").change(function () {
            debugger;
            if ($(this).text().trim() != "All") {
                $("#CollectionValue").val($("#CollectionValue").attr("data-attrcollection"))
                var CollectionXpath = $("#CollectionValue").val().trim();
                var strCollectionDataAfterIndex = CollectionXpath + "[" + $(this).val() + "]";
                $("#CollectionValue").val(strCollectionDataAfterIndex)
            }
            else {
                $("#CollectionValue").val($("#CollectionValue").attr("data-attrcollection"))
            }


        })
        if (ElementsDataXpathSelected.length > 0) {
            $("#divchkbox").css("display", "block")
        }
        else {
            $("#divchkbox").css("display", "none")
        }
        $.each(ElementsDataXpathSelected, function (i, objGetInnerTextandInnerHTML) {
            var res = $(objGetInnerTextandInnerHTML.InnerHTML)[0]
            var IndexData = parseInt(i) + 1;
            $("#ULInnerHTML").append(`<li></li>`)
            $("#ULInnerHTML li:last").text(objGetInnerTextandInnerHTML.InnerHTML)
            if (res.tagName.toLowerCase() == "img") {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> Img Source Found</li>`)
           
            }
            else {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> ${objGetInnerTextandInnerHTML.InnerText.trim() == "" ? "Text Found" : objGetInnerTextandInnerHTML.InnerText  } </li>`)
            }


        })
        var ArrOmittedIndex = [];
        $("input[name=chkomitdataindex]").change(function () {
            debugger;
            if ($(this).is(":checked") == true) {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")
                var replacedtext = $("#inpRemovedIndex").val().replace(OmittedIndex, "");


                var res = replacedtext.replace(/^,|,$/g, '');
                var filtered = replacedtext.split(",").sort()
     .filter(Boolean);
                $("#inpRemovedIndex").val(filtered);
                ArrOmittedIndex = $("#inpRemovedIndex").val().split(",");
                if ($("#inpRemovedIndex").val().trim() == "") {
                    ArrOmittedIndex = [];
                }
            }
            else {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")

                ArrOmittedIndex.push(OmittedIndex)

                $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
            }
            if ($("#ULInnerText > li").find("input").length == $("#ULInnerText > li").find("input:checked").length) {
                $("#inpSelectAll").prop("checked", true)
            }
            else {
                $("#inpSelectAll").prop("checked", false)
            }


        })

        $("#inpSelectAll").change(function () {
            debugger;

            if ($(this).is(":checked")) {
                $("#ULInnerText > li").find("input").prop("checked", true)
                $("#inpRemovedIndex").val("")
                ArrOmittedIndex = [];
            }
            else {
                $("#ULInnerText > li").find("input").prop("checked", false)
                var OmittedIndex = $("#ULInnerText > li");
                $.each(OmittedIndex, function (i, objindex) {
                    var OmittedIndex = $(objindex).attr("data-omitedtextindex");
                    ArrOmittedIndex.push(OmittedIndex)
                    $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
                })
            }

        })


    }

    else if (request.type === "OutputResultCheck" && $("#spnhrefdetailsiframe").text() == request.hrefDetails) {

        debugger
        $("#ULInnerHTML > li").remove()
        $("#ULInnerText > li").remove()
        $("#drpIndex > option").remove()
        $("#getlistdataxpath > option").empty();
        $("#inpHiddenLoop").val(request.IscheckedLoopChecked);
        // $("#divbox").empty();
        $("#spnhrefdetails").text(request.hrefDetails)
        if(request.ActionItem != "undefined"){
            $("#inpActionItem").val(request.ActionItem)
            if(request.Loopend != "" && request.Loopend != undefined){
                $("#inpSeperateLoop").val(request.Loopend)
            }
            else{
                $("#inpSeperateLoop").val("0") 
            } 
            $("#ddlSchemaAssign").attr("disabled",false) 
            if($("#inpActionItem").val() == "Onclick"){
                $("#drpSubfield").attr("disabled",false)
                $("#drpAttributeType").attr("disabled",true)
                if(request.ParamterValue != "" && request.ParamterValue != undefined){
                    $("#inpparamter").val(request.ParamterValue)
                }
               
                $("#drpSubfield").val(request.ParamterValue).prop('disabled', true)
            }
            else if($("#inpActionItem").val() == "Get"){
                $("#drpSubfield").attr("disabled",true)
                $("#drpAttributeType").attr("disabled",false)
                if(request.ParamterValue != "" && request.ParamterValue != undefined){
                    $("#inpparamter").val(request.ParamterValue)
                    $("#drpSubfield").val(request.ParamterValue).prop('disabled', true)
                }
            } 
            else if($("#inpActionItem").val() == "Oncollection"){
                 $("#ddlSchemaAssign").attr("disabled",true)
            } 
            else{
                $("#drpSubfield").attr("disabled",true)
                $("#drpAttributeType").attr("disabled",true)
            }
            $("#drpConfigSetAction").attr("disabled",true)
        }
        else{
            $("#inpActionItem").val("")    
            $("#drpConfigSetAction").attr("disabled",false)
        }
        
        if(request.SetInputValue != undefined){
            $("#inpTargetAttr").val(request.SetInputValue)
        }
        $("#spnLen").text(request.setIntermediateSchemasaveandOutput.split("||").length)
        if(request.setIntermediateSchemasaveandOutput.split("#||#").length == 1){
            if (request.setIntermediateSchemasaveandOutput.split("||").length > 1) {
                $.each(request.setIntermediateSchemasaveandOutput.split("||"), function (i, objdata) {
                    $("#inpValueinput").val(request.setIntermediateSchemasaveandOutput.split("||")[0])
                    $("#getlistdataxpath").append(`
                        <option>${objdata}</option>
                        `)
    
    
                })
                $(".btncopydiff").off().on("click", function () {
                    debugger;
                    copyToClipboard($(this).prev())
                })
    
                $("input[name=rdnxpathresult]").change(function () {
    
                })
            }
            else {
                $("#inpValueinput").val(request.setIntermediateSchemasaveandOutput.split("||")[0])
            }
        }
        else{
            $("#inpValueinput").val(request.setIntermediateSchemasaveandOutput)
        }
        
        if (request.CollectionList != undefined) {
            $("#inpValueinput").val(request.CollectionList)
            $("#inpValueinput").attr("data-attrcollection", request.CollectionList)
        }

        var ElementsDataXpathSelected = JSON.parse(request.ElementsData);
        $("#spnCollectionlength").text(ElementsDataXpathSelected.length)

        if (request.CollectionIndexLength != "1") {
            $("#drpIndex").append(`<option value='${request.CollectionIndexLength}'>All</option>`)
            //$.each(request.CollectionIndexLength)
            for (i = 0; i <= request.CollectionIndexLength; i++) {
                var indexloop = parseInt(i) + 1;
                $("#drpIndex").append(`<option>${indexloop}</option>`)
            }


        }
        $("#drpIndex").change(function () {
            debugger;
            if ($(this).text().trim() != "All") {
                $("#inpValueinput").val($("#inpValueinput").attr("data-attrcollection"))
                var CollectionXpath = $("#inpValueinput").val().trim();
                var strCollectionDataAfterIndex = CollectionXpath + "[" + $(this).val() + "]";
                $("#inpValueinput").val(strCollectionDataAfterIndex)
            }
            else {
                $("#inpValueinput").val($("#inpValueinput").attr("data-attrcollection"))
            }


        })
        if (ElementsDataXpathSelected.length > 0) {
            $("#divchkbox").css("display", "block")
            SchemaData.FindAttributeinXpath(ElementsDataXpathSelected)
        }
        else {
            $("#divchkbox").css("display", "none")
        }
        $.each(ElementsDataXpathSelected, function (i, objGetInnerTextandInnerHTML) {
            var res = $(objGetInnerTextandInnerHTML.InnerHTML)[0]
            var IndexData = parseInt(i) + 1;
            $("#ULInnerHTML").append(`<li></li>`)
            $("#ULInnerHTML li:last").text(objGetInnerTextandInnerHTML.InnerHTML)
            if (res.tagName.toLowerCase() == "img") {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> Img Source Found</li>`)
            }
            else {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> ${objGetInnerTextandInnerHTML.InnerText.trim() == "" ? "Text Found" : objGetInnerTextandInnerHTML.InnerText} </li>`)
            }


        })
        var ArrOmittedIndex = [];
        $("input[name=chkomitdataindex]").change(function () {
            debugger;
            if ($(this).is(":checked") == true) {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")
                var replacedtext = $("#inpRemovedIndex").val().replace(OmittedIndex, "");


                var res = replacedtext.replace(/^,|,$/g, '');
                var filtered = replacedtext.split(",").sort()
     .filter(Boolean);
                $("#inpRemovedIndex").val(filtered);
                ArrOmittedIndex = $("#inpRemovedIndex").val().split(",");
                if ($("#inpRemovedIndex").val().trim() == "") {
                    ArrOmittedIndex = [];
                }
            }
            else {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")

                ArrOmittedIndex.push(OmittedIndex)

                $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
            }
            if ($("#ULInnerText > li").find("input").length == $("#ULInnerText > li").find("input:checked").length) {
                $("#inpSelectAll").prop("checked", true)
            }
            else {
                $("#inpSelectAll").prop("checked", false)
            }


        })

        $("#inpSelectAll").change(function () {
            debugger;

            if ($(this).is(":checked")) {
                $("#ULInnerText > li").find("input").prop("checked", true)
                $("#inpRemovedIndex").val("")
                ArrOmittedIndex = [];
            }
            else {
                $("#ULInnerText > li").find("input").prop("checked", false)
                var OmittedIndex = $("#ULInnerText > li");
                $.each(OmittedIndex, function (i, objindex) {
                    var OmittedIndex = $(objindex).attr("data-omitedtextindex");
                    ArrOmittedIndex.push(OmittedIndex)
                    $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
                })
            }

        })


    }


    else if (request.type == "XPathCertainResult" && $("#spnhrefdetailsiframe").text() == request.hrefDetails) {
        $("#ULInnerHTML > li").remove()
        $("#ULInnerText > li").remove()
        var ElementsDataXpathSelected = JSON.parse(request.ElementsData);
        if (ElementsDataXpathSelected.length > 0) {
            $("#divchkbox").css("display", "block")
            SchemaData.FindAttributeinXpath(ElementsDataXpathSelected)
        }
        else {
            $("#divchkbox").css("display", "none")
        }
        $("#spnCollectionlength").text(ElementsDataXpathSelected.length)
        $.each(ElementsDataXpathSelected, function (i, objGetInnerTextandInnerHTML) {
            var res = $(objGetInnerTextandInnerHTML.InnerHTML)[0]
            var IndexData = parseInt(i) + 1;
            $("#ULInnerHTML").append(`<li></li>`)
            $("#ULInnerHTML li:last").text(objGetInnerTextandInnerHTML.InnerHTML)
            if (res.tagName.toLowerCase() == "img") {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> Img Source Found</li>`)
            }
            else {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> ${objGetInnerTextandInnerHTML.InnerText.trim() == "" ? "Text Found" : objGetInnerTextandInnerHTML.InnerText} </li>`)
            }


        })
        var ArrOmittedIndex = [];
        $("input[name=chkomitdataindex]").change(function () {
            debugger;
            if ($(this).is(":checked") == true) {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")
                var replacedtext = $("#inpRemovedIndex").val().replace(OmittedIndex, "");


                var res = replacedtext.replace(/^,|,$/g, '');
                var filtered = replacedtext.split(",").sort()
     .filter(Boolean);
                $("#inpRemovedIndex").val(filtered);
                ArrOmittedIndex = $("#inpRemovedIndex").val().split(",");
                if ($("#inpRemovedIndex").val().trim() == "") {
                    ArrOmittedIndex = [];
                }
            }
            else {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")

                ArrOmittedIndex.push(OmittedIndex)

                $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
            }

            if ($("#ULInnerText > li").find("input").length == $("#ULInnerText > li").find("input:checked").length) {
                $("#inpSelectAll").prop("checked", true)
            }
            else {
                $("#inpSelectAll").prop("checked", false)
            }

        })

        // $("#ULInnerHTML > li").remove()
        // $("#ULInnerText > li").remove()
        var ElementsDataXpathSelected = JSON.parse(request.ElementsData);
        if (ElementsDataXpathSelected.length > 0) {
            $("#tabelCollectionList > tbody").empty()
        }
        $("#spnCollectionlength").text(ElementsDataXpathSelected.length)
        $.each(ElementsDataXpathSelected, function (i, objGetInnerTextandInnerHTML) {
            debugger;
            var res = $(objGetInnerTextandInnerHTML.InnerHTML)[0]
            var IndexData = parseInt(i) + 1;
            $("#ULInnerHTML").append(`<li></li>`)
            $("#ULInnerHTML li:last").text(objGetInnerTextandInnerHTML.InnerHTML)
            if (res.tagName.toLowerCase() == "img") {
        
                // $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> Img Source Found</li>`)
                $("#tabelCollectionList > tbody").append(`
                <tr data_omitedtextindex="${IndexData}"><td><input type='checkbox' name='chkomitdataindex' checked /></td><td class='SchemaName'><span class="dataCollList">Img Source Found</span></td></tr>
                `);
            }
            else {
                // $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> ${objGetInnerTextandInnerHTML.InnerText} </li>`)
                $("#tabelCollectionList > tbody").append(`
                <tr data_omitedtextindex="${IndexData}"><td><input type='checkbox' name='chkomitdataindex' checked /></td><td class='SchemaName'><span class="dataCollList">${objGetInnerTextandInnerHTML.InnerText}</span> </td></tr>
                `);
            }
        
        
        })



    }
    else if(request.type == "OutputResultCheck" && request.Ifrmaecase == true){
        debugger
        $("#ULInnerHTML > li").remove()
        $("#ULInnerText > li").remove()
        $("#drpIndex > option").remove()
        $("#getlistdataxpath > option").empty();
        $("#inpHiddenLoop").val(request.IscheckedLoopChecked);
        // $("#divbox").empty();
        $("#spnhrefdetails").text(request.hrefDetails)
        if(request.ActionItem != "undefined"){
            $("#inpActionItem").val(request.ActionItem) 
            if(request.Loopend != "" && request.Loopend != undefined){
                $("#inpSeperateLoop").val(request.Loopend)
            }
            else{
                $("#inpSeperateLoop").val("0") 
            }
            $("#ddlSchemaAssign").attr("disabled",false) 
            if($("#inpActionItem").val() == "Onclick"){
                $("#drpSubfield").attr("disabled",false)
                $("#drpAttributeType").attr("disabled",true)
                if(request.ParamterValue != "" && request.ParamterValue != undefined){
                    $("#inpparamter").val(request.ParamterValue)
                }
               
                $("#drpSubfield").val(request.ParamterValue).prop('disabled', true)
            }
            else if($("#inpActionItem").val() == "Get"){
                $("#drpSubfield").attr("disabled",true)
                $("#drpAttributeType").attr("disabled",false)
                if(request.ParamterValue != "" && request.ParamterValue != undefined){
                    $("#inpparamter").val(request.ParamterValue)
                }
            } 
            else if($("#inpActionItem").val() == "Oncollection"){
                 $("#ddlSchemaAssign").attr("disabled",true)
            } 
            else{
                $("#drpSubfield").attr("disabled",true)
                $("#drpAttributeType").attr("disabled",true)
            }
            $("#drpConfigSetAction").attr("disabled",true)
        }
        else{
            $("#inpActionItem").val("")    
            $("#drpConfigSetAction").attr("disabled",false)
        }
        
        if(request.SetInputValue != undefined){
            $("#inpTargetAttr").val(request.SetInputValue)
        }
        $("#spnLen").text(request.setIntermediateSchemasaveandOutput.split("||").length)
        if(request.setIntermediateSchemasaveandOutput.split("#||#").length == 1){
            if (request.setIntermediateSchemasaveandOutput.split("||").length > 1) {
                $.each(request.setIntermediateSchemasaveandOutput.split("||"), function (i, objdata) {
                    $("#inpValueinput").val(request.setIntermediateSchemasaveandOutput.split("||")[0])
                    $("#getlistdataxpath").append(`
                        <option>${objdata}</option>
                        `)
    
    
                })
                $(".btncopydiff").off().on("click", function () {
                    debugger;
                    copyToClipboard($(this).prev())
                })
    
                $("input[name=rdnxpathresult]").change(function () {
    
                })
            }
            else {
                $("#inpValueinput").val(request.setIntermediateSchemasaveandOutput.split("||")[0])
            }
        }
        else{
            $("#inpValueinput").val(request.setIntermediateSchemasaveandOutput)
        }
        
        if (request.CollectionList != undefined) {
            $("#inpValueinput").val(request.CollectionList)
            $("#inpValueinput").attr("data-attrcollection", request.CollectionList)
        }

        var ElementsDataXpathSelected = JSON.parse(request.ElementsData);
        $("#spnCollectionlength").text(ElementsDataXpathSelected.length)

        if (request.CollectionIndexLength != "1") {
            $("#drpIndex").append(`<option value='${request.CollectionIndexLength}'>All</option>`)
            //$.each(request.CollectionIndexLength)
            for (i = 0; i <= request.CollectionIndexLength; i++) {
                var indexloop = parseInt(i) + 1;
                $("#drpIndex").append(`<option>${indexloop}</option>`)
            }


        }
        $("#drpIndex").change(function () {
            debugger;
            if ($(this).text().trim() != "All") {
                $("#inpValueinput").val($("#inpValueinput").attr("data-attrcollection"))
                var CollectionXpath = $("#inpValueinput").val().trim();
                var strCollectionDataAfterIndex = CollectionXpath + "[" + $(this).val() + "]";
                $("#inpValueinput").val(strCollectionDataAfterIndex)
            }
            else {
                $("#inpValueinput").val($("#inpValueinput").attr("data-attrcollection"))
            }


        })
        if (ElementsDataXpathSelected.length > 0) {
            $("#divchkbox").css("display", "block")
            SchemaData.FindAttributeinXpath(ElementsDataXpathSelected)
        }
        else {
            $("#divchkbox").css("display", "none")
        }
        $.each(ElementsDataXpathSelected, function (i, objGetInnerTextandInnerHTML) {
            var res = $(objGetInnerTextandInnerHTML.InnerHTML)[0]
            var IndexData = parseInt(i) + 1;
            $("#ULInnerHTML").append(`<li></li>`)
            $("#ULInnerHTML li:last").text(objGetInnerTextandInnerHTML.InnerHTML)
            if (res.tagName.toLowerCase() == "img") {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> Img Source Found</li>`)
            }
            else {
                $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> ${objGetInnerTextandInnerHTML.InnerText} </li>`)
            }


        })
        var ArrOmittedIndex = [];
        $("input[name=chkomitdataindex]").change(function () {
            debugger;
            if ($(this).is(":checked") == true) {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")
                var replacedtext = $("#inpRemovedIndex").val().replace(OmittedIndex, "");


                var res = replacedtext.replace(/^,|,$/g, '');
                var filtered = replacedtext.split(",").sort()
     .filter(Boolean);
                $("#inpRemovedIndex").val(filtered);
                ArrOmittedIndex = $("#inpRemovedIndex").val().split(",");
                if ($("#inpRemovedIndex").val().trim() == "") {
                    ArrOmittedIndex = [];
                }
            }
            else {
                var OmittedIndex = $(this).parent().attr("data-omitedtextindex")

                ArrOmittedIndex.push(OmittedIndex)

                $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
            }
            if ($("#ULInnerText > li").find("input").length == $("#ULInnerText > li").find("input:checked").length) {
                $("#inpSelectAll").prop("checked", true)
            }
            else {
                $("#inpSelectAll").prop("checked", false)
            }


        })

        $("#inpSelectAll").change(function () {
            debugger;

            if ($(this).is(":checked")) {
                $("#ULInnerText > li").find("input").prop("checked", true)
                $("#inpRemovedIndex").val("")
                ArrOmittedIndex = [];
            }
            else {
                $("#ULInnerText > li").find("input").prop("checked", false)
                var OmittedIndex = $("#ULInnerText > li");
                $.each(OmittedIndex, function (i, objindex) {
                    var OmittedIndex = $(objindex).attr("data-omitedtextindex");
                    ArrOmittedIndex.push(OmittedIndex)
                    $("#inpRemovedIndex").val(ArrOmittedIndex.sort().toString())
                })
            }

        })
    }
    else if(request.type == "PreviousURLs"){
        debugger
     if(request.mainURL == $("#spnhrefdetailsURL").text().trim()){

     
        if(request.PreviousURL != ""){
         //   alert('')
         var PageLevelEnd =""
         if(request.PreviousURL == ""){

         }
         else{
            SchemaData.SaveExtractionField(request.PreviousURL)
         }
           
                  var obj = new Object();
                  obj.flag = 12;
                  obj.strAgentURL = $("#spnhrefdetailsURL").text().trim();
                  obj.intUserID = $("#SpnUserID").text();
                  $.ajax({
                    type: "POST",
                    url: HostingPath + "/api/GetSchemaDetails",
                    dataType: 'json',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    success: function (data) {
                        var ListDetails = data.response[0];
                        
                        var PageLevel;
                        var ExtractionField;
                        if(ListDetails.length >0){
                            $("#inpAgentName").val(data.response[0][0].AgentName).attr("readonly",true)
                            $.each(ListDetails, function(i,obj){
                                if(obj.AgentURL != $("#spnhrefdetailsURL").text().trim()){
                                    PageLevel = obj.PageLevel
                                    ExtractionField = obj.ExtractionField
                                    $("#spnExtractionURL").text(ExtractionField)
                                }
                                
                              PageLevelEnd =   SchemaData.GetListDetailsofAgentURLAgentDetails(obj.URLSchemaID,"Load")
                               // SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID)
                             })
                        }
                        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]").parent().parent();
                        $.each(CtrlField, function(j,objLevel){
                            if($(objLevel).find("summary").attr("page-level") == PageLevel){
                                $(objLevel).parent().next().find("input[name=inpPageLevel]").prop("checked",true)
                               
                                $(objLevel).parent().next().find("summary").find("input[name=inpPageLevel]").change()
                                $(objLevel).parent().next().css("display","inline-block")
                                $(objLevel).parent().next().find(".drpExtractionURL").val(ExtractionField).change()
                              
                                return false
                            }
                        })
                        
                        
                    }
                })
        }
        else if(request.PreviousURL == ""){
           alert('1')
           var obj = new Object();
           obj.flag = 12;
           obj.strAgentURL = $("#spnhrefdetailsURL").text().trim();
           obj.intUserID = $("#SpnUserID").text();
           $.ajax({
             type: "POST",
             url: HostingPath + "/api/GetSchemaDetails",
             dataType: 'json',
             async: false,
             contentType: "application/json; charset=utf-8",
             data: JSON.stringify(obj),
             success: function (data) {
                 var ListDetails = data.response[0];
                 var PageLevel;
                 var ExtractionField;
                 if(ListDetails.length >0){
                    $("#inpAgentName").val(data.response[0][0].AgentName).attr("readonly",true)
                     $.each(ListDetails, function(i,obj){
                        
                         if(obj.AgentURL != $("#spnhrefdetailsURL").text().trim()){
                             PageLevel = obj.PageLevel
                             ExtractionField = obj.ExtractionField
                             $("#spnExtractionURL").text(ExtractionField)
                         }
                        //  else if(obj.AgentURL == $("#spnhrefdetailsURL").text().trim()){
                        //     PageLevel = obj.PageLevel
                        //  }
                         
                       PageLevelEnd =   SchemaData.GetListDetailsofAgentURLAgentDetails(obj.URLSchemaID,"Load")
                        // SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID)
                      })
                 }
                 if(ListDetails.length == 0 && request.PreviousURL == ""){
                    $("#divListingAgent").find("summary").find("input[name=inpPageLevel]").prop("checked",true)
                    $("#divListingAgent").find("summary").find("input[name=inpPageLevel]").change()
                 }
                 else{
                    var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]").parent().parent();
                    $.each(CtrlField, function(j,objLevel){
                        if($(objLevel).find("summary").attr("page-level") == PageLevel){
                            $(objLevel).parent().next().find("input[name=inpPageLevel]").prop("checked",true)
                           
                            $(objLevel).parent().next().find("summary").find("input[name=inpPageLevel]").change()
                            $(objLevel).parent().next().css("display","inline-block")
                            $(objLevel).parent().next().find(".drpExtractionURL").val(ExtractionField).change()
                          
                            return false
                        }
                    })
                 }
                
                 
                 
             }
         })
           

        }
    }
    }
    else{
        // Parcing function Collection List
        $("#ULInnerHTML > li").remove()
        $("#ULInnerText > li").remove()
        var ElementsDataXpathSelected = JSON.parse(request.ElementsData);
        if (ElementsDataXpathSelected.length > 0) {
            $("#tabelCollectionList > tbody").empty()
        }
        $("#spnCollectionlength").text(ElementsDataXpathSelected.length)
        $.each(ElementsDataXpathSelected, function (i, objGetInnerTextandInnerHTML) {
            debugger;
            var res = $(objGetInnerTextandInnerHTML.InnerHTML)[0]
            var IndexData = parseInt(i) + 1;
            $("#ULInnerHTML").append(`<li></li>`)
            $("#ULInnerHTML li:last").text(objGetInnerTextandInnerHTML.InnerHTML)
            if (res.tagName.toLowerCase() == "img") {
        
                // $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> Img Source Found</li>`)
                $("#tabelCollectionList > tbody").append(`
                <tr data_omitedtextindex="${IndexData}"><td><input type='checkbox' name='chkomitdataindex' checked /></td><td class='SchemaName'><span class="dataCollList">Img Source Found</span></td></tr>
                `);
            }
            else {
                // $("#ULInnerText").append(`<li data-omitedtextindex='${IndexData}'> <input type='checkbox' name='chkomitdataindex' checked /> ${objGetInnerTextandInnerHTML.InnerText} </li>`)
                $("#tabelCollectionList > tbody").append(`
                <tr data_omitedtextindex="${IndexData}"><td><input type='checkbox' name='chkomitdataindex' checked /></td><td class='SchemaName'><span class="dataCollList">${objGetInnerTextandInnerHTML.InnerText}</span> </td></tr>
                `);
            }
        
        
        })
        
        
            }
})

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem[0].tagName === "INPUT" || elem.tagName === "TEXTAREA" || elem[0].tagName === "SPAN";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem[0];
        origSelectionStart = elem[0].selectionStart;
        origSelectionEnd = elem[0].selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem[0].setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}


function _x(STR_XPATH) {
    debugger;

    var doc = $("#iframeloadURL")[0];
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

var SchemaData = {
    LoadSchemaDropdown: function () {
        var obj = new Object();
        obj.flag = "4";
        obj.intUserID = $("#SpnUserID").text();
        obj.intRecordID = "0";
        obj.intSchemaMasterID = "0";
        obj.intPrimaryURLSchemaID = $("#hdnURLSchemaID").val() == "" ? "0" : $("#hdnURLSchemaID").val()
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/GetSchemaDetails",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                var SchemaList = data.response[0];

                $("#inpdatalistschemaname").empty()

                $.each(SchemaList, function (i, objSchemaList) {

                    $("#inpdatalistschemaname").append(`<option data-schemamasterid="${objSchemaList.SchemaMasterID}">${objSchemaList.SchemaName}</option>`)
                })
            },
        })
    },
    LoadSchemaList: function () {

        var obj = new Object();
        obj.intFlag = "1";
        obj.strSchemaName = "";
        obj.strSchemaCollection = "";
        obj.intSchemaID = "0";
        obj.intUserID = "0";
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/schemalist",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                // if(data.error == "0"){
                var SchemaList = data.response[0];
                //console.log(SchemaList)
                $("#inpdatalistschemaname").empty()
                $("#ddlSchemaList").empty();
                $.each(SchemaList, function (i, objSchemaList) {
                    $("#inpdatalistschemaname").append(`<option data-schemamasterid="${objSchemaList.AC_SchemaMasterID}">${objSchemaList.SchemaName}</option>`)
                    $("#ddlSchemaList").append(`<option data-schemamasterid="${objSchemaList.AC_SchemaMasterID}">${objSchemaList.SchemaName}</option>`)

                })
                // }
            },

        })
    },
    Loadexistingschemadetails: function (type) {
        var val = "";
        if (type == "reset") {
            val = $("#hdnSchemavalue").val()
        }
        else {
            val = $('#inpschemaname').val()
        }
        var SchemamasterID = $('#inpdatalistschemaname option').filter(function () {
            return this.value == val;
        }).data('schemamasterid');

        var obj = new Object();
        obj.flag = "4";
        obj.intUserID = $("#SpnUserID").text();
        if ($("input[name=inpschemacreation]:checked").val() == "1") {
            obj.intSchemaMasterID = "0";
        }
        else {
            obj.intSchemaMasterID = SchemamasterID;
        }
        obj.intPrimaryURLSchemaID = $("#hdnURLSchemaID").val() == "" ? "0" : $("#hdnURLSchemaID").val()

        obj.intRecordID = "0";
        obj.strAgentName = "";
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {

                //console.log(data.response[0])
                var AgentExistsUrlFound = data.response[0];
                $("#inpschemaname").val(AgentExistsUrlFound[0].SchemaName);
                $("#hdnSchemavalue").val(AgentExistsUrlFound[0].SchemaName)
                //   $("#hdnRecordID").val(AgentExistsUrlFound[0].RecordID)

                $("#hdnURLSchemaID").val(AgentExistsUrlFound[0].URLSchemaID)
                $("#hdnURLSchemaCollection").val(AgentExistsUrlFound[0].SchemaCollection.split(",").length)
                var SchemaCollection = AgentExistsUrlFound[0].SchemaCollection
                SchemaData.ExistingSchemaRecordsAppend(SchemaCollection, type)
            }
        })
    },
    ValidationSavedSteps: function(CtrlSegementation){
        if(CtrlSegementation != "" && CtrlSegementation != undefined){
            var bool = true;
            if ($("#schemalist").val() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else if ($("#inpAgentName").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "1" && $("#inpEditType").val() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Agent Name")
            }
            else if($("#Agentlist").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "2" && $("#inpEditType").val() == "" ){
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Agent Name")
            }
           
            
            else if($("#inpActionItem").val().trim() == "" && $("#drpConfigSetAction option:selected").val().trim() == "0"  ){
                 bool = false;
                SchemaData.ShowPanel("error", "Please select Action in focus")
            }
            
            else if ($("#inpValueinput").val().trim() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter value")
            }
            else if($("#inpActionItem").val().trim() == "Onclick" && $("#drpSubfield option:selected").text() == "None"){
                bool = false;
                SchemaData.ShowPanel("error", "Please select parameter")
            }
            else if ($("#inpTargetAttr").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Target Attribute")
            }
            
            else if ($("#ddlSchemaAssign").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else if ($("#inpTargetAttr").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Target Attribute")
            }
            else if ($("#ddlSchemaAssign").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else{
                bool = true;
            }
        }
        else{
            var bool = true;
            if ($("#schemalist").val() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else if ($("#inpAgentName").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "1" && $("#inpEditType").val() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Agent Name")
            }
            else if($("#Agentlist").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "2" && $("#inpEditType").val() == "" ){
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Agent Name")
            }
            else if ($("#inpMainURL").val().trim() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Agent URL")
            }
                
            else if ($("#schemalist").val().trim() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else if($("#inpActionItem").val().trim() == "" && $("#drpConfigSetAction option:selected").val().trim() == "0"  ){
                 bool = false;
                SchemaData.ShowPanel("error", "Please select Action in focus")
            }
            
            else if ($("#inpValueinput").val().trim() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter value")
            }
            else if($("#inpActionItem").val().trim() == "Onclick" && $("#drpSubfield option:selected").text() == "None"){
                bool = false;
                SchemaData.ShowPanel("error", "Please select parameter")
            }
            else if ($("#inpTargetAttr").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Target Attribute")
            }
            
            else if ($("#ddlSchemaAssign").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else if ($("#inpTargetAttr").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Target Attribute")
            }
            else if ($("#ddlSchemaAssign").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema Name")
            }
            else{
                bool = true;
            }
        }
       
        return bool;
    },
    Validation: function () {
        debugger;
        var bool = true;
        if ($("#schemalist").val() == "") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Schema Name")
        }
        else if ($("#inpAgentName").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "1" ) {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent Name")
        }
        else if($("#Agentlist").val().trim() == "" && $("input[name='rdnAgentType']:checked").val() == "2" ){
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent Name")
        }
        else if ($("#inpMainURL").val().trim() == "") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Agent URL")
        }
            
        else if ($("#schemalist").val().trim() == "") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Schema Name")
        }
        else if($("#inpActionItem").val().trim() == "" && $("#drpConfigSetAction option:selected").val().trim() == "0"  && $("#drpConfigAction option:selected").val() != "Loop"){
             bool = false;
            SchemaData.ShowPanel("error", "Please select Action in focus")
        }
        
        else if ($("#inpValueinput").val().trim() == "" && $("#drpConfigAction option:selected").val() != "Loop") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter value")
        }
        else if($("#inpActionItem").val().trim() == "Onclick" && $("#drpSubfield option:selected").text() == "None"){
            bool = false;
            SchemaData.ShowPanel("error", "Please select parameter")
        }
        else if ($("#inpTargetAttr").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Target Attribute")
        }
        
        else if ($("#ddlSchemaAssign").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Schema Name")
        }
        else if ($("#inpTargetAttr").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Target Attribute")
        }
        else if ($("#ddlSchemaAssign").val().trim() == "" && $("#inpActionItem").val().trim() == "Get") {
            bool = false;
            SchemaData.ShowPanel("error", "Please enter Schema Name")
        }
       
            
        
        else if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop" && ($("#inpActionItem").val() == "Loop" || $("#drpConfigAction").val() == "Set Navigation Limit" || $("#drpConfigSetAction").val() == "Set Navigation Limit")) {
            bool = false;
            SchemaData.ShowPanel("error", "Already Loop Added");
            $("#inpValueinput").val("");
            $("#drpConfigSetAction").val("0");
        }
        else if ($("#inpActionItem").val().trim() == "Get") {
            debugger;
            if ($("#inpTargetAttr").val().trim() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Attribute")
            }
            else if ($("#ddlSchemaAssign").val().trim() == "") {
                bool = false;
                SchemaData.ShowPanel("error", "Please enter Schema")
            }


        }
        // else if ($("#inpActionItem").val().trim() == "Get") {
        //     debugger;
        //     if ($("#inpTargetAttr").val().trim() == "") {
        //         bool = false;
        //         SchemaData.ShowPanel("error", "Please enter Attribute")
        //     }
        //     else if ($("#ddlSchemaAssign").val().trim() == "") {
        //         bool = false;
        //         SchemaData.ShowPanel("error", "Please enter Schema")
        //     }


        // }
        else if ($("#inpValueinput").val().trim() != "") {
            // if($("#tblStepsCreations > tbody > tr").length > 0 &&  $("#drpConfigSetAction").val() != "value" && $("input[name=rdnUploadType]").is(":checked") == false && $("#inpFileUpload").val() == "" && $("#txtAreaSimilarURLs").val() == ""){
            //     debugger;
            //  var ctrl = $("#tblStepsCreations > tbody > tr[attr='data-customrentry']");                                                                                                                                                                          
            //      var ConfigActionInitial = []; 
            //        $.each(ctrl, function(i,objctrl){
            //                if($(objctrl).find("td.configaction > span").text() == "Initialize"){
            //                  ConfigActionInitial.push("Initialize")
            //                }
            //        })
            //        if(ConfigActionInitial.length > 2){
            //          bool = true;
            //        }
            //        else{
            //          bool = false;
            //          SchemaData.ShowPanel("error", "Kindly add University ID, Dept ID, University URL")
            //          $("#drpConfigSetAction").attr("disabled",false)
            //          $("#inpHiddenLoop").val("0")
            //          $("#inpActionItem").val("")
            //          $("#drpConfigSetAction").focus()
            //          $("#inpValueinput").val("")
            //          $("#inpValueinput").attr("data-attrcollection","")
            //        }
            //  }
            if ($("#inpValueinput").val().startsWith("$")) {
                bool = false;
                SchemaData.ShowPanel("error", "Kindly check the x-path");
            }
            if ($("#drpConfigAction").val() == "Onclick-Nav" || $("#drpConfigAction").val() == "Onclick-Expand") {
                var CheckforLoopAction = $("#tblStepsCreations > tbody > tr[attr=data-customrentry] > td > .inputVal");
                $.each(CheckforLoopAction, function () {
                    debugger;
                    if ($(this).text() == $("#inpValueinput").val()) {
                        bool = false;
                        SchemaData.ShowPanel("error", "Value Already Exist");
                        //$("#inpValueinput").val("");
                    }
                })
            }
            //bool = false;
            //AgentWorkArea.ShowPanel("error", "Please enter value")
        }

        //  if($("#drpConfigSetAction option:selected").val() == "value" && $("#ddlSchemaAssign").val() == ""){
        //     bool = false;
        //     SchemaData.ShowPanel("error", "Please enter Schema Name")
        // }
        // else if($("#tblStepsCreations > tbody > tr").length > 0 &&  $("#drpConfigSetAction").val() != "value" && $("input[name=rdnUploadType]").is(":checked") == false && $("#inpFileUpload").val() == "" && $("#txtAreaSimilarURLs").val() == ""){
        //     debugger;
        //  var ctrl = $("#tblStepsCreations > tbody > tr[attr='data-customrentry']");                                                                                                                                                                          
        //      var ConfigActionInitial = []; 
        //        $.each(ctrl, function(i,objctrl){
        //                if($(objctrl).find("td.configaction > span").text() == "Initialize"){
        //                  ConfigActionInitial.push("Initialize")
        //                }
        //        })
        //        if(ConfigActionInitial.length > 2){
        //          bool = true;
        //        }
        //        else{
        //          bool = false;
        //          SchemaData.ShowPanel("error", "Kindly add University ID, Dept ID, University URL")
        //          $("#drpConfigSetAction").attr("disabled",false)
        //          $("#inpHiddenLoop").val("0")
        //          $("#inpActionItem").val("")
        //          $("#drpConfigSetAction").focus()
        //          $("#inpValueinput").val("")
        //          $("#inpValueinput").attr("data-attrcollection","")
        //        }
        //  }
        // else{
        //     bool = true;
        // }

        return bool;
    },
    AlreadySchemaExists: function(type){
        var bool = true;
        if(type == "InsertData"){
            if($("#tblStepsCreations > tbody > tr").length > 0){
                $.each($("#tblStepsCreations > tbody > tr"), function(i,obj){
                    if($(obj).find("td > span.dataPoint").text() != ""){
                        if($(obj).find("td > span.dataPoint").text() == $("#ddlSchemaAssign").val().trim()){
                            bool = false;
                            SchemaData.ShowPanel("error","Already Schema Field Exists")
                            return false;
                      }
                      else{
                          bool = true;
                      }
                    }
                    else{
                        bool = true;
                    }
                    
                })
            }
        }
        else if(type == "SavedData"){
            if($("#tblSavedSteps > tbody > tr").length > 0){
                $.each($("#tblSavedSteps > tbody > tr"), function(i,obj){
                    if($(obj).find("td")[10].innerText  != ""){
                        if($(obj).find("td")[10].innerText == $("#ddlSchemaAssign").val().trim()){
                            bool = false;
                            SchemaData.ShowPanel("error","Already Schema Field Exists")
                            return false;
                      }
                      else{
                          bool = true;
                      }
                    }
                    else{
                        bool = true;
                    }
                    
                })
            }
        }
            
            
            return bool;
    },
    GetAgentScheduleDetails: function(URLSchemaID){
        var obj = new Object();
        obj.intFlag = "3";
        obj.intURLSchemaID =URLSchemaID
        $("#hdnURLScheduleSchemaID").val(URLSchemaID)
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveScheduldedDetails",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                
                if(data.response[0].length > 0){
                    $("#btnRemoveSchedule").css("display","inline-block")
                    var SavedScheduleDetails = data.response[0][0];
                    if(SavedScheduleDetails.ScheduleMasterID == "6"){
                        $("#drpFrequencyCD").val(SavedScheduleDetails.ScheduleMasterID);
                        $("#drpValueFqPeriod").val(SavedScheduleDetails.ScheduleTypeID);
                        $("#drpValueFqPeriodDays").val(SavedScheduleDetails.NoOfDaysbyScheduleTypeID)
                        $("#hdnDays").val(SavedScheduleDetails.NoOfDaysbyScheduleTypeID)
                        $("#hdnPeriod").val(SavedScheduleDetails.ScheduleTypeID)
                        $("#hdnScheduleMasterID").val(SavedScheduleDetails.ScheduleMasterID)
                        $("#divFrequencyPeriod").css("display","inline-block")
                    }
                    else{
                        $("#drpFrequencyCD").val(SavedScheduleDetails.ScheduleMasterID)
                        $("#hdnScheduleMasterID").val(SavedScheduleDetails.ScheduleMasterID)
                        $("#divFrequencyPeriod").css("display","none")
                    } 
                    
                }
                else{
                    $("#btnRemoveSchedule").css("display","none")
                }
                
            }
        })
    },
    UpdateorSaveSchedule: function(Flag,URLSchemaID,type){
        var obj = new Object();
        if(type == "Reschedule"){
            obj.intURLSchemaID = URLSchemaID;
            if(Flag == "2"){
                obj.intFlag = Flag;
                obj.intScheduleMasterID =  $("#hdnScheduleMasterID").val()
               }
               else{
                obj.intFlag = "1";
              
                obj.intScheduleMasterID =  $("#hdnScheduleMasterID").val()
                obj.intNoOfDays = $("#hdnDays").val()
               }
               if($("#hdnScheduleMasterID").val() == "6"){
                obj.intScheduleTypeID = $("#hdnScheduleTypeID").val();
                obj.intNoOfDays = $("#hdnPeriod").val()
               }
               else{
                obj.intScheduleTypeID = "0"
               }
        }
        else{
            if(Flag == "2"){
                obj.intFlag = Flag;
               }
               else{
                obj.intFlag = "1";
              
                obj.intScheduleMasterID = $("#drpFrequencyCD option:selected").attr("data-schedulemasterid")
                obj.intNoOfDays = $("#drpFrequencyCD option:selected").attr("data-noofdays")
               }
               if($("#drpFrequencyCD option:selected").text() == "Others"){
                obj.intScheduleTypeID = $("#drpValueFqPeriod option:selected").val();
                obj.intNoOfDays = $("#drpValueFqPeriodDays option:selected").val()
               }
               else{
                obj.intScheduleTypeID = "0"
               }
               obj.intURLSchemaID = $("#hdnURLScheduleSchemaID").val()
        }
       
      
       
        obj.intUserID = $("#SpnUserID").text()
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveScheduldedDetails",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                var ScheduleUpdated = data.response[0][0].RESULT;
                if(ScheduleUpdated == "1" && Flag != "2"){
                    SchemaData.ShowPanel("success","Schedule Details Saved Successfully")
                }
                else if(ScheduleUpdated == "1" && Flag == "2"){
                    SchemaData.ShowPanel("success","Schedule Details Removed Successfully")
                    $("#drpFrequencyCD").val("0");
                    $("#drpValueFqPeriodDays").val("0")
                    $("#drpValueFqPeriod").val("0")
                }
            }
        })
    },
    LoadScheduleMaster: function(){
        debugger
        var obj = new Object();
        obj.intFlag = "4"
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveScheduldedDetails",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                var ScheduleListDetails = data.response[0];
                $("#drpFrequencyCD").empty()
                $("#drpFrequencyCD").append(`<option value="0">--SET--</option>`)
                $.each(ScheduleListDetails, function(i,obj){
                    $("#drpFrequencyCD").append(`<option  data-ScheduleMasterID="${obj.ScheduleMasterID}" data-NoOfDays="${obj.NoOfDays}" value="${obj.ScheduleMasterID}">${obj.ScheduleName}</option>`)
                })
            }
        })
    },
    ExistingSchemaName: function (existing, Exists, id) {
        var obj = new Object();
        var val;
        obj.intFlag = "2";
        if (id == "#schemalist") {
            obj.strSchemaName = $("#schemalist").val().trim();
            val = $("#schemalist").val().trim();
        }
        else {
            obj.strSchemaName = $("#inpschemaname").val().trim();
            val = $("#inpschemaname").val().trim();
        }
     if($("#hdnSchemaMasterID").val() == ""){
        var SchemamasterID = $('#ddlSchemaList option').filter(function () {
            return this.value == val;
        }).data('schemamasterid');
     }
     else{
     var SchemamasterID = $("#hdnSchemaMasterID").val()
     }
       

        obj.intUserID = "0";
        obj.intSchemaID = SchemamasterID;
        obj.strSchemaCollection = "";
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/schemalist",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                var IsNewSchemaNameFound = data.response[0];
                $("#drpExtractionURL").empty()
                $("#drpSchemaAssign").empty()
                if (IsNewSchemaNameFound[0].RESULT == "0") {
                    if (existing == "2") {
                        //SchemaData.ShowPanel("error","Schema name already exists")
                        //SchemaData.Loadexistingschemadetails("existing");
                        //   $("#inpschemaname").val("")

                        if (Exists == "Exists") {

                            //$("#spnAdd").css("display", "block")
                            SchemaData.Loadexistingschemadetails("existing");
                            //SchemaData.ShowPanel("info", "Existing Schema Selected")
                        }
                        else if (Exists == "DropdownHeader") {
                        

                            var SchemaHeaderDropdown = IsNewSchemaNameFound[0].SchemaCollection;
                            $("#spnSchemaList").text(SchemaHeaderDropdown);
                            $("#spnSchemaList").attr("title", SchemaHeaderDropdown)
                            $.each(SchemaHeaderDropdown.split(","), function (i, obj) {
                                if (obj.includes(":1")) {
                                    var res = obj.split(":1");
                                    res = res[0]
                                    $("#drpSchemaAssign").append(`<option>${res}</option>`)
                                }
                                else {
                                    $("#drpSchemaAssign").append(`<option>${obj}</option>`)
                                }

                            })
                            //  AgentWorkArea.LoadSchemaHeaderList()
                        }
                        else {

                            //$("#spnAdd").css("display", "none")
                            SchemaData.ShowPanel("error", "Already schema name exists")
                        }

                    }
                    else {



                        if ($("input[name=inpschemacreation]:checked").val() == "2") {
                            SchemaData.Loadexistingschemadetails("new");
                        }
                        else {

                            $("#spnAdd").css("display", "none")

                            SchemaData.ShowPanel("error", "Already schema name exists")
                            //SchemaData.ShowPanel("error", "Schema name already exists")
                        }

                        //$("#inpschemaname").val("")

                    }

                }
                else {
                    if (Exists == "DropdownHeader") {
                        $("#schemalist").val(data.response[0][0].SchemaName)  
                        $("#drpExtractionURL").append(`<option> -- Select Extraction URL Field --</option>`)
                        $(".drpExtractionURL").append(`<option> -- Select Extraction URL Field --</option>`)
                        $(".drpSelectExtractionURL").append(`<option value="0"> -- Select Extraction URL Field --</option>`)
                        var SchemaHeaderDropdown = IsNewSchemaNameFound[0].SchemaCollection;
                        $("#spnSchemaList").attr("title", SchemaHeaderDropdown)
                        $("#spnSchemaList").text(SchemaHeaderDropdown);
                        $.each(SchemaHeaderDropdown.split(","), function (i, obj) {
                            if (obj.includes(":1")) {
                                var res = obj.split(":1");
                                res = res[0]
                                $("#drpSchemaAssign").append(`<option>${res}</option>`)
                            }
                            else {
                                $("#drpSchemaAssign").append(`<option>${obj}</option>`)
                                $("#drpExtractionURL").append(`<option>${obj}</option>`)
                                $(".drpExtractionURL").append(`<option>${obj}</option>`)
                                $(".drpSelectExtractionURL").append(`<option>${obj}</option>`)
                            }

                        })
                    }
                }
            }
        })
    },
    AppendData: function (Chkloopends) {
        var steps = 0;
        var Attr = "";
        
       

        if($("#inpActionItem").val() != ""){
            var ConfigAction = $("#inpActionItem").val()
        }
        else{
            var ConfigAction = $("#drpConfigAction").val()
        }
        if($("#inpActionItem").val() == "Get") { 
            $("#ddlSchemaAssign").prop('disabled', false);
            $("#inpTargetAttr").prop('disabled', false);
            // $("#inpTargetAttr,#ddlSchemaAssign").val("");
          
            var Lastactionset = $("#tblStepsCreations > tbody > tr:last > td.configaction > span")
            Lastactionset = $(Lastactionset).text().toLowerCase()
            if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop") {
                if($("#inpCheckboxLoopEnd").prop('checked')==true){
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
                else if($("#inpCheckboxLoopEnd").prop('checked')==false){
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }
               else if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }
               // $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            }
            else if (Lastactionset != "MongoDB_write") {
                if ($("#similarTRUrl").length > 0) {
                   
                    if($("#inpparamter").val() != ""){
                        $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                    }
                    else{
                        $("#drpSubfield").val("xpath").prop('disabled', true)
                    }
                }
                else if($("#inpValueinput").attr("data-attrcollection") == ""){
                    if($("#inpparamter").val() != ""){
                        $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                    }
                    else{
                        $("#drpSubfield").val("xpath").prop('disabled', true)
                    }
                }
                else {
                    if($("#inpparamter").val() != ""){
                        $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                    }
                    else if($("#inpCheckboxLoopEnd").prop('checked')==true){
                        $("#drpSubfield").val("xpath").prop('disabled', true)
                    }
                    else{
                        $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                    }
                }

            }
            else {
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
            }
         }
         else if($("#inpActionItem").val() == "Oncollection"){
            $("#drpSubfield").val("xpath").prop('disabled', true)
            $("#inpTargetAttr").val("row_element").prop('disabled', true)
            $("#ddlSchemaAssign").val("rowcollection_" + Math.floor(Math.random() * 1000)).prop('disabled', true)
         }
         else if($("#inpActionItem").val() == "Onclick"){
            var Lastactionset = $("#tblStepsCreations > tbody > tr:last > td.configaction > span")
            Lastactionset = $(Lastactionset).text().toLowerCase()
            if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop") {
               
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }
            }
            // else if (Lastactionset != "MongoDB_write") {
            //     if ($("#similarTRUrl").length > 0) {
            //         $("#drpSubfield").val("xpath").prop('disabled', true)
            //     }
            //     else {
            //         $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            //     }

            // }
            else {
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
              
            }
         }
         else if($("#inpActionItem").val() == "Input" || $("#inpActionItem").val() == "Dropdown"){
            $("#drpSubfield").val("value").prop('disabled', true)
         }
         if($("#inpValueinput").attr("data-attrcollection") == ""){
            var SubField = $("#drpSubfield").val()
         }
		 else if(($("#inpValueinput").attr("data-attrcollection") ==  $("#inpValueinput").val().trim()) && $("#inpActionItem").val() !="Oncollection" && $("#inpActionItem").val() !="Onclick" ){
            var SubField = $("#drpSubfield").val("collection_element_auto_index")
         }
         else{
            var SubField = $("#drpSubfield").val()
         }
        var SubField = $("#drpSubfield").val()

        var InputValue = $("#inpValueinput").val()
        var drpTagValue = $("#inpTargetAttr").val().toLowerCase()
        var drpSchemaAssign = $("#ddlSchemaAssign").val() == "None" ? "" : $("#ddlSchemaAssign").val()
        var RemoveIndex = $("#inpRemovedIndex").val().trim()
        if ($("#drpConfigSetAction").val().trim() == "Set Page Scroll") {
            var ConfigAction = "Scroll_driver";
            var ConfigActionShow = "Scroll_driver";
        }
        else if ($("#drpConfigSetAction").val().trim() == "Set Navigation Limit") {
            var ConfigAction = "Loop";
            var ConfigActionShow = "Loop";
        }
        else if ($("#drpConfigSetAction").val().trim() == "Set Wait Time") {
            var ConfigAction = "Timer";
            var ConfigActionShow = "Timer";
        }
        else if ($("#drpConfigSetAction").val().trim() == "value") {
            var ConfigAction = "Initialize";
            var ConfigActionShow = "Set Default Value";
            SubField =  "value";

        }
        else if ($("#inpActionItem").val() == "Input"){
            var ConfigAction = "Set";
            var ConfigActionShow = "Set";
        }
        else if ($("#inpActionItem").val() == "Oncollection"){
                var ConfigAction = "Oncollection"
                var ConfigActionShow = "Similar Data"
        }
        else if ($("#inpActionItem").val() == "Get"){
            var ConfigAction = "Get"
            var ConfigActionShow = "This Data"
        }
        else if ($("#inpActionItem").val() == "Onclick"){
            var ConfigAction = "Onclick"
            var ConfigActionShow = "Onclick"
        }
        else if ($("#inpActionItem").val() == "Dropdown"){
            var ConfigAction = "Dropdown"
            var ConfigActionShow = "Dropdown"
        }
        else if ($("#inpActionItem").val() == "Popup_Window"){
            var ConfigAction = "Popup_Window";
            var ConfigActionShow = "Popup_Window";
            SubField =  "xpath";
        }
        else {
            var ConfigAction = $("#drpConfigAction option:selected").val()
            var ConfigActionShow = $("#drpConfigAction option:selected").val()
        }
        steps = parseInt($("#tblStepsCreations > tbody > tr").length) + parseInt(1);
        if (drpTagValue.toLowerCase() != "text" && drpTagValue.toLowerCase() != "row" && drpTagValue.toLowerCase() != "" && drpTagValue.toLowerCase() != "row_element") {
            Attr = "yes"
        }
        else if (drpTagValue.toLowerCase() == "text") {
            Attr = "no"
        }
        else if (drpTagValue.toLowerCase() == "row") {
            Attr = "element"
        }
        else if (drpTagValue.toLowerCase() == "row_element") {
            Attr = "element"
        }
        else if (drpTagValue.toLowerCase() == "eachrow") {
            Attr = ""
        }
        if($("#drpAttributeType option:selected").val() == "-1" && $("#inpActionItem").val() == "Input"){
            Attr = ""
        }
        var LoopFound = [];
        var CheckforLoopAction = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
        $.each(CheckforLoopAction, function (i, objtext) {

            var ActionText = $(objtext).find("td")[5];
            var StepText = $(objtext).find("td")[4];
            StepText = $(StepText).text()           
            ActionText =  $(ActionText).find("span").text();
            if (ActionText == "Loop" || ActionText == "Loop - Set Navigation Limit") {
                LoopFound.push(StepText)
            }
        })


        //   steps++;
        if (ConfigAction == "Loop") {
            debugger;
            $("#divLoop").css("display", "block")
            // $("#inpCheckboxLoopEnd").attr("disabled", false)
            // $("#inpCheckboxLoopEnd").prop("checked", false)
        }

        var TblCtrl = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]")
        var LastTblControl = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]:last")

        LastActionText = $(LastTblControl).find("td")[5]
        LastActionText = $(LastActionText).find("span").text();
        if (LoopStepText == "" && LastActionText == "Loop") {
            LoopStepText = $(LastTblControl).find("td")[4]
            LoopStepText = $(LoopStepText).text()
           // Segeration = LoopStepText;
            LoopStepText = parseInt(LoopStepText) -  parseInt($("#tblStepsCreations > tbody > tr[data-tobeavoided=1]").length)
            Segeration = LoopStepText;
        }
        else if (LastActionText == "Loop") {
            NextLoopText = $(LastTblControl).find("td")[4]
            NextLoopText = $(NextLoopText).text();

        }
        if(LoopStepText != "" && FinalDataSteps != ""){
            LoopStepText =  FinalDataSteps
        }
        var SourceStep = [];


        if (steps == 1) {
            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">

            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
            <td style="display:none">1</td>
            <td style="display:none">1</td>
            <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
            <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
            <td style="display:none" class ='sourcestep'>${LoopStepText != "" ? LoopStepText : ""}</td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            //   steps++
        }

        else if (LastActionText == "Loop" && Chkloopends == "urlrequest") {
            if (LoopStepText != "" && NextLoopText == "") {
                if ($("#tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex") != undefined && $("#tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex") != "") {
                    LoopStepText = parseInt($("#tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex")) + 1;
                    $("#hdnSourceStep").val(LoopStepText)
                }
                if(FinalDataSteps != ""){
                    LoopStepText = FinalDataSteps
                }
                var ExtractionURL = $("#drpExtractionURL option:selected").val();
                var incsteps = parseInt(steps) + 1;
                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>Url_Request</span></td>
            <td class ="Dn">variable</td>
            <td><span class ="inputVal">${ExtractionURL}</span></td>
             <td style="display:none">no</td>
            <td></td>
            <td></td>
             <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${incsteps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${incsteps}</span></td>
            <td class ='configaction'>Timer</td>
            <td class ="Dn">sec</td>
            <td class ="inputVal">10</td>
             <td style="display:none"></td>
            <td></td>
            <td></td>
             <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
            }
        }
        else if(Chkloopends == "Timer"){
            $("#tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry" data-tobeavoided="1">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none">${Attr}</td>
                <td><span/></span></td>
                <td><span class ="dataPoint"></span></td>
                 <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
                 <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">1</td>
              
                </tr>
                `)
                var stepsInc = parseInt(steps) + 1
            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" data-tobeavoided="1">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${stepsInc}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${stepsInc}</span></td>
            <td class ='configaction'><span>Timer</span><label class="configactionShow">Timer</label></td>
            <td class ="Dn"><span>sec</span></td>
            <td><span class ="inputVal">10</span></td>
             <td style="display:none"></td>
            <td><span/></span></td>
            <td><span class ="dataPoint"></span></td>
             <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
        }

        else if (LastActionText == "Loop") {

            if (LoopStepText != "" && NextLoopText == "") {
                if (SourceStep != "") {
                    LoopStepText = parseInt(SourceStep) + 1;
                }
                if(FinalDataSteps != ""){
                    LoopStepText = FinalDataSteps
                }
               if($("#inpFileUpload").val() != ""){
                $("#tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none">${Attr}</td>
                <td><span/>Faculty_URL</span></td>
                <td><span class ="dataPoint">Faculty_URL</span></td>
                 <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
                 <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
              
                </tr>
                `)
                $("input[name='chkdata']").change(function(){
                    debugger;
                    $("input[name='chkdata']").prop("checked",false)
                    $(this).prop("checked",true)
                })
               }
               else{
                $("#tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none">${Attr}</td>
                <td><span/>${drpTagValue}</span></td>
                <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
                 <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
                 <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
              
                </tr>
                `)
                $("input[name='chkdata']").change(function(){
                    debugger;
                    $("input[name='chkdata']").prop("checked",false)
                    $(this).prop("checked",true)
                })
               }
               
            
            }
            else if (LoopStepText != "" && NextLoopText != "" && LoopFound.length > 2) {
                //  FinalSourceStep = parseInt(NextLoopText) - parseInt(LoopStepText)
                ThirdSourceStep = parseInt(NextLoopText) - parseInt(LoopFound[1])


                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
                if(FinalDataSteps != ""){
                    FinalSourceStepText = FinalDataSteps
                }
                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
           <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            }
            else if (LoopStepText != "" && Chkloopends != "LoopEnds" && Chkloopends != "MongoDB_read" && Chkloopends != "urlrequest") {
                //   var finalsteps = parseInt(steps) - 1;
                FinalSourceStep = parseInt(NextLoopText) - parseInt(LoopStepText)

                if (FinalSourceStep == "0") {
                    var FinalSourceStepText = Segeration;
                }
                else {
                    var FinalSourceStepText = Segeration + "," + FinalSourceStep;
                }
                if(FinalDataSteps != ""){
                    FinalSourceStepText = FinalDataSteps
                }

                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
           <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            }
            else if (Chkloopends == "LoopEnds") {
                var StepsObject = parseInt(steps) + 1;
                var ExitObject = parseInt(StepsObject) + 1;
                var arrHeader = [];
                var SchemaHeader = $("#hdnSchemaValue").val().trim()
                if ($("input[name=inpURLtype]:checked").val() == "2" && LoopFound.length == "1") {
                    var FileName = $("#spnSimilarFileName").text().trim();
                    var Ctrl = $("#tblStepsCreations > tbody > tr[attr='data-customrentry']");
                    $.each(Ctrl, function (i, obj) {
                        if ($(obj).find("td.configaction").text() == "Get") {
                            var HeaderText = $(obj).find("td")[10];
                            HeaderText = HeaderText.innerText;
                            arrHeader.push(HeaderText)
                        }


                    })
                    var arr = [];
                    
                    $.each($("#drpSchemaAssign > option"), function(i,obj){
                        arr.push($(obj).text())
                    })
                    SchemaHeader = arr.toString()
                    $("#spnSchemaListSimilar").text(SchemaHeader)
                }
                else {
                    var FileName = $("#spnFIleName").text().trim()
                }
                LoopStepText = "";


                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_write</span></td>
            <td class ="Dn"></td>
            <td><span class ="inputVal"></span></td>
             <td style="display:none"></td>
            <td></td>
            <td><span class='schemafinal'>${SchemaHeader}</span></td>
             <td style="display:none" class ='sourcestep'>${LoopStepText != "" ? LoopStepText : ""}</td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)




                // $("#inpCheckboxLoopEnd").attr("disabled", true)
            }
            else if (Chkloopends == "ReadFile") {
                LoopStepText = "";

                // Added 
                if ($("#hdnSourceStep").val() != "") {
                    LoopStepTextIndex = parseInt($("#hdnSourceStep").val()) + 1;
                    $("#hdnSourceStep").val(LoopStepTextIndex)
                }
                // LoopStepText = parseInt(SourceStep) + 1;
                var FileName = $("#spnSimilarPath").text().trim()
                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_read</span></td>
            <td class ="Dn">csv</td>
            <td><span class ="inputVal">${FileName}</span></td>
             <td style="display:none"><span>${Attr}</span></td>
            <td></td>
            <td>collection</td>
             <td style="display:none" class ='sourcestep' data-loopindex=${LoopStepTextIndex}></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
                $("#IsBulkUrls").attr("disabled", true)
            }
            else {

                $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'>${LoopStepText != "" ? LoopStepText : ""}</td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            }

        }
        else if (FinalSourceStep != "" && Chkloopends == "LoopEnds") {
            LoopStepText = "";
            var StepsObject = parseInt(steps) + 1;
            var SchemaHeader = $("#hdnSchemaValue").val().trim()
            if ($("input[name=inpURLtype]:checked").val() == "2" && LoopFound.length == "1") {
                var FileName = $("#spnSimilarFileName").text().trim();
                var arrHeader = [];


                var Ctrl = $("#tblStepsCreations > tbody > tr[attr='data-customrentry']");
                $.each(Ctrl, function (i, obj) {
                    if ($(obj).find("td.configaction").text() == "Get") {
                        var HeaderText = $(obj).find("td")[10];
                        HeaderText = HeaderText.innerText;
                        arrHeader.push(HeaderText)
                    }


                })
                SchemaHeader = arrHeader.join(",").toString()
                $("#spnSchemaListSimilar").text(SchemaHeader)
            }
            else {
                SchemaHeader = $("#spnSchemaList").text().trim()
                var FileName = $("#spnFIleName").text().trim()
            }
            // var FileName = $("#spnFIleName").text().trim()
            if (LoopFound.length > 2) {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
            }
            else if (LoopFound.length == 1) {
                var FinalSourceStepText = Segeration;
            }
            else if (LoopFound.length == 0) {
                var FinalSourceStepText = Segeration;
            }
            else {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep;
            }
            if(FinalDataSteps != ""){
                FinalSourceStepText = FinalDataSteps
            }

            var arr = [];
                    
            $.each($("#drpSchemaAssign > option"), function(i,obj){
                arr.push($(obj).text())
            })
            SchemaHeader = arr.toString()
            //  var SchemaHeader = $("#hdnSchemaValue").val().trim()
            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_write</span></td>
            <td class ="Dn"></td>
            <td><span class ="inputVal"></span></td>
             <td style="display:none"><span></span></td>
            <td></td>
           <td><span class ='schemafinal'>${SchemaHeader}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            // $("#inpCheckboxLoopEnd").attr("disabled", true)

        }
        else if (FinalSourceStep != "" && $("#tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".configaction").text() == "MongoDB_write") {
            var FinalSourceStepText = Segeration;
            if(FinalDataSteps != ""){
                FinalSourceStepText = FinalDataSteps
            }

            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none" class ='isloopbrkpoint'>1</td>
           
            </tr>
            `)
        }
        else if (FinalSourceStep != "") {
            if (LoopFound.length > 2) {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
            }
            else {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep;
            }
            if(FinalDataSteps != ""){
                FinalSourceStepText = FinalDataSteps
            }


            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
        }
        else if (Chkloopends == "LoopEnds") {
            LoopStepText = "";
            var StepsObject = parseInt(steps) + 1;
            var ExitObject = parseInt(StepsObject) + 1;
            var SchemaHeader = $("#hdnSchemaValue").val().trim()
            if ($("input[name=inpURLtype]:checked").val() == "2" && LoopFound.length == "1") {
                var FileName = $("#spnSimilarFileName").text().trim();
                var arrHeader = [];


                var Ctrl = $("#tblStepsCreations > tbody > tr[attr='data-customrentry']");
                $.each(Ctrl, function (i, obj) {
                    if ($(obj).find("td.configaction").text() == "Get") {
                        var HeaderText = $(obj).find("td")[10];
                        HeaderText = HeaderText.innerText;
                        arrHeader.push(HeaderText)
                    }


                })
                var arr = [];
                    
                $.each($("#drpSchemaAssign > option"), function(i,obj){
                    arr.push($(obj).text())
                })
                SchemaHeader = arr.toString()
                $("#spnSchemaListSimilar").text(SchemaHeader)
            }
            else {
                var arr = [];
                    
                $.each($("#drpSchemaAssign > option"), function(i,obj){
                    arr.push($(obj).text())
                })
                SchemaHeader = arr.toString()
                var FileName = $("#spnFIleName").text().trim()
            }
            if ($("#hdnSourceStep").val() != "") {
                Segeration = $("#hdnSourceStep").val();

            }
            // var FileName = $("#spnFIleName").text().trim()
            if (LoopFound.length > 2) {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
            }
            else if (LoopFound.length == 1) {
                var FinalSourceStepText = Segeration;
            }
            else if (LoopFound.length == 0) {
                var FinalSourceStepText = Segeration;
            }
            else {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep;
                FinalSourceStepText = FinalSourceStepText.replace(/,\s*$/, "");

            }
            if(FinalDataSteps != ""){
                FinalSourceStepText = FinalDataSteps
            }

            //  var SchemaHeader = $("#hdnSchemaValue").val().trim()
            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_write</span></td>
            <td class ="Dn"></td>
            <td><span class ="inputVal"></span></td>
             <td style="display:none"><span></span></td>
            <td></td>
           <td><span class ='schemafinal'>${SchemaHeader}</span></td>
             <td style="display:none" class ='sourcestep'>${FinalSourceStepText}</td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)


            // $("#inpCheckboxLoopEnd").attr("disabled", true)

        }
        else if (Chkloopends == "ReadFile") {
            LoopStepText = "";
            if ($("#hdnSourceStep").val() != "") {
                LoopStepTextIndex = parseInt($("#hdnSourceStep").val()) + 1;
                $("#hdnSourceStep").val(LoopStepTextIndex)
            }
            var FileName = $("#spnSimilarPath").text().trim()
            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_read</span></td>
            <td class ="Dn">csv</td>
            <td><span class ="inputVal">${FileName}</span></td>
             <td style="display:none"><span>${Attr}</span></td>
            <td></td>
            <td>collection</td>
             <td style="display:none" class ='sourcestep' data-loopindex=${LoopStepTextIndex}></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            $("#IsBulkUrls").attr("disabled", true)
        }
        else if (SubField == "source_dict") {
            if ($("#hdnSourceStep").val() != "") {
                var StepIndex = parseInt($("#hdnSourceStep").val()) + 1;
            }
            else {
                var StepIndex = "";
            }
            
            if($("#inpFileUpload").val() != "" || $("#txtAreaSimilarURLs").val() != ""){
                $("#tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none"></td>
                <td><span>Faculty_URL</span></td>
                <td><span class ="dataPoint">Faculty_URL</span></td>
                <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
               
                </tr>
                `)
            }
            else{
                $("#tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none"></td>
                <td><span>${DataPointText}</span></td>
                <td><span class ="dataPoint">${DataPointText}</span></td>
                <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
               
                </tr>
                `)
            }

           
        }
        else {
            if ($("#hdnSourceStep").val() != "") {
                var StepIndex = parseInt($("#hdnSourceStep").val()) + 1;
            }
            else {
                var StepIndex = "";
            }

            $("#tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
            <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            //  steps++;
        }
        $("input[name='chkdata']").change(function(){
            debugger;
            $("input[name='chkdata']").prop("checked",false)
            $(this).prop("checked",true)
        })
    },
    SegmetationAppendData: function (Chkloopends,CtrlField) {
        var steps = 0;
        var Attr = "";
        if($("#inpActionItem").val() != ""){
            var ConfigAction = $("#inpActionItem").val()
        }
        else{
            var ConfigAction = $("#drpConfigAction").val()
        }
        if($("#inpActionItem").val() == "Get") { 
            $("#ddlSchemaAssign").prop('disabled', false);
            $("#inpTargetAttr").prop('disabled', false);
            // $("#inpTargetAttr,#ddlSchemaAssign").val("");
          
            var Lastactionset = $(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.configaction > span")
            Lastactionset = $(Lastactionset).text().toLowerCase()
            if ($(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Loop") {
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }
               // $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            }
            else if (Lastactionset != "MongoDB_write") {
                if ($("#similarTRUrl").length > 0) {
                   
                    if($("#inpparamter").val() != ""){
                        $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                    }
                    else{
                        $("#drpSubfield").val("xpath").prop('disabled', true)
                    }
                }
                else if($("#inpValueinput").attr("data-attrcollection") == ""){
                    if($("#inpparamter").val() != ""){
                        $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                    }
                    else{
                        $("#drpSubfield").val("xpath").prop('disabled', true)
                    }
                }
                else {
                    if($("#inpparamter").val() != ""){
                        $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                    }
                    else{
                        $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                    }
                }

            }
            else {
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
            }
         }
         else if($("#inpActionItem").val() == "Oncollection"){
            $("#drpSubfield").val("xpath").prop('disabled', true)
            $("#inpTargetAttr").val("row_element").prop('disabled', true)
            $("#ddlSchemaAssign").val("rowcollection_" + Math.floor(Math.random() * 1000)).prop('disabled', true)
         }
         else if($("#inpActionItem").val() == "Onclick"){
            var Lastactionset = $(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.configaction > span")
            Lastactionset = $(Lastactionset).text().toLowerCase()
            if ($(CtrlField).find(".tblStepsCreations tbody > tr:last > td.configaction > span").text() == "Loop") {
               
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
                }
            }
            // else if (Lastactionset != "MongoDB_write") {
            //     if ($("#similarTRUrl").length > 0) {
            //         $("#drpSubfield").val("xpath").prop('disabled', true)
            //     }
            //     else {
            //         $("#drpSubfield").val("loop_element_xpath").prop('disabled', true)
            //     }

            // }
            else {
                if($("#inpparamter").val() != ""){
                    $("#drpSubfield").val($("#inpparamter").val()).prop('disabled', true)
                }
                else{
                    $("#drpSubfield").val("xpath").prop('disabled', true)
                }
              
            }
         }
         else if($("#inpActionItem").val() == "Input" || $("#inpActionItem").val() == "Dropdown"){
            $("#drpSubfield").val("value").prop('disabled', true)
         }
         if($("#inpValueinput").attr("data-attrcollection") == ""){
            var SubField = $("#drpSubfield").val()
         }
		 else if(($("#inpValueinput").attr("data-attrcollection") ==  $("#inpValueinput").val().trim()) && $("#inpActionItem").val() !="Oncollection"){
            var SubField = $("#drpSubfield").val("collection_element_auto_index")
         }
         else{
            var SubField = $("#drpSubfield").val()
         }
        var SubField = $("#drpSubfield").val()

        var InputValue = $("#inpValueinput").val()
        var drpTagValue = $("#inpTargetAttr").val().toLowerCase()
        var drpSchemaAssign = $("#ddlSchemaAssign").val() == "None" ? "" : $("#ddlSchemaAssign").val()
        var RemoveIndex = $("#inpRemovedIndex").val().trim()
        if ($("#drpConfigSetAction").val().trim() == "Set Page Scroll") {
            var ConfigAction = "Scroll_driver";
            var ConfigActionShow = "Scroll_driver";
        }
        else if ($("#drpConfigSetAction").val().trim() == "Set Navigation Limit") {
            var ConfigAction = "Loop";
            var ConfigActionShow = "Loop";
        }
        else if ($("#drpConfigSetAction").val().trim() == "Set Wait Time") {
            var ConfigAction = "Timer";
            var ConfigActionShow = "Timer";
        }
        else if ($("#drpConfigSetAction").val().trim() == "value") {
            var ConfigAction = "Initialize";
            var ConfigActionShow = "Set Default Value";
            SubField =  "value";

        }
        else if ($("#inpActionItem").val() == "Input"){
            var ConfigAction = "Set";
            var ConfigActionShow = "Set";
        }
        else if ($("#inpActionItem").val() == "Oncollection"){
                var ConfigAction = "Oncollection"
                var ConfigActionShow = "Similar Data"
        }
        else if ($("#inpActionItem").val() == "Get"){
            var ConfigAction = "Get"
            var ConfigActionShow = "This Data"
        }
        else if ($("#inpActionItem").val() == "Onclick"){
            var ConfigAction = "Onclick"
            var ConfigActionShow = "Onclick"
        }
        else if ($("#inpActionItem").val() == "Dropdown"){
            var ConfigAction = "Dropdown"
            var ConfigActionShow = "Dropdown"
        }
        else if ($("#inpActionItem").val() == "Popup_Window"){
            var ConfigAction = "Popup_Window";
            var ConfigActionShow = "Popup_Window";
            SubField =  "xpath";
        }
        else {
            var ConfigAction = $("#drpConfigAction option:selected").val()
            var ConfigActionShow = $("#drpConfigAction option:selected").val()
        }
        steps = parseInt($(CtrlField).find(".tblStepsCreations > tbody > tr").length) + parseInt(1);
        if (drpTagValue.toLowerCase() != "text" && drpTagValue.toLowerCase() != "row" && drpTagValue.toLowerCase() != "" && drpTagValue.toLowerCase() != "row_element") {
            Attr = "yes"
        }
        else if (drpTagValue.toLowerCase() == "text") {
            Attr = "no"
        }
        else if (drpTagValue.toLowerCase() == "row") {
            Attr = "element"
        }
        else if (drpTagValue.toLowerCase() == "row_element") {
            Attr = "element"
        }
        else if (drpTagValue.toLowerCase() == "eachrow") {
            Attr = ""
        }
        if($("#drpAttributeType option:selected").val() == "-1" && $("#inpActionItem").val() == "Input"){
            Attr = ""
        }
        var LoopFound = [];
        var CheckforLoopAction = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]");
        $.each(CheckforLoopAction, function (i, objtext) {

            var ActionText = $(objtext).find("td")[5];
            var StepText = $(objtext).find("td")[4];
            StepText = $(StepText).text()           
            ActionText =  $(ActionText).find("span").text();
            if (ActionText == "Loop" || ActionText == "Loop - Set Navigation Limit") {
                LoopFound.push(StepText)
            }
        })


        //   steps++;
        if (ConfigAction == "Loop") {
            debugger;
            $(CtrlField).find(".divLoop").css("display", "block")
            // $(CtrlField).find(".inpCheckboxLoopEnd").attr("disabled", false)
            // $(CtrlField).find(".inpCheckboxLoopEnd").prop("checked", false)
        }

        var TblCtrl = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]")
        var LastTblControl = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]:last")

        LastActionText = $(LastTblControl).find("td")[5]
        LastActionText = $(LastActionText).find("span").text();
        if (LoopStepText == "" && LastActionText == "Loop") {
            LoopStepText = $(LastTblControl).find("td")[4]
            LoopStepText = $(LoopStepText).text()
            Segeration = LoopStepText;
        }
        else if (LastActionText == "Loop") {
            NextLoopText = $(LastTblControl).find("td")[4]
            NextLoopText = $(NextLoopText).text();

        }
        var SourceStep = [];


        if (steps == 1) {
            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">

            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
            <td style="display:none">1</td>
            <td style="display:none">1</td>
            <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
            <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
            <td style="display:none" class ='sourcestep'>${LoopStepText != "" ? LoopStepText : ""}</td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            //   steps++
        }

        else if (LastActionText == "Loop" && Chkloopends == "urlrequest") {
            if (LoopStepText != "" && NextLoopText == "") {
                if ($(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex") != undefined && $("#tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex") != "") {
                    LoopStepText = parseInt($$(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.sourcestep").attr("data-loopindex")) + 1;
                    $("#hdnSourceStep").val(LoopStepText)
                }
                var ExtractionURL = $("#drpExtractionURL option:selected").val();
                var incsteps = parseInt(steps) + 1;
                $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>Url_Request</span></td>
            <td class ="Dn">variable</td>
            <td><span class ="inputVal">${ExtractionURL}</span></td>
             <td style="display:none">no</td>
            <td></td>
            <td></td>
             <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${incsteps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${incsteps}</span></td>
            <td class ='configaction'>Timer</td>
            <td class ="Dn">sec</td>
            <td class ="inputVal">10</td>
             <td style="display:none"></td>
            <td></td>
            <td></td>
             <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
            }
        }

        else if (LastActionText == "Loop") {

            if (LoopStepText != "" && NextLoopText == "") {
                if (SourceStep != "") {
                    LoopStepText = parseInt(SourceStep) + 1;
                }
               if($("#inpFileUpload").val() != ""){
                $(CtrlField).find(".tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none">${Attr}</td>
                <td><span/>Faculty_URL</span></td>
                <td><span class ="dataPoint">Faculty_URL</span></td>
                 <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
                 <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
              
                </tr>
                `)
                $("input[name='chkdata']").change(function(){
                    debugger;
                    $("input[name='chkdata']").prop("checked",false)
                    $(this).prop("checked",true)
                })
               }
               else{
                $(CtrlField).find(".tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none">${Attr}</td>
                <td><span/>${drpTagValue}</span></td>
                <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
                 <td style="display:none" class ='sourcestep'><span>${LoopStepText != "" ? LoopStepText : ""}</span></td>
                 <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
              
                </tr>
                `)
                $("input[name='chkdata']").change(function(){
                    debugger;
                    $("input[name='chkdata']").prop("checked",false)
                    $(this).prop("checked",true)
                })
               }
               
            
            }
            else if (LoopStepText != "" && NextLoopText != "" && LoopFound.length > 2) {
                //  FinalSourceStep = parseInt(NextLoopText) - parseInt(LoopStepText)
                ThirdSourceStep = parseInt(NextLoopText) - parseInt(LoopFound[1])


                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;

                $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
           <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            }
            else if (LoopStepText != "" && Chkloopends != "LoopEnds" && Chkloopends != "MongoDB_read" && Chkloopends != "urlrequest") {
                //   var finalsteps = parseInt(steps) - 1;
                FinalSourceStep = parseInt(NextLoopText) - parseInt(LoopStepText)

                if (FinalSourceStep == "0") {
                    var FinalSourceStepText = Segeration;
                }
                else {
                    var FinalSourceStepText = Segeration + "," + FinalSourceStep;
                }


                $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
           <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            }
            else if (Chkloopends == "LoopEnds") {
                var StepsObject = parseInt(steps) + 1;
                var ExitObject = parseInt(StepsObject) + 1;
                var arrHeader = [];
                var SchemaHeader = $("#hdnSchemaValue").val().trim()
                if ($("input[name=inpURLtype]:checked").val() == "2" && LoopFound.length == "1") {
                    var FileName = $("#spnSimilarFileName").text().trim();
                    var Ctrl = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr='data-customrentry']");
                    $.each(Ctrl, function (i, obj) {
                        if ($(obj).find("td.configaction").text() == "Get") {
                            var HeaderText = $(obj).find("td")[10];
                            HeaderText = HeaderText.innerText;
                            arrHeader.push(HeaderText)
                        }


                    })
                    var arr = [];
                    
                    $.each($("#drpSchemaAssign > option"), function(i,obj){
                        arr.push($(obj).text())
                    })
                    SchemaHeader = arr.toString()
                    $("#spnSchemaListSimilar").text(SchemaHeader)
                }
                else {
                    var FileName = $("#spnFIleName").text().trim()
                }
                LoopStepText = "";


                $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_write</span></td>
            <td class ="Dn"></td>
            <td><span class ="inputVal"></span></td>
             <td style="display:none"></td>
            <td></td>
            <td><span class='schemafinal'>${SchemaHeader}</span></td>
             <td style="display:none" class ='sourcestep'>${LoopStepText != "" ? LoopStepText : ""}</td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)




                // $("#inpCheckboxLoopEnd").attr("disabled", true)
            }
            else if (Chkloopends == "ReadFile") {
                LoopStepText = "";

                // Added 
                if ($("#hdnSourceStep").val() != "") {
                    LoopStepTextIndex = parseInt($("#hdnSourceStep").val()) + 1;
                    $("#hdnSourceStep").val(LoopStepTextIndex)
                }
                // LoopStepText = parseInt(SourceStep) + 1;
                var FileName = $("#spnSimilarPath").text().trim()
                $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_read</span></td>
            <td class ="Dn">csv</td>
            <td><span class ="inputVal">${FileName}</span></td>
             <td style="display:none"><span>${Attr}</span></td>
            <td></td>
            <td>collection</td>
             <td style="display:none" class ='sourcestep' data-loopindex=${LoopStepTextIndex}></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
                $("#IsBulkUrls").attr("disabled", true)
            }
            else {

                $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'>${LoopStepText != "" ? LoopStepText : ""}</td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            }

        }
        else if (FinalSourceStep != "" && Chkloopends == "LoopEnds") {
            LoopStepText = "";
            var StepsObject = parseInt(steps) + 1;
            var SchemaHeader = $("#hdnSchemaValue").val().trim()
            if ($("input[name=inpURLtype]:checked").val() == "2" && LoopFound.length == "1") {
                var FileName = $("#spnSimilarFileName").text().trim();
                var arrHeader = [];


                var Ctrl = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr='data-customrentry']");
                $.each(Ctrl, function (i, obj) {
                    if ($(obj).find("td.configaction").text() == "Get") {
                        var HeaderText = $(obj).find("td")[10];
                        HeaderText = HeaderText.innerText;
                        arrHeader.push(HeaderText)
                    }


                })
                SchemaHeader = arrHeader.join(",").toString()
                $("#spnSchemaListSimilar").text(SchemaHeader)
            }
            else {
                SchemaHeader = $("#spnSchemaList").text().trim()
                var FileName = $("#spnFIleName").text().trim()
            }
            // var FileName = $("#spnFIleName").text().trim()
            if (LoopFound.length > 2) {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
            }
            else if (LoopFound.length == 1) {
                var FinalSourceStepText = Segeration;
            }
            else if (LoopFound.length == 0) {
                var FinalSourceStepText = Segeration;
            }
            else {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep;
            }
            var arr = [];
                    
            $.each($("#drpSchemaAssign > option"), function(i,obj){
                arr.push($(obj).text())
            })
            SchemaHeader = arr.toString()
            //  var SchemaHeader = $("#hdnSchemaValue").val().trim()
            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_write</span></td>
            <td class ="Dn"></td>
            <td><span class ="inputVal"></span></td>
             <td style="display:none"><span></span></td>
            <td></td>
           <td><span class ='schemafinal'>${SchemaHeader}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            // $("#inpCheckboxLoopEnd").attr("disabled", true)

        }
        else if (FinalSourceStep != "" && $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".configaction").text() == "MongoDB_write") {
            var FinalSourceStepText = Segeration;
            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none" class ='isloopbrkpoint'>1</td>
           
            </tr>
            `)
        }
        else if (FinalSourceStep != "") {
            if (LoopFound.length > 2) {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
            }
            else {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep;
            }

            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
             <td style="display:none" class ='sourcestep'><span>${FinalSourceStepText}</span></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
          
            </tr>
            `)
        }
        else if (Chkloopends == "LoopEnds") {
            LoopStepText = "";
            var StepsObject = parseInt(steps) + 1;
            var ExitObject = parseInt(StepsObject) + 1;
            var SchemaHeader = $("#hdnSchemaValue").val().trim()
            if ($("input[name=inpURLtype]:checked").val() == "2" && LoopFound.length == "1") {
                var FileName = $("#spnSimilarFileName").text().trim();
                var arrHeader = [];


                var Ctrl = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr='data-customrentry']");
                $.each(Ctrl, function (i, obj) {
                    if ($(obj).find("td.configaction").text() == "Get") {
                        var HeaderText = $(obj).find("td")[10];
                        HeaderText = HeaderText.innerText;
                        arrHeader.push(HeaderText)
                    }


                })
                var arr = [];
                    
                $.each($("#drpSchemaAssign > option"), function(i,obj){
                    arr.push($(obj).text())
                })
                SchemaHeader = arr.toString()
                $("#spnSchemaListSimilar").text(SchemaHeader)
            }
            else {
                var arr = [];
                    
                $.each($("#drpSchemaAssign > option"), function(i,obj){
                    arr.push($(obj).text())
                })
                SchemaHeader = arr.toString()
                var FileName = $("#spnFIleName").text().trim()
            }
            if ($("#hdnSourceStep").val() != "") {
                Segeration = $("#hdnSourceStep").val();

            }
            // var FileName = $("#spnFIleName").text().trim()
            if (LoopFound.length > 2) {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep + "," + ThirdSourceStep;
            }
            else if (LoopFound.length == 1) {
                var FinalSourceStepText = Segeration;
            }
            else if (LoopFound.length == 0) {
                var FinalSourceStepText = Segeration;
            }
            else {
                var FinalSourceStepText = Segeration + "," + FinalSourceStep;
                FinalSourceStepText = FinalSourceStepText.replace(/,\s*$/, "");

            }
            //  var SchemaHeader = $("#hdnSchemaValue").val().trim()
            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
            <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_write</span></td>
            <td class ="Dn"></td>
            <td><span class ="inputVal"></span></td>
             <td style="display:none"><span></span></td>
            <td></td>
           <td><span class ='schemafinal'>${SchemaHeader}</span></td>
             <td style="display:none" class ='sourcestep'>${FinalSourceStepText}</td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)


            // $("#inpCheckboxLoopEnd").attr("disabled", true)

        }
        else if (Chkloopends == "ReadFile") {
            LoopStepText = "";
            if ($("#hdnSourceStep").val() != "") {
                LoopStepTextIndex = parseInt($("#hdnSourceStep").val()) + 1;
                $("#hdnSourceStep").val(LoopStepTextIndex)
            }
            var FileName = $("#spnSimilarPath").text().trim()
            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>MongoDB_read</span></td>
            <td class ="Dn">csv</td>
            <td><span class ="inputVal">${FileName}</span></td>
             <td style="display:none"><span>${Attr}</span></td>
            <td></td>
            <td>collection</td>
             <td style="display:none" class ='sourcestep' data-loopindex=${LoopStepTextIndex}></td>
             <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            $("#IsBulkUrls").attr("disabled", true)
        }
        else if (SubField == "source_dict") {
            if ($("#hdnSourceStep").val() != "") {
                var StepIndex = parseInt($("#hdnSourceStep").val()) + 1;
            }
            else {
                var StepIndex = "";
            }
            
            if($("#inpFileUpload").val() != "" || $("#txtAreaSimilarURLs").val() != ""){
                $(CtrlField).find(".tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none"></td>
                <td><span>Faculty_URL</span></td>
                <td><span class ="dataPoint">Faculty_URL</span></td>
                <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
               
                </tr>
                `)
            }
            else{
                $(CtrlField).find(".tblStepsCreations > tbody").append(`
                <tr attr="data-customrentry">
                <td><input type="checkbox" name="chkdata" /> </td>
                <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                 <td style="display:none">1</td>
                <td style="display:none">1</td>
                 <td class ='stepscountAgent'><span>${steps}</span></td>
                <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                <td class ="Dn"><span>${SubField}</span></td>
                <td><span class ="inputVal">${InputValue}</span></td>
                 <td style="display:none"></td>
                <td><span>${DataPointText}</span></td>
                <td><span class ="dataPoint">${DataPointText}</span></td>
                <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none">0</td>
                <td style="display:none"></td>
                <td style="display:none"></td>
               
                </tr>
                `)
            }

           
        }
        else {
            if ($("#hdnSourceStep").val() != "") {
                var StepIndex = parseInt($("#hdnSourceStep").val()) + 1;
            }
            else {
                var StepIndex = "";
            }

            $(CtrlField).find(".tblStepsCreations > tbody").append(`
            <tr attr="data-customrentry">
            <td><input type="checkbox" name="chkdata" /> </td>
            <td style="display:none" class ='stepscount'><span>${steps}</span></td>
             <td style="display:none">1</td>
            <td style="display:none">1</td>
             <td class ='stepscountAgent'><span>${steps}</span></td>
            <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
            <td class ="Dn"><span>${SubField}</span></td>
            <td><span class ="inputVal">${InputValue}</span></td>
             <td style="display:none">${Attr}</td>
            <td><span>${drpTagValue}</span></td>
            <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
            <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none">0</td>
            <td style="display:none"></td>
            <td style="display:none"></td>
           
            </tr>
            `)
            //  steps++;
        }
        $("input[name='chkdata']").change(function(){
            debugger;
            $("input[name='chkdata']").prop("checked",false)
            $(this).prop("checked",true)
        })
    },





    ReframeTableSteps: function (StepCount,CtrlField) {
        if(CtrlField == "" || CtrlField == undefined){
            var ShowTableData = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
            var AutoentryTable = $("#tblStepsCreations > tbody > tr[data-autoentry]").length
            if (AutoentryTable == 3 && $("#tblStepsCreations > tbody > tr").length == "3") {
                $("#icndelete").css("display", "none")
            }
            else {
                $("#icndelete").css("display", "block")
            }
        }
        else{
            var ShowTableData = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]");
            var AutoentryTable = $(CtrlField).find(".tblStepsCreations > tbody > tr[data-autoentry]").length
            if (AutoentryTable == 3 && $(CtrlField).find(".tblStepsCreations > tbody > tr").length == "3") {
                $(CtrlField).find(".icndelete").css("display", "none")
            }
            else {
                $(CtrlField).find(".cndelete").css("display", "block")
            }
        }
      
        $.each(ShowTableData, function (i, objData) {
            debugger;
            var stepsAssign = parseInt($(objData).find("td.stepscount").text());
            if (stepsAssign >= StepCount) {
                var RestepsAssign = parseInt($(objData).find("td.stepscount").text()) - 1;
                $(objData).find("td.stepscount").text(RestepsAssign)
                $(objData).find("td.stepscountAgent").text(RestepsAssign)
            }
        })

       

       

    },
    ResetData: function () {
       // $(".DivdrpConfigAction").css('display','block')
        $("#divRdoAction").css('display','none')
        $(".DivdrpConfigSetAction").css('display','block')
        $("#drpConfigSetAction").val("0").prop("disabled", false)
        $("#drpConfigAction").val("0").prop("disabled", false)
        $("#drpSubfield").val("None").prop("disabled", true)
        $("#inpValueinput").val("").prop("disabled", false)
        $("#inpTargetAttr").val("").prop("disabled", true)
        $("#ddlSchemaAssign").val("").prop("disabled", true)
        //$("#drpSubfield").val("").prop("disabled", true)
        $("#inpRemovedIndex").val("")
        $("#spnLen").text("0")
        $("#tblRule > tbody").empty();
        $("#ULInnerText > li").remove()
        $("#inpHiddenLoop").val("0")
        $("#inpActionItem").val("")
        $("#inpparamter").val("")
        $("#inpSelectAll").prop("checked",false)
$("#spnCollectionlength").text("0")
$("#drpAttributeType").val("-1")
        $("#inpTargetAttr").css('display','none');
    },
    ListofFiles: function (Status) {
        var obj = new Object();
        obj.FileStatus = Status;
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/readcsvfile",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                var Filetimedetails = data.logpath;

                $("#spnRecords").text(Filetimedetails.length)
                var StatusFile = data.StatusFile;

                var HTMLCon = "";
                $("#tblDownloadAgent > tbody").empty()
                $("#txtSearchDataList > option").remove()
                if (Filetimedetails.length != "") {
                    $.each(Filetimedetails, function (i, objdetailspath) {
                        if (StatusFile == "Completed") {
                            var Pathdetails = data.PathDetails;
                            var Pathdetails1 = "\\\\192.168.0.3\\IT_Live_Projects\\AgentTrainingFiles\\Output Agent" + "\\" + objdetailspath.split("|")[0];
                            HTMLCon = `
                                <a href="#" class='anclnk' data-Fullpath = "${Pathdetails1}" data-Path="${Pathdetails}" data-filename = ${objdetailspath.split("|")[0]} > <i class='fa fa-download ancdownload' style='cursor:pointer;' title='Download'></i> </a>
                                `
                        }
                        else if (StatusFile == "Error") {
                            var Pathdetails = data.PathDetails;
                            var Pathdetails1 = data.PathDetails + "\\" + objdetailspath.split("|")[0];
                            HTMLCon = `
                                <a href="#" class='anclnk' data-Fullpath = "${Pathdetails1}" data-Path="${Pathdetails}" data-filename = ${objdetailspath.split("|")[0]} > <i class='fa fa-exclamation' style='color:red;font-size:21px' title='Error'></i> </a>
                                `
                        }
                        else if (StatusFile == "WIP") {
                            var Pathdetails = data.PathDetails;
                            var Pathdetails1 = data.PathDetails + "\\" + objdetailspath.split("|")[0];
                            HTMLCon = `
                                <a href="#" class='anclnk' data-Fullpath = "${Pathdetails1}" data-Path="${Pathdetails}" data-filename = ${objdetailspath.split("|")[0]} > <i class='fa fa-spinner' style='pointer-events:none' title='WIP'></i> </a>
                                `
                        }
                        else if (StatusFile == "YTS") {
                            var Pathdetails = data.PathDetails;
                            var Pathdetails1 = data.PathDetails + "\\" + objdetailspath.split("|")[0];
                            HTMLCon = `
                                <a href="#" class='anclnk' data-Fullpath = "${Pathdetails1}" data-Path="${Pathdetails}" data-filename = ${objdetailspath.split("|")[0]} > <i class='fa fa-hourglass-start' style='pointer-events:none' title='YTS'></i> </a>
                                `
                        }

                        $("#txtSearchDataList").append(`<option value="${objdetailspath.split("|")[0]}">${objdetailspath.split("|")[0]}</option>`)
                        $("#tblDownloadAgent > tbody").append(`
                          <tr> <td> <span title="${objdetailspath.split("|")[1]}">${objdetailspath.split("|")[0]}</span> </td>
                          <td>${HTMLCon}</td>
                          </tr>
                          `)
                    })
                    $(".ancdownload").off().on("click", function () {
                        debugger;
                        var FileName = $(this).closest("a").attr("data-filename")
                        var obj = new Object();
                        obj.PathName = $(this).closest("a").attr("data-Path");
                        obj.filename = $(this).closest("a").attr("data-filename");
                        obj.Pathdetails1 = $(this).closest("a").attr("data-Fullpath");
                        var link = document.createElement("a");
                        link.setAttribute("href", obj.Pathdetails1);
                        link.setAttribute("download", FileName);
                        document.body.appendChild(link); // Required for FF

                        link.click(); // This will download the data file named "my_data.csv".





                    })

                }
                else {
                    $("#tblDownloadAgent > tbody").append(`
                    <tr><td style="width:100%;text-align:center;"> <label class='col-md-12'> No Records Found </label></td> </tr>
                    `)
                }
            },
        })
    },
    LoadSchemaHeaderList: function () {
        var val = "";
        val = $('#inpschemaname').val()
        var SchemamasterID = $('#ddlSchemaList option').filter(function () {
            return this.value == val;
        }).data('schemamasterid');

        var obj = new Object();
        obj.intFlag = "2";
        obj.intUserID = "0";
        obj.intSchemaID = SchemamasterID;
        obj.strSchemaCollection = "";
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/schemalist",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                var SchemaHeaderDropdown = data.response[0][0].SchemaCollection;
                $("#hdnSchemaValue").val(SchemaHeaderDropdown)
                var res = $("#spnSchemaList").text() + "," + SchemaHeaderDropdown;
                $("#spnSchemaList").text(SchemaHeaderDropdown)

                $(".spnSchemaListWriter").text(SchemaHeaderDropdown)
                $(".spnSchemaListSimilar").text(SchemaHeaderDropdown)
                SchemaHeaderDropdown = SchemaHeaderDropdown.split(",");
                SchemaData.ExistingSchemaRecordsAppend(SchemaHeaderDropdown)

            }
        })
    },
    SaveDataVaidation: function () {
        var bool = true;
        var CheckforRootSchema = $("#tblRootData > tbody > tr");
        var rootschema = [];
        var rootfieldnames = [];
        $.each(CheckforRootSchema, function (i, objRootSchema) {
            var arrcheck = $(objRootSchema).attr("data-rootschema")
            rootschema.push(arrcheck)
        })
        if (rootschema.includes("1")) {
            bool = true;

        }
        else {
            bool = false;
            if ($("#tblRootData > tbody > tr").length == 0) {
                AgentWorkArea.ShowPanel("error", "Please enter Schema Field")
            }
        }
        return bool;
    },
    SaveSchemaDetails: function (outputschemalist, type) {


        $("#SpnSchemaString").text(outputschemalist)
        var SchemaCollectionwithcomma = outputschemalist;
        if (type == "saveasnew" && $("#hdnRecordID").val() != "") {
            //  resolve($("#hdnRecordID").val())
            SchemaData.OverWriteData($("#hdnRecordID").val())
        }
        else {
            var obj = new Object();
            obj.intFlag = "3";
            obj.strSchemaName = $("#inpschemaname").val().trim();
            obj.strSchemaCollection = outputschemalist;
            obj.intSchemaID = "0";
            obj.intUserID = $("#SpnUserID").text();
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/schemalist",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {

                    var GetResult = data.response[0];
                    if (GetResult[0].RESULT != "0") {
                        SchemaData.ShowPanel("success", "Schema Created Successfully")
                    }
                    else {
                        SchemaData.ShowPanel("error", "Already schema name exists")
                    }

                    //resolve(GetResult[0].RESULT)
                }

            })
        }



    },
    AddSchemaNameandFieldValidationExist: function () {
        var bool = true;
        var CheckforRootSchema = $("#tblRootData > tbody > tr");
        var arrcheckexistingname = [];

        var DefaultSchemaFields = ['IgnoreAll',
        'IgnoreThis',
        'Merge',
        'Action',
        'Pagination',
        'Next',
        'Click',
        'Select',
        'Input',
        'Target_Url',
        'Source_Url',
        'ID',
        'LoadMore',
        'Expand',
        'Features',
        'IsCssRemove',
        'IsTabsRemove',
        'HideThis',
        'PopupClose'].map(v => v.toLowerCase());
        //  console.log(DefaultSchemaFields.includes('jane')); //true
        if (DefaultSchemaFields.includes($("#inpSchemafielldname").val().trim().toLowerCase())) {

            bool = "Default";
        }
        else {
            $.each(CheckforRootSchema, function (i, objFieldname) {
                var arrfiedname = $(objFieldname).find("td:first > span").text().trim().toLowerCase()
                if (arrfiedname.split(":").length > 0) {
                    arrcheckexistingname.push(arrfiedname.split(":")[0])
                }
                else {
                    arrcheckexistingname.push(arrfiedname)
                }

            })

            bool = arrcheckexistingname.includes($("#inpSchemafielldname").val().trim().toLowerCase())

        }

        return bool;

    },
    AddSchemaNameandField: function (rootschema) {
        $("#divAppendedData").css("display", "block")
        if (rootschema == "1" && $("#hdnAppendData").val() == "") {
            $("#hdnAppendData").val("1")
            SchemaData.AppendTableDataSchemaList(rootschema);
        }
        else if (rootschema == "1" && $("#hdnAppendData").val() == "1") {
            SchemaData.ShowPanel("error", "Already Root schema selected")
        }
        else if (rootschema == "0") {
            SchemaData.AppendTableDataSchemaList(rootschema);
        }
    },
    AppendTableDataSchemaList: function (rootschema) {

        var inpSchemafielldname = $("#inpSchemafielldname").val().trim()
        inpSchemafielldname = inpSchemafielldname.replace(/ /g, "_");
        var inpschemafield;
        if (rootschema == "1") {
            inpschemafield = `<span style="word-break: break-all;">  ${inpSchemafielldname} </span> <label title="rootschema">*</label>`
        }
        else {
            inpschemafield = `<span style="word-break: break-all;">  ${inpSchemafielldname} </span>`
        }
        if ($("#tblRootData > tbody > tr").length == 0) {
            rootschema = "1"
            $("#tblRootData > tbody").append(`
            <tr data-rootschema = ${rootschema}><td> ${inpschemafield}  </td> <td><a title="Remove" class="ancremove"><i class="fa fa-trash"></i></a> </td> </tr>
            `)
        }
        else if ($("#tblRootData > tbody > tr").length > 0) {
            $("#tblRootData > tbody").append(`
            <tr data-rootschema = ${rootschema}><td> ${inpschemafield} </td> <td><a title="Remove" class="ancremove"><i class="fa fa-trash"></i></a> </td> </tr>
            `)
        }
        if ($("#tblRootData > tbody").length > 0 && $("input[name=inpschemacreation]:checked").val() == "1") {
            $("#divSave").css("display", "block")
        }
        else if ($("#tblRootData > tbody").length > 0 && $("input[name=inpschemacreation]:checked").val() == "2") {
            $("#divSave").css("display", "none")
        }

        $(".inprdnschemaprimaryfield").off().on("change", function () {
            var parentctrl = $(this).closest("tr");
            $(".inprdnschemaprimaryfield").closest("tr").attr("data-rootschema", "0")
            if ($(this).is(":checked")) {
                $(parentctrl).attr("data-rootschema", "1");
                var PrimarySchema = $(parentctrl).find("td:first").text().trim();
                $("#changedSchema").text(PrimarySchema + ":1")


            }

        })

        $(".ancremove").off().on("click", function () {
            SchemaData.RemoveSchemaData($(this))
        })

        $("#inpSchemafielldname").val("")
        $("#chkRootschema").prop("checked", false)
    },
    UpdateSchemaData: function () {
        var val = $('#inpschemaname').val()
        var SchemamasterID = $('#inpdatalistschemaname option').filter(function () {
            return this.value == val;
        }).data('schemamasterid');
        var CheckforRootSchema = $("#tblRootData > tbody > tr");
        var rootfieldnames = [];
        var bool = true;
        if (bool == true) {
            // SchemaFieldNameValues
            $.each(CheckforRootSchema, function (i, objRootschemaNames) {
                if ($(objRootschemaNames).find("input[class=inprdnschemaprimaryfield]").is(":checked")) {
                    var arrschemananmes = $(objRootschemaNames).find("td:first > span").text().trim();
                    arrschemananmes = arrschemananmes + ":1";
                    rootfieldnames.push(arrschemananmes)
                }
                else {
                    var arrschemananmes = $(objRootschemaNames).find("td:first > span").text().trim();
                    rootfieldnames.push(arrschemananmes)
                }
            })
            var outputschemalist = rootfieldnames.join(",");

        }
        var obj = new Object();
        obj.intFlag = "3";
        obj.strSchemaName = $("#inpschemaname").val().trim();
        obj.strSchemaCollection = outputschemalist;
        obj.intUserID = "0";
        obj.intSchemaID = SchemamasterID
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/schemalist",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger;
                var SchemaUpdated = data.response[0];
                if (SchemaUpdated[0].RESULT == "2") {
                    SchemaData.ShowPanel("success", "Schema Updated Successfully")
                    // $("#divEdit").css("display","none")
                }
                else if (SchemaUpdated[0].RESULT == "1") {
                    SchemaData.ShowPanel("success", "Schema Saved Successfully")
                    // $("#divEdit").css("display","none")
                }
            }
        })

    },
    RemoveSchemaData: function (control) {
        var controlele = $(control).closest("tr");

        if ($(controlele).attr("data-rootschema") == "1") {
            $(controlele).remove()
            $("#hdnAppendData").val("")
        }
        else {
            $(controlele).remove()
        } 
    },
    CustomSelect: function () {
        $(".custom-select").find("div").remove()
        var x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        for (i = 0; i < l; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          ll = selElmnt.length;
          /*for each element, create a new DIV that will act as the selected item:*/
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          /*for each element, create a new DIV that will contain the option list:*/
          b = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                      y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                }
                h.click();
            });
            b.appendChild(c);
          }
          x[i].appendChild(b);
          a.addEventListener("click", function(e) {
              /*when the select box is clicked, close any other select boxes,
              and open/close the current select box:*/
              e.stopPropagation();
              closeAllSelect(this);
              this.nextSibling.classList.toggle("select-hide");
              this.classList.toggle("select-arrow-active");
              if($(this).closest(".custom-select").find("select").val() != "-1"){
                $(this).closest(".custom-select").find("select").change()
              }
           
            });
        }
        function closeAllSelect(elmnt) {
           
          /*a function that will close all select boxes in the document,
          except the current select box:*/
          var x, y, i, xl, yl, arrNo = [];
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          xl = x.length;
          yl = y.length;
          for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i)
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
          //$(x).closest(".custom-select").find("select").change()
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
    },
    ExistingSchemaRecordsAppend: function (SchemaCollection, type) {
        if (type == "new") {
            $("#spnAdd").css({
                "display": "block",
                "pointer-events": "auto"
            });
            $("#divAppendedData").css("display", "block")
            $("input[name=rdnoverwriteorupdate][value='4']").prop("checked", false)
            $("#btnSave").attr("disabled", true)
        }
        else {
            $("#tblRootData").css({
                "pointer-events": "none",
                "opacity": "0.7",
                "background": "#ece5e5 !important"
            })
            $("#spnEdit").css({
                "display": "block",
                "pointer-events": "auto"
            });
            $("#spnAdd").css({
                "display": "none"
            });
            $("#divSave").css("display", "none");
            $("#divEdit").css("display", "block");
            $("#divExistsSchemaSave").css("display", "inline-block");
            if ($("#hdnRecordID").val() != "") {
                $("#divOverwrite").css("display", "inline-block")
                $("input[name=rdnoverwriteorupdate][value=1]").prop("checked", true)
            }
            else {
                $("#divOverwrite").css("display", "none")
                $("input[name=rdnoverwriteorupdate][value=1]").prop("checked", false)
            }
            $("#divSaveasNew").css("display", "none");
            //  $("input[name=inpschemacreation][value='1']").attr("disabled",true)
            //$("input[name=inpschemacreation][value='2']").prop('checked', true);
            $("input[name=inpschemacreation][value='2']").attr('checked', true);
            $("#divAppendedData").css("display", "block")
        }

        //$("#spnEdit").css("display","block");
        var SchemaCollectionarr = SchemaCollection;

        $("#tblRootData > tbody").empty()
        $.each(SchemaCollectionarr, function (i, objBindSchemaList) {
            var rootschema;
            if (objBindSchemaList.includes(":1")) {
                objBindSchemaList = objBindSchemaList.split(":")[0]
                rootschema = "1";
                $("#hdnAppendData").val(rootschema)
            }
            else {
                htmllabel = `<input type="radio" class="inprdnschemaprimaryfield" name="rdnrootschema" style="float:right" title="Primary Field" value="1">`;
                rootschema = "0";
            }
            $("#tblRootData > tbody").append(`
            <tr data-rootschema = ${rootschema}><td>
			<input style="display:none;width: 60%;height: 26px;" class ="form-control inphide Allowdisallow" id="txtrowschemaname"  maxlength="50"  data-oldvalue="${objBindSchemaList}" data-newvalue="" value="${objBindSchemaList}" /> <span class ="spnhide" style='word-break: break-all;'>${objBindSchemaList}</span> </td> <td>
					<a class="ancedit" title="Edit" style="cursor:pointer"><i class="fa fa-edit"></i></a>
					<a class="ancremove" title="Remove" style="cursor:pointer"> <i class="fa fa-trash"></i></a>
					<a class="ancupdate" title="Update" style="cursor:pointer;display:none"><i class="fa fa-check"></i></a>
					<a class="anccancel" title="Cancel" style="cursor:pointer;display:none"><i class="fa fa-refresh"></i></a>

			</td> </tr>
            `)



            $('.Allowdisallow').on('keypress', function (event) {
                AllowDisallow(event, 'keypress', "");
            })


            $('.Allowdisallow').bind('paste', function (event) {
                AllowDisallow(event, 'paste', event.originalEvent.clipboardData.getData('text'));
            })


            $(".inprdnschemaprimaryfield").off().on("change", function () {
                var parentctrl = $(this).closest("tr");
                $(".inprdnschemaprimaryfield").closest("tr").attr("data-rootschema", "0")
                if ($(this).is(":checked")) {
                    $(parentctrl).attr("data-rootschema", "1");
                    var PrimarySchema = $(parentctrl).find("td:first").text().trim();
                    $("#changedSchema").text(PrimarySchema + ":1")


                }

            })

            $(".ancedit").off().on("click", function () {

                var control = $(this).closest("tr");
                $(control).find("td").find(".inphide").css("display", "inline-block")
                $(control).find("td").find(".spnhide").css("display", "none")
                $(control).find("td").find(".ancupdate").css("display", "inline-block")
                $(control).find("td").find(".anccancel").css("display", "inline-block")
                $(control).find("td").find(".ancedit").css("display", "none")
                $(control).find("td").find(".ancremove").css("display", "none")
                var oldvalue = $(control).find("td").find(".inphide").attr("data-oldvalue");
                $(control).find("td").find(".inphide").val(oldvalue)
            })

            $(".anccancel").off().on("click", function () {

                var control = $(this).closest("tr");
                $(control).find("td").find(".inphide").css("display", "none")
                $(control).find("td").find(".spnhide").css("display", "inline-block")
                $(control).find("td").find(".ancupdate").css("display", "none")
                $(control).find("td").find(".anccancel").css("display", "none")
                $(control).find("td").find(".ancedit").css("display", "inline-block")
                $(control).find("td").find(".ancremove").css("display", "inline-block")
                var oldvalue = $(control).find("td").find(".inphide").attr("data-oldvalue");
                $(control).find("td").find(".spnhide").text(oldvalue);

            })

            $(".ancupdate").off().on("click", function () {
                var control = $(this).closest("tr");
                $(control).find("td").find(".inphide").css("display", "none")
                $(control).find("td").find(".spnhide").css("display", "inline-block")
                $(control).find("td").find(".ancupdate").css("display", "none")
                $(control).find("td").find(".anccancel").css("display", "none")
                $(control).find("td").find(".ancedit").css("display", "inline-block")
                $(control).find("td").find(".ancremove").css("display", "inline-block")
                var newvalue = $(control).find("td").find(".inphide").val();
                newvalue = newvalue.replace(/ /g, "_");
                $(control).find("td").find(".inphide").attr("data-newvalue", newvalue)
                $(control).find("td").find(".spnhide").text(newvalue);
                // $(control).find("td").find(".inphide").attr("data-oldvalue",newvalue)
                if ($(control).find("td").find(".inphide").attr("data-oldvalue") != $(control).find("td").find(".inphide").attr("data-newvalue")) {
                    $("#spnUpdatedList").text("1")
                }



            })



            $(".ancremove").off().on("click", function () {
                SchemaData.RemoveSchemaData($(this))

            })
        })
    },

    SaveRecordDetailsForSupportingFiles: function (CSVList) {
        var CheckURLExisting = new Promise(function (resolve, reject) {

            var val = $('#schemalist').val()
            var SchemamasterID = $('#ddlSchemaList option').filter(function () {
                return this.value == val;
            }).data('schemamasterid');
            var obj = new Object();
            obj.flag = "2";
            obj.url = $("#inpFacultyList").val();
            obj.intUserID = $("#SpnUserID").text();
            obj.intRecordID = "0";
            obj.intSchemaMasterID = "0";
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/getreturnid",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {

                    var GetResult = data.response[0];
                    if (GetResult[0].RecordID != "0") {
                        //  SchemaData.SchemaTosaveFinally(SchemamasterID, GetResult[0].RESULT, SchemaValues)
                        $("#hdnSchemaID").val(SchemamasterID)
                        $("#hdnRecordID").val(GetResult[0].RecordID);
                    }
                    else {

                        $("#hdnSchemaID").val(SchemamasterID)
                    }

                    resolve(GetResult[0].RecordID)
                }

            })

        })
        CheckURLExisting.then(function (result) {
            var RecordID = result;
            var options = $("#drpSchemaAssign > option");

            var values = $.map(options, function (option) {
                return option.value;
            });
            var val = $('#schemalist').val()
            var SchemamasterID = $('#ddlSchemaList option').filter(function () {
                return this.value == val;
            }).data('schemamasterid');
            var SchemaNames = values.toString();
            if (RecordID != "0") {
                var obj = new Object();
                obj.flag = "3";
                obj.strSchemaName = $("#schemalist").val().trim();
                obj.strSchemaCollection = SchemaNames;
                obj.intUserID = $("#SpnUserID").text();
                obj.strAgentURL = $("#inpFacultyList").val();
                obj.intRecordID = RecordID;
                if($("#inpNewAgentName").val() != ""){
                    obj.strAgentName = $("#inpNewAgentName").val();
                }
                else if($("#inpNewAgentName").val() == ""){
                    obj.strAgentName = $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
                }
                obj.strAgentName = $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
                obj.intSchemaMasterID = SchemamasterID;
                obj.intIsCustomizedURL = "0";
                obj.strCustomizedURLs = "";
                var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
                var CtrlFieldPrev  = $(CtrlField).parent().prev()
if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find(".summarytagcss").attr("page-level") == "1"){
    obj.intPrimaryURLSchemaID = "0";
    obj.intMainURLSchemaID = "0";
}
else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find(".summarytagcss").attr("page-level") == "2"){
  
    obj.intPrimaryURLSchemaID = $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-URLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-URLSchemaID")
    if($(CtrlFieldPrev).find("#tblSavedSteps").attr("data-mainURLSchemaID") == "0"){
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-URLSchemaID")
    }
    else{
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-mainURLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-mainURLSchemaID")
    }
}
else{
    obj.intPrimaryURLSchemaID = $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-URLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-URLSchemaID")
    if($(CtrlFieldPrev).find(".tblSavedSteps").attr("data-mainURLSchemaID") == "0"){
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-URLSchemaID")
    }
    else{
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-mainURLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-mainURLSchemaID")
    }   
}
var PageLevel = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find("summary").attr("page-level")
obj.intPagelevel = PageLevel;
obj.intIsFlatFileInserted = "1";
obj.strExtractionField = "Faculty_URL"
                $.ajax({
                    type: "POST",
                    url: HostingPath + "/api/GetSchemaDetails",
                    dataType: 'json',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    success: function (data) {

                        var GetDataid = data.response[0];
                        if (GetDataid[0].UrlSchemaID != "0") {
                          
                            SchemaData.SaveJSONData(GetDataid[0].UrlSchemaID, RecordID, SchemaNames,"1",CSVList)
                            $("#hdnSchemaID").val(GetDataid[0].UrlSchemaID)
                            $("#hdnRecordID").val(RecordID);
                            $("#hdnUploadID").val("1")
                            $("#hdnUploadURLSchemaID").val(GetDataid[0].UrlSchemaID)
                        }
                        else {
                            SchemaData.ShowPanel("error", "Already schema name exists")
                        }

                    }

                })
            }
        })

    },
    RemoveAlreadySaveURLDetails: function(Agent_URL){
          var obj = new Object();
          obj.strAgentName = $("#inpAgentName").val().trim() == "" ? $("#Agentlist").val().trim() : $("#inpAgentName").val().trim()
          obj.strAgentURL = Agent_URL
          obj.intURLSchemaID = "0";
          obj.intUserID = $("#SpnUserID").text();
          var val = $('#schemalist').val()
          var SchemamasterID = $('#ddlSchemaList option').filter(function () {
            return this.value == val;
        }).data('schemamasterid');
        obj.intSchemaMasterID = SchemamasterID;
        obj.flag = 16;
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger
            }
        })
    },
    RemoveTargetPage: function(URLSchemaID,Control){

        var obj = new Object();
     
        obj.intURLSchemaID = URLSchemaID;
        obj.intUserID = $("#SpnUserID").text();
         obj.flag = 11;
      $.ajax({
          type: "POST",
          url: HostingPath + "/api/GetSchemaDetails",
          dataType: 'json',
          async: false,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (data) {
              debugger;
              if(data.response[0][0].RESULT == "1"){
                  SchemaData.ShowPanel("success","Target Page Removed Successfully")
                  $(Control).find(".tblSavedSteps").empty()
                  $(Control).find(".tblSavedSteps").css("display","none");
                  $("#inpEditType").val("")
                  $("#hdnProgressCount").val("");
                  var id = $("#txtGetDeleteId").val()
                  $("#" + id).find(".DivParsingCon").css('display','none')
                  $("#txtGetDeleteId").val("")
              }
          }
      })
    },
    AgentNameExists: function(){
        var bool = true;
        var obj = new Object();
        obj.strAgentName = $("#inpNewAgentName").val().trim()
        obj.intUserID = $("#SpnUserID").text();
        var val = $('#schemalist').val()
        var SchemamasterID = $('#ddlSchemaList option').filter(function () {
          return this.value == val;
      }).data('schemamasterid');
      obj.intSchemaMasterID = SchemamasterID;
      obj.flag = 17;
      $.ajax({
          type: "POST",
          url: HostingPath + "/api/SaveSchemaFinal",
          dataType: 'json',
          async: false,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (data) {
              debugger;
            if(data.response[0][0].RESULT == "0"){
              bool = true;
            }
            else{
                bool = false;
            }

          }
      })
      return bool;
    },
    SaveRecordDetails: function (SameAgent) {
        var CheckURLExisting = new Promise(function (resolve, reject) {
           
            var val = $('#schemalist').val()
            var SchemamasterID = $('#ddlSchemaList option').filter(function () {
                return this.value == val;
            }).data('schemamasterid');
            var obj = new Object();
            obj.flag = "2";
            if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                var CtrlField =  $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()     
                obj.url = $(CtrlField).find(".inpSegementaionURLDetailedURL").val() ;
            }
            else{
                obj.url = $("#inpMainURL").val() ;
            }
            
            obj.intUserID = $("#SpnUserID").text();
            obj.intRecordID = "0";
            obj.intSchemaMasterID = "0";
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/getreturnid",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {

                    var GetResult = data.response[0];
                    if (GetResult[0].RecordID != "0") {
                        //  SchemaData.SchemaTosaveFinally(SchemamasterID, GetResult[0].RESULT, SchemaValues)
                        $("#hdnSchemaID").val(SchemamasterID)
                        $("#hdnRecordID").val(GetResult[0].RecordID);
                    }
                    else {

                        $("#hdnSchemaID").val(SchemamasterID)
                    }

                    resolve(GetResult[0].RecordID)
                }

            })

        })
        CheckURLExisting.then(function (result) {
            var RecordID = result;
            var options = $("#drpSchemaAssign > option");

            var values = $.map(options, function (option) {
                return option.value;
            });
            var val = $('#schemalist').val()
            var SchemamasterID = $('#ddlSchemaList option').filter(function () {
                return this.value == val;
            }).data('schemamasterid');
            
           
           
            var SchemaNames = values.toString();
            if (RecordID != "0") {
                var obj = new Object();
                obj.flag = "3";
                obj.strSchemaName = $("#schemalist").val().trim();
                obj.strSchemaCollection = SchemaNames;
                obj.intUserID = $("#SpnUserID").text();
                if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                    var CtrlField =  $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()     
                    obj.strAgentURL = $(CtrlField).find(".inpSegementaionURLDetailedURL").val() ;
                }
                else{
                    obj.strAgentURL = $("#inpMainURL").val();
                }
                
                obj.intRecordID = RecordID;
                if($("#inpNewAgentName").val() != ""){
                    obj.strAgentName = $("#inpNewAgentName").val();
                }
               if($("#inpEditType").val() == "1" && $("#inpNewAgentName").val() == ""){
                   obj.intURLSchemaID = $("#hdnURLSchemaID").val()
               }
               else{
                obj.intURLSchemaID = "0"
               }
                
               
                obj.intSchemaMasterID = SchemamasterID;
                var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
                var CtrlFieldPrev  = $(CtrlField).parent().prev()
if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find(".summarytagcss").attr("page-level") == "1"){
    obj.intPrimaryURLSchemaID = "0";
    obj.intMainURLSchemaID = "0";
    if($("#inpNewAgentName").val() == ""){
        obj.strAgentName =  $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
    }
}
else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find(".summarytagcss").attr("page-level") == "2"){
  
    obj.intPrimaryURLSchemaID = $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-URLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-URLSchemaID")
    if($(CtrlFieldPrev).find("#tblSavedSteps").attr("data-mainURLSchemaID") == "0"){
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-URLSchemaID")
    }
    else{
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-mainURLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find("#tblSavedSteps").attr("data-mainURLSchemaID")
    }
    if($("#inpNewAgentName").val() == ""){
        var  PageIndex = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find(".summarytagcss").text().trim().slice(-2 , -1);
        obj.strAgentName = $("#inpAgentName").val() == "" ? $("#Agentlist").val()+"_"+"Page_"+PageIndex+"" : $("#inpAgentName").val()+"_"+"Page_"+PageIndex+"";
    }
}
else{
    obj.intPrimaryURLSchemaID = $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-URLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-URLSchemaID")
    if($(CtrlFieldPrev).find(".tblSavedSteps").attr("data-mainURLSchemaID") == "0"){
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-URLSchemaID")
    }
    else{
        obj.intMainURLSchemaID = $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-mainURLSchemaID") == "" ? "0" : $(CtrlFieldPrev).find(".tblSavedSteps").attr("data-mainURLSchemaID")
    }  
    if($("#inpNewAgentName").val() == ""){
     var  PageIndex = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find(".summarytagcss").text().trim().slice(-2 , -1);
     obj.strAgentName = $("#inpAgentName").val() == "" ? $("#Agentlist").val()+"_"+"Page_"+PageIndex+"" : $("#inpAgentName").val()+"_"+"Page_"+PageIndex+"";
    }
}

if($("#hdnUploadID").val() == "1"){
    obj.intPrimaryURLSchemaID = $("#hdnUploadURLSchemaID").val();
    obj.intMainURLSchemaID = $("#hdnUploadURLSchemaID").val();
    obj.strAgentName =  $("#inpAgentName").val()+"_Page_Level_Upload"
}
                obj.intIsCustomizedURL = "0";
                obj.strCustomizedURLs = "";
                obj.strExtractionField = $(".drpSelectExtractionURL option:selected").val() == "-- Select Extraction URL Field --" ? "" : $(".drpSelectExtractionURL option:selected").val() ;
                var PageLevel = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent().find("summary").attr("page-level")
if($("#inpNewAgentName").val() != ""){
    obj.intPagelevel = 1;
    
}
else{
    obj.intPagelevel = PageLevel;
}
obj.intIsFlatFileInserted = "0";
             
                $("#spnExtractionURLFirst").text(obj.strExtractionField)
                $.ajax({
                    type: "POST",
                    url: HostingPath + "/api/GetSchemaDetails",
                    dataType: 'json',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    success: function (data) {

                        var GetDataid = data.response[0];
                        if (GetDataid[0].UrlSchemaID != "0" || GetDataid[0].UrlSchemaID != undefined ) {
                            $("#hdnSchemaID").val(GetDataid[0].UrlSchemaID)
                            $("#hdnURLSchemaID").val(GetDataid[0].UrlSchemaID)
                            $("#hdnRecordID").val(GetDataid[0].RecordID);
                            $("#hdnUploadID").val("")
                          //  SchemaData.SaveJSONData(GetDataid[0].UrlSchemaID, RecordID, SchemaNames,SameAgent)
                          SchemaData.SaveJSONData(GetDataid[0].UrlSchemaID, RecordID, SchemaNames,"","",SameAgent)
                          
                        }
                        else {
                            SchemaData.ShowPanel("error", "Already schema name exists")
                        }

                    }

                })
            }
        })

    },
    SaveJSONData: function (URLSchemaID, RecordID, SchemaNames,IssupportingFiles,CSVList,SameAgent) {
        var obj = new Object();
        obj.intFlag = "1";
        obj.intURLSchemaID = URLSchemaID;
        obj.intRecordID = RecordID;
        obj.intUserID = $("#SpnUserID").text();

        //obj.strFromUser = "";
        obj.intIsProxyRequired = "0";
        obj.strComments = "";
        obj.strURLAgentSchema = "";
        obj.intPrimaryAuditID = "0";
       
        obj.strTrainedStepsTimeTaken  = $("#TrainStepTime").text();
        //var arr_string = JSON.parse(JSON.stringify(json));
          if(IssupportingFiles != "1"){
            if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                var CtrlField =  $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()     
                obj.strAgentURL = $(CtrlField).find(".inpSegementaionURLDetailedURL").val() ;
            }
            else{
                obj.strAgentURL = $("#inpMainURL").val();
            }
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/SaveIntermediateSchemaFinal",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger;
                    if (data.response[0][0].ExecutionID != "0") {
                        $("#hdnUserAuditID").val(data.response[0][0].ExecutionID)
                        // if($(".drpSelectExtractionURL option:selected").val() != "-- Select Extraction URL Field --"){
                        //     SchemaData.SaveExtractionField()
                        // }
                        
                        var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
                        var myRows = [];
                          if(SameAgent == "1"){
                          //  var csvstepsasJSON = SchemaData.jsondata("1");
                          $.each($("#tblStepsCreations > tbody >  tr"), function(i,obj){
         
                            var res = $(obj).find("td")[3]
                            
                            $(res).text($("#hdnUserAuditID").val())
                            })
                            var SavedSteps = $("#hdnSavedSteps").val()
               
                var myRows = [];
            var $headers = $("#tblStepsCreations > thead > tr > th.needed");
            var $rows = $("#tblStepsCreations > tbody >  tr").each(function (index) {
    
                $cells = $(this).find("td:not(:first)");
                myRows[index] = {};
                $cells.each(function (cellIndex) {
                    if($($headers[cellIndex]).attr("actionattr") == "ValueInput" || $($headers[cellIndex]).attr("actionattr") == "Datapointlabel" ){
                        myRows[index][$($headers[cellIndex]).attr("actionattr")] = $(this).text();
                    }
                    else{
                        myRows[index][$($headers[cellIndex]).html()] = $(this).text();
                    }
                 
                });
    
    
            });
            var csvstepsasJSON = myRows.concat(JSON.parse(SavedSteps));
            var FinalSteps = []
            var SourceStep = "";
          $.each(csvstepsasJSON, function(i,obj){
            obj["Agent Code"] = $("#hdnUserAuditID").val();
            obj["Steps"] = parseInt(i) + 1;
            
            if(obj["Actions"] == "Loop"){
                SourceStep = parseInt(i) + 1;

            }
            if(obj["Actions"] == "Get"){
                obj["Source"] = SourceStep.toString()
            }
            else if(obj["Actions"] == "MongoDB_write"){
                obj["Source"] = SourceStep.toString()
            } 
          
            FinalSteps.push(obj)
          })

                            //  var InsertEncrypted = SchemaData.EncryptData(csvstepsasJSON);
                             var InsertMongo = SchemaData.MongoDBData(JSON.stringify(FinalSteps));
                            var InsertedInFlag = SchemaData.InsertedNot();
                          //  var PassURLSchemaID = SchemaData.URLSchemaIDPass();
                           //  SchemaData.CallForURL($("#hdnUserAuditID").val())
                             var obj = new Object()
                             if($("#inpNewAgentName").val() != ""){
                                obj.strFileName  = $("#inpNewAgentName").val();
                            }
                            else if($("#inpNewAgentName").val() == ""){
                                obj.strFileName = $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
                            }
                            
                             obj.csvsteps = JSON.stringify(FinalSteps);
                             $.ajax({
                                 type: "POST",
                                 url: HostingPath + "/api/saveascsv",
                                 dataType: 'json',
                                 contentType: "application/json; charset=utf-8",
                                 data: JSON.stringify(obj),
                                 success: function (data) {
                                     debugger;
                                     if (data.response == "1") {
                                         SchemaData.ShowPanel("success", "Trained steps submitted successfully")
                                         $("#TrainStepTime").timer({
                                             action: 'reset',
                                             seconds: 0
                                         })
                                         $("#TrainStepTime").timer({
                                             action: 'pause',
                                             seconds: 0
                                         })
                                         $("#TrainStepTime").css('display','none')
                                        
            //                              var CheckforLoopAction = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
            //                              CheckforLoopAction.remove();
            //                              $("#inpFileUpload").val("")
            //                              $("#tblStepsCreations").css('display', 'none');
                                          $("#divLoop").css("display", "none")
                                        //  $("#inpCheckboxLoopEnd").prop("checked", false)
                                         $("#ULInnerText > li").remove()
                                          $("#spnCollectionlength").text("0")
                                          $("#inpAgentName, #LastActionText ,#LoopStepText ,#Segeration ,#NextLoopText ,#FinalSourceStep ,#ThirdLoopText ,#ThirdSourceStep ,#SourceStepFinal ").val("");
                                          $("#ApproveModal").modal("hide")
                                          $("#MappedModal").modal("hide")
            //                              $("#divSubmit").css("display", "none")
            //                              $("#divshowtable").css("display", "none")
                                          $("#similarurlsteps").val("")
                                          $("#divsimilarSteps").css("display","none")
                                          $("#hdnSavedSteps").val("")
                                          $("input[name='rdnUploadType']").prop("checked",false)
                                          $("#divUploadAgent").css("display","none");
                                          $("#inpFileUpload").val("")
                                          $("#hdnProgressCount").val("")
                                         $("#txtAreaSimilarURLs").val("")
              $("input[name='rdnApplyTo']").prop("checked",false)
          $("input[name='rdnUploadType']").prop("checked",false)
          $("#DivUploadType").css("display","none")
          $("#inpFacultyList").val("")
              $("#inpselectAgent").val("")
              $("#Agentlist").val("")
         $("#divSelectAgent").css("display","none")
         $("#inpEditType").val("")
         $("#DivModalAgentName").css('display','none')
                                     }
                                     else {
                                         SchemaData.ShowPanel("error", "Trained steps not submitted successfully")
                                     }
                                 }
                             })


                          }
                          else if(SameAgent == "EditAgent"){
                         
if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "0"){
    $.each($("#tblSavedSteps > tbody >  tr"), function(i,obj){
         
        var res = $(obj).find("td")[3]
        
        $(res).text($("#hdnUserAuditID").val())
        })
       
     //   $("#hdnProgressCount").val($(res)[0]["Agent Code"]) 

var $headers = $("#tblSavedSteps > thead > tr > th:not(:first)");
var $rows = $("#tblSavedSteps > tbody >  tr").each(function (index) {

$cells = $(this).find("td:not(:first)");
myRows[index] = {};
$cells.each(function (cellIndex) {
if($($headers[cellIndex]).attr("actionattr") == "ValueInput" || $($headers[cellIndex]).attr("actionattr") == "Datapointlabel" ){
    myRows[index][$($headers[cellIndex]).attr("actionattr")] = $(this).text();
}
else{
    myRows[index][$($headers[cellIndex]).html()] = $(this).text();
}
});


});
$.each(myRows, function(i,obj){
debugger;
if(obj.Actions == "MongoDB_read"){
$("#hdnProgressCount").val(obj.ValueInput.trim())
}
})
var FinalSteps = JSON.stringify(myRows);
if($("#hdnProgressCount").val() != ""){
  SchemaData.Reexecution($("#hdnProgressCount").val())
}
var InsertMongo = SchemaData.MongoDBData(FinalSteps);
var InsertedInFlag = SchemaData.InsertedNot(); 
var obj = new Object()
if($("#inpNewAgentName").val() != ""){
    obj.strFileName  = $("#inpNewAgentName").val();
}
else if($("#inpNewAgentName").val() == ""){
    obj.strFileName = $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
}
obj.csvsteps = FinalSteps;
$.ajax({
    type: "POST",
    url: HostingPath + "/api/saveascsv",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(obj),
    success: function (data) {
        debugger;
        if (data.response == "1") {
            SchemaData.ShowPanel("success", "Trained steps submitted successfully")
            $("#TrainStepTime").timer({
                action: 'reset',
                seconds: 0
            })
            $("#TrainStepTime").timer({
                action: 'pause',
                seconds: 0
            })
            $("#TrainStepTime").css('display','none')
           
            var CheckforLoopAction = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
            CheckforLoopAction.remove();
            $("#inpFileUpload").val("")
            $("#tblStepsCreations").css('display', 'none');
            $("#divLoop").css("display", "none")
            // $("#inpCheckboxLoopEnd").prop("checked", false)
            $("#ULInnerText > li").remove()
            $("#spnCollectionlength").text("0")
            $("#inpAgentName, #LastActionText ,#LoopStepText ,#Segeration ,#NextLoopText ,#FinalSourceStep ,#ThirdLoopText ,#ThirdSourceStep ,#SourceStepFinal ").val("");
            $("#ApproveModal").modal("hide")
            $("#MappedModal").modal("hide")
            $("#divSubmit").css("display", "none")
            $("#divshowtable").css("display", "none")
            $("#similarurlsteps").val("")
            $("#divsimilarSteps").css("display","none")
            $("#hdnSavedSteps").val("")
            $("#hdnProgressCount").val("")
            $("#DivUploadType").css("display","none")
            $("#inpFacultyList").val("")
            $("#inpselectAgent").val("")
            $("#Agentlist").val("")
           $("#divSelectAgent").css("display","none")
           $("#inpEditType").val("")
           $("#DivModalAgentName").css('display','none')
        }
        else {
            SchemaData.ShowPanel("error", "Trained steps not submitted successfully")
        }
    }
})
}
else if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){

    $.each( $(CtrlField).find(".tblSavedSteps > tbody >  tr"), function(i,obj){
         
        var res = $(obj).find("td")[3]
        
        $(res).text($("#hdnUserAuditID").val())
        })
       
     //   $("#hdnProgressCount").val($(res)[0]["Agent Code"]) 

var $headers = $(CtrlField).find(".tblSavedSteps > thead > tr > th:not(:first)");
var $rows = $(CtrlField).find(".tblSavedSteps > tbody >  tr").each(function (index) {

$cells = $(this).find("td:not(:first)");
myRows[index] = {};
$cells.each(function (cellIndex) {
if($($headers[cellIndex]).attr("actionattr") == "ValueInput" || $($headers[cellIndex]).attr("actionattr") == "Datapointlabel" ){
    myRows[index][$($headers[cellIndex]).attr("actionattr")] = $(this).text();
}
else{
    myRows[index][$($headers[cellIndex]).html()] = $(this).text();
}
});


});
$.each(myRows, function(i,obj){
debugger;
if(obj.Actions == "MongoDB_read"){
$("#hdnProgressCount").val(obj.ValueInput.trim())
}
})
var FinalSteps = JSON.stringify(myRows);
if($("#hdnProgressCount").val() != ""){
  SchemaData.Reexecution($("#hdnProgressCount").val())
}
var InsertMongo = SchemaData.MongoDBData(FinalSteps);
var InsertedInFlag = SchemaData.InsertedNot(); 
var obj = new Object()
if($("#inpNewAgentName").val() != ""){
    obj.strFileName  = $("#inpNewAgentName").val();
}
else if($("#inpNewAgentName").val() == ""){
    obj.strFileName = $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
}
obj.csvsteps = FinalSteps;
$.ajax({
    type: "POST",
    url: HostingPath + "/api/saveascsv",
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(obj),
    success: function (data) {
        debugger;
        if (data.response == "1") {
            SchemaData.ShowPanel("success", "Trained steps submitted successfully")
            $("#TrainStepTime").timer({
                action: 'reset',
                seconds: 0
            })
            $("#TrainStepTime").timer({
                action: 'pause',
                seconds: 0
            })
            $("#TrainStepTime").css('display','none')
           
            var CheckforLoopAction = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
            CheckforLoopAction.remove();
            $("#inpFileUpload").val("")
            $("#tblStepsCreations").css('display', 'none');
            $("#divLoop").css("display", "none")
            // $("#inpCheckboxLoopEnd").prop("checked", false)
            $("#ULInnerText > li").remove()
            $("#spnCollectionlength").text("0")
            $("#inpAgentName, #LastActionText ,#LoopStepText ,#Segeration ,#NextLoopText ,#FinalSourceStep ,#ThirdLoopText ,#ThirdSourceStep ,#SourceStepFinal ").val("");
            $("#ApproveModal").modal("hide")
            $("#MappedModal").modal("hide")
            $("#divSubmit").css("display", "none")
            $("#divshowtable").css("display", "none")
            $("#similarurlsteps").val("")
            $("#divsimilarSteps").css("display","none")
            $("#hdnSavedSteps").val("")
            $("#hdnProgressCount").val("")
            $("#DivUploadType").css("display","none")
            $("#inpFacultyList").val("")
            $("#inpselectAgent").val("")
            $("#Agentlist").val("")
           $("#divSelectAgent").css("display","none")
           $("#DivModalAgentName").css('display','none')
           $("#inpEditType").val("")
        }
        else {
            SchemaData.ShowPanel("error", "Trained steps not submitted successfully")
        }
    }
})



}
                          
             
              

                          }
                          else{
 //Exit Append
 
 if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
     SameAgent = "Segmentation";
    var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
    var arr = []
    $.each($("#drpSchemaAssign > option"), function(i,obj){
        arr.push($(obj).text())
    })
    SchemaHeader = arr.toString()
    if($("#inpValueinput").attr("data-attrcollection") == "" &&  $(CtrlField).find(".tblStepsCreations > tbody > tr:last").find("td.configaction").text() != "MongoDB_write"){
        var LastSteps = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".stepscount").text();
        LastSteps = parseInt(LastSteps) + 1;
        $(CtrlField).find(".tblStepsCreations > tbody").append(`
        <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
        <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
        <td style="display:none" class ='stepscount'><span>${LastSteps}</span></td>
         <td style="display:none">1</td>
        <td style="display:none">1</td>
         <td class ='stepscountAgent'><span>${LastSteps}</span></td>
        <td class ='configaction'><span>MongoDB_write</span></td>
        <td class ="Dn"></td>
        <td><span class ="inputVal"></span></td>
         <td style="display:none"><span></span></td>
        <td></td>
       <td><span class ='schemafinal'>${SchemaHeader}</span></td>
         <td style="display:none" class ='sourcestep'></td>
         <td style="display:none">0</td>
        <td style="display:none"></td>
        <td style="display:none">0</td>
        <td style="display:none"></td>
        <td style="display:none"></td>
       
        </tr>
        `)
    }
   
    var i = 0;
 for (i = 0; i < 2; i++) {
     if (i == 0) {
         var FileName = $("#spnFIleName").text().trim()
         var LastSteps = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".stepscount").text();
         LastSteps = parseInt(LastSteps) + 1;
         $(CtrlField).find(".tblStepsCreations > tbody").append(`
<tr attr="data-customrentry" style='background: #eee;opacity: 0.7;'>
<td><input type="checkbox" name="chkdata" /> </td>
<td style="display:none" class ='stepscount'>${LastSteps}</td>
<td style="display:none">1</td>
<td style="display:none">1</td>
<td class ='stepscountAgent'><span>${LastSteps}</span></td>
<td class ='configaction'><span>MongoDB_commit</span></td>
<td class ="Dn"></td>
<td><span class ="inputVal"></span></td>
<td style="display:none"></td>
<td></td>
<td></td>
<td style="display:none"></td>
<td style="display:none">0</td>
<td style="display:none"></td>
<td style="display:none">0</td>
<td style="display:none"></td>
<td style="display:none"></td>

</tr>
`)
     }
     else {
         var LastSteps = $(CtrlField).find(".tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".stepscount").text();
         LastSteps = parseInt(LastSteps) + 1;
         $(CtrlField).find(".tblStepsCreations > tbody").append(`
<tr attr="data-customrentry" style='background: #eee;opacity: 0.7;'>
<td><input type="checkbox" name="chkdata" /> </td>
<td style="display:none" class ='stepscount'>${LastSteps}</td>
<td style="display:none">1</td>
<td style="display:none">1</td>
<td class ='stepscountAgent'><span>${LastSteps}</span></td>
<td class ='configaction'><span>Exit</span></td>
<td class ="Dn"></td>
<td><span class ="inputVal"></span></td>
<td style="display:none"></td>
<td></td>
<td></td>
<td style="display:none"></td>
<td style="display:none">0</td>
<td style="display:none"></td>
<td style="display:none">0</td>
<td style="display:none"></td>
<td style="display:none"></td>

</tr>
`)
     }
 }
}
else{
    if($("#inpValueinput").attr("data-attrcollection") == "" &&  $("#tblStepsCreations > tbody > tr:last").find("td.configaction").text() != "MongoDB_write"){
        var arr = []
       $.each($("#drpSchemaAssign > option"), function(i,obj){
           arr.push($(obj).text())
       })
       SchemaHeader = arr.toString()
       var LastSteps = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".stepscount").text();
       LastSteps = parseInt(LastSteps) + 1;
       $("#tblStepsCreations > tbody").append(`
       <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;display:none'>
       <td><input type="checkbox" name="chkdata" style='pointer-events:none' /> </td>
       <td style="display:none" class ='stepscount'><span>${LastSteps}</span></td>
        <td style="display:none">1</td>
       <td style="display:none">1</td>
        <td class ='stepscountAgent'><span>${LastSteps}</span></td>
       <td class ='configaction'><span>MongoDB_write</span></td>
       <td class ="Dn"></td>
       <td><span class ="inputVal"></span></td>
        <td style="display:none"><span></span></td>
       <td></td>
      <td><span class ='schemafinal'>${SchemaHeader}</span></td>
        <td style="display:none" class ='sourcestep'></td>
        <td style="display:none">0</td>
       <td style="display:none"></td>
       <td style="display:none">0</td>
       <td style="display:none"></td>
       <td style="display:none"></td>
      
       </tr>
       `)
       
    }
    var i = 0;
    for (i = 0; i < 2; i++) {
        if (i == 0) {
            var FileName = $("#spnFIleName").text().trim()
            var LastSteps = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".stepscount").text();
            LastSteps = parseInt(LastSteps) + 1;
            $("#tblStepsCreations > tbody").append(`
   <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;'>
   <td><input type="checkbox" name="chkdata" /> </td>
   <td style="display:none" class ='stepscount'>${LastSteps}</td>
   <td style="display:none">1</td>
   <td style="display:none">1</td>
   <td class ='stepscountAgent'><span>${LastSteps}</span></td>
   <td class ='configaction'><span>MongoDB_commit</span></td>
   <td class ="Dn"></td>
   <td><span class ="inputVal"></span></td>
   <td style="display:none"></td>
   <td></td>
   <td></td>
   <td style="display:none"></td>
   <td style="display:none">0</td>
   <td style="display:none"></td>
   <td style="display:none">0</td>
   <td style="display:none"></td>
   <td style="display:none"></td>
   
   </tr>
   `)
        }
        else {
            var LastSteps = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]:last").find(".stepscount").text();
            LastSteps = parseInt(LastSteps) + 1;
            $("#tblStepsCreations > tbody").append(`
   <tr attr="data-customrentry" style='background: #eee;opacity: 0.7;'>
   <td><input type="checkbox" name="chkdata" /> </td>
   <td style="display:none" class ='stepscount'>${LastSteps}</td>
   <td style="display:none">1</td>
   <td style="display:none">1</td>
   <td class ='stepscountAgent'><span>${LastSteps}</span></td>
   <td class ='configaction'><span>Exit</span></td>
   <td class ="Dn"></td>
   <td><span class ="inputVal"></span></td>
   <td style="display:none"></td>
   <td></td>
   <td></td>
   <td style="display:none"></td>
   <td style="display:none">0</td>
   <td style="display:none"></td>
   <td style="display:none">0</td>
   <td style="display:none"></td>
   <td style="display:none"></td>
   
   </tr>
   `)
        }
    }
} 
 
 

 var csvstepsasJSON = SchemaData.jsondata(SameAgent,CtrlField);
//  var InsertEncrypted = SchemaData.EncryptData(csvstepsasJSON);
var MyRows = JSON.parse(csvstepsasJSON)
$.each(MyRows, function(i,obj){
    debugger;
    if(obj.Actions == "MongoDB_read"){
        $("#hdnProgressCount").val(obj.ValueInput.trim())
    }
})
 var InsertMongo = SchemaData.MongoDBData(csvstepsasJSON);
 var InsertedInFlag = SchemaData.InsertedNot();
// var PassURLSchemaID = SchemaData.URLSchemaIDPass();
 //SchemaData.CallForURL($("#hdnUserAuditID").val())
 //SchemaData.PythonURL($("#hdnUserAuditID").val())
 var obj = new Object()
 if($("#inpNewAgentName").val() != ""){
    obj.strFileName  = $("#inpNewAgentName").val();
}
else if($("#inpNewAgentName").val() == ""){
    obj.strFileName = $("#inpAgentName").val() == "" ? $("#Agentlist").val() : $("#inpAgentName").val() 
}
 obj.csvsteps = csvstepsasJSON;
 $.ajax({
     type: "POST",
     url: HostingPath + "/api/saveascsv",
     dataType: 'json',
     contentType: "application/json; charset=utf-8",
     data: JSON.stringify(obj),
     success: function (data) {
         debugger;
         if (data.response == "1") {
             SchemaData.ShowPanel("success", "Trained steps submitted successfully")
             $("#TrainStepTime").timer({
                 action: 'reset',
                 seconds: 0
             })
             $("#TrainStepTime").timer({
                 action: 'pause',
                 seconds: 0
             })
             $("#TrainStepTime").css('display','none')
             var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()
             var CheckforLoopAction = $("#tblStepsCreations > tbody > tr[attr=data-customrentry]");
             CheckforLoopAction.remove();
             $("#inpFileUpload").val("")
             $("#tblStepsCreations").css('display', 'none');
             $("#divLoop").css("display", "none")
            //  $("#inpCheckboxLoopEnd").prop("checked", false)
             $("#ULInnerText > li").remove()
             $("#spnCollectionlength").text("0")
             $("#inpAgentName, #LastActionText ,#LoopStepText ,#Segeration ,#NextLoopText ,#FinalSourceStep ,#ThirdLoopText ,#ThirdSourceStep ,#SourceStepFinal ").val("");
             $("#ApproveModal").modal("hide")
             $("#MappedModal").modal("hide")
             $("#divSubmit").css("display", "none")
             $("#divshowtable").css("display", "none")
             $("#hdnProgressCount").val("")
             $("#txtAreaSimilarURLs").val("")
             $("input[name='rdnApplyTo']").prop("checked",false)
             $("input[name='rdnUploadType']").prop("checked",false)
             $("#DivUploadType").css("display","none")
             $("#inpFacultyList").val("")
             $("#inpselectAgent").val("")
             $("#Agentlist").val("")
            $("#divSelectAgent").css("display","none")
            $("#DivModalAgentName").css('display','none')
            $("#inpEditType").val("")
            $(CtrlField).find(".tblStepsCreations").empty()
            $(CtrlField).find(".tblSavedSteps").empty()

         }
         else {
             SchemaData.ShowPanel("error", "Trained steps not submitted successfully")
         }
     }
 })
                          }
                       
                        
                    }
                }
            })
          }
          else if(IssupportingFiles == "1"){
            obj.strAgentURL =$("#inpFacultyList").val()
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/SaveIntermediateSchemaFinal",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) { 
                    if (data.response[0][0].ExecutionID != "0") {
                        var ExecutionID = data.response[0][0].ExecutionID;
                       
                        var obj = new Object()
                        var CsvListUpdate = [];
                        $.each(CSVList, function(i,objUpdate){
                            objUpdate["ExecutionID"] = ExecutionID.toString();
                            CsvListUpdate.push(objUpdate)
                        }) 
                        var ExtractionURLField = $("#spnExtractionURL").text().trim()  
                        var objSupportingFiles = {
                            "Original_json_output": CsvListUpdate,
                            "IssupportingFiles" : "1",
                            "PrimaryExecutionID":data.response[0][0].ExecutionID,
                            "ExecutionID":data.response[0][0].ExecutionID,
                            "Final_Parsing_Json_Output":"",
                            "ExecutionURL":ExtractionURLField
                        }
                
                        obj.JSONData = objSupportingFiles
                        $.ajax({
                            type: "POST",
                            url: HostingPath + "/api/SupportingFiles",
                            dataType: 'json',
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(obj),
                            success: function (data) {
                                debugger;
                                if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                                    var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent();
                                  //  var ExtractionURL = $(CtrlField).find(".drpExtractionURL option:selected").val();
                                    $(CtrlField).find(".tblStepsCreations > tbody").append(`
                                    <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                                                    <td></td>
                                                    <td style='display:none'>4</td>
                                                    <td style='display:none'>4</td>
                                                    <td style='display:none'>1</td>
                                                    <td>3</td>
                                                    <td class ='configaction'><span>MongoDB_read</span></td>
                                                    <td class ="Dn">${ExtractionURLField}</td>
                                                    <td><span id="spnSimilarPath" class ="inputVal">${ExecutionID}</span> </td>
                                                    <td style="display:none"></td>
                                                    <td> <span id="spnSchemaListSimilar">${ExtractionURLField}</span></td>
                                                   <td><span id="spnSimilarFileName">${ExtractionURLField}</span></td>
                                                    <td style="display:none"></td>
                                                    <td style="display:none">0</td>
                                                    <td style="display:none"></td>
                                                    <td style="display:none">0</td>
                                                    <td style="display:none"></td>
                                                    <td style="display:none"></td>
                                                   
                                                </tr>
                                                
                                    `)
                                }
                                else{
                                  //  var ExtractionURL = $("#drpExtractionURL option:selected").val();
                                    $("#tblStepsCreations > tbody").append(`
                                    <tr data-autoentry id="similarTRUrl" style="background: #eee;opacity: 0.7;display:none">
                                                    <td></td>
                                                    <td style='display:none'>4</td>
                                                    <td style='display:none'>4</td>
                                                    <td style='display:none'>1</td>
                                                    <td>3</td>
                                                    <td class ='configaction'><span>MongoDB_read</span></td>
                                                    <td class ="Dn">${ExtractionURLField}</td>
                                                    <td><span id="spnSimilarPath" class ="inputVal">${ExecutionID}</span> </td>
                                                    <td style="display:none"></td>
                                                    <td> <span id="spnSchemaListSimilar">${ExtractionURLField}</span></td>
                                                   <td><span id="spnSimilarFileName">${ExtractionURLField}</span></td>
                                                    <td style="display:none"></td>
                                                    <td style="display:none">0</td>
                                                    <td style="display:none"></td>
                                                    <td style="display:none">0</td>
                                                    <td style="display:none"></td>
                                                    <td style="display:none"></td>
                                                   
                                                </tr>
                                                
                                    `)
                                }
                               
                             //   $("#drpConfigAction").val("Loop").change();
                              //  $("#btnAddSteps").click()
                            }    
                        })
                    }
                    
                }
            })
          }
          else{
            if($("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").closest("summary").attr("data-level") == "1"){
                var CtrlField =  $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]:checked").parent().parent()     
                obj.strAgentURL = $(CtrlField).find(".inpSegementaionURLDetailedURL").val() ;
            }
            else{
                obj.strAgentURL = $("#inpMainURL").val();
            }
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/SaveIntermediateSchemaFinal",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) { 
                    if (data.response[0][0].ExecutionID != "0") {
                        var obj = new Object()
         

                        var objSupportingFiles = {
                            "Original_json_output": CSVList,
                            "IssupportingFiles" : "1",
                            "PrimaryExecutionID":data.response[0][0].ExecutionID,
                            "ExecutionID":data.response[0][0].ExecutionID,
                            "ExecutionURL":"Faculty_URL"
                        }
                
                        obj.JSONData = objSupportingFiles
                        $.ajax({
                            type: "POST",
                            url: HostingPath + "/api/SupportingFiles",
                            dataType: 'json',
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(obj),
                            success: function (data) {
                                debugger;
                            }    
                        })
                    }
                    
                }
            })
          }
      
    },
    URLSchemaIDPass: function(){
        debugger
              var obj = new Object();
              obj.flag = "8";
              obj.intURLSchemaID = $("#hdnURLSchemaID").val();
              obj.intUserID = $("#SpnUserID").text()
              $.ajax({
                type: "POST",
                url: HostingPath + "/api/GetSchemaDetails",
                dataType: 'json',
                async:false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger
                }
            })

    },
    GetParsedHarvestedStatusID: function(ExecutionID){
        var obj = new Object();
        var ParsedStatus="";
        obj.intFlag = "2";
        obj.intExecutionID = ExecutionID
        $.ajax({
          type: "POST",
          url: HostingPath + "/api/SaveParsedResult",
          dataType: 'json',
          async: false,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (data) {
            ParsedStatus = data.response[0][0].IsParsingRuleAdded + "||" + data.response[0][0].IsParsingRuleApplied;
          }
        })
        return ParsedStatus
    },
    Morethan32000: function(JSONDatapoint){
        var DataJSON32000 = JSONDatapoint;
        var ObjectIncludesFinals = {};
        var newkeysdata = [];
        var FinalParse = [];
        var res = "";
        var resbind = "";
        var ObHeader = Object.keys(JSONDatapoint[0]);
        $.each(DataJSON32000, function(_k,objList){
            $.each(ObHeader, function(_i,obj){
                if(objList[obj].length > 32000 ){
                  var Segegrattedtext =  SchemaData.splitter(objList[obj], 32000);
                  $.each(Segegrattedtext, function(i,SegeratedObject){
                      if(res != ""){
                          if(i == 0){
                            ObjectIncludesFinals = {
                                [obj]: SegeratedObject
                            }
                          }
                          else{
                            ObjectIncludesFinals = {
                                [obj+'_'+[i]]: SegeratedObject
                            }
                          }
                        
                          res = Object.assign(res,ObjectIncludesFinals)
                      }
                  })
                   
                }
                else{
                        if(res != ""){
                            ObjectIncludesFinals = {
                                [obj]:objList[obj]
                            }
                            res = Object.assign(res,ObjectIncludesFinals)
                        }
                        else{
                            ObjectIncludesFinals = {
                                [obj]:objList[obj]
                            }
                            res = ObjectIncludesFinals;
                        }
                    
                        
                    ObjectIncludesFinals = {};
                }
            })
            console.log(FinalParse)
            FinalParse.push(res);
           
            if(FinalParse.length > 1 ){
               var newkeys = Object.keys(res);
               var FinalParseKeys = FinalParse.length - 2;
              var  FinalParseObjectKeys =Object.keys(FinalParse[FinalParseKeys]);
                //var FinalObjectValue = FinalParse[FinalParseKeys];
                var result = newkeys.filter(val => !FinalParseObjectKeys.includes(val));
                console.log(result);
                newkeysdata.push(result.toString())
               
                
            }
            
            


            res = "";
           
        })
        var filtered = newkeysdata.filter(function (el) {
            return el != "";
          });
          var chars  = filtered.toString().split(",");
          let uniqueChars = [...new Set(chars)];
if(uniqueChars.toString() != ""){
    console.log(uniqueChars);
    var cdntrue = ""
    var FinalHeaaderIncludes = []
       $.each(FinalParse, function(j,objparsekeys){
           
        $.each(uniqueChars, function(i,obj){
            var resKeys = objparsekeys
          
            if(resKeys.hasOwnProperty(obj) == false){
                if(resbind == ""){
                    var ObjectIncludes = {
                        [obj]: ""
                    }
        
                    resbind = Object.assign(objparsekeys,ObjectIncludes) 
                    ObjectIncludes = {}
                }
                else{
                    var ObjectIncludes = {
                        [obj]: ""
                    }
                    resbind =  Object.assign(resbind,ObjectIncludes) ;
                    ObjectIncludes = {}
                }
                cdntrue = "1"
            }
            
    
       })
       if(cdntrue == ""){
        const ordered = Object.keys(objparsekeys).sort().reduce(
            (obj, key) => { 
              obj[key] = objparsekeys[key]; 
              return obj;
            }, 
            {}
          );
        FinalHeaaderIncludes.push(ordered)
       }
       else{
        const ordered = Object.keys(resbind).sort().reduce(
            (obj, key) => { 
              obj[key] = resbind[key]; 
              return obj;
            }, 
            {}
          );
        FinalHeaaderIncludes.push(ordered)
       }
       
        resbind = "";
    })
    return FinalParse;
}
else{
    return FinalParse
}




        
    },
    splitter: function(str, l){
        var strs = [];
        var previndex = 0;
        var newIndex= 0;
        var OrgTxt_Fresh = str.length;
        while(str.length > l){
            if(OrgTxt_Fresh <= str.length){
                if(previndex == 0){
                    var OrgTxt_Fresh = 0 + parseInt(l);
                 
                    strs.push(str.substr(0, l));
                    previndex = 0 + parseInt(l);
                }
                else{
                    
                    OrgTxt_Fresh = parseInt(previndex) + l;
                   
                    strs.push(str.substr(previndex, l));
                    previndex = parseInt(previndex) + parseInt(l) ; 
                    
                }
                
            }
            else{
                break;
            }
        }
       
        return strs;
    },
      CallForURL: function(AuditID){
          var obj = new Object();
          obj.AuditID = AuditID
          if($("#inpExecuteStatus").is(":checked")){

          }
          else{

          }
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/PythonURLExecution",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
debugger;
                //console.log("1")
            },
            complete: function () {
                //            SchemaData.CheckIsRunning()
            }
        })
      },

    PythonURL: function (AuditID) {
        debugger;

       
        //Live/Test DomainVsUserBased
         // Eshwar's Local  
       //  var PythURL = "http://192.168.0.180:5588/Cronus_crawler/" + AuditID + "";
       
            // Test URL 
        var PythURL = "https://61.16.133.57:5000/Cronus_crawler/" + AuditID + "";
    //    $("#ancpythonurl").attr("href",PythURL)
        
    //     setTimeout(function(){
    //         $('#ancpythonurl')[0].click()
            
    //     },3000)
        $(".RdoHarvest").each(function () {
            if ($(this).prop("checked") == true) {
               debugger;
               $(this).closest("tr").find(".ProgressRule").css('visibility','visible') 
               $(this).closest("tr").find(".ProgressRule").css('display','block')  
              
            }
            else{
                $(this).closest("tr").find(".ProgressRule").css('visibility','hidden') 
                $(this).closest("tr").find(".ProgressRule").css('display','none')  
            }
        })  
        $.ajax({
            type: "GET",
            url: PythURL,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                //console.log("1")
            },
            complete: function () {
                //            SchemaData.CheckIsRunning()
            }
        })
    },
    jsondata: function (SameAgent,CtrlField) {
        var myRows = [];
        if(SameAgent == "1"){
            $.each($("#tblSavedSteps > tbody >  tr"), function(i,obj){
         
                var res = $(obj).find("td")[2]
                
                $(res).text($("#hdnUserAuditID").val())
                })
            var $headers = $("#tblSavedSteps > thead > tr > th");
            var $rows = $("#tblSavedSteps > tbody >  tr").each(function (index) {
    
               $cells = $(this).find("td");
                myRows[index] = {};
                $cells.each(function (cellIndex) {
                    myRows[index][$($headers[cellIndex]).html()] = $(this).text();
                });
    
    
            });
        }
        else if(SameAgent == "Segmentation"){
            $.each($(CtrlField).find(".tblStepsCreations > tbody >  tr"), function(i,obj){
         
                var res = $(obj).find("td")[3]
                $(res).text($("#hdnUserAuditID").val())
                })
                var $headers = $(CtrlField).find(".tblStepsCreations > thead > tr > th.needed");
                var $rows = $(CtrlField).find(".tblStepsCreations > tbody >  tr").each(function (index) {
        
                    $cells = $(this).find("td:not(:first)");
                    myRows[index] = {};
                    $cells.each(function (cellIndex) {
                        if($($headers[cellIndex]).attr("actionattr") == "ValueInput" || $($headers[cellIndex]).attr("actionattr") == "Datapointlabel" ){
                            myRows[index][$($headers[cellIndex]).attr("actionattr")] = $(this).text();
                        }
                        else{
                            myRows[index][$($headers[cellIndex]).html()] = $(this).text();
                        }
                     
                    });
        
        
                });
        }
       else{
        $.each($("#tblStepsCreations > tbody >  tr"), function(i,obj){
         
            var res = $(obj).find("td")[3]
            $(res).text($("#hdnUserAuditID").val())
            })
            var $headers = $("#tblStepsCreations > thead > tr > th.needed");
            var $rows = $("#tblStepsCreations > tbody >  tr").each(function (index) {
    
                $cells = $(this).find("td:not(:first)");
                myRows[index] = {};
                $cells.each(function (cellIndex) {
                    if($($headers[cellIndex]).attr("actionattr") == "ValueInput" || $($headers[cellIndex]).attr("actionattr") == "Datapointlabel" ){
                        myRows[index][$($headers[cellIndex]).attr("actionattr")] = $(this).text();
                    }
                    else{
                        myRows[index][$($headers[cellIndex]).html()] = $(this).text();
                    }
                 
                });
    
    
            });
       }


        var datares = JSON.stringify(myRows);



        return datares;
    },
    EncryptData: function (toencryptjson) {
        var encryptdata = "";
        var obj = new Object();
        obj.JSONData = toencryptjson;
        obj.AgentName = $("#inpAgentName").val().trim()
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/Encryptionasjson",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (response) {

                if (response.result == "1") {
                    var EncryptionData = response.response;
                    $("#hdnSchemaencryption").val(EncryptionData)
                    encryptdata = EncryptionData;
                }
            }
        })
        return encryptdata;
    },

    GetPrimaryRexecutionID: function(ExecutionID){
         var PrimaryExecutionID ;
        var obj = new Object();
        if(ExecutionID != "" && ExecutionID != undefined){
            obj.AuditID = ExecutionID;
        }
        else{
            obj.AuditID = $("#hdnUserAuditID").val();
        }
        
       
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/MongoEncryptedTrainedResult",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
                if(data.response.length > 0){
                    PrimaryExecutionID = data.response[0].PrimaryExecutionID;
                }
                else{
                    PrimaryExecutionID = 0;
                }
                
               
                
            }
        })
        return PrimaryExecutionID;
    },
    GetHarvestedCount: function(ExecutionID){
        var CountData;
       var obj = new Object();
       obj.intExecutionID = ExecutionID;
       obj.intFlag = "17"
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
//$("#spnCountData").text(data.response.split("||")[1]+" / "+data.response.split("||")[0])
CountData = data.response[0][0].Completed + " / " + data.response[0][0].Total ;

               
            }
        })
        return CountData;
    },
    Reexecution: function(PrimaryExecutionID){
        var obj = new Object();
        obj.AuditID = PrimaryExecutionID;
         $.ajax({
             type: "POST",
             url: HostingPath + "/api/UpdateExecution",
             dataType: 'json',
             async: false,
             contentType: "application/json; charset=utf-8",
             data: JSON.stringify(obj),
             success: function (data) {
                 debugger;
      //$("#spnCountData").text(data.response.split("||")[1]+" / "+data.response.split("||")[0])
 
                
             }
         })
         
    },
    DecryptDataOPSchemaFromMongo: function (AuditID,Issimilar) {
        var DecryptDataOPSchemaresult = "";
        var obj = new Object();
        obj.AuditID = AuditID;
        var DataPointLabel = "";
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/MongoEncryptedTrainedResult",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                DecryptDataOPSchemaresult = data.response;
              //  DecryptDataOPSchemaresult = DecryptDataOPSchemaresult[0].Final_schema_output
              if(Issimilar == "1"){
                DataPointLabel =    SchemaData.GetOutputDecrypt(DecryptDataOPSchemaresult,"1")
                
              }
              else if(Issimilar == "2"){
                DataPointLabel =    SchemaData.GetOutputDecrypt(DecryptDataOPSchemaresult,"2")
              }
              else{
                SchemaData.GetOutputDecrypt(DecryptDataOPSchemaresult)
                SchemaData.GetRules();
              }
                
                //  DecryptDataOPSchemaresult = DecryptDataOPSchemaresult[0].Final_schema_output
                //console.log(DecryptDataOPSchemaresult)
            }
        })
return DataPointLabel
    },
    StopURL: function(ExecutionID){
        $(".loadersection").show()

        var ProcessStopped = "";
        var obj = new Object();
        obj.intFlag = "4";
        obj.intExecutionID = ExecutionID;
        obj.intUserID = $("#SpnUserID").text()
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/StopProcess",
            dataType: 'json',
           
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger;
             
             var CompletionStatus = data.response[0][0].CompletionStatus;
             if(CompletionStatus == "1"){
                data.response[1][0]

                var PrimaryExecutionID = data.response[1][0].PrimaryExecutionID;
SchemaData.StopExecution(ExecutionID,PrimaryExecutionID)
$("#StopProcessModal").modal("hide")
$("#ancAgentList").click()
               // SchemaData.CallForURL()
             }
             else{

             }
                ProcessStopped = "1"
            }
        })
        return ProcessStopped;
    },
    StopExecution: function(ExecutionID,PrimaryExecutionID){
     //   alert(PrimaryExecutionID)
        var obj = new Object();
        obj.ExecutionID = ExecutionID;
        obj.PrimaryExecutionID = PrimaryExecutionID;
        obj.UserID = $("#SpnUserID").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/PythonURLExecution",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                alert("Agent Stopped")
                $(".loadersection").hide()

            }
        })
    },

    DecryptDataOPSchemaFromMongoToDownload: function (AuditID,AgentName,type) {
        var DecryptDataOPSchemaresult = "";
        var MultipleAgentOP = ""
        var obj = new Object();
        obj.AuditID = AuditID;

        $.ajax({
            type: "POST",
            url: HostingPath + "/api/MongoEncryptedOutputResult",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                debugger
                DecryptDataOPSchemaresult = data.response;
                debugger
                var res = ""
                if(data.response.length > 1){
                    for(i=0;i<data.response.length;i++){
                        if(res== ""){
res = data.response[i].Final_schema_output;
                        }
                        else{
DecryptDataOPSchemaresult = res + data.response[i].Final_schema_output;
res = DecryptDataOPSchemaresult;
                        }
                      
                    }
                }
                else{
                    DecryptDataOPSchemaresult = DecryptDataOPSchemaresult[0].Final_schema_output;
                }
                    

                
                
                if(type == "Multiple"){
                    MultipleAgentOP=     SchemaData.GetOutputDecryptDownload(DecryptDataOPSchemaresult,AgentName,"Multiple")
                }
                else if(type == "Parsed"){
                    var ParsedOP =  data.response;
                    ParsedOP = ParsedOP[0].Post_Parsing_Output;
                  
                    SchemaData.GetParsedOutput(ParsedOP,AgentName)
                }
                else{
                    SchemaData.GetOutputDecryptDownload(DecryptDataOPSchemaresult,AgentName)
                }
                
              //  SchemaData.GetRules();
                //  DecryptDataOPSchemaresult = DecryptDataOPSchemaresult[0].Final_schema_output
                //console.log(DecryptDataOPSchemaresult)
            }
        })
return MultipleAgentOP
    },


    GetRules: function(){
        var obj = new Object();
        obj.AuditID = $("#hdnUserAuditID").val();

        $.ajax({
            type: "POST",
            url: HostingPath + "/api/GetRules",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                if(data.response.length > 0){

               
                var SavedRule = JSON.parse(data.response[0].jsonresult) 
               var SchemaTable = $("#TblSchemaList > tbody > tr");
               
               $.each(SavedRule, function(i,objSavedRule){
               var RulesSchema = Object.keys(objSavedRule).toString();
               var RuleDetails = objSavedRule[RulesSchema];
                $.each(SchemaTable, function(i,objSchemaTable){
                    debugger;
                   var TblSchemaName = $(objSchemaTable).find("td > .dataCollList").text();
                    if(RulesSchema == TblSchemaName ){
                        $(objSchemaTable).find("td > .viewrule").attr("data-rule",RuleDetails)
                        $(objSchemaTable).find("td > .spnremoverule").attr("data-rule",RuleDetails)
                        $(objSchemaTable).find("td > .spnremoverule").css("display","inline-block")
                        $(objSchemaTable).find("td > .viewrule").css("display","inline-block")
                        $("#tblRule").css("display","inline-table")
                    }
                })

               })
            }
            }
        })
    },
    GetHarvestedStatusID: function(ExecutionID){
        var obj = new Object();
        obj.intFlag = "2";
        obj.intExecutionID = ExecutionID
        var ExecutionStatus = ""
        $.ajax({
          type: "POST",
          url: HostingPath + "/api/SaveParsedResult",
          dataType: 'json',
          async: false,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (data) {
           // console.log(data.response[0][0].StatusID)
            ExecutionStatus = data.response[0][0].StatusID
          }
        })
        return ExecutionStatus;
    },


    GetOutputDecrypt: function (EncryptedData, Issimilar) {
        debugger;
var DataPointList = "";
                    DecryptData = EncryptedData[0].jsonresult;
                    
                    //  var result = DecryptData.substring(1, DecryptData.length - 1);
                    var res = JSON.parse(DecryptData);
                     if(Issimilar == "2"){
                        DataPointList = res;
                    }
              else  if(Issimilar != "1"){
                    $("#TblSchemaList > tbody").empty();
                    $(res).each(function (i) {
                       if(res[i].Actions == "Oncollection"){
                           $("#CollectionListHidden").val(res[i].ValueInput);
                       }
                       if (res[i].Actions == "Get") {
                           if($("#CollectionListHidden").val() == ""){
                            $("#TblSchemaList > tbody").append(`
                            <tr data_collection="${res[i].ValueInput}"><td><input class="rdoCollList" type="checkbox" name="chkdata"></td><td data_value="${res[i].ValueInput}"><span class="dataCollList">${res[i].Datapointlabel}</span> <span class='viewrule' data-rule="" style='display:none' title='View'> <i class='fa fa-eye' style='cursor:pointer'></i>  </span>  <span class='spnremoverule' data-rule="" style='display:none'> <i class='fa fa-trash' style='color: red;font-size: 15px;' title='Remove Rule'></i> </span></td></tr>
                            `);
                           }
                           else{
                            $("#TblSchemaList > tbody").append(`
                            <tr data_collection="${$("#CollectionListHidden").val()}"><td><input class="rdoCollList" type="checkbox" name="chkdata"></td><td data_value="${res[i].ValueInput}"><span class="dataCollList">${res[i].Datapointlabel}</span> <span class='viewrule' data-rule="" style='display:none' title='View'> <i class='fa fa-eye' style='cursor:pointer'></i>  </span>  <span class='spnremoverule' data-rule="" style='display:none'> <i class='fa fa-trash' style='color: red;font-size: 15px;' title='Remove Rule'></i> </span></td></tr>
                            `);
                           }
                        

                          

                        $(".spnremoverule").off().on("click", function(){
                            $(this).attr("data-rule","");
                            $(this).css("display","none");
                            $(this).closest("td").find(".viewrule").css("display","none");
                            $(this).closest("td").find(".viewrule").attr("data-rule","");
                        })
                        $(".viewrule").off().on("click", function(){
                           
                           var SavedRule = JSON.parse($(this).attr("data-rule"))
                           $("#TblSchemaList > tbody > tr").find("td > input").prop("checked",false) ;
                           $(this).closest("tr").find(".rdoCollList").prop('checked', true);
                           $(this).closest("tr").find(".rdoCollList").change()
                           $.each(SavedRule, function(i,objSavedRule){
                            debugger;
                            var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                            var Condition = objSavedRule.condition.split("||||")[0];
                            var ValueInpt = objSavedRule.condition.split("||||")[1]
                            $("#tblRule > tbody").append(`
                            <tr> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>${Condition}</label></td> <td><label class ='condition'>${ValueInpt}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                            `)
                           })
                           $(".incdelete").off().on("click", function () {
                            debugger;
                            var CtrlPrev = $(this).closest("tr");
                            //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                            //    CtrlPrev.prev().remove()
                            //    $(this).closest("tr").remove()
                            //}
                            if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                                CtrlPrev.next().remove()
                                $(this).closest("tr").remove()
                            }
        
                            else {
                                $(this).closest("tr").remove()
                            }
                            $(".ulParsedCase > li").remove()
                            if ($("#tblRule > tbody > tr").length > 0) {
                                var Control = $("#tblRule > tbody > tr");
                                $.each(Control, function (i, objIndexRule) {
                                    var Index = parseInt(i) + 1;
                                    $(objIndexRule).find("td > .ruleindex").text(Index)
                                })
        
                                SchemaData.RuleDefine(Control);
                            }
                        })


                        })

                        $(".rdoCollList").off().on("change", function () {
                            debugger;
                            if ($(this).prop("checked") == true) {
                                $("#TblSchemaList > tbody > tr").find("td > input").prop("checked",false)
                                $(this).prop("checked",true)
                                if ($(this).prop("checked") == true) {
                                    $("#tblRule > tbody").empty();
                                  var data_collection =  $(this).closest("tr").attr("data_collection")  
                                  var data_value =  $(this).closest("tr").find(".dataCollList").closest("td").attr("data_value");
                                  if(data_collection == data_value){
                                    var data_List = data_collection; 
                                  }
                                  else{
                                    var data_List = data_collection + data_value ; 
                                  }
                                  
    
                                  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                                    var activeTab = tabs[0];
                            
                                    var XpathData = data_List
                                    //  var CollectionData = $(".collectionlist").text().trim();
                                    var CollectionData = data_collection
                                    if (XpathData != "") {
                                        var Xpathelements = data_value;
                                        $("#spnhrefdetails").text(activeTab.url)
                                        chrome.tabs.sendMessage(activeTab.id, { type: "Checkxpathelements", Xpathelements: Xpathelements, CollectionData: CollectionData,parsing:"parsing", hrefDetails: $("#spnhrefdetails").text() });
                                    }
                            
                            
                            
                                })   
                                }
                            }
                            else{
                                $("#TblSchemaList > tbody > tr").find("td > input").prop("checked",false)
                             //   $(this).prop("checked",true);
                           
                            }
                            
                           
                        })
                       } 
                       var SchemaListSpanTag = $("#TblSchemaList > tbody > tr");
                       $("#drpSchemaField").empty()
                       $("#drpSchemaField").append(`<option> -- Select Schema Field -- </option>`)
                       $.each(SchemaListSpanTag, function(i,objSpan){
                           var SchemaName = $(objSpan).find("td > span.dataCollList").text().trim();
                           $("#drpSchemaField").append(`
                           <option>${SchemaName}</option>
                           `)
                       })
                    })
                }
               
                else{
                    var Datapoint = [];
                 $("#hdnProgressCount").val($(res)[0]["Agent Code"]) 
                    $(res).each(function (i) {
                        if (res[i].Actions == "Get" || res[i].Actions == "Initialize" ) {
                            debugger
                            Datapoint.push(res[i].Datapointlabel)
                        }
                    })
                    DataPointList = Datapoint.toString();
                }
                   return DataPointList;
    },

    
    GetOutputDecryptDownload: function (EncryptedData,AgentName,IsParsing) {
        debugger;
        var DecryptData = "";
       // try {
        var res = EncryptedData.split('#||#');
        res = res[1];
            var obj = new Object();
            obj.JSONData = res;
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/GetEncryptOutputResult",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger;
                    DecryptData = data.response;
                    console.log(DecryptData)
                    var SplitterData = JSON.parse(DecryptData);
                  var Splitted32000 =  SchemaData.Morethan32000(SplitterData);
                    if(IsParsing == "1"){

                        
                    }
                    else if(IsParsing == "Multiple"){
                      
                      // console.log(newarr) 
                    }
                    else{
                        var arr = []
                        $.each($("#drpSchemaAssign > option"), function(i,obj){
                            arr.push($(obj).text())
                        })
                       // SchemaData.ConvertToCSVDownload(Splitted32000,AgentName,arr);
                       var newarr = []
                       $.each(Splitted32000, function(i,objAdd){
                                delete objAdd['Is_detail_extraction_done'];
                                newarr.push(objAdd)
                       })
                       console.log(newarr)
                        SchemaData.APIDownload(newarr,AgentName)
                    }
                    
                    //  var result = DecryptData.substring(1, DecryptData.length - 1);
                   
                   

                }
            })
            return DecryptData
      //  }
    },
    GetParsedOutput: function (ParsedData,AgentName) {
        debugger;
      
        
        var Splitted32000 =  SchemaData.Morethan32000(ParsedData);
        var arr = []
        $.each($("#drpSchemaAssign > option"), function(i,obj){
            arr.push($(obj).text())
        })
       // SchemaData.ConvertToCSVDownload(Splitted32000,AgentName,arr);
       var newarr = []
       $.each(Splitted32000, function(i,objAdd){
                delete objAdd['Is_detail_extraction_done'];
                newarr.push(objAdd)
       })
       console.log(newarr)
        SchemaData.APIDownload(newarr,AgentName)

    },
    APIDownload: function(Splitted32000,AgentName){
      debugger;
       var obj = new Object();
     
       obj.JSONData = JSON.stringify(Splitted32000)
       $.ajax({
        type: "POST",
        url: HostingPath + "/api/csvdownload",
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: function(data){
debugger;
SchemaData.downloadCSV(data.response,AgentName+".csv")
        }
       })
    },
    ConvertToCSVDownload: function (JSONString,AgentName,arrHeader) {
        var arrJsonData = typeof JSONString != 'object' ? JSON.parse(JSONString) : JSONString;
       // var arrJsonData = typeof JSONString != 'object' ? JSON.parse(JSONString) : JSONString;
        var ReportName = AgentName;
        var CSV = '';
        var isShowHeader = true;
        var MaximumHeader = "";
        var DataIndex = "0";
        var ArrKeys = "";
        var Dataarr = "";
        var res = "";
        var DataTotalValues = "";
        var Final = []
        var AddSchemaHeader = arrJsonData[0];
        //  var Framearr = []
        //   $.each(AddSchemaHeader, function(i,obj){
        //       $.each(arrHeader, function(ik,addobjindex){
        //           if(addobjindex.includes(i)){
        //             if(arrHeader.indexOf(i) == "-1"){
        //                 arrHeader.splice(ik, 0, i);
        //                // return false
        //             }
        //             else{
    
        //             }
        //           }
                 
        //       })
        //       console.log(arrHeader)
              
  
              
        //   })

        if (isShowHeader) {
            var row = "";
            for (var index in arrJsonData[0]) {
                if(index != "Is_detail_extraction_done"){
                    row += index + ',';
                }
                
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrJsonData.length; i++) {
            var row = "";

            for (var index in arrJsonData[i]) {
                if(index != "Is_detail_extraction_done"){
                    row += '"' + arrJsonData[i][index].replace(/\"/g, "\"\"") + '",';
                }
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            alert("Invalid JsonData");
            return;
        }
        var fileName =ReportName.replace(/ /g, "_");
       
        var uri = 'Data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    preferredOrder: function (obj, order) {
        var newObject = {};
        var FinallyOrdered = [];
        $.each(obj, function(i,objprop){
        for(var i = 0; i < order.length; i++) {
      
                if(objprop.hasOwnProperty(order[i])) {
                    newObject[order[i]] = objprop[order[i]];
                }
               
        }
        FinallyOrdered.push(newObject)
        newObject = {};
    })
        return FinallyOrdered;
    },

    ConvertToCSV: function (JSONString,AgentName,arrHeader) {   
        var arrJsonData = typeof JSONString != 'object' ? JSON.parse(JSONString) : JSONString;
    //     var AddSchemaHeader = arrJsonData[0];
    //   //  var Framearr = []
    //     $.each(AddSchemaHeader, function(i,obj){
    //         $.each(arrHeader, function(ik,addobjindex){
    //             if(obj.includes == "false"){
    //                 arrHeader.splice(ik, 0, obj);
    //             }
    //             else{

    //             }
    //         })
    //         console.log(arrHeader)
            

            
    //     })
      var Orderred =  SchemaData.preferredOrder(arrJsonData,arrHeader)
      console.log(Orderred);
        var ReportName =  AgentName;
        var CSV = '';
        var isShowHeader = true;
      
        if (isShowHeader) {
            var row = "";
            for (var index in Orderred[0]) {
                if(index != "Is_detail_extraction_done"){
                row += index+ ',';
                }
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }

        for (var i = 0; i < Orderred.length; i++) {
            var row = "";
            for (var index in Orderred[i]) {
                if(index != "Is_detail_extraction_done"){
                row += '"' + Orderred[i][index].replace(/\"/g, "\"\"") + '",';
                }
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            alert("Invalid JsonData");
            return;
        }
        var fileName = ReportName.replace(/ /g, "_");
        var uri = 'Data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    downloadCSV: function (csv, filename) {
        var csvFile;
        var downloadLink;
        csvFile = new Blob([csv], { type: "text/csv;charset=utf-8" });
        downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        $(".loadersection").css('display','none')
    },
    Headers: function (list, selector) {
        var columns = [];
        var header = $('<tr/>');

        for (var i = 0; i < list.length; i++) {
            var row = list[i];

            for (var k in row) {
                if ($.inArray(k, columns) == -1) {
                    columns.push(k);

                    // Creating the header
                    if (k == "Parameter" || k == "ValueInput" || k == "Att-Value" || k == "Datapointlabel" || k == "Remove_datapoint_index") {
                        header.append($('<th/>').html(k));
                    }
                    else {
                        header.append($('<th style="display:none"/>').html(k));
                    }

                }
            }
        }

        // Appending the header to the table
        $(selector).append(header);
        return columns;
    },

    constructTable: function (list, selector) {

        // Getting the all column names
        var cols = SchemaData.Headers(list, selector);

        // Traversing the JSON data
        for (var i = 3; i < list.length; i++) {
            var row = $('<tr/>');
            for (var colIndex = 0; colIndex < cols.length; colIndex++) {
                if (cols[colIndex] == "Parameter" || cols[colIndex] == "ValueInput" || cols[colIndex] == "Datapointlabel" || cols[colIndex] == "Att-Value" || cols[colIndex] == "Remove_datapoint_index") {
                    var val = list[i][cols[colIndex]];
                    if (val == null) val = "";
                    row.append($('<td style="display:table-cell"/>').html(val));
                }
                else {
                    var val = list[i][cols[colIndex]];
                    if (val == null) val = "";
                    row.append($('<td style="display:none"/>').html(val));
                }


                // If there is any key, which is matching
                // with the column name

            }

            // Adding each row to the table
            $(selector).append(row);

        }
    },

    InsertedNot: function () {
        var obj = new Object();
        obj.intFlag = "4";
        obj.intRecordID = "0";
        obj.intIsMongoDBInserted = "1";
        obj.intExecutionID = $("#hdnUserAuditID").val();
        obj.intUserID = $("#SpnUserID").text().trim()
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/InsertDetails",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger
                if(data.response[0][0].RESULT == "1"){

                }

               SchemaData.GetAgentURLsListForExecution($("#hdnUserAuditID").val())
                //console.log(data)

            }
        })

    },

    GetAgentURLsListForExecution: function(intExecutionID){
        var obj = new Object();
       
        obj.intExecutionID =  intExecutionID.toString()
        obj.PrimaryExecutionID = $("#hdnProgressCount").val() == "" ? "0" : $("#hdnProgressCount").val();
        obj.ExtractionURL = $("#spnExtractionURL").text() == "" ? $("#spnExtractionURLFirst").text() : $("#spnExtractionURL").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/GetAgentURLsListForExecution",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger;
                var ExecutionID = data.response["ExecutionID"];
                var res = data.response["URLList"][0].URLList;
                var arrURLList = []
                $.each(res, function(i,obj){
arrURLList.push(obj[$("#spnExtractionURL").text() == "" ? $("#spnExtractionURLFirst").text() : $("#spnExtractionURL").text()])
                })
                if(res == undefined){
                    var URLList =  data.response["URLList"][0].Agent_URL
                }
                else{
                    var URLList =  arrURLList.toString();
                }
              
                var PrimaryExecutionID = data.response["PrimaryExecutionID"];
                var TotalCount =data.response["URLList"][0].URLCount
                if(TotalCount == undefined){
                  TotalCount = "1"
                }
            
                SchemaData.CallForProcessing(ExecutionID,URLList,PrimaryExecutionID,TotalCount);
            }
        })
        
    },
    CallForProcessing: function(ExecutionID,URLList,PrimaryExecutionID,TotalCount){
        var obj = new Object();
        obj.intFlag = "1";
        obj.intExecutionID = ExecutionID;
        obj.strAgentURLList  = URLList;
        obj.intPrimaryExecutionID  = PrimaryExecutionID;
        obj.intTotalURLs = TotalCount;
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SubmitAgentURLsListforProcessing",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger;
                if(data.response[0][0].RESULT == "1"){
                    SchemaData.InsertandCallforProcessing(ExecutionID,TotalCount)
                }     
            }
        })
    },
    InsertandCallforProcessing: function(ExecutionID,TotalCount){
        var obj = new Object();
        obj.intFlag = "2";
        obj.intExecutionID = ExecutionID;
        obj.intTotalURLs = TotalCount;
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SubmitAgentURLsListforProcessing",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger;
                if($("#inpEditType").val() == "1"){
               //    SchemaData.UpdateorSaveSchedule("2", $("#divListingAgent").find("#tblsavedsteps").attr("data-urlschemaid"),"Reschedule");
                 //   SchemaData.UpdateorSaveSchedule("",$("#divListingAgent").find("#tblsavedsteps").attr("data-urlschemaid"),"Reschedule")
                }
               
            }
        })
    },
    MongoDBData: function (encyptjsondata) {
        if($("#hdnProgressCount").val() != ""){
            SchemaData.Reexecution($("#hdnProgressCount").val())
        }


        var obj = new Object();

        var objencryption = {
            "ExecutionID": $("#hdnUserAuditID").val(),
            "record_id": $("#hdnRecordID").val(),
            "jsonresult": encyptjsondata,
            "PrimaryExecutionID" : $("#hdnProgressCount").val() == "" ? "0" : $("#hdnProgressCount").val(),
            "Agent_URL": $("#inpMainURL").val(),
            "Final_Parsing_Json_Output":"",
            "ExecutionURL":$("#spnExtractionURL").text() == "" ? $("#spnExtractionURLFirst").text() :  $("#spnExtractionURL").text()
        }

        obj.JSONData = objencryption


        try {
            $.ajax({
                type: "POST",
                url: HostingPath + "/addDetailsEncryption",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                async: false,
                success: function (data) {
                    //console.log(data)
                    //  SchemaData.InsertedNot();
                },
                error: function () {
                    alert("MongoDB Not Inserted")
                }
            })
        }
        catch (err) {
            alert(err, "MongoDB Data Not Inserted")
        }

    },
    
    CheckforInsertionorUpdate: function(){
        var obj = new Object();
        var bool;
        obj.AuditID = $("#hdnUserAuditID").val()
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/CheckInsertion",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger;
               bool = data.response;
            }
        })
        return bool;
    },
    DeletRuleinMongo: function(){
        var obj = new Object();
       
        obj.AuditID = $("#hdnUserAuditID").val()
       
        $.ajax({
            type: "POST",
            url: HostingPath + "/DeleteRule",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                //console.log(data)
                //  SchemaData.InsertedNot();
            },
            error: function () {
                alert("MongoDB Not Inserted")
            }
        })
    },
    InsertRuleinMongo: function(Jsondatarule){
        var obj = new Object();
         
        var objencryption = {
            "ExecutionID": $("#hdnUserAuditID").val(),
            "jsonresult": JSON.stringify(Jsondatarule),
          

        }
      
        obj.AuditID = $("#hdnUserAuditID").val()

        obj.JSONData = objencryption;

       
       

        try {
            $.ajax({
                type: "POST",
                url: HostingPath + "/addRules",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                async: false,
                success: function (data) {
                    //console.log(data)
                    //  SchemaData.InsertedNot();
                 
                  SchemaData.UpdateParsingStatus($("#hdnUserAuditID").val());
                },
                error: function () {
                    alert("MongoDB Not Inserted")
                }
            })
        }
        catch (err) {
            alert(err, "MongoDB Data Not Inserted")
        }
    },
    UpdateParsingStatus: function(ExecutionID){
        var obj = new Object();
        obj.intFlag = "1";
        obj.intExecutionID = ExecutionID;
        obj.intIsParsingRuleAdded = "1";
        obj.intIsParsingRuleApplied = "0";
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveParsedResult",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger;
                if(data.response[0][0].RESULT == "1"){
                    SchemaData.ParsingExecution()
                }

                    
            }
        })
    },
      ParsingExecution: function(){
        var obj = new Object();
        obj.ExecutionID = $("#hdnUserAuditID").val();
    $.ajax({
        type: "POST",
        url: HostingPath1 + "/api/Parsing",
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: function (data) {
            debugger;

        }
    })
      },
       


    CheckforCompletionStatus: function(ExecutionID){
      var obj = new Object();
       obj.intExecutionID = ExecutionID;
       obj.intFlag = 8;
       $.ajax({
        type: "POST",
        url: HostingPath + "/api/SaveIntermediateSchemaFinal",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        async: false,
        success: function (data) {
debugger;
var StatusID = data.response[0][0].StatusID
if(StatusID == "3"){
    var ValueData = SchemaData.ApplyRule(ExecutionID,"Test"); 
    var FinalData = SchemaData.ApplyRuleJSON1(ValueData,ExecutionID,"Test","ShowOnly");
    SchemaData.InsertParsedOutput(ExecutionID,FinalData)
   
}
        }
    })
    },

    InsertParsedOutput: function(ExecutionID,FinalData){
        var obj = new Object();
         
        var objparsedencryption = {
            "ExecutionID": ExecutionID,
            "Final_Parsing_Json_Output": JSON.stringify(FinalData),
        }
        obj.ParsedOutput = objparsedencryption
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/MongoParsedOutput",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            async: false,
            success: function (data) {
                debugger
            }
        })
    },
    MultiStartWord: function (StartWord) {
        debugger;
        var LastItem = $("#tblRule > tbody > tr:last");
        // if($(LastItem).find("td >label.drpconditionvalue").text() == "Between Words"){
        //     $("#drpParsingList").css('display','flex')
        // }
        // else{
        //     $("#drpParsingList").css('display','none')
        // }
        $(".ulParsedCase > li").remove();
        $(".ulParsedCase > ul").remove()
        
        if ($("#tblRule > tbody > tr").length > 0) {
            if ($("#tblRule > tbody > tr").length > 0) {
                var Control = $("#tblRule > tbody > tr");
                $.each(Control, function (i, objIndexRule) {
                    var Index = parseInt(i) + 1;
                    $(objIndexRule).find("td > .ruleindex").text(Index)
                })

                SchemaData.RuleDefine(Control , StartWord);
            }
            var ConditionList = JSON.parse($("#hdnParsingCondition").val());
          //  var HeaderList = $("#ddlSchemaAssign").val();
          var HeaderList;
             var ctrl = $("#TblSchemaList > tbody > tr");

             $.each(ctrl, function(i,objctrl){
                 if($(objctrl).find("td > input").is(":checked")){
                    HeaderList =  $(objctrl).find("td > .dataCollList").text().trim()
                 }
             })
             Rules[HeaderList] = ConditionList;
           // Rules[HeaderList] = "value3";

         // SchemaData.ReadCSVFile();
         
          
             console.log(Rules)

             $("#hdnRules").val(JSON.stringify(Rules))
          //  localStorage.setItem("Rules", JSON.stringify(Rules));
          
            SchemaData.segregation(ConditionList , StartWord);

            SchemaData.OldValues();
           
        }
        else {
            SchemaData.ShowPanel("error", "Please add rule")
        } 

    },
    RuleDefine: function (Control,StartWord, CheckFinal) {
        var Condition = "";
        var ArrConditionList = [];
        var PrevruleIndex = "";
        var FinalObjRule = ""
        $.each(Control, function (i, obj) {
            debugger;
           
            if(PrevruleIndex == $(obj).attr("data-samerule")){
                
                
                    var objlist = {
                        "Parsingcondition": $(obj).find(".drpconditionvalue").text() + "||||" + $(obj).find(".condition").text(),
                       
                    }
                    FinalObjRule = Object.assign(FinalObjRule,objlist);

            }
            else{
                if($(obj).find(".drpconditionvalue").text() == "Between Words"){
                    if(StartWord != "" && StartWord != undefined){
                        //     var LastItem = $("#tblRule > tbody > tr:last");
                        // if($(LastItem).find("td >label.drpconditionvalue").text() == "Between Words"){
                        //     var NewParsing = $(LastItem).find("td >label.condition").text().split("|")
                        //     var newText = NewParsing[0] + " " + StartWord + "|" + NewParsing[1];  
                        //     $(LastItem).find("td >label.condition").text(newText)
                        // }
                        var NewParsing = $(obj).find(".condition").text().split("|")
                        var newText = NewParsing[0] + " " + StartWord + "|" + NewParsing[1];
                        var objlist = {
                            "condition": $(obj).find(".drpconditionvalue").text() + "||||" + newText ,
                            "includesexeculdes":$(obj).find(".condition").attr("data-includes")
                        }
                    }
                    else{
                        var objlist = {
                            "condition": $(obj).find(".drpconditionvalue").text() + "||||" + $(obj).find(".condition").text(),
                            "includesexeculdes":$(obj).find(".condition").attr("data-includes")
                        }
                    }
                  
                 }
                 else{
                    var objlist = {
                        "condition": $(obj).find(".drpconditionvalue").text() + "||||" + $(obj).find(".condition").text()
                    }
                 }
                 PrevruleIndex = $(obj).attr("data-samerule");
                 FinalObjRule = Object.assign(objlist);
              ArrConditionList.push(FinalObjRule) 
                
            }
 
           
            // Condition = $(obj).find(".drpconditionvalue").text() + "||" + $(obj).find(".condition").text();
           
        })
       // ArrConditionList.push(FinalObjRule)
        console.log(ArrConditionList)
        if (CheckFinal != "FinalSave") {
            $("#hdnParsingCondition").val(JSON.stringify(ArrConditionList))
        }

    },
    segregationOld: function (Rule , NewStartWord) {
        var ConditionEnd = true;
      
        $.each(Rule, function (i, objRule) {
            ConditionEnd = false;
            var Condition = objRule.condition.split("||||")[0];
            var ParsingCdn = objRule.condition.split("||||")[0];
            var DrpparsingField =  $("#drpPrasingField > option");
            $.each(DrpparsingField, function(i,objParsingValue){
                 if($(objParsingValue).text().trim() == Condition){
                    Condition = "NameParsing"
                 }
            })

            var IndexSelection = objRule.condition.split("||||")[1];
            if(objRule.hasOwnProperty("includesexeculdes")){
                var IncludesStarts = objRule.includesexeculdes.split("|")[0].trim();
                var IncludesEnds = objRule.includesexeculdes.split("|")[1].trim();
            }
            if (Condition == "Index") {
                var arrconditionlist = [];
                $("#drpDataParsing option[value='Index']").remove();
                var CtrlData = $("#tblParsedData > tbody > tr");
                debugger;
                $.each(CtrlData, function (i, objIndexData) {
                    // if ($(".ulParsedCase > li").length > 0) {
                    //     var Control = $(".ulParsedCase > li");
                    // }
                    // else {
                    //     var Control = $(".ulparse > li");
                    // }
                    var CtrlText = "";
                    $.each(IndexSelection.split(","), function(i,objIndex){
                     if(i == 0){
                         CtrlText = $(objIndexData).find("td")[objIndex];
                        CtrlText = $(CtrlText).text().trim()
                     }
                     else{
                         var res = $(objIndexData).find("td")[objIndex];

                             CtrlText = CtrlText + " " + $(res).text().trim(); 
                           //  CtrlText = $(res).text().trim()
                     }

                    })
                    // var CtrlText = $(objIndexData).find("td")[IndexSelection];
                    // CtrlText = $(CtrlText).text().trim()
                    arrconditionlist.push(CtrlText)

                })

                $(".ulParsedCase > li").remove();
                $.each(arrconditionlist, function (i, objctrl) {
                    var OriginalText = objctrl.trim();
                    $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                })
                $("#drpSelectIndex").val("-1");
                $("#drpSelectIndex").empty()
                $(".drpSelectIndex").css("display", "none")
                $("#tblParsedData > thead > tr").remove()
                $("#tblParsedData > tbody > tr").remove()
            }
            else if(Condition == "Position_Index"){

            }
            else if (Condition == "Split") {
                $("#drpSelectIndex").empty()
               // $("#drpSelectIndex").append('<option value="-1">--Select Index --</option>');

                var Delimiter = objRule.condition.split("||||")[1];
                Delimiter = Delimiter == "space" ? " " : Delimiter;
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }
                $("#drpDataParsing option[value='Index']").remove();
                $("#drpDataParsing").append('<option value="Index">Index</option>');


                // var Control = $(".ulparse > li");
                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).text().trim())
                })
                if ($(".ulParsedCase > li").length > 0) {
                    $(".ulParsedCase > li").remove();
                }

                $("#tblParsedData > thead > tr").remove()
                $("#tblParsedData > tbody > tr").remove()
                $.each(arrconditionlist, function (i, objctrl) {

                    //   if (objctrl.trim().includes(Delimiter) == true) {
                    var CheckLength = objctrl.trim().split(Delimiter).length;
                    var SplittedWords = objctrl.trim().split(Delimiter);

                    if (CheckLength > 0) {
                        //   $("#tblParsedData").empty()
                        $.each(SplittedWords, function (ij, objSplit) {
                            var res = $("#tblParsedData > tbody > tr")[i];
                            var reshead = $("#tblParsedData > thead > tr");
                            var reslen = $(reshead).find("th")[ij];
                            if (reslen == undefined) {
                                reslen = "";
                            }
                            else {
                                var restext = $(reshead).find("th")[ij]
                                reslen = $(restext).text();
                            }
                            if ($(reshead).length == 0) {
                                $("#tblParsedData > thead").append(`
                                    <tr> <th>${ij}</th> </tr>
                                    `)
                            }
                            else if (reslen != ij) {
                                $("#tblParsedData > thead > tr").append(`
                                     <th>${ij} </th>
                                    `)
                            }
                            if ($(res).length > 0) {

                                $(res).append(`
                                    <td>${objSplit} </td>
                                    `)
                            }
                            else {

                                $("#tblParsedData > tbody").append(`
                                    <tr> <td>${objSplit} </td> </tr>
                                    `)
                            }

                        })
                        //var SplittedCase = objctrl.trim().split(Delimiter)[1];
                        //$(".ulParsedCase").append(`
                        //<li>${SplittedCase}</li>
                        //`)



                    }
                    else {
                        var OriginalText = objctrl.trim();
                        $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                    }

                    //  }
                    //else {
                    //    var OriginalText = objctrl.trim();
                    //    $(".ulParsedCase").append(`
                    //        <li>${OriginalText}</li>
                    //        `)
                    //}
                })

                ConditionEnd = true;


            }
            else if (Condition == "Replace") {
                var Delimiter = objRule.condition.split("||||")[1];
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).text().trim())
                })
                $(".ulParsedCase > li").remove();
                if (Delimiter.split("||").length > 1) {
                    var Delimiterlen = Delimiter.split("||");
                    $.each(Delimiterlen, function (i, objDelimiter) {
                        var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                        OrgDelimiter = OrgDelimiter.split("||")[i];
                        var ReplaceCharText = Delimiter.split("|RW|")[1];
                        if (i == 0) {
                            $.each(arrconditionlist, function (i, objctrl) {

                                if (objctrl.trim().includes(OrgDelimiter) == true) {
                                    var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                    var SplittedCase = ReplacedText;
                                    $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                                }
                                else {
                                    var OriginalText = objctrl.trim();
                                    $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                                }


                            })
                            var arrreplacedconditionlist = [];
                            var Control = $(".ulParsedCase > li");
                            $.each(Control, function (i, obj) {
                                arrreplacedconditionlist.push($(obj).text().trim())
                            })
                        }
                        else {
                            var Control = $(".ulParsedCase > li");
                            arrreplacedconditionlist = [];
                            $.each(Control, function (i, obj) {
                                arrreplacedconditionlist.push($(obj).text().trim())
                            })
                            $(".ulParsedCase > li").remove()
                            $.each(arrreplacedconditionlist, function (i, objctrl) {

                                if (objctrl.trim().includes(OrgDelimiter) == true) {
                                    var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                    var SplittedCase = ReplacedText;
                                    $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                                }
                                else {
                                    var OriginalText = objctrl.trim();
                                    $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                                }


                            })


                        }



                    })
                }
                else {
                   
                    $.each(arrconditionlist, function (i, objctrl) {
                        var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                        var ReplaceCharText = Delimiter.split("|RW|")[1];
                        if (objctrl.trim().includes(OrgDelimiter) == true) {
                            var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                            var SplittedCase = ReplacedText;
                            $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                        }
                        // else {
                        //     var OriginalText = objctrl.trim();
                        //     $(".ulParsedCase").append(`
                        //     <li>${OriginalText}</li>
                        //     `)
                        // }
                        else {                           
                            var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                            var ReplacedText = OrgDelimiter.split("|")
                            if(ReplacedText.length > 1){
                                $.each(ReplacedText, function (i,ReplacedText) {
                                    debugger;
                                    if( $("#txtparingresult").val() == ""){
                                        if (objctrl.trim().includes(ReplacedText.trim()) == true) {
                                            var ReplacedText = objctrl.trim().replace(ReplacedText.trim(), ReplaceCharText);
                                            // $(".ulParsedCase").append(`
                                            // <li>${ReplacedText}</li>
                                            // `)
                                            $("#txtparingresult").val(ReplacedText)
                                        }
                                    }
                                    else{
                                        if ($("#txtparingresult").val().includes(ReplacedText.trim()) == true) {
                                            var ReplacedText = $("#txtparingresult").val().replace(ReplacedText.trim(), ReplaceCharText);                                          
                                            $("#txtparingresult").val(ReplacedText)
                                        } 
                                    }
                                  
                                })
                                $(".ulParsedCase").append(`
                                         <li>${$("#txtparingresult").val()}</li>
                                          `)
                                          $("#txtparingresult").val("")
                            }
                           else{
                            if (objctrl.trim().includes(OrgDelimiter) == true) {
                                var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                var SplittedCase = ReplacedText;
                                $(".ulParsedCase").append(`
                                <li>${SplittedCase}</li>
                                `)
                            }
                           }
                        }


                    })
                }

                ConditionEnd = true;
            }
            else if(Condition == "Email"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                })

                ConditionEnd = true;

            }
            else if(Condition == "URL"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                })

                ConditionEnd = true;

            }
            else if(Condition == "PhoneNumber"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/gi;
                    var regexpattern1 =  /\([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi;
                    var regexpattern2 =  /[0-9]{3}.[0-9]{3}.[0-9]{4}/gi;
                    var arrpattern = ["/[0-9]{3}-[0-9]{3}-[0-9]{4}/gi","/([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi"]
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
               
                      if(OriginalText == ""){
                        OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern1)
                        if(OriginalText != ""){
                            $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                           // return false
                        }
                        else{
                            OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern2)
                            $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                        }
                      }
                      else{
                        $(".ulParsedCase").append(`
                        <li>${OriginalText}</li>
                        `)
                       //   return false;

                      }
                     
                  
                    // $.each(arrpattern, function(i,objPattern){
                    //     regexpattern = objPattern;
                    //     OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                    //     if(OriginalText != ""){
                    //         return false
                    //     }
                    // })
                  
                    
                })

                ConditionEnd = true;

            }
            else if(Condition == "Zipcode"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /\d{5}(?:[-\s]\d{4})?/gi;
                  
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                   
                  
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                })

                ConditionEnd = true;

            }
            else if(Condition == "NameParsing"){
                debugger
                var RemovingParsingCase = "";
               if(objRule.hasOwnProperty("Parsingcondition")){
              var ActionType =  objRule["Parsingcondition"].split("||||")[0];
              var RemoveParsingField = objRule["Parsingcondition"].split("||||")[1];
              RemovingParsingCase = {
                  [ActionType]:RemoveParsingField
              }
               }
               
                var TestNames = [];
               
                if ($(".ulParsedCase > li").length > 0) {
                    var Names = $(".ulParsedCase > li").text()
                    alert(Names)
                    TestNames.push(Names)
                }
                else if($("#tabelCollectionList > tbody > tr").length > 0){
                var ParsedCtrl = $("#tabelCollectionList > tbody > tr");
                $.each(ParsedCtrl, function(i,objParsedCtrl){
                    var Names = $(objParsedCtrl).find("td > span.dataCollList").text().trim()
                    Names = Names.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                    TestNames.push(Names)
                })
                }

                

                var arrconditionlist = [];
//               var NameParsingData = SchemaData.NameParsingAPI(TestNames,"",ParsingCdn,RemovingParsingCase);  
               
                for (var i = 0; i < TestNames.length; i++) {
                    var parsedName = {
                        // title: '', first: '', middle: '', last: '', nick: '', suffix: '', error: [], fullname: ''
                        [ParsingCdn]:''
                     };
                parsedName = SchemaData.parseFullName(TestNames[i].toString(), 'all', 1, 0, 1,parsedName);
                arrconditionlist.push(parsedName[ParsingCdn])
               
                }
                    // $("#tblNameParsed > tbody").append(`
                    // <tr> <td>${parsedName.fullname}</td> <td>${parsedName.first}</td> <td>${parsedName.middle}</td> <td>${parsedName.Title == undefined ? "" : parsedName.Title}</td>  </tr>
                    // `)
                    $(".ulParsedCase > li").remove();
                    $.each(arrconditionlist, function (i, objctrl) {
                        // var OriginalText = objctrl[ParsingCdn].trim();
                        var OriginalText = objctrl.trim();
                        $(".ulParsedCase").append(`
                                <li>${OriginalText}</li>
                                `)
                    })

            }
            else if(Condition == "City"){
             var CityList =   SchemaData.CityandState();
             
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }
                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })

                $.each(arrconditionlist, function (i, objctrl) {
                    var CheckCityFound = "";
                    $.each(CityList, function(i,objCity){
                         CheckCityFound = SchemaData.find(objctrl,objCity)
                        if(CheckCityFound.length > 0){
                            return false;
                        }
                    })
                    if(CheckCityFound.length > 0){
                        OriginalText = CheckCityFound.toString();
                     $(".ulParsedCase").append(`
                     <li>${OriginalText}</li>
                     `)
                    }
                    else{
                     OriginalText = "";
                     $(".ulParsedCase").append(`
                     <li>${OriginalText}</li>
                     `)
                    }
                   
                  
                })

                ConditionEnd = true;
                
             
            }
            else if(Condition == "State"){
                var StateList =   SchemaData.CityandState();
                StateList = Object.keys(StateList);
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }
                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })

                $.each(arrconditionlist, function (i, objctrl) {
                    $.each(StateList, function(i,objState){
                        CheckStateFound = SchemaData.find(objctrl,objState)
                       if(CheckStateFound.length > 0){
                           return false;
                       }
                   })
                   if(CheckStateFound.length > 0){
                       OriginalText = CheckStateFound.toString();
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                   }
                   else{
                    OriginalText = "";
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                   }
                })

            }
            else if(Condition == "StartsWith"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })

                var StartWord = IndexSelection.split("|")[0];
                var EndWord = IndexSelection.split("|")[1]
                var StrWord = arrconditionlist.toString();
              
                var FirstWord = StrWord.indexOf(StartWord.trim());
                var lastword = StrWord.indexOf(EndWord.trim());
                if(FirstWord == "-1" || lastword == "-1"){
                    var OriginalText =    StrWord
                }
               else if(FirstWord > lastword){
                    var OriginalText =     StrWord.substr(FirstWord,LLword)
                }
                else{
                    var LLword =  lastword - FirstWord;
                    var OrgLLword = parseInt(EndWord.length) + 1;
                        LLword = parseInt(OrgLLword) + parseInt(LLword)
                      var OriginalText =     StrWord.substr(FirstWord,LLword)
                }
             
            // $(".ulParsedCase").append(`
            // <li>${OriginalText}</li>
            // `)
            function countInstances(string, word) {
                return string.split(word).length - 1;
             }
             var arrconditionlist = [];
             var temp = "";
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                   debugger;
                    temp = objctrl
                })
             
             var CtrlIndex = countInstances(temp,EndWord.trim())
if(CtrlIndex > 1){
    $("#drpDataParsing option[value='Position']").remove();
    $("#drpDataParsing").append('<option value="Position">Position</option>');
     for (i = 0; i <= CtrlIndex; i++) {
         $("#drpSelectIndex").append(`
             <option value='${i}'>${i}</option>
             `)
     }
     var resStartswith = "";
     $.each(temp.split(EndWord), function(i,obj){
       
        if(resStartswith == ""){
            resStartswith = obj;
            $(".ulParsedCase").append(`
           <ul style='    float: left;
           width: 100%;
           padding-inline-start: 21px !important;' data-pos="${i}"> <li style="width:10%;float:left">${i}</li> <li style="width:90%;float:left">${obj}</li> </ul>
            
             `)
        }
        else{
            resStartswith = resStartswith + obj;
            $(".ulParsedCase").append(`
         <ul style='    float: left;
         width: 100%;
         padding-inline-start: 21px !important;' data-pos="${i}">   <li style="width:10%;float:left">${i}</li> <li style="width:90%;float:left">${resStartswith}</li> </ul>
            
             `)
        }
       
     })
}
           // var CtrlIndex = $("#tblParsedData > thead > tr > th:last").text().trim();
          
            }
            else if(Condition == "Between Words"){
                debugger;
                $('#drpParsingList').empty();
                $('#drpParsingList').append(`<option value="-1"> -- Select Parsing Index -- </option>`)
                if(NewStartWord != "" && NewStartWord != undefined){
                    var StartWord = NewStartWord
                }
                else{
                    var StartWord = IndexSelection.split("|")[0];
                }
                var EndWord = IndexSelection.split("|")[1];

                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                var arrconditionlist = [];
                var temp = "";
                
                   $.each(Control, function (i, obj) {
                       arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                   })
                   $.each(arrconditionlist, function (i, objctrl) {
                      debugger;
                       temp = objctrl;
                      //temp = temp.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                      if(EndWord == "lastword"){
                        function lastwordfind(words) {
                            var n = words.split(" ");
                            return n[n.length - 1];
                        
                        }
                        EndWord = lastwordfind(temp)
                    }
                       var splitCount = temp.split(StartWord);
var SplitCountEndWord = temp.split(EndWord);
                       if(splitCount.length > 2 && SplitCountEndWord.length > 1){
                        $('#drpParsingMultiList').empty()
                        $('#drpParsingMultiList').append(`<option value="-1"> -- Select Position Index -- </option>`)
                        $('#drpParsingMultiList').closest(".custom-select").css('display','block')
                        $('#drpParsingList').closest(".custom-select").css('display','none')
                        $(splitCount).each(function (i) {
                            var text = temp.split(StartWord)
                            // var lastitem = text[i].split(" ").pop()
                            if(i != 0){
                                debugger;
                               
                                
                              
                                if(text[i].includes(EndWord)){
                                    var NewText = text[i].split(EndWord)
                                    $('#drpParsingMultiList').append(`<option value="${i}">${i}</option>`)
                                $(".ulParsedCase").append(`
                                <ul class="UlPreviewlist">  <li style="color:red">${NewText[0]}</li> </ul>
                                  `)
                                }
                                else{
                                    $('#drpParsingMultiList').append(`<option value="${i}">${i}</option>`)
                                
                                    $('#drpParsingMultiList').closest(".custom-select").find(".select-items").append(`<div>${i}</div>`)
                                    $(".ulParsedCase").append(`
                                    <ul class="UlPreviewlist">  <li style="color:red">${text[i]}</li> </ul>
                                      `)
                                }
                                
                            }
                           
                        })
                        SchemaData.CustomSelect()
                        return false 
                       }
                    //    else if(splitCount.length == 1){
                    //     SchemaData.ShowPanel("error", "Can not check the parse")
                    //     $("#btnCheckParsing").click()
                    //    }
                       var resStartswith = "";
                       if(StartWord.split(",").length > 1 || EndWord.split(",").length > 1){
                           $.each(StartWord.split(","), function(i,objStartWordMultiple){
                                   $.each(EndWord.split(","), function(j,objEndWordMultiple){
if(temp.split(objEndWordMultiple).length > 0 && temp.startsWith(objStartWordMultiple) == true){

}
else if(temp.split(objStartWordMultiple).length > 0){
    $.each(temp.split(objStartWordMultiple), function(i,objSplittedStartWord){
        if(objSplittedStartWord.includes(objEndWordMultiple) == true){
            if(i !=0){
                var Final_Data = objSplittedStartWord;
             
    
    
               var Final_Result = Final_Data.split(objEndWordMultiple);
    
               $.each(Final_Result, function(i,objEndword){
           //    if(objEndword.includes(objEndWordMultiple) == true){
                if(resStartswith == ""){
                    resStartswith = objStartWordMultiple + " " + objEndword + " " + objEndWordMultiple;
                    if(IncludesStarts == "1"){
                        resStartswith= resStartswith.replace(objStartWordMultiple,"")
                        
                    }
                    if(IncludesEnds == "1"){
                       
                        function test(words) {
                            var n = words.split(" ");
                            return n[n.length - 1];
                        
                        }
                   var LastCharcter =  test(resStartswith);
                    //    if(parseInt(temp.split(objEndWordMultiple).length) - 1 != i){
                    //     resStartswith = resStartswith.replace(LastCharcter,"")
                    //    }
                    EndWord = EndWord.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                       debugger;
                        resStartswith = resStartswith.slice(0, -1) 
                    })
                    resStartswith = resStartswith.join(" ")
                       
                      }
                      $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                         $(".ulParsedCase").append(`
                         <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                          
                           `)
                }
                else{
                    $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                    resStartswith = resStartswith + objEndWordMultiple
                    $(".ulParsedCase").append(`
                    <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                     
                      `)
                }
                $('#drpParsingMultiList').closest(".custom-select").css('display','none')
                  $('#drpParsingList').closest(".custom-select").css('display','block')
                  $('#drpParsingList').css('display','none')
                SchemaData.CustomSelect()
                return false 
           //    }
              
               })  
        }
        }
      
    
     })

    
}
else{
    debugger;
   
    $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
    $(".ulParsedCase").append(`
    <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${temp}</li> </ul>
     
      `)
      $('#drpParsingMultiList').closest(".custom-select").css('display','none')
                SchemaData.CustomSelect()
      return false
    
   }
   $("input[name='inpCopy']").change(function(){
                                   
                        $("input[name='inpCopy']").prop("checked",false)
                        $(this).prop("checked",true)
                       
                        var Pos =  $(this).closest("ul").attr("data-pos");
                        var LastItem = $("#tblRule > tbody > tr:last");
                        if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
                            $(LastItem).remove()
                        }
                        $("#tblRule").css("display", "table")
                        var RuleAdd = $("#tblRule > tbody > tr")
                        var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                        $.each(RuleAdd, function(i,obj){
                            $("#tblRule > tbody").append(`
                            <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                            `)
                        })
                        $("#txtareaSplit").val("")
                        $("#drpDataParsing").val("0")
                        $("#drpSelectIndex").val("-1")
                        $("#txtareaReplaceTo").val("")
                        $("#txtareaReplaceTo").css("display", "none")
                        $(".incdelete").off().on("click", function () {
                            debugger;
                            var CtrlPrev = $(this).closest("tr");
                            //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                            //    CtrlPrev.prev().remove()
                            //    $(this).closest("tr").remove()
                            //}
                            if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                                CtrlPrev.next().remove()
                                $(this).closest("tr").remove()
                            }
        
                            else {
                                $(this).closest("tr").remove()
                            }
                            $(".ulParsedCase > li").remove()
                            if ($("#tblRule > tbody > tr").length > 0) {
                                var Control = $("#tblRule > tbody > tr");
                                $.each(Control, function (i, objIndexRule) {
                                    var Index = parseInt(i) + 1;
                                    $(objIndexRule).find("td > .ruleindex").text(Index)
                                })
        
                                SchemaData.RuleDefine(Control);
                            }
                            else{
                                $("#ParsingStepTime").timer({
                                    action: 'reset',
                                    seconds: 0
                                })
                                $("#ParsingStepTime").timer({
                                    action: 'pause',
                                    seconds: 0
                                })
                                $("#ParsingStepTime").css('display','none')
                            }
                        })
                    })
                                   })
                           })
                       }
                       
                       else if(StartWord.split(",").length ==1){
                        if(temp.split(EndWord).length > 0 && temp.startsWith(StartWord) == true){
                            $.each(temp.split(EndWord), function(i,obj){
                                
                                if(resStartswith == ""){
                                  
                                         if(IncludesStarts == "1"){
                                              resStartswith= obj.replace(StartWord,"")
                                             // resStartswith = resStartswith + EndWord;
                                              if(parseInt(temp.split(EndWord).length) - 1 != i){
                                                resStartswith =  resStartswith + EndWord;
                                              }
                                              else{
                                                resStartswith =  resStartswith;
                                              }
                                              if(IncludesEnds == "1"){
                                               
                                                function test(words) {
                                                    var n = words.split(" ");
                                                    return n[n.length - 1];
                                                
                                                }
                                            //    var LastCharcter =  test(resStartswith);
                                            //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            //     resStartswith = resStartswith.replace(LastCharcter,"")
                                            //    }
                                            EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                               
                                               
                                              }
                                         }
                                         else  if(IncludesEnds == "1"){
                                          //  resStartswith = obj;
                                          if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith =  obj + EndWord;
                                          }
                                          else{
                                            resStartswith =  obj;
                                          }
                                           // resStartswith =  obj +  EndWord ;
                                            function test(words) {
                                                var n = words.split(" ");
                                                return n[n.length - 1];
                                            
                                            }
                                        //    var LastCharcter =  test(resStartswith);
                                        //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                        //     resStartswith = resStartswith.replace(LastCharcter,"")
                                        //    }

                                        EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                          } 
                                          else{
                                           // resStartswith = obj; 
                                           if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith =  obj + EndWord;
                                          }
                                          else{
                                            resStartswith =  obj;
                                          }
                                         }
                                        
                                         $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                         $(".ulParsedCase").append(`
                                         <ul class="UlPreviewlist" data-pos="${i}">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                          
                                           `)
                                        
                                       
                                //     $(".ulParsedCase").append(`
                                //    <ul class="UlPreviewlist" data-pos="${i}">  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                    
                                //      `)
                                $('#drpParsingList').css('display','none')
                                $('#drpParsingList').closest(".custom-select").css('display','block')
                              SchemaData.CustomSelect()
                                   
                                }
                                else{
                                  //  resStartswith = resStartswith + obj;
                                  if(parseInt(temp.split(EndWord).length) - 1 !=i){
                                    resStartswith = resStartswith + obj + EndWord;
                                  }
                                  else{
                                    resStartswith = resStartswith + obj;
                                  }
                                   
                                    if(IncludesStarts == "1"){
                                        resStartswith= resStartswith.replace(StartWord,"")
                                        if(IncludesEnds == "1"){
                                         
                                          function test(words) {
                                              var n = words.split(" ");
                                              return n[n.length - 1];
                                          
                                          }
                                         var LastCharcter =  test(resStartswith);
                                         if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith = resStartswith.replace(LastCharcter,"")
                                           }
                                        }
                                   }
                                   else  if(IncludesEnds == "1"){
                                    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                        resStartswith = resStartswith + obj + EndWord;
                                      }
                                      else{
                                        resStartswith = resStartswith + obj;
                                      }
                                      function test(words) {
                                          var n = words.split(" ");
                                          return n[n.length - 1];
                                      
                                      }
                                    //  var LastCharcter =  test(resStartswith);
                                    //  if(parseInt(temp.split(EndWord).length) - 1 != i){
                                    //     resStartswith = resStartswith.replace(LastCharcter,"")
                                    //    }

                                    EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                    } 
                                    else{
                                        if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith = resStartswith + obj + EndWord;
                                          }
                                          else{
                                            resStartswith = resStartswith + obj;
                                          }
                                      //  resStartswith = resStartswith + obj + EndWord;
                                   }
    
                                   $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                    $(".ulParsedCase").append(`
                                 <ul class="UlPreviewlist"  data-pos="${i}"> <span>${i}</span>   <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                    
                                     `)
                                     $('#drpParsingList').css('display','none')
                                     $('#drpParsingList').closest(".custom-select").css('display','block')
                                   SchemaData.CustomSelect()
    
                                //     $(".ulParsedCase").append(`
                                //  <ul class="UlPreviewlist"  data-pos="${i}">    <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                    
                                //      `)
    
                                    
                                }
                               
                             })
                           }
                           else if( temp.split(StartWord).length > 0){
                            $.each(temp.split(StartWord), function(i,objSplittedStartWord){
                                if(i !=0){
                                    var Final_Data = objSplittedStartWord;
                                 
    
    
                                   var Final_Result = Final_Data.split(EndWord)
                                   $.each(Final_Result, function(i,objEndword){
                                   
                                        if(resStartswith == ""){
                                            resStartswith = StartWord + " " + objEndword + " " + EndWord;
                                            if(IncludesStarts == "1"){
                                                resStartswith= resStartswith.replace(StartWord,"")
                                                
                                            }
                                            if(IncludesEnds == "1"){
                                               
                                                function test(words) {
                                                    var n = words.split(" ");
                                                    return n[n.length - 1];
                                                
                                                }
                                            //    var LastCharcter =  test(resStartswith);
                                            //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            //     resStartswith = resStartswith.replace(LastCharcter,"")
                                            //    }
                                               

                                            EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                               
                                              }
                                              $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                                 $(".ulParsedCase").append(`
                                                 <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                                  
                                                   `)
                                        }
                                        else{
                                            $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                            resStartswith = resStartswith + objEndword
                                            $(".ulParsedCase").append(`
                                            <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                             
                                              `)
                                              $('#drpParsingList').css('display','none')
                                              $('#drpParsingList').closest(".custom-select").css('display','block')
                                            SchemaData.CustomSelect()
                                        }
                                   })  
                            }
                           
                             })
                           }
                           else{
                            $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                            $(".ulParsedCase").append(`
                            <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${temp}</li> </ul>
                             
                              `)
                              $('#drpParsingList').css('display','none')
                              $('#drpParsingList').closest(".custom-select").css('display','block')
                              SchemaData.CustomSelect()
                           }
                           $("input[name='inpCopy']").change(function(){
                                       
                            $("input[name='inpCopy']").prop("checked",false)
                            $(this).prop("checked",true)
                           
                            var Pos =  $(this).closest("ul").attr("data-pos");
                            var LastItem = $("#tblRule > tbody > tr:last");
                            if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
                                $(LastItem).remove()
                            }
                            $("#tblRule").css("display", "table")
                            var RuleAdd = $("#tblRule > tbody > tr")
                            var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                            $.each(RuleAdd, function(i,obj){
                                $("#tblRule > tbody").append(`
                                <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                                `)
                            })
                            $("#txtareaSplit").val("")
                            $("#drpDataParsing").val("0")
                            $("#drpSelectIndex").val("-1")
                            $("#txtareaReplaceTo").val("")
                            $("#txtareaReplaceTo").css("display", "none")
                            $(".incdelete").off().on("click", function () {
                                debugger;
                                var CtrlPrev = $(this).closest("tr");
                                //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                                //    CtrlPrev.prev().remove()
                                //    $(this).closest("tr").remove()
                                //}
                                if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                                    CtrlPrev.next().remove()
                                    $(this).closest("tr").remove()
                                }
            
                                else {
                                    $(this).closest("tr").remove()
                                }
                                $(".ulParsedCase > li").remove()
                                if ($("#tblRule > tbody > tr").length > 0) {
                                    var Control = $("#tblRule > tbody > tr");
                                    $.each(Control, function (i, objIndexRule) {
                                        var Index = parseInt(i) + 1;
                                        $(objIndexRule).find("td > .ruleindex").text(Index)
                                    })
            
                                    SchemaData.RuleDefine(Control);
                                }
                                else{
                                    $("#ParsingStepTime").timer({
                                        action: 'reset',
                                        seconds: 0
                                    })
                                    $("#ParsingStepTime").timer({
                                        action: 'pause',
                                        seconds: 0
                                    })
                                    $("#ParsingStepTime").css('display','none')
                                }
                            })
                        })
                       }
                      
                   })
                  
          

            }
            else if(Condition == "Excludes"){
                debugger;
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                if(Control[0].nodeName != "LI"){
                    $.each(Control, function (i, obj) {
                        arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                    })
                }
                else{
                    $.each(Control, function (i, obj) {
                        arrconditionlist.push($(obj).text())
                    })
                }
               
                $.each(arrconditionlist, function (i, objctrl) {
                   debugger;
                   var OriginalText = objctrl.replace(IndexSelection,"")
                   $(".ulParsedCase").append(`
                   <li>${OriginalText}</li>
                   `)
                })

                ConditionEnd = true;
            }
           else if(Condition == "Position"){
               debugger;
           
             
               var SelectedPosition = $(".ulParsedCase").find("ul")[IndexSelection] ;
               var OriginalText = $(SelectedPosition).find("li")[1].innerText;
                $(".ulParsedCase").append(`
            <li>${OriginalText}</li>
            `)
            $(".ulParsedCase > ul").remove();
           }
           else if(Condition == "Includes"){
               debugger;
               if (ConditionEnd == true) {
                if ($("#ULInnerText > li").length > 0) {
                    var Control = $("#tabelCollectionList > tbody > tr");
                    //  $("#tblParsedData").empty();
                }
            }
            else {
                var Control = $(".ulParsedCase > li");
                if (Control.length == 0) {
                    Control = $("#tabelCollectionList > tbody > tr");
                }
            }

            var arrconditionlist = [];
            $.each(Control, function (i, obj) {
                arrconditionlist.push($(obj).find("td.schemaname").text().trim())
            })
            $.each(arrconditionlist, function (i, objctrl) {
                var IncludesText = IndexSelection;
                var position = 0;
                var OriginalText = [objctrl.slice(0, position), IncludesText, objctrl.slice(position)].join('');
                $(".ulParsedCase").append(`
                <li>${OriginalText}</li>
                `)
            })

            ConditionEnd = true;
           }
           //$('#drpParsingMultiList').closest(".custom-select").css('display','none')
           SchemaData.CustomSelect()
           var CtrlIndex = $("#tblParsedData > thead > tr > th:last").text().trim();

           for (i = 0; i <= CtrlIndex; i++) {
               $("#drpSelectIndex").append(`
                   <option value='${i}'>${i}</option>
                   `)
           }


        })
        return ConditionEnd
    },
    segregation: function (Rule , NewStartWord) {
        var ConditionEnd = true;
        var FinalResultData = [];
        var FinalStartWord = ""
        var FinalEndWord = ""
        var NostartWord = "";
        $.each(Rule, function (i, objRule) {
            ConditionEnd = false;
            var Condition = objRule.condition.split("||||")[0];
            var ParsingCdn = objRule.condition.split("||||")[0];
            var DrpparsingField =  $("#drpPrasingField > option");
            $.each(DrpparsingField, function(i,objParsingValue){
                 if($(objParsingValue).text().trim() == Condition){
                    Condition = "NameParsing"
                 }
            })

            var IndexSelection = objRule.condition.split("||||")[1];
            if(objRule.hasOwnProperty("includesexeculdes")){
                var IncludesStarts = objRule.includesexeculdes.split("|")[0].trim();
                var IncludesEnds = objRule.includesexeculdes.split("|")[1].trim();
            }
            if (Condition == "Index") {
                var arrconditionlist = [];
                $("#drpDataParsing option[value='Index']").remove();
                var CtrlData = $("#tblParsedData > tbody > tr");
                debugger;
                $.each(CtrlData, function (i, objIndexData) {
                    // if ($(".ulParsedCase > li").length > 0) {
                    //     var Control = $(".ulParsedCase > li");
                    // }
                    // else {
                    //     var Control = $(".ulparse > li");
                    // }
                    var CtrlText = "";
                    $.each(IndexSelection.split(","), function(i,objIndex){
                     if(i == 0){
                         CtrlText = $(objIndexData).find("td")[objIndex];
                        CtrlText = $(CtrlText).text().trim()
                     }
                     else{
                         var res = $(objIndexData).find("td")[objIndex];

                             CtrlText = CtrlText + " " + $(res).text().trim(); 
                           //  CtrlText = $(res).text().trim()
                     }

                    })
                    // var CtrlText = $(objIndexData).find("td")[IndexSelection];
                    // CtrlText = $(CtrlText).text().trim()
                    arrconditionlist.push(CtrlText)

                })

                $(".ulParsedCase > li").remove();
                $.each(arrconditionlist, function (i, objctrl) {
                    var OriginalText = objctrl.trim();
                    $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                })
                $("#drpSelectIndex").val("-1");
                $("#drpSelectIndex").empty()
                $(".drpSelectIndex").css("display", "none")
                $("#tblParsedData > thead > tr").remove()
                $("#tblParsedData > tbody > tr").remove()
            }
            else if(Condition == "Position_Index"){
                debugger;
                var SelectedPosition = $(".ulParsedCase").find("ul")[IndexSelection] ;
                var OriginalText = $(SelectedPosition).find("li")[1].innerText;
                var StartWord = OriginalText.split(' ').slice(0,2).join(' ');
                // var StartWord = FinalStartWord;
                var EndWord = FinalEndWord;
                $(".ulParsedCase > ul").remove();
            $.each(FinalResultData, function (i, objctrl) {
                debugger;
                 temp = objctrl;
               
                //temp = temp.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                if(EndWord == "lastword"){
                  function lastwordfind(words) {
                      var n = words.split(" ");
                      return n[n.length - 1];
                  
                  }
                  EndWord = lastwordfind(temp)
              }
                 var splitCount = temp.split(StartWord);
var SplitCountEndWord = temp.split(EndWord);
                 if(splitCount.length > 2 && SplitCountEndWord.length > 1){
                  $('#drpParsingMultiList').empty()
                  $('#drpParsingMultiList').append(`<option value="-1"> -- Select Parsing Index -- </option>`)
                  $('#drpParsingMultiList').closest(".custom-select").css('display','block')
                  $('#drpParsingList').closest(".custom-select").css('display','none')
                  $(splitCount).each(function (i) {
                    console.log(IncludesStarts)
                      var text = temp.split(StartWord)
                      // var lastitem = text[i].split(" ").pop()
                      if(i != 0){
                        console.log(IncludesStarts)
                          debugger;
                          var optionvalue = i - 1
                          if(text[i].includes(EndWord)){
                              var NewText = text[i].split(EndWord)
                              $('#drpParsingMultiList ,#drpParsingList').append(`<option value="${optionvalue}">${optionvalue}</option>`)
                              $('#drpParsingMultiList ,#drpParsingList').closest(".custom-select").find(".select-items").append(`<div>${optionvalue}</div>`)
                          $(".ulParsedCase").append(`
                          <ul class="UlPreviewlist">  <li> <input type="checkbox" name="inpCopy"></li><li style="color:e7dfdf">${FinalStartWord} ${StartWord} ${NewText[0]}</li> </ul>
                            `)
                          }
                          else{
                              $('#drpParsingMultiList ,#drpParsingList').append(`<option value="${optionvalue}">${optionvalue}</option>`)
                          
                              $('#drpParsingMultiList ,#drpParsingList').closest(".custom-select").find(".select-items").append(`<div>${optionvalue}</div>`)
                              $(".ulParsedCase").append(`
                              <ul class="UlPreviewlist"><li> <input type="checkbox" name="inpCopy"></li>  <li style="color:e7dfdf">${FinalStartWord} ${StartWord} ${text[i]}</li> </ul>
                                `)
                          }
                          
                      }
                     
                  })
                  SchemaData.CustomSelect()
                  return false 
                 }
              //    else if(splitCount.length == 1){
              //     SchemaData.ShowPanel("error", "Can not check the parse")
              //     $("#btnCheckParsing").click()
              //    }
                 var resStartswith = "";
                 if(StartWord.split(",").length > 1 || EndWord.split(",").length > 1){
                     $.each(StartWord.split(","), function(i,objStartWordMultiple){
                             $.each(EndWord.split(","), function(j,objEndWordMultiple){
if(temp.split(objEndWordMultiple).length > 0 && temp.startsWith(objStartWordMultiple) == true){

}
else if(temp.split(objStartWordMultiple).length > 0){
$.each(temp.split(objStartWordMultiple), function(i,objSplittedStartWord){
  if(objSplittedStartWord.includes(objEndWordMultiple) == true){
      if(i !=0){
          var Final_Data = objSplittedStartWord;
       


         var Final_Result = Final_Data.split(objEndWordMultiple);

         $.each(Final_Result, function(i,objEndword){
     //    if(objEndword.includes(objEndWordMultiple) == true){
          if(resStartswith == ""){
              resStartswith = objStartWordMultiple + " " + objEndword + " " + objEndWordMultiple;
              if(IncludesStarts == "1"){
                  resStartswith= resStartswith.replace(objStartWordMultiple,"")
                  
              }
              if(IncludesEnds == "1"){
                 
                  function test(words) {
                      var n = words.split(" ");
                      return n[n.length - 1];
                  
                  }
             var LastCharcter =  test(resStartswith);
              //    if(parseInt(temp.split(objEndWordMultiple).length) - 1 != i){
              //     resStartswith = resStartswith.replace(LastCharcter,"")
              //    }
              EndWord = EndWord.split(" ")
              resStartswith = resStartswith.split(" ")
              $(EndWord).each(function (i) {
                 debugger;
                  resStartswith = resStartswith.slice(0, -1) 
              })
              resStartswith = resStartswith.join(" ")
                 
                }
                $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                   $(".ulParsedCase").append(`
                   <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${resStartswith}</li> </ul>
                    
                     `)
          }
          else{
              $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
              resStartswith = resStartswith + objEndWordMultiple
              $(".ulParsedCase").append(`
              <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${resStartswith}</li> </ul>
               
                `)
          }
          $('#drpParsingMultiList').closest(".custom-select").css('display','none')
            $('#drpParsingList').closest(".custom-select").css('display','block')
            $('#drpParsingList').css('display','none')
          SchemaData.CustomSelect()
          return false 
     //    }
        
         })  
  }
  }


})


}
else{
debugger;

$('#drpParsingList').append(`<option value="${i}">${i}</option>`)
$(".ulParsedCase").append(`
<ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${temp}</li> </ul>

`)
$('#drpParsingMultiList').closest(".custom-select").css('display','none')
          SchemaData.CustomSelect()
return false

}
$("input[name='inpCopy']").change(function(){
                             
                  $("input[name='inpCopy']").prop("checked",false)
                  $(this).prop("checked",true)
                 
                  var Pos =  $(this).closest("ul").attr("data-pos");
                  var LastItem = $("#tblRule > tbody > tr:last");
                  if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
                      $(LastItem).remove()
                  }
                  $("#tblRule").css("display", "table")
                  var RuleAdd = $("#tblRule > tbody > tr")
                  var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                  $.each(RuleAdd, function(i,obj){
                      $("#tblRule > tbody").append(`
                      <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                      `)
                  })
                  $("#txtareaSplit").val("")
                  $("#drpDataParsing").val("0")
                  $("#drpSelectIndex").val("-1")
                  $("#txtareaReplaceTo").val("")
                  $("#txtareaReplaceTo").css("display", "none")
                  $(".incdelete").off().on("click", function () {
                      debugger;
                      var CtrlPrev = $(this).closest("tr");
                      //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                      //    CtrlPrev.prev().remove()
                      //    $(this).closest("tr").remove()
                      //}
                      if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                          CtrlPrev.next().remove()
                          $(this).closest("tr").remove()
                      }
  
                      else {
                          $(this).closest("tr").remove()
                      }
                      $(".ulParsedCase > li").remove()
                      if ($("#tblRule > tbody > tr").length > 0) {
                          var Control = $("#tblRule > tbody > tr");
                          $.each(Control, function (i, objIndexRule) {
                              var Index = parseInt(i) + 1;
                              $(objIndexRule).find("td > .ruleindex").text(Index)
                          })
  
                          SchemaData.RuleDefine(Control);
                      }
                      else{
                          $("#ParsingStepTime").timer({
                              action: 'reset',
                              seconds: 0
                          })
                          $("#ParsingStepTime").timer({
                              action: 'pause',
                              seconds: 0
                          })
                          $("#ParsingStepTime").css('display','none')
                      }
                  })
              })
                             })
                     })
                 }
                 
                 else if(StartWord.split(",").length ==1){
                  if(temp.split(EndWord).length > 0 && temp.startsWith(StartWord) == true){
                      $.each(temp.split(EndWord), function(i,obj){
                          
                          if(resStartswith == ""){
                            
                                   if(IncludesStarts == "1"){
                                        resStartswith= obj.replace(StartWord,"")
                                       // resStartswith = resStartswith + EndWord;
                                        if(parseInt(temp.split(EndWord).length) - 1 != i){
                                          resStartswith =  resStartswith + EndWord;
                                        }
                                        else{
                                          resStartswith =  resStartswith;
                                        }
                                        if(IncludesEnds == "1"){
                                         
                                          function test(words) {
                                              var n = words.split(" ");
                                              return n[n.length - 1];
                                          
                                          }
                                      //    var LastCharcter =  test(resStartswith);
                                      //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                      //     resStartswith = resStartswith.replace(LastCharcter,"")
                                      //    }
                                      EndWord = EndWord.split(" ")
                                      resStartswith = resStartswith.split(" ")
                                      $(EndWord).each(function (i) {
                                         debugger;
                                          resStartswith = resStartswith.slice(0, -1) 
                                      })
                                      resStartswith = resStartswith.join(" ")
                                         
                                         
                                        }
                                   }
                                   else  if(IncludesEnds == "1"){
                                    //  resStartswith = obj;
                                    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                      resStartswith =  obj + EndWord;
                                    }
                                    else{
                                      resStartswith =  obj;
                                    }
                                     // resStartswith =  obj +  EndWord ;
                                      function test(words) {
                                          var n = words.split(" ");
                                          return n[n.length - 1];
                                      
                                      }
                                  //    var LastCharcter =  test(resStartswith);
                                  //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                  //     resStartswith = resStartswith.replace(LastCharcter,"")
                                  //    }

                                  EndWord = EndWord.split(" ")
                                      resStartswith = resStartswith.split(" ")
                                      $(EndWord).each(function (i) {
                                         debugger;
                                          resStartswith = resStartswith.slice(0, -1) 
                                      })
                                      resStartswith = resStartswith.join(" ")
                                    } 
                                    else{
                                     // resStartswith = obj; 
                                     if(parseInt(temp.split(EndWord).length) - 1 != i){
                                      resStartswith =  obj + EndWord;
                                    }
                                    else{
                                      resStartswith =  obj;
                                    }
                                   }
                                  
                                   $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                   $(".ulParsedCase").append(`
                                   <ul class="UlPreviewlist" data-pos="${i}">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${resStartswith}</li> </ul>
                                    
                                     `)
                                  
                                 
                          //     $(".ulParsedCase").append(`
                          //    <ul class="UlPreviewlist" data-pos="${i}">  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                              
                          //      `)
                          $('#drpParsingList').css('display','none')
                          $('#drpParsingList').closest(".custom-select").css('display','block')
                        SchemaData.CustomSelect()
                             
                          }
                          else{
                            //  resStartswith = resStartswith + obj;
                            if(parseInt(temp.split(EndWord).length) - 1 !=i){
                              resStartswith = resStartswith + obj + EndWord;
                            }
                            else{
                              resStartswith = resStartswith + obj;
                            }
                             
                              if(IncludesStarts == "1"){
                                  resStartswith= resStartswith.replace(StartWord,"")
                                  if(IncludesEnds == "1"){
                                   
                                    function test(words) {
                                        var n = words.split(" ");
                                        return n[n.length - 1];
                                    
                                    }
                                   var LastCharcter =  test(resStartswith);
                                   if(parseInt(temp.split(EndWord).length) - 1 != i){
                                      resStartswith = resStartswith.replace(LastCharcter,"")
                                     }
                                  }
                             }
                             else  if(IncludesEnds == "1"){
                              if(parseInt(temp.split(EndWord).length) - 1 != i){
                                  resStartswith = resStartswith + obj + EndWord;
                                }
                                else{
                                  resStartswith = resStartswith + obj;
                                }
                                function test(words) {
                                    var n = words.split(" ");
                                    return n[n.length - 1];
                                
                                }
                              //  var LastCharcter =  test(resStartswith);
                              //  if(parseInt(temp.split(EndWord).length) - 1 != i){
                              //     resStartswith = resStartswith.replace(LastCharcter,"")
                              //    }

                              EndWord = EndWord.split(" ")
                                      resStartswith = resStartswith.split(" ")
                                      $(EndWord).each(function (i) {
                                         debugger;
                                          resStartswith = resStartswith.slice(0, -1) 
                                      })
                                      resStartswith = resStartswith.join(" ")
                              } 
                              else{
                                  if(parseInt(temp.split(EndWord).length) - 1 != i){
                                      resStartswith = resStartswith + obj + EndWord;
                                    }
                                    else{
                                      resStartswith = resStartswith + obj;
                                    }
                                //  resStartswith = resStartswith + obj + EndWord;
                             }

                             $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                              $(".ulParsedCase").append(`
                           <ul class="UlPreviewlist"  data-pos="${i}"> <span>${i}</span>   <li> <input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${resStartswith}</li> </ul>
                              
                               `)
                               $('#drpParsingList').css('display','none')
                               $('#drpParsingList').closest(".custom-select").css('display','block')
                             SchemaData.CustomSelect()

                          //     $(".ulParsedCase").append(`
                          //  <ul class="UlPreviewlist"  data-pos="${i}">    <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                              
                          //      `)

                              
                          }
                         
                       })
                     }
                     else if( temp.split(StartWord).length > 0){
                      $.each(temp.split(StartWord), function(i,objSplittedStartWord){
                          if(i !=0){
                              var Final_Data = objSplittedStartWord;
                           


                             var Final_Result = Final_Data.split(EndWord)
                             $.each(Final_Result, function(i,objEndword){
                             
                                  if(resStartswith == ""){
                                      resStartswith = StartWord + " " + objEndword + " " + EndWord;
                                      if(IncludesStarts == "1"){
                                          resStartswith= resStartswith.replace(StartWord,"")
                                          
                                      }
                                      if(IncludesEnds == "1"){
                                         
                                          function test(words) {
                                              var n = words.split(" ");
                                              return n[n.length - 1];
                                          
                                          }
                                      //    var LastCharcter =  test(resStartswith);
                                      //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                      //     resStartswith = resStartswith.replace(LastCharcter,"")
                                      //    }
                                         

                                      EndWord = EndWord.split(" ")
                                      resStartswith = resStartswith.split(" ")
                                      $(EndWord).each(function (i) {
                                         debugger;
                                          resStartswith = resStartswith.slice(0, -1) 
                                      })
                                      resStartswith = resStartswith.join(" ")
                                         
                                        }
                                        $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                           $(".ulParsedCase").append(`
                                           <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord}  ${resStartswith}</li> </ul>
                                            
                                             `)
                                  }
                                  else{
                                      $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                      resStartswith = resStartswith + objEndword
                                      $(".ulParsedCase").append(`
                                      <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${resStartswith}</li> </ul>
                                       
                                        `)
                                        $('#drpParsingList').css('display','none')
                                        $('#drpParsingList').closest(".custom-select").css('display','block')
                                      SchemaData.CustomSelect()
                                  }
                             })  
                      }
                     
                       })
                     }
                     else{
                      $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                      $(".ulParsedCase").append(`
                      <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${FinalStartWord} ${temp}</li> </ul>
                       
                        `)
                        $('#drpParsingList').css('display','none')
                        $('#drpParsingList').closest(".custom-select").css('display','block')
                        SchemaData.CustomSelect()
                     }
                     $("input[name='inpCopy']").change(function(){
                                 
                      $("input[name='inpCopy']").prop("checked",false)
                      $(this).prop("checked",true)
                     
                      var Pos =  $(this).closest("ul").attr("data-pos");
                      var LastItem = $("#tblRule > tbody > tr:last");
                      if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
                          $(LastItem).remove()
                      }
                      $("#tblRule").css("display", "table")
                      var RuleAdd = $("#tblRule > tbody > tr")
                      var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                      $.each(RuleAdd, function(i,obj){
                          $("#tblRule > tbody").append(`
                          <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                          `)
                      })
                      $("#txtareaSplit").val("")
                      $("#drpDataParsing").val("0")
                      $("#drpSelectIndex").val("-1")
                      $("#txtareaReplaceTo").val("")
                      $("#txtareaReplaceTo").css("display", "none")
                      $(".incdelete").off().on("click", function () {
                          debugger;
                          var CtrlPrev = $(this).closest("tr");
                          //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                          //    CtrlPrev.prev().remove()
                          //    $(this).closest("tr").remove()
                          //}
                          if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                              CtrlPrev.next().remove()
                              $(this).closest("tr").remove()
                          }
      
                          else {
                              $(this).closest("tr").remove()
                          }
                          $(".ulParsedCase > li").remove()
                          if ($("#tblRule > tbody > tr").length > 0) {
                              var Control = $("#tblRule > tbody > tr");
                              $.each(Control, function (i, objIndexRule) {
                                  var Index = parseInt(i) + 1;
                                  $(objIndexRule).find("td > .ruleindex").text(Index)
                              })
      
                              SchemaData.RuleDefine(Control);
                          }
                          else{
                              $("#ParsingStepTime").timer({
                                  action: 'reset',
                                  seconds: 0
                              })
                              $("#ParsingStepTime").timer({
                                  action: 'pause',
                                  seconds: 0
                              })
                              $("#ParsingStepTime").css('display','none')
                          }
                      })
                  })
                 }
                
             })
            //  $(".ulParsedCase > ul").remove();
             $("#drpParsingMultiList").closest("div").css('display','none')
             $("#drpParsingList").closest("div").css('display','block')
             $('#drpParsingList').append(`<option value="0">0</option>`)
             SchemaData.CustomSelect()
            }
            else if (Condition == "Split") {
                $("#drpSelectIndex").empty()
               // $("#drpSelectIndex").append('<option value="-1">--Select Index --</option>');

                var Delimiter = objRule.condition.split("||||")[1];
                Delimiter = Delimiter == "space" ? " " : Delimiter;
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }
                $("#drpDataParsing option[value='Index']").remove();
                $("#drpDataParsing").append('<option value="Index">Index</option>');


                // var Control = $(".ulparse > li");
                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).text().trim())
                })
                if ($(".ulParsedCase > li").length > 0) {
                    $(".ulParsedCase > li").remove();
                }

                $("#tblParsedData > thead > tr").remove()
                $("#tblParsedData > tbody > tr").remove()
                $.each(arrconditionlist, function (i, objctrl) {

                    //   if (objctrl.trim().includes(Delimiter) == true) {
                    var CheckLength = objctrl.trim().split(Delimiter).length;
                    var SplittedWords = objctrl.trim().split(Delimiter);

                    if (CheckLength > 0) {
                        //   $("#tblParsedData").empty()
                        $.each(SplittedWords, function (ij, objSplit) {
                            var res = $("#tblParsedData > tbody > tr")[i];
                            var reshead = $("#tblParsedData > thead > tr");
                            var reslen = $(reshead).find("th")[ij];
                            if (reslen == undefined) {
                                reslen = "";
                            }
                            else {
                                var restext = $(reshead).find("th")[ij]
                                reslen = $(restext).text();
                            }
                            if ($(reshead).length == 0) {
                                $("#tblParsedData > thead").append(`
                                    <tr> <th>${ij}</th> </tr>
                                    `)
                            }
                            else if (reslen != ij) {
                                $("#tblParsedData > thead > tr").append(`
                                     <th>${ij} </th>
                                    `)
                            }
                            if ($(res).length > 0) {

                                $(res).append(`
                                    <td>${objSplit} </td>
                                    `)
                            }
                            else {

                                $("#tblParsedData > tbody").append(`
                                    <tr> <td>${objSplit} </td> </tr>
                                    `)
                            }

                        })
                        //var SplittedCase = objctrl.trim().split(Delimiter)[1];
                        //$(".ulParsedCase").append(`
                        //<li>${SplittedCase}</li>
                        //`)



                    }
                    else {
                        var OriginalText = objctrl.trim();
                        $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                    }

                    //  }
                    //else {
                    //    var OriginalText = objctrl.trim();
                    //    $(".ulParsedCase").append(`
                    //        <li>${OriginalText}</li>
                    //        `)
                    //}
                })

                ConditionEnd = true;


            }
            else if (Condition == "Replace") {
                var Delimiter = objRule.condition.split("||||")[1];
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).text().trim())
                })
                $(".ulParsedCase > li").remove();
                if (Delimiter.split("||").length > 1) {
                    var Delimiterlen = Delimiter.split("||");
                    $.each(Delimiterlen, function (i, objDelimiter) {
                        var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                        OrgDelimiter = OrgDelimiter.split("||")[i];
                        var ReplaceCharText = Delimiter.split("|RW|")[1];
                        if (i == 0) {
                            $.each(arrconditionlist, function (i, objctrl) {

                                if (objctrl.trim().includes(OrgDelimiter) == true) {
                                    var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                    var SplittedCase = ReplacedText;
                                    $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                                }
                                else {
                                    var OriginalText = objctrl.trim();
                                    $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                                }


                            })
                            var arrreplacedconditionlist = [];
                            var Control = $(".ulParsedCase > li");
                            $.each(Control, function (i, obj) {
                                arrreplacedconditionlist.push($(obj).text().trim())
                            })
                        }
                        else {
                            var Control = $(".ulParsedCase > li");
                            arrreplacedconditionlist = [];
                            $.each(Control, function (i, obj) {
                                arrreplacedconditionlist.push($(obj).text().trim())
                            })
                            $(".ulParsedCase > li").remove()
                            $.each(arrreplacedconditionlist, function (i, objctrl) {

                                if (objctrl.trim().includes(OrgDelimiter) == true) {
                                    var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                    var SplittedCase = ReplacedText;
                                    $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                                }
                                else {
                                    var OriginalText = objctrl.trim();
                                    $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                                }


                            })


                        }



                    })
                }
                else {
                   
                    $.each(arrconditionlist, function (i, objctrl) {
                        var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                        var ReplaceCharText = Delimiter.split("|RW|")[1];
                        if (objctrl.trim().includes(OrgDelimiter) == true) {
                            var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                            var SplittedCase = ReplacedText;
                            $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                        }
                        // else {
                        //     var OriginalText = objctrl.trim();
                        //     $(".ulParsedCase").append(`
                        //     <li>${OriginalText}</li>
                        //     `)
                        // }
                        else {                           
                            var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                            var ReplacedText = OrgDelimiter.split("|")
                            if(ReplacedText.length > 1){
                                $.each(ReplacedText, function (i,ReplacedText) {
                                    debugger;
                                    if( $("#txtparingresult").val() == ""){
                                        if (objctrl.trim().includes(ReplacedText.trim()) == true) {
                                            var ReplacedText = objctrl.trim().replace(ReplacedText.trim(), ReplaceCharText);
                                            // $(".ulParsedCase").append(`
                                            // <li>${ReplacedText}</li>
                                            // `)
                                            $("#txtparingresult").val(ReplacedText)
                                        }
                                    }
                                    else{
                                        if ($("#txtparingresult").val().includes(ReplacedText.trim()) == true) {
                                            var ReplacedText = $("#txtparingresult").val().replace(ReplacedText.trim(), ReplaceCharText);                                          
                                            $("#txtparingresult").val(ReplacedText)
                                        } 
                                    }
                                  
                                })
                                $(".ulParsedCase").append(`
                                         <li>${$("#txtparingresult").val()}</li>
                                          `)
                                          $("#txtparingresult").val("")
                            }
                           else{
                            if (objctrl.trim().includes(OrgDelimiter) == true) {
                                var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                var SplittedCase = ReplacedText;
                                $(".ulParsedCase").append(`
                                <li>${SplittedCase}</li>
                                `)
                            }
                           }
                        }


                    })
                }

                ConditionEnd = true;
            }
            else if(Condition == "Email"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                })

                ConditionEnd = true;

            }
            else if(Condition == "URL"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                })

                ConditionEnd = true;

            }
            else if(Condition == "PhoneNumber"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/gi;
                    var regexpattern1 =  /\([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi;
                    var regexpattern2 =  /[0-9]{3}.[0-9]{3}.[0-9]{4}/gi;
                    var arrpattern = ["/[0-9]{3}-[0-9]{3}-[0-9]{4}/gi","/([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi"]
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
               
                      if(OriginalText == ""){
                        OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern1)
                        if(OriginalText != ""){
                            $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                           // return false
                        }
                        else{
                            OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern2)
                            $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                        }
                      }
                      else{
                        $(".ulParsedCase").append(`
                        <li>${OriginalText}</li>
                        `)
                       //   return false;

                      }
                     
                  
                    // $.each(arrpattern, function(i,objPattern){
                    //     regexpattern = objPattern;
                    //     OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                    //     if(OriginalText != ""){
                    //         return false
                    //     }
                    // })
                  
                    
                })

                ConditionEnd = true;

            }
            else if(Condition == "Zipcode"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                    var regexpattern = /\d{5}(?:[-\s]\d{4})?/gi;
                  
                    OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                   
                  
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                })

                ConditionEnd = true;

            }
            else if(Condition == "NameParsing"){
                debugger
                var RemovingParsingCase = "";
               if(objRule.hasOwnProperty("Parsingcondition")){
              var ActionType =  objRule["Parsingcondition"].split("||||")[0];
              var RemoveParsingField = objRule["Parsingcondition"].split("||||")[1];
              RemovingParsingCase = {
                  [ActionType]:RemoveParsingField
              }
               }
               
                var TestNames = [];
               
                if ($(".ulParsedCase > li").length > 0) {
                    var Names = $(".ulParsedCase > li").text()
                    alert(Names)
                    TestNames.push(Names)
                }
                else if($("#tabelCollectionList > tbody > tr").length > 0){
                var ParsedCtrl = $("#tabelCollectionList > tbody > tr");
                $.each(ParsedCtrl, function(i,objParsedCtrl){
                    var Names = $(objParsedCtrl).find("td > span.dataCollList").text().trim()
                    Names = Names.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                    TestNames.push(Names)
                })
                }

                

                var arrconditionlist = [];
//               var NameParsingData = SchemaData.NameParsingAPI(TestNames,"",ParsingCdn,RemovingParsingCase);  
               
                for (var i = 0; i < TestNames.length; i++) {
                    var parsedName = {
                        // title: '', first: '', middle: '', last: '', nick: '', suffix: '', error: [], fullname: ''
                        [ParsingCdn]:''
                     };
                parsedName = SchemaData.parseFullName(TestNames[i].toString(), 'all', 1, 0, 1,parsedName);
                arrconditionlist.push(parsedName[ParsingCdn])
               
                }
                    // $("#tblNameParsed > tbody").append(`
                    // <tr> <td>${parsedName.fullname}</td> <td>${parsedName.first}</td> <td>${parsedName.middle}</td> <td>${parsedName.Title == undefined ? "" : parsedName.Title}</td>  </tr>
                    // `)
                    $(".ulParsedCase > li").remove();
                    $.each(arrconditionlist, function (i, objctrl) {
                        // var OriginalText = objctrl[ParsingCdn].trim();
                        var OriginalText = objctrl.trim();
                        $(".ulParsedCase").append(`
                                <li>${OriginalText}</li>
                                `)
                    })

            }
            else if(Condition == "City"){
             var CityList =   SchemaData.CityandState();
             
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }
                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })

                $.each(arrconditionlist, function (i, objctrl) {
                    var CheckCityFound = "";
                    $.each(CityList, function(i,objCity){
                         CheckCityFound = SchemaData.find(objctrl,objCity)
                        if(CheckCityFound.length > 0){
                            return false;
                        }
                    })
                    if(CheckCityFound.length > 0){
                        OriginalText = CheckCityFound.toString();
                     $(".ulParsedCase").append(`
                     <li>${OriginalText}</li>
                     `)
                    }
                    else{
                     OriginalText = "";
                     $(".ulParsedCase").append(`
                     <li>${OriginalText}</li>
                     `)
                    }
                   
                  
                })

                ConditionEnd = true;
                
             
            }
            else if(Condition == "State"){
                var StateList =   SchemaData.CityandState();
                StateList = Object.keys(StateList);
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }
                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })

                $.each(arrconditionlist, function (i, objctrl) {
                    $.each(StateList, function(i,objState){
                        CheckStateFound = SchemaData.find(objctrl,objState)
                       if(CheckStateFound.length > 0){
                           return false;
                       }
                   })
                   if(CheckStateFound.length > 0){
                       OriginalText = CheckStateFound.toString();
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                   }
                   else{
                    OriginalText = "";
                    $(".ulParsedCase").append(`
                    <li>${OriginalText}</li>
                    `)
                   }
                })

            }
            else if(Condition == "StartsWith"){
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })

                var StartWord = IndexSelection.split("|")[0];
                var EndWord = IndexSelection.split("|")[1]
                var StrWord = arrconditionlist.toString();
              
                var FirstWord = StrWord.indexOf(StartWord.trim());
                var lastword = StrWord.indexOf(EndWord.trim());
                if(FirstWord == "-1" || lastword == "-1"){
                    var OriginalText =    StrWord
                }
               else if(FirstWord > lastword){
                    var OriginalText =     StrWord.substr(FirstWord,LLword)
                }
                else{
                    var LLword =  lastword - FirstWord;
                    var OrgLLword = parseInt(EndWord.length) + 1;
                        LLword = parseInt(OrgLLword) + parseInt(LLword)
                      var OriginalText =     StrWord.substr(FirstWord,LLword)
                }
             
            // $(".ulParsedCase").append(`
            // <li>${OriginalText}</li>
            // `)
            function countInstances(string, word) {
                return string.split(word).length - 1;
             }
             var arrconditionlist = [];
             var temp = "";
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                $.each(arrconditionlist, function (i, objctrl) {
                   debugger;
                    temp = objctrl
                })
             
             var CtrlIndex = countInstances(temp,EndWord.trim())
if(CtrlIndex > 1){
    $("#drpDataParsing option[value='Position']").remove();
    $("#drpDataParsing").append('<option value="Position">Position</option>');
     for (i = 0; i <= CtrlIndex; i++) {
         $("#drpSelectIndex").append(`
             <option value='${i}'>${i}</option>
             `)
     }
     var resStartswith = "";
     $.each(temp.split(EndWord), function(i,obj){
       
        if(resStartswith == ""){
            resStartswith = obj;
            $(".ulParsedCase").append(`
           <ul style='    float: left;
           width: 100%;
           padding-inline-start: 21px !important;' data-pos="${i}"> <li style="width:10%;float:left">${i}</li> <li style="width:90%;float:left">${obj}</li> </ul>
            
             `)
        }
        else{
            resStartswith = resStartswith + obj;
            $(".ulParsedCase").append(`
         <ul style='    float: left;
         width: 100%;
         padding-inline-start: 21px !important;' data-pos="${i}">   <li style="width:10%;float:left">${i}</li> <li style="width:90%;float:left">${resStartswith}</li> </ul>
            
             `)
        }
       
     })
}
           // var CtrlIndex = $("#tblParsedData > thead > tr > th:last").text().trim();
          
            }
            else if(Condition == "Between Words"){
                debugger;
                $('#drpParsingList').empty();
                $('#drpParsingList').append(`<option value="-1"> -- Select Parsing Index -- </option>`)
                if(NewStartWord != "" && NewStartWord != undefined){
                    var StartWord = NewStartWord
                    FinalStartWord = NewStartWord
                }
                else{
                    var StartWord = IndexSelection.split("|")[0];
                    FinalStartWord = IndexSelection.split("|")[0];
                }
                var EndWord = IndexSelection.split("|")[1];
                FinalEndWord = IndexSelection.split("|")[1];
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                $.each(Control, function (i, obj) {
                    arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                })
                var arrconditionlist = [];
                var temp = "";
                
                   $.each(Control, function (i, obj) {
                       arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                       FinalResultData.push($(obj).find("td.schemaname").text().trim());
                   })
                   $.each(arrconditionlist, function (i, objctrl) {
                      debugger;
                       temp = objctrl;
                      //temp = temp.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                      if(EndWord == "lastword"){
                        function lastwordfind(words) {
                            var n = words.split(" ");
                            return n[n.length - 1];
                        
                        }
                        EndWord = lastwordfind(temp)
                    }
                       var splitCount = temp.split(StartWord);
var SplitCountEndWord = temp.split(EndWord);
                       if(splitCount.length > 2 && SplitCountEndWord.length > 1){
                        $('#drpParsingMultiList').empty()
                        $('#drpParsingMultiList').append(`<option value="-1"> -- Select Position Index -- </option>`)
                        $('#drpParsingMultiList').closest(".custom-select").css('display','block')
                        $('#drpParsingList').closest(".custom-select").css('display','none')
                        $(splitCount).each(function (i) {
                            var text = temp.split(StartWord)
                            // var lastitem = text[i].split(" ").pop()
                            if(i != 0){
                                debugger;
                                var optionvalue = i - 1
                                if(text[i].includes(EndWord)){
                                    var NewText = text[i].split(EndWord)
                                    $('#drpParsingMultiList').append(`<option value="${optionvalue}">${optionvalue}</option>`)
                                $(".ulParsedCase").append(`
                                <ul class="UlPreviewlist">  <li> <input type="checkbox" name="inpCopy"></li><li style="color:e7dfdf">${NewText[0]}</li> </ul>
                                  `)
                                }
                                else{
                                    $('#drpParsingMultiList').append(`<option value="${optionvalue}">${optionvalue}</option>`)
                                
                                    $('#drpParsingMultiList').closest(".custom-select").find(".select-items").append(`<div>${i}</div>`)
                                    $(".ulParsedCase").append(`
                                    <ul class="UlPreviewlist"><li> <input type="checkbox" name="inpCopy"></li>  <li style="color:e7dfdf">${text[i]}</li> </ul>
                                      `)
                                }
                                
                            }
                           
                        })
                        SchemaData.CustomSelect()
                        return false 
                       }
                    //    else if(splitCount.length == 1){
                    //     SchemaData.ShowPanel("error", "Can not check the parse")
                    //     $("#btnCheckParsing").click()
                    //    }
                       var resStartswith = "";

                       if(StartWord.split(",").length > 1 || EndWord.split(",").length > 1){
                         
                           $.each(StartWord.split(","), function(i,objStartWordMultiple){
                               
                                   $.each(EndWord.split(","), function(j,objEndWordMultiple){
if(temp.split(objEndWordMultiple).length > 0 && temp.startsWith(objStartWordMultiple) == true){

}
else if(temp.split(objStartWordMultiple).length > 1){
    
    $.each(temp.split(objStartWordMultiple), function(i,objSplittedStartWord){
        var UpperEndWord = objEndWordMultiple.toLowerCase();
        UpperEndWord = UpperEndWord[0].toUpperCase() + UpperEndWord.slice(1);
        if(objSplittedStartWord.includes(objEndWordMultiple) == true || objSplittedStartWord.includes(UpperEndWord) == true){
            if(i !=0){
                NostartWord = "0";
                var Final_Data = objSplittedStartWord;
             
                if(objSplittedStartWord.includes(objEndWordMultiple) == true ){
                    var Final_Result = Final_Data.split(objEndWordMultiple);
                }
                else if(objSplittedStartWord.includes(UpperEndWord) == true){
                    var Final_Result = Final_Data.split(UpperEndWord);
                }
    
              
    
               $.each(Final_Result, function(i,objEndword){
           //    if(objEndword.includes(objEndWordMultiple) == true){
                if(resStartswith == ""){
                    resStartswith = objStartWordMultiple + " " + objEndword + " " + objEndWordMultiple;
                    if(IncludesStarts == "1"){
                        resStartswith= resStartswith.replace(objStartWordMultiple,"")
                        
                    }
                    if(IncludesEnds == "1"){
                       
                        function test(words) {
                            var n = words.split(" ");
                            return n[n.length - 1];
                        
                        }
                   var LastCharcter =  test(resStartswith);
                    //    if(parseInt(temp.split(objEndWordMultiple).length) - 1 != i){
                    //     resStartswith = resStartswith.replace(LastCharcter,"")
                    //    }
                    EndWord = objEndWordMultiple.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                       debugger;
                        resStartswith = resStartswith.slice(0, -1) 
                    })
                    resStartswith = resStartswith.join(" ")
                       
                      }
                      if($('#drpParsingList >option:last').val() != "-1"){
                        var DrpvalueParsing = $('#drpParsingList >option:last').val()
                        var newvalue = parseInt(DrpvalueParsing) + 1;
                        $('#drpParsingList').append(`<option value="${newvalue}">${newvalue}</option>`)
                      }
                      else{
                        $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                      }
                         $(".ulParsedCase").append(`
                         <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                          
                           `)
                }
                else{
                    if($('#drpParsingList >option:last').val() != "-1"){
                        var DrpvalueParsing = $('#drpParsingList >option:last').val()
                        var newvalue = parseInt(DrpvalueParsing) + 1;
                        $('#drpParsingList').append(`<option value="${newvalue}">${newvalue}</option>`)
                      }
                      else{
                        $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                      }
                    resStartswith = resStartswith + objEndWordMultiple
                    $(".ulParsedCase").append(`
                    <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                     
                      `)
                }
                $('#drpParsingMultiList').closest(".custom-select").css('display','none')
                  $('#drpParsingList').closest(".custom-select").css('display','block')
                  $('#drpParsingList').css('display','none')
                SchemaData.CustomSelect()
                return false 
           //    }
              
               })  
        }
        }
      
    
     })

    
}
else{
    debugger;
   
    // $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
    // $(".ulParsedCase").append(`
    // <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li></li> </ul>
     
    //   `)
    //   $('#drpParsingMultiList').closest(".custom-select").css('display','none')
    //   $('#drpParsingList').closest(".custom-select").css('display','block')
    //   $('#drpParsingList').css('display','none')
    //             SchemaData.CustomSelect()
      return false
    
   }
   $("input[name='inpCopy']").change(function(){
                                   
                        $("input[name='inpCopy']").prop("checked",false)
                        $(this).prop("checked",true)
                       
                        var Pos =  $(this).closest("ul").attr("data-pos");
                        var LastItem = $("#tblRule > tbody > tr:last");
                        if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
                            $(LastItem).remove()
                        }
                        $("#tblRule").css("display", "table")
                        var RuleAdd = $("#tblRule > tbody > tr")
                        var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                        $.each(RuleAdd, function(i,obj){
                            $("#tblRule > tbody").append(`
                            <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                            `)
                        })
                        $("#txtareaSplit").val("")
                        $("#drpDataParsing").val("0")
                        $("#drpSelectIndex").val("-1")
                        $("#txtareaReplaceTo").val("")
                        $("#txtareaReplaceTo").css("display", "none")
                        $(".incdelete").off().on("click", function () {
                            debugger;
                            var CtrlPrev = $(this).closest("tr");
                            //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                            //    CtrlPrev.prev().remove()
                            //    $(this).closest("tr").remove()
                            //}
                            if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                                CtrlPrev.next().remove()
                                $(this).closest("tr").remove()
                            }
        
                            else {
                                $(this).closest("tr").remove()
                            }
                            $(".ulParsedCase > li").remove()
                            if ($("#tblRule > tbody > tr").length > 0) {
                                var Control = $("#tblRule > tbody > tr");
                                $.each(Control, function (i, objIndexRule) {
                                    var Index = parseInt(i) + 1;
                                    $(objIndexRule).find("td > .ruleindex").text(Index)
                                })
        
                                SchemaData.RuleDefine(Control);
                            }
                            else{
                                $("#ParsingStepTime").timer({
                                    action: 'reset',
                                    seconds: 0
                                })
                                $("#ParsingStepTime").timer({
                                    action: 'pause',
                                    seconds: 0
                                })
                                $("#ParsingStepTime").css('display','none')
                            }
                        })
                    })
                                   })
                           })

                           if(NostartWord == ""){
                            $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                            $(".ulParsedCase").append(`
                            <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li></li> </ul>
                             
                              `)
                              $('#drpParsingList').css('display','none')
                              $('#drpParsingList').closest(".custom-select").css('display','block')
                              SchemaData.CustomSelect()
                              NostartWord = "";
                           }
                       }
                       
                       else if(StartWord.split(",").length ==1){
                        if(temp.split(EndWord).length > 0 && temp.startsWith(StartWord) == true){
                            $.each(temp.split(EndWord), function(i,obj){
                                
                                if(resStartswith == ""){
                                  
                                         if(IncludesStarts == "1"){
                                              resStartswith= obj.replace(StartWord,"")
                                             // resStartswith = resStartswith + EndWord;
                                              if(parseInt(temp.split(EndWord).length) - 1 != i){
                                                resStartswith =  resStartswith + EndWord;
                                              }
                                              else{
                                                resStartswith =  resStartswith;
                                              }
                                              if(IncludesEnds == "1"){
                                               
                                                function test(words) {
                                                    var n = words.split(" ");
                                                    return n[n.length - 1];
                                                
                                                }
                                            //    var LastCharcter =  test(resStartswith);
                                            //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            //     resStartswith = resStartswith.replace(LastCharcter,"")
                                            //    }
                                            EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                               
                                               
                                              }
                                         }
                                         else  if(IncludesEnds == "1"){
                                          //  resStartswith = obj;
                                          if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith =  obj + EndWord;
                                          }
                                          else{
                                            resStartswith =  obj;
                                          }
                                           // resStartswith =  obj +  EndWord ;
                                            function test(words) {
                                                var n = words.split(" ");
                                                return n[n.length - 1];
                                            
                                            }
                                        //    var LastCharcter =  test(resStartswith);
                                        //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                        //     resStartswith = resStartswith.replace(LastCharcter,"")
                                        //    }

                                        EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                          } 
                                          else{
                                           // resStartswith = obj; 
                                           if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith =  obj + EndWord;
                                          }
                                          else{
                                            resStartswith =  obj;
                                          }
                                         }
                                        
                                         $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                         $(".ulParsedCase").append(`
                                         <ul class="UlPreviewlist" data-pos="${i}">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                          
                                           `)
                                        
                                       
                                //     $(".ulParsedCase").append(`
                                //    <ul class="UlPreviewlist" data-pos="${i}">  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                    
                                //      `)
                                $('#drpParsingList').css('display','none')
                                $('#drpParsingList').closest(".custom-select").css('display','block')
                              SchemaData.CustomSelect()
                                   
                                }
                                else{
                                  //  resStartswith = resStartswith + obj;
                                  if(parseInt(temp.split(EndWord).length) - 1 !=i){
                                    resStartswith = resStartswith + obj + EndWord;
                                  }
                                  else{
                                    resStartswith = resStartswith + obj;
                                  }
                                   
                                    if(IncludesStarts == "1"){
                                        resStartswith= resStartswith.replace(StartWord,"")
                                        if(IncludesEnds == "1"){
                                         
                                          function test(words) {
                                              var n = words.split(" ");
                                              return n[n.length - 1];
                                          
                                          }
                                         var LastCharcter =  test(resStartswith);
                                         if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith = resStartswith.replace(LastCharcter,"")
                                           }
                                        }
                                   }
                                   else  if(IncludesEnds == "1"){
                                    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                        resStartswith = resStartswith + obj + EndWord;
                                      }
                                      else{
                                        resStartswith = resStartswith + obj;
                                      }
                                      function test(words) {
                                          var n = words.split(" ");
                                          return n[n.length - 1];
                                      
                                      }
                                    //  var LastCharcter =  test(resStartswith);
                                    //  if(parseInt(temp.split(EndWord).length) - 1 != i){
                                    //     resStartswith = resStartswith.replace(LastCharcter,"")
                                    //    }

                                    EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                    } 
                                    else{
                                        if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            resStartswith = resStartswith + obj + EndWord;
                                          }
                                          else{
                                            resStartswith = resStartswith + obj;
                                          }
                                      //  resStartswith = resStartswith + obj + EndWord;
                                   }
    
                                   $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                    $(".ulParsedCase").append(`
                                 <ul class="UlPreviewlist"  data-pos="${i}"> <span>${i}</span>   <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                    
                                     `)
                                     $('#drpParsingList').css('display','none')
                                     $('#drpParsingList').closest(".custom-select").css('display','block')
                                   SchemaData.CustomSelect()
    
                                //     $(".ulParsedCase").append(`
                                //  <ul class="UlPreviewlist"  data-pos="${i}">    <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                    
                                //      `)
    
                                    
                                }
                               
                             })
                           }
                           else if( temp.split(StartWord).length > 1 && temp.split(EndWord).length > 1){
                            $.each(temp.split(StartWord), function(i,objSplittedStartWord){
                                if(i !=0){
                                    var Final_Data = objSplittedStartWord;
                                 
    
    
                                   var Final_Result = Final_Data.split(EndWord)
                                   $.each(Final_Result, function(i,objEndword){
                                   
                                        if(resStartswith == ""){
                                            resStartswith = StartWord + " " + objEndword + " " + EndWord;
                                            if(IncludesStarts == "1"){
                                                resStartswith= resStartswith.replace(StartWord,"")
                                                FinalStartWord = ""
                                            }
                                            if(IncludesEnds == "1"){
                                               
                                                function test(words) {
                                                    var n = words.split(" ");
                                                    return n[n.length - 1];
                                                
                                                }
                                            //    var LastCharcter =  test(resStartswith);
                                            //    if(parseInt(temp.split(EndWord).length) - 1 != i){
                                            //     resStartswith = resStartswith.replace(LastCharcter,"")
                                            //    }
                                               

                                            EndWord = EndWord.split(" ")
                                            resStartswith = resStartswith.split(" ")
                                            $(EndWord).each(function (i) {
                                               debugger;
                                                resStartswith = resStartswith.slice(0, -1) 
                                            })
                                            resStartswith = resStartswith.join(" ")
                                               
                                              }
                                              $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                                 $(".ulParsedCase").append(`
                                                 <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                                  
                                                   `)
                                        }
                                        else{
                                            $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                                            resStartswith = resStartswith + objEndword
                                            $(".ulParsedCase").append(`
                                            <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                                             
                                              `)
                                              $('#drpParsingList').css('display','none')
                                              $('#drpParsingList').closest(".custom-select").css('display','block')
                                            SchemaData.CustomSelect()
                                        }
                                   })  
                            }
                           
                             })
                           }
                           else{
                            $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
                            $(".ulParsedCase").append(`
                            <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li></li> </ul>
                             
                              `)
                              $('#drpParsingList').css('display','none')
                              $('#drpParsingList').closest(".custom-select").css('display','block')
                              SchemaData.CustomSelect()
                           }
                           $("input[name='inpCopy']").change(function(){
                                       
                            $("input[name='inpCopy']").prop("checked",false)
                            $(this).prop("checked",true)
                           
                            var Pos =  $(this).closest("ul").attr("data-pos");
                            var LastItem = $("#tblRule > tbody > tr:last");
                            if($(LastItem).find("td >label.drpconditionvalue").text() == "Position"){
                                $(LastItem).remove()
                            }
                            $("#tblRule").css("display", "table")
                            var RuleAdd = $("#tblRule > tbody > tr")
                            var RuleIndex = parseInt($("#tblRule > tbody > tr").length) + 1;
                            $.each(RuleAdd, function(i,obj){
                                $("#tblRule > tbody").append(`
                                <tr data-save="new" data-samerule="${RuleIndex}"> <td><label class='ruleindex'>${RuleIndex}</label></td> <td><label class='drpconditionvalue'>Position</label></td> <td><label class ='condition'>${Pos}</label></td> <td> <i class ='fa fa-trash incdelete' title='remove' style='cursor:pointer;color:red'></i></td> </tr>
                                `)
                            })
                            $("#txtareaSplit").val("")
                            $("#drpDataParsing").val("0")
                            $("#drpSelectIndex").val("-1")
                            $("#txtareaReplaceTo").val("")
                            $("#txtareaReplaceTo").css("display", "none")
                            $(".incdelete").off().on("click", function () {
                                debugger;
                                var CtrlPrev = $(this).closest("tr");
                                //if (CtrlPrev.prev().find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.find("td > .drpconditionvalue").text() != "Split") {
                                //    CtrlPrev.prev().remove()
                                //    $(this).closest("tr").remove()
                                //}
                                if (CtrlPrev.find("td > .drpconditionvalue").text() == "Split" && CtrlPrev.next().find("td > .drpconditionvalue").text() == "Index") {
                                    CtrlPrev.next().remove()
                                    $(this).closest("tr").remove()
                                }
            
                                else {
                                    $(this).closest("tr").remove()
                                }
                                $(".ulParsedCase > li").remove()
                                if ($("#tblRule > tbody > tr").length > 0) {
                                    var Control = $("#tblRule > tbody > tr");
                                    $.each(Control, function (i, objIndexRule) {
                                        var Index = parseInt(i) + 1;
                                        $(objIndexRule).find("td > .ruleindex").text(Index)
                                    })
            
                                    SchemaData.RuleDefine(Control);
                                }
                                else{
                                    $("#ParsingStepTime").timer({
                                        action: 'reset',
                                        seconds: 0
                                    })
                                    $("#ParsingStepTime").timer({
                                        action: 'pause',
                                        seconds: 0
                                    })
                                    $("#ParsingStepTime").css('display','none')
                                }
                            })
                        })
                       }
                      
                   })
                  
          

            }
            else if(Condition == "Excludes"){
                debugger;
                if (ConditionEnd == true) {
                    if ($("#ULInnerText > li").length > 0) {
                        var Control = $("#tabelCollectionList > tbody > tr");
                        //  $("#tblParsedData").empty();
                    }
                }
                else {
                    var Control = $(".ulParsedCase > li");
                    if (Control.length == 0) {
                        Control = $("#tabelCollectionList > tbody > tr");
                    }
                }

                var arrconditionlist = [];
                if(Control[0].nodeName != "LI"){
                    $.each(Control, function (i, obj) {
                        arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                    })
                }
                else{
                    $.each(Control, function (i, obj) {
                        arrconditionlist.push($(obj).text())
                    })
                }
               
                $.each(arrconditionlist, function (i, objctrl) {
                   debugger;
                   var OriginalText = objctrl.replace(IndexSelection,"")
                   $(".ulParsedCase").append(`
                   <li>${OriginalText}</li>
                   `)
                })

                ConditionEnd = true;
            }
           else if(Condition == "Position"){
               debugger;
           
             
               var SelectedPosition = $(".ulParsedCase").find("ul")[IndexSelection] ;
               var OriginalText = $(SelectedPosition).find("li")[1].innerText;
                $(".ulParsedCase").append(`
            <li>${OriginalText}</li>
            `)
            $(".ulParsedCase > ul").remove();
           }
           else if(Condition == "Includes"){
               debugger;
               if (ConditionEnd == true) {
                if ($("#ULInnerText > li").length > 0) {
                    var Control = $("#tabelCollectionList > tbody > tr");
                    //  $("#tblParsedData").empty();
                }
            }
            else {
                var Control = $(".ulParsedCase > li");
                if (Control.length == 0) {
                    Control = $("#tabelCollectionList > tbody > tr");
                }
            }

            var arrconditionlist = [];
            $.each(Control, function (i, obj) {
                arrconditionlist.push($(obj).find("td.schemaname").text().trim())
            })
            $.each(arrconditionlist, function (i, objctrl) {
                var IncludesText = IndexSelection;
                var position = 0;
                var OriginalText = [objctrl.slice(0, position), IncludesText, objctrl.slice(position)].join('');
                $(".ulParsedCase").append(`
                <li>${OriginalText}</li>
                `)
            })

            ConditionEnd = true;
           }
           //$('#drpParsingMultiList').closest(".custom-select").css('display','none')
           SchemaData.CustomSelect()
           var CtrlIndex = $("#tblParsedData > thead > tr > th:last").text().trim();

           for (i = 0; i <= CtrlIndex; i++) {
               $("#drpSelectIndex").append(`
                   <option value='${i}'>${i}</option>
                   `)
           }


        })
        return ConditionEnd
    },
     find:function(key, array) {
        // The variable results needs var in this case (without 'var' a global variable is created)
      
        var results = [];
        for (var i = 0; i < array.length; i++) {
          if (array[i].indexOf(key) == 0) {
            results.push(array[i]);
          }
        }
        return results;
      },
    CityandState: function(){
        var CitystateList = ""
$.ajax({
    type: "POST",
    url: "json/citystate.json",
    dataType: 'json',
    async: false,
    contentType: "application/json; charset=utf-8",
    data: "{}",
    success: function (data) {
        debugger;
        CitystateList = data;

    }
})
return CitystateList;
    },
    segregationNew: function (objDRule) {

        var FinalRule = objDRule
        $.each(FinalRule, function (ik, objFRule) {

            var OriginalText = "";
            var Header = objFRule.SchemaName;
            var objFFRule = JSON.parse(objFRule.SchemaRule);
            var TotalList = objFRule;
            $("#tblParsedData > thead > tr").remove()
            $("#tblParsedData > tbody > tr").remove()
            $.each(objFFRule, function (i, objRule) {
                var Condition = objRule.condition.split("||||")[0];
                var IndexSelection = objRule.condition.split("||||")[1]
                if (Condition == "Index") {
                    var arrconditionlist = [];

                    var CtrlData = $("#tblParsedData > tbody > tr");
                    debugger;
                    $.each(CtrlData, function (i, objIndexData) {
                        if ($(".ulParsedCase > li").length > 0) {
                            var Control = $(".ulParsedCase > li");
                        }
                        else {
                            var Control = $(".ulparse > li");
                        }
                        var CtrlText = $(objIndexData).find("td")[IndexSelection];
                        CtrlText = $(CtrlText).text().trim()
                        arrconditionlist.push(CtrlText)

                    })
                    //   $(".ulParsedCase > li").remove();
                    $.each(arrconditionlist, function (i, objctrl) {
                        OriginalText = objctrl.trim();
                        $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                    })

                    var FinalJSON = {
                        [Header]: OriginalText
                    }
                    FinalResult.push(FinalJSON)
                    // console.log(arr);
                }

                else if (Condition == "Split") {

                    var Delimiter = objRule.condition.split("||||")[1];
                    Delimiter = Delimiter == "space" ? " " : Delimiter;
                    var Text = TotalList.SchemaDataList;
                    var CheckLength = Text.trim().split(Delimiter).length;
                    var SplittedWords = Text.trim().split(Delimiter);
                    if (CheckLength > 0) {
                        //   $("#tblParsedData").empty()
                        $.each(SplittedWords, function (ij, objSplit) {
                            var res = $("#tblParsedData > tbody > tr")[i];
                            var reshead = $("#tblParsedData > thead > tr");
                            var reslen = $(reshead).find("th")[ij];
                            if (reslen == undefined) {
                                reslen = "";
                            }
                            else {
                                var restext = $(reshead).find("th")[ij]
                                reslen = $(restext).text();
                            }
                            if ($(reshead).length == 0) {
                                $("#tblParsedData > thead").append(`
                                    <tr> <th>${ij}</th> </tr>
                                    `)
                            }
                            else if (reslen != ij) {
                                $("#tblParsedData > thead > tr").append(`
                                     <th>${ij} </th>
                                    `)
                            }
                            if ($(res).length > 0) {

                                $(res).append(`
                                    <td>${objSplit} </td>
                                    `)
                            }
                            else {

                                $("#tblParsedData > tbody").append(`
                                    <tr> <td>${objSplit} </td> </tr>
                                    `)
                            }

                        })

                    }
                    else {
                        var OriginalText = objctrl.trim();
                        $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                    }
                }
                else if (Condition == "Replace") {
                    var Delimiter = objRule.condition.split("||||")[1];
                    if (ConditionEnd == true) {
                        if ($("#ULInnerText > li").length > 0) {
                            var Control = $("#ULInnerText > li");
                            //  $("#tblParsedData").empty();
                        }
                    }
                    else {
                        var Control = $(".ulParsedCase > li");
                        if (Control.length == 0) {
                            Control = $("#ULInnerText > li");
                        }
                    }

                    var arrconditionlist = [];
                    $.each(Control, function (i, obj) {
                        arrconditionlist.push($(obj).text().trim())
                    })
                    $(".ulParsedCase > li").remove();
                    if (Delimiter.split("||").length > 1) {
                        var Delimiterlen = Delimiter.split("||");
                        $.each(Delimiterlen, function (i, objDelimiter) {
                            var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                            OrgDelimiter = OrgDelimiter.split("||")[i];
                            var ReplaceCharText = Delimiter.split("|RW|")[1];
                            if (i == 0) {
                                $.each(arrconditionlist, function (i, objctrl) {

                                    if (objctrl.trim().includes(OrgDelimiter) == true) {
                                        var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                        var SplittedCase = ReplacedText;
                                        $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                                    }
                                    else {
                                        var OriginalText = objctrl.trim();
                                        $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                                    }


                                })
                                var arrreplacedconditionlist = [];
                                var Control = $(".ulParsedCase > li");
                                $.each(Control, function (i, obj) {
                                    arrreplacedconditionlist.push($(obj).text().trim())
                                })
                            }
                            else {
                                var Control = $(".ulParsedCase > li");
                                arrreplacedconditionlist = [];
                                $.each(Control, function (i, obj) {
                                    arrreplacedconditionlist.push($(obj).text().trim())
                                })
                                $(".ulParsedCase > li").remove()
                                $.each(arrreplacedconditionlist, function (i, objctrl) {

                                    if (objctrl.trim().includes(OrgDelimiter) == true) {
                                        var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                        var SplittedCase = ReplacedText;
                                        $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                                    }
                                    else {
                                        var OriginalText = objctrl.trim();
                                        $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                                    }


                                })


                            }



                        })
                    }
                    else {
                        var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                        var ReplaceCharText = Delimiter.split("|RW|")[1];
                        $.each(arrconditionlist, function (i, objctrl) {

                            if (objctrl.trim().includes(OrgDelimiter) == true) {
                                var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                var SplittedCase = ReplacedText;
                                $(".ulParsedCase").append(`
                            <li>${SplittedCase}</li>
                            `)
                            }
                            else {
                                var OriginalText = objctrl.trim();
                                $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                            }


                        })
                    }

                    ConditionEnd = true;
                }


            })





        })
        return FinalResult;
    },

    segregationNew1: function (SchemaDataPoint, SchemaRule, Header) {
        debugger;
        FinalResult = [];
        var DrpIndexPosition = [];
        var GetStartWord = ""
        var GetEndWord = ""
        var DecidetogoPositionIndex = ""
        var index;
        var FinalJSON = {};
        var OriginalText = "";
        var NostartWord = "";
        var CSVFileHeader = Object.keys(SchemaDataPoint);
        var arrSplitted = [];
         var IndexCollectionofStartsWith = [];
         var IncludesStarts = "";
         var IncludesEnds = "";
                $.each(Header, function (il, objHeader) {
                    index = il;
              //  if(objCSVHeaderMatch == objHeader){
                    $("#tblParsedData > thead > tr").remove()
                    $("#tblParsedData > tbody > tr").remove()
                    var Rule = SchemaRule[objHeader];
                    Rule = JSON.parse(Rule);
                    var TotalList = SchemaDataPoint[objHeader];
                    var ConditionEnd = true;
                    $.each(Rule, function (i, objRule) {
                        var Condition = objRule.condition.split("||||")[0];
                        var ParsingCondition = ["title","first","middle","last","suffix","fullname"];
                        if(ParsingCondition.includes(Condition) == true){
                            Condition = "NameParsing"
                        }
                        var ParsingCdn = objRule.condition.split("||||")[0];
                        var IndexSelection = objRule.condition.split("||||")[1]
                        if(objRule.hasOwnProperty("includesexeculdes")){
                             IncludesStarts = objRule.includesexeculdes.split("|")[0].trim();
                             IncludesEnds = objRule.includesexeculdes.split("|")[1].trim();
                        }
                        if (Condition == "Index") {
                             $.each(IndexSelection.split(","), function(i,objIndexdata){
                                 if(i==0){
                                     OriginalText = arrSplitted[objIndexdata].SplittedText
                                 }
                                 else{
                                     OriginalText = OriginalText + " " + arrSplitted[objIndexdata].SplittedText
                                 }
                             })


                          //  OriginalText = arrSplitted[IndexSelection].SplittedText
                            FinalJSON = {
                                                     [objHeader]: OriginalText,
                                //  [index]: index
                            }
                           // FinalResult.push(FinalJSON)
                            arrSplitted = [];
                            // console.log(arr);
                        }
                        else if(Condition == "Position_Index"){
                            if(DrpIndexPosition[IndexSelection] == undefined){
                                IndexSelection = "0"
                            }
                            if(DrpIndexPosition.length != 0){
                                var ExactPosition = DrpIndexPosition[IndexSelection].toString();
                            }
                            else{
                                var ExactPosition = "";  
                            }
                           
                            // var ExactPosition = IndexSelection;
                            DrpIndexPosition = [];
                            Text = ExactPosition;
                            if(Text != undefined && Text != ""){
                                var StartWord = GetStartWord;
                                var EndWord = GetEndWord;
                                var StrWord = Text;
                                var StartWordtwo = StrWord.split(' ').slice(0,2).join(' ');
                                StartWord = StartWord + StartWordtwo
                                StrWord = StrWord.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                                StrWord = GetStartWord + " " + StrWord + " "+ EndWord;
                                var resStartswith = "";
                                IndexCollectionofStartsWith =[];
                                if(StrWord.split(EndWord).length > 0 && StrWord.startsWith(StartWord) == true){
                                 $.each(StrWord.split(EndWord), function(i,obj){
                                     
                                     if(resStartswith == ""){
                                       
                                              if(IncludesStarts == "1"){
                                                   resStartswith= obj.replace(GetStartWord,"")
                                                   if(IncludesEnds == "1"){
                                                    
                                                     function test(words) {
                                                         var n = words.split(" ");
                                                         return n[n.length - 1];
                                                     
                                                     }
                                                    var LastCharcter =  test(resStartswith);
                                                    resStartswith = resStartswith.replace(LastCharcter,"")
                                                   }
                                              }
                                              else  if(IncludesEnds == "1"){
                                                 resStartswith = obj;
                                                 function test(words) {
                                                     var n = words.split(" ");
                                                     return n[n.length - 1];
                                                 
                                                 }
                                                var LastCharcter =  test(resStartswith);
                                                resStartswith = resStartswith.replace(LastCharcter,"")
                                               } 
                                               else{
                                                 resStartswith = obj + EndWord; 
                                              }
                                              
                                              IndexCollectionofStartsWith.push(resStartswith)
                                            
                                       
                                     }
                                     else{
                                         resStartswith = resStartswith + obj + EndWord;
                                         if(IncludesStarts == "1"){
                                             resStartswith= resStartswith.replace(GetStartWord,"")
                                             if(IncludesEnds == "1"){
                                              
                                               function test(words) {
                                                   var n = words.split(" ");
                                                   return n[n.length - 1];
                                               
                                               }
                                              var LastCharcter =  test(resStartswith);
                                              resStartswith = resStartswith.replace(LastCharcter,"")
                                             }
                                        }
                                        else  if(IncludesEnds == "1"){
                                           resStartswith = resStartswith + obj + EndWord;
                                           function test(words) {
                                               var n = words.split(" ");
                                               return n[n.length - 1];
                                           
                                           }
                                          var LastCharcter =  test(resStartswith);
                                          resStartswith = resStartswith.replace(LastCharcter,"")
                                         } 
                                         else{
                                           resStartswith = resStartswith + obj + EndWord; 
                                        }
                                        IndexCollectionofStartsWith.push(resStartswith)
                                     }
                                    
                                  })
                                }
                                // Changed Condition
                                else if( StrWord.split(StartWord).length > 1 && StrWord.split(EndWord).length > 1 ){
                                    $.each(Text.split(StartWord), function(i,objSplittedStartWord){
                                        if(i !=0){
                                            var Final_Data = objSplittedStartWord;
                                         
                
                
                                           var Final_Result = Final_Data.split(EndWord)
                                           $.each(Final_Result, function(i,objEndword){
                                           
                                                if(resStartswith == ""){
                                                    resStartswith = StartWord + " " + objEndword + " "+ EndWord;
                                                    if(IncludesStarts == "1"){
                                                        resStartswith= resStartswith.replace(StartWord,"")
                                                        
                                                    }
                                                    if(IncludesEnds == "1"){
                                                       
                                                        function test(words) {
                                                            var n = words.split(" ");
                                                            return n[n.length - 1];
                                                        
                                                        }
                                                       var LastCharcter =  test(resStartswith);
                                                       if(parseInt(Text.split(EndWord).length) - 1 != i){
                                                        resStartswith = resStartswith.replace(LastCharcter,"")
                                                       }
                                                       
                                                       
                                                      }
                                                        
                                                      IndexCollectionofStartsWith.push(resStartswith)
                                                }
                                                else{
                                                    resStartswith = resStartswith + objEndword;
                                                    IndexCollectionofStartsWith.push(resStartswith)
                                                  
                                                }
                                           })  
                                }
                                if(Text.split(StartWord).length == 1){
                                    
                                    IndexCollectionofStartsWith.push(Text)
                                }
                                
                            })
                        }
                
                                else{
                                    // Changed Condition
                                    resStartswith = ""; 
                                    IndexCollectionofStartsWith.push("")
    
                                   
                                }
                            }
                            else{
                                resStartswith = ""; 
                                IndexCollectionofStartsWith.push("")
                            }
                           
                        }
                        else if (Condition == "Split") {
        
                            var Delimiter = objRule.condition.split("||||")[1];
                            Delimiter = Delimiter == "space" ? " " : Delimiter;
                            var Text = TotalList;
                            
                            var CheckLength = Text.trim().split(Delimiter).length;
                            var SplittedWords = Text.trim().split(Delimiter);
                            if (CheckLength > 0) {
                                //   $("#tblParsedData").empty()
                                $.each(SplittedWords, function (ij, objSplit) {
        
                                    var Splittedobj = {
                                        "Index": ij,
                                        "SplittedText": objSplit
                                    }
                                    arrSplitted.push(Splittedobj)
        
        
                                    var res = $("#tblParsedData > tbody > tr")[i];
                                    var reshead = $("#tblParsedData > thead > tr");
                                    var reslen = $(reshead).find("th")[ij];
                                    if (reslen == undefined) {
                                        reslen = "";
                                    }
                                    else {
                                        var restext = $(reshead).find("th")[ij]
                                        reslen = $(restext).text();
                                    }
                                    if ($(reshead).length == 0) {
                                        $("#tblParsedData > thead").append(`
                                            <tr> <th>${ij}</th> </tr>
                                            `)
                                    }
                                    else if (reslen != ij) {
                                        $("#tblParsedData > thead > tr").append(`
                                             <th>${ij} </th>
                                            `)
                                    }
                                    if ($(res).length > 0) {
        
                                        $(res).append(`
                                            <td>${objSplit} </td>
                                            `)
                                    }
                                    else {
        
                                        $("#tblParsedData > tbody").append(`
                                            <tr> <td>${objSplit} </td> </tr>
                                            `)
        
                                    }
        
                                })
        
                            }
                            else {
                                var OriginalText = objctrl.trim();
                                $(".ulParsedCase").append(`
                                    <li>${OriginalText}</li>
                                    `)
                                var Splittedobj = {
                                    "Index": ij,
                                    "SplittedText": objctrl.trim()
                                }
                                arrSplitted.push(Splittedobj)
                            }
                        }
                        else if (Condition == "Replace") {
                            var Delimiter = objRule.condition.split("||||")[1];
                             Text = TotalList;
                            // var Text = FinalJSON.Biography;
        
                          
                            $(".ulParsedCase > li").remove();
                            if (Delimiter.split("||").length > 1) {
                                var Delimiterlen = Delimiter.split("||");
                                $.each(Delimiterlen, function (i, objDelimiter) {
                                    var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                                    OrgDelimiter = OrgDelimiter.split("||")[i];
                                    var ReplaceCharText = Delimiter.split("|RW|")[1];
                                    if (i == 0) {
                                        $.each(arrconditionlist, function (i, objctrl) {
        
                                            if (objctrl.trim().includes(OrgDelimiter) == true) {
                                                var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                                var SplittedCase = ReplacedText;
                                                $(".ulParsedCase").append(`
                                    <li>${SplittedCase}</li>
                                    `)
                                            }
                                            else {
                                                var OriginalText = objctrl.trim();
                                                $(".ulParsedCase").append(`
                                    <li>${OriginalText}</li>
                                    `)
                                            }
        
        
                                        })
                                        var arrreplacedconditionlist = [];
                                        var Control = $(".ulParsedCase > li");
                                        $.each(Control, function (i, obj) {
                                            arrreplacedconditionlist.push($(obj).text().trim())
                                        })
                                    }
                                    else {
                                        var Control = $(".ulParsedCase > li");
                                        arrreplacedconditionlist = [];
                                        $.each(Control, function (i, obj) {
                                            arrreplacedconditionlist.push($(obj).text().trim())
                                        })
                                        $(".ulParsedCase > li").remove()
                                        $.each(arrreplacedconditionlist, function (i, objctrl) {
        
                                            if (objctrl.trim().includes(OrgDelimiter) == true) {
                                                var ReplacedText = objctrl.trim().replace(OrgDelimiter, ReplaceCharText);
                                                var SplittedCase = ReplacedText;
                                                $(".ulParsedCase").append(`
                                    <li>${SplittedCase}</li>
                                    `)
                                            }
                                            else {
                                                var OriginalText = objctrl.trim();
                                                $(".ulParsedCase").append(`
                                    <li>${OriginalText}</li>
                                    `)
                                            }
        
        
                                        })
                                        FinalJSON = {
                                                                                    [objHeader]: OriginalText,
                                            //  [index]: index
                                        }
                                     //   FinalResult.push(FinalJSON)
        
                                    }
        
        
        
                                })
                            }
                            else {
                                var Delimiter = objRule.condition.split("||||")[1];
                                var OrgDelimiter = Delimiter.split("|RW|")[0].trim();
                                var ReplaceCharText = Delimiter.split("|RW|")[1];
                             //   $.each(arrconditionlist, function (i, objctrl) {
        
                                    if (Text.trim().includes(OrgDelimiter) == true) {
                                        var ReplacedText = Text.trim().replace(OrgDelimiter, ReplaceCharText);
                                        var SplittedCase = ReplacedText;
                                        OriginalText = SplittedCase;
                                        $(".ulParsedCase").append(`
                                    <li>${SplittedCase}</li>
                                    `)
                                    }
                                    else {
                                         OriginalText = Text.trim();
                                        $(".ulParsedCase").append(`
                                    <li>${OriginalText}</li>
                                    `)
                                    }
        
        
                                //   })
        
                                    FinalJSON = {
                                                                                       [objHeader]: OriginalText,
                                        //  [index]: index
                                    }
                                 //   FinalResult.push(FinalJSON)
                            }
        TotalList = OriginalText;
                            
                        }
                        else if(Condition == "Email"){

                            var Text = TotalList;
                            var regexpattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi
                            OriginalText = SchemaData.findEmailAddresses(Text,regexpattern)
                            $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                            FinalJSON = {
                                [objHeader]: OriginalText,
           
       }
                           
            
                        }
                        else if(Condition == "StartsWith"){
                            var Text = TotalList;
                            var StartWord = IndexSelection.split("|")[0];
                var EndWord = IndexSelection.split("|")[1]
                var StrWord = Text;
              
                var FirstWord = StrWord.indexOf(StartWord.trim());
                var lastword = StrWord.indexOf(EndWord.trim());
                StartsWitharr = Text.split(EndWord.trim())
                if(FirstWord == "-1" || lastword == "-1"){
                    var OriginalText = Text;
                    FinalJSON = {
                      
                        [objHeader]: OriginalText,
   
}
                }
              else  if(FirstWord > lastword){
                    var OriginalText =     StrWord.substr(FirstWord,LLword)
                    FinalJSON = {
                        [objHeader]: OriginalText,
   
}
                }
                else{
                    var LLword =  lastword - FirstWord;
                    var OrgLLword = parseInt(EndWord.length) + 1;
                        LLword = parseInt(OrgLLword) + parseInt(LLword)
                      var OriginalText =     StrWord.substr(FirstWord,LLword)
                      FinalJSON = {
                        [objHeader]: OriginalText,
   
}
                }
                        }
                        else if(Condition == "Between Words"){
                            debugger;
                            var Text = TotalList;
                            var StartWord = IndexSelection.split("|")[0];
                            GetStartWord = StartWord;
                var EndWord = IndexSelection.split("|")[1]
                GetEndWord = EndWord;
                var StrWord = Text;
                if(GetEndWord == "lastword"){
                    function lastwordfind(StrWord) {
                        var n = StrWord.split(" ");
                        return n[n.length - 1];
                    
                    }
                    GetEndWord = lastwordfind(StrWord)
                }
                EndWord = GetEndWord;
             
                StrWord = StrWord.trim().replace(/(\r\n|\n|\r|\t)/gm," ");
                var splitCount = StrWord.split(StartWord);
                var SplitCountEndWord =  StrWord.split(EndWord)
                if(splitCount.length > 2 && SplitCountEndWord.length > 1){
                //  $('#drpParsingMultiList').empty()
                //  $('#drpParsingMultiList').append(`<option value="-1"> -- Select Parsing Index -- </option>`)
                //  $('#drpParsingMultiList').closest(".custom-select").css('display','block')
                //  $('#drpParsingList').closest(".custom-select").css('display','none')
                 $(splitCount).each(function (i) {
                     var text = StrWord.split(StartWord)
                     // var lastitem = text[i].split(" ").pop()
                     if(i != 0){
                         debugger;
                        
                         
                       
                         if(text[i].includes(EndWord)){
                             var NewText = text[i].split(EndWord)
                             if(IncludesEnds == "0"){
                                DrpIndexPosition.push(NewText[0] + EndWord)
                             }
                             else{
                                DrpIndexPosition.push(NewText[0])
                             }
                             
                        //      $('#drpParsingMultiList').append(`<option value="${i}">${i}</option>`)
                        //  $(".ulParsedCase").append(`
                        //  <ul class="UlPreviewlist">  <li style="color:red">${NewText[0]}</li> </ul>
                        //    `)
                         }
                         else{
                             if(IncludesEnds == "0"){
                                DrpIndexPosition.push(text[i] + EndWord)
                             }
                             else{
                                DrpIndexPosition.push(text[i])
                             }
                         }
                         
                     }
                    
                 })
                //  SchemaData.CustomSelect()NewText[0] + EndWord
                //  return false 
                }
                else{

              
             

                var resStartswith = "";
                IndexCollectionofStartsWith =[];
                var binddeddata = ""
                if(StartWord.split(",").length > 1 || EndWord.split(",").length > 1){
                    $.each(StartWord.split(","), function(i,objStartWordMultiple){
                            $.each(EndWord.split(","), function(j,objEndWordMultiple){
                                if( StrWord.split(objStartWordMultiple).length > 1 && StrWord.split(objEndWordMultiple).length > 1 ){

                             
if(StrWord.split(objStartWordMultiple).length > 1){
$.each(StrWord.split(objStartWordMultiple), function(i,objSplittedStartWord){
 if(objSplittedStartWord.includes(objEndWordMultiple) == true){
     if(i !=0){
        NostartWord = "0";
         var Final_Data = objSplittedStartWord;
      


        var Final_Result = Final_Data.split(objEndWordMultiple);

        $.each(Final_Result, function(i,objEndword){
    //    if(objEndword.includes(objEndWordMultiple) == true){
         if(resStartswith == ""){
             resStartswith = objStartWordMultiple + " " + objEndword + " " + objEndWordMultiple;
             if(IncludesStarts == "1"){
                 resStartswith= resStartswith.replace(objStartWordMultiple,"")
                 
             }
             if(IncludesEnds == "1"){
                
                 function test(words) {
                     var n = words.split(" ");
                     return n[n.length - 1];
                 
                 }
                // var LastCharcter =  test(resStartswith);
                // if(parseInt(temp.split(objEndWordMultiple).length) - 1 != i){
                //  resStartswith = resStartswith.replace(LastCharcter,"")
                // }
                EndWord = objEndWordMultiple.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                        resStartswith = resStartswith.slice(0, -1)
                    })
                    resStartswith.join(" ")
                    EndWord = EndWord.join(" ")
                
                
               }
               IndexCollectionofStartsWith=[];
               IndexCollectionofStartsWith.push(resStartswith)
               binddeddata = "1";
            //    $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
            //       $(".ulParsedCase").append(`
            //       <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
                   
            //         `)
         }
         else{
            //  $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
            //  resStartswith = resStartswith + objEndWordMultiple
            //  IndexCollectionofStartsWith=[];
            //  IndexCollectionofStartsWith.push(resStartswith)
             binddeddata = "1";
            //  $(".ulParsedCase").append(`
            //  <ul class="UlPreviewlist"  data-pos="${i}" >  <li> <input type="checkbox" name="inpCopy"></li> <li>${resStartswith}</li> </ul>
              
            //    `)
         }
        //  $('#drpParsingMultiList').closest(".custom-select").css('display','none')
        //    $('#drpParsingList').closest(".custom-select").css('display','block')
        //    $('#drpParsingList').css('display','none')
        //  SchemaData.CustomSelect()
        //  return false 
    //    }
       
        })  
 }
 }


})


}
else{
debugger;
IndexCollectionofStartsWith=[];
IndexCollectionofStartsWith.push(StrWord)
// $('#drpParsingList').append(`<option value="${i}">${i}</option>`)
// $(".ulParsedCase").append(`
// <ul class="UlPreviewlist">  <li> <span>${i}</span><input type="checkbox" name="inpCopy"></li> <li>${temp}</li> </ul>

// `)

return false

}
}
else {
    if(binddeddata == ""){
        IndexCollectionofStartsWith = [];  
        IndexCollectionofStartsWith.push("")
    }
}
                            })
                    })
                }
                else if(StrWord.split(EndWord).length > 0 && Text.startsWith(StartWord) == true){
                 $.each(StrWord.split(EndWord), function(i,obj){
                     
                     if(resStartswith == ""){
                       
                              if(IncludesStarts == "1"){
                                   resStartswith= obj.replace(StartWord,"")
                                   if(IncludesEnds == "1"){
                                    
                                     function test(words) {
                                         var n = words.split(" ");
                                         return n[n.length - 1];
                                     
                                     }
                                    var LastCharcter =  test(resStartswith);
                                    resStartswith = resStartswith.replace(LastCharcter,"")
                                   }
                              }
                              else  if(IncludesEnds == "1"){
                                 resStartswith = obj;
                                 function test(words) {
                                     var n = words.split(" ");
                                     return n[n.length - 1];
                                 
                                 }
                                // var LastCharcter =  test(resStartswith);
                                // resStartswith = resStartswith.replace(LastCharcter,"")
                                EndWord = EndWord.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                        resStartswith = resStartswith.slice(0, -1)
                    })
                    resStartswith.join(" ")
                    EndWord = EndWord.join(" ")
                               } 
                               else{
                                 resStartswith = obj; 
                              }
                              
                              IndexCollectionofStartsWith.push(resStartswith)
                            
                       
                     }
                     else{
                         resStartswith = resStartswith + obj + EndWord;
                         if(IncludesStarts == "1"){
                             resStartswith= resStartswith.replace(StartWord,"")
                             if(IncludesEnds == "1"){
                              
                               function test(words) {
                                   var n = words.split(" ");
                                   return n[n.length - 1];
                               
                               }
                            //   var LastCharcter =  test(resStartswith);
                            //   resStartswith = resStartswith.replace(LastCharcter,"")

                            EndWord = EndWord.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                        resStartswith = resStartswith.slice(0, -1)
                    })
                    resStartswith.join(" ")
                    EndWord = EndWord.join(" ")
                             }
                        }
                        else  if(IncludesEnds == "1"){
                           resStartswith = resStartswith + obj + EndWord;
                           function test(words) {
                               var n = words.split(" ");
                               return n[n.length - 1];
                           
                           }
                        //   var LastCharcter =  test(resStartswith);
                        //   resStartswith = resStartswith.replace(LastCharcter,"")
                        EndWord = EndWord.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                        resStartswith = resStartswith.slice(0, -1)
                    })
                    resStartswith.join(" ")
                    EndWord = EndWord.join(" ")
                         } 
                         else{
                           resStartswith = resStartswith + obj + EndWord; 
                        }
                        IndexCollectionofStartsWith.push(resStartswith)
                     }
                    
                  })
                }
                else if( Text.split(StartWord).length > 1 && Text.split(GetEndWord).length > 1 ){
                    $.each(Text.split(StartWord), function(i,objSplittedStartWord){
                        if(i !=0){
                            var Final_Data = objSplittedStartWord;
                         


                           var Final_Result = Final_Data.split(EndWord)
                           $.each(Final_Result, function(i,objEndword){
                           
                                if(resStartswith == ""){
                                    resStartswith = StartWord + " " + objEndword + " "+ EndWord;
                                    if(IncludesStarts == "1"){
                                        resStartswith= resStartswith.replace(StartWord,"")
                                        
                                    }
                                    if(IncludesEnds == "1"){
                                       
                                        function test(words) {
                                            var n = words.split(" ");
                                            return n[n.length - 1];
                                        
                                        }
                                    //    var LastCharcter =  test(resStartswith);
                                    //    if(parseInt(Text.split(EndWord).length) - 1 != i){
                                    //     resStartswith = resStartswith.replace(LastCharcter,"")
                                    //    }
                                    EndWord = EndWord.split(" ")
                    resStartswith = resStartswith.split(" ")
                    $(EndWord).each(function (i) {
                        resStartswith = resStartswith.slice(0, -1)
                    })
                    resStartswith.join(" ")
                    EndWord = EndWord.join(" ")
                                       
                                       
                                      }
                                        
                                      IndexCollectionofStartsWith.push(resStartswith)
                                }
                                else{
                                    resStartswith = resStartswith + objEndword;
                                    IndexCollectionofStartsWith.push(resStartswith)
                                  
                                }
                           })  
                }
                if(Text.split(StartWord).length == 1){
                    
                    IndexCollectionofStartsWith.push(Text)
                }
                
            })
        }

                else{
                   
                    if(NostartWord == ""){
                        resStartswith = ""; 
                        IndexCollectionofStartsWith.push("")
                          NostartWord = "";
                       }
                }
                
               
            }

                        }
                        else if(Condition == "NameParsing"){
                            var Text = TotalList;
                                var parsedName = {
                                    // title: '', first: '', middle: '', last: '', nick: '', suffix: '', error: [], fullname: ''
                                    [ParsingCdn]:''
                                 };
                            parsedName = SchemaData.parseFullName(Text, 'all', 1, 0, 1,parsedName);
                            var OriginalText = parsedName[ParsingCdn]
                            FinalJSON = {
                                [objHeader]: OriginalText,  
        }
                           
                        }
                        else if(Condition == "Excludes"){
                            debugger;
                            var Text = TotalList;
                            var ReplaceText = IndexSelection;
                            var OriginalText = Text.replace(ReplaceText,"");
                            FinalJSON = {
                                [objHeader]: OriginalText,
           
        }
                            
                        }
                        else if(Condition == "Position"){
                             debugger;
                           if(IndexCollectionofStartsWith.length > 0){
                               if(IndexCollectionofStartsWith != ""){
                                   if(IndexCollectionofStartsWith.length == 1){
                                    var OriginalText = IndexCollectionofStartsWith[0].toString()                                  
                                   }
                                   else{
                                    var OriginalText = IndexCollectionofStartsWith[IndexSelection].toString()
                                   }
                                   if(OriginalText.split(" ").pop() == "lastword"){
                                    var lastIndex = OriginalText.lastIndexOf(" ");
                                    OriginalText = OriginalText.substring(0, lastIndex);
                                }
                               
                               }
                               else{
                                var OriginalText = "";
                               }
                           
                            FinalJSON = {
                                [objHeader]: OriginalText,
           
                                }
                                TotalList = OriginalText;
                           }
                             
                            
                        }
                        else if(Condition == "URL"){

                            var Text = TotalList;
                            var regexpattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
                            OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                            $(".ulParsedCase").append(`
                            <li>${OriginalText}</li>
                            `)
                            FinalJSON = {
                                [objHeader]: OriginalText,
           
       }
                           
            
                           
            
                        }
                        else if(Condition == "PhoneNumber"){
                            var Text = TotalList;
                            var regexpattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/gi;
                           var regexpattern1 =  /\([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi;
                               var regexpattern2 =  /[0-9]{3}.[0-9]{3}.[0-9]{4}/gi;
                               var regexpattern3 =  /\([0-9]{3}\)\s[0-9]{3}.[0-9]{4}/gi;
                               
                            var arrpattern = ["/[0-9]{3}-[0-9]{3}-[0-9]{4}/gi","/([0-9]{3}\)[0-9]{3}-[0-9]{4}/gi"]
                            OriginalText = SchemaData.findEmailAddresses(Text,regexpattern)                         
                                if(OriginalText == ""){
                                  OriginalText = SchemaData.findEmailAddresses(Text,regexpattern1)
                                  FinalJSON = {
                                    [objHeader]: OriginalText,
               
           }
                                  if(OriginalText != ""){
                                    FinalJSON = {
                                        [objHeader]: OriginalText,
                   
               }            
                     TotalList = OriginalText;
                                  }
                                  else {
                                      OriginalText = SchemaData.findEmailAddresses(Text,regexpattern2)
                                      if(OriginalText != ""){
                                        FinalJSON = {
                                            [objHeader]: OriginalText,
                       
                   }
                                      }
                                      else{
                                        OriginalText = SchemaData.findEmailAddresses(Text,regexpattern3)
                                        if(OriginalText != ""){
                                          FinalJSON = {
                                              [objHeader]: OriginalText,
                         
                     }
                                        }
                                      }
                                    
                                      TotalList = OriginalText;
                                  }
                                }
                                else{
                                    FinalJSON = {
                                        [objHeader]: OriginalText,
                   
               }
                                 TotalList = OriginalText;
                                }
                               
                            
                           
                            
            
                        }
                        else if(Condition == "Zipcode"){
                            var Text = TotalList;
                            var regexpattern = /\d{5}(?:[-\s]\d{4})?/gi;
                            OriginalText = SchemaData.findEmailAddresses(objctrl,regexpattern)
                            FinalJSON = {
                                [objHeader]: OriginalText,
           
       }
            
                            
            
                        }
                        else if(Condition == "City"){
                            var CityList =   SchemaData.CityandState();
                            
                               if (ConditionEnd == true) {
                                   if ($("#ULInnerText > li").length > 0) {
                                       var Control = $("#tabelCollectionList > tbody > tr");
                                       //  $("#tblParsedData").empty();
                                   }
                               }
                               else {
                                   var Control = $(".ulParsedCase > li");
                                   if (Control.length == 0) {
                                       Control = $("#tabelCollectionList > tbody > tr");
                                   }
                               }
                               var arrconditionlist = [];
                               $.each(Control, function (i, obj) {
                                   arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                               })
               
                               $.each(arrconditionlist, function (i, objctrl) {
                                   var CheckCityFound = "";
                                   $.each(CityList, function(i,objCity){
                                        CheckCityFound = SchemaData.find(objctrl,objCity)
                                       if(CheckCityFound.length > 0){
                                           return false;
                                       }
                                   })
                                   if(CheckCityFound.length > 0){
                                       OriginalText = CheckCityFound.toString();
                                    $(".ulParsedCase").append(`
                                    <li>${OriginalText}</li>
                                    `)
                                   }
                                   else{
                                    OriginalText = "";
                                    $(".ulParsedCase").append(`
                                    <li>${OriginalText}</li>
                                    `)
                                   }
                                  
                                 
                               })
               
                               ConditionEnd = true;
                               
                            
                        }
                        else if(Condition == "State"){
                            var StateList =   SchemaData.CityandState();
                            StateList = Object.keys(StateList);
                            if (ConditionEnd == true) {
                                if ($("#ULInnerText > li").length > 0) {
                                    var Control = $("#tabelCollectionList > tbody > tr");
                                    //  $("#tblParsedData").empty();
                                }
                            }
                            else {
                                var Control = $(".ulParsedCase > li");
                                if (Control.length == 0) {
                                    Control = $("#tabelCollectionList > tbody > tr");
                                }
                            }
                            var arrconditionlist = [];
                            $.each(Control, function (i, obj) {
                                arrconditionlist.push($(obj).find("td.schemaname").text().trim())
                            })
            
                            $.each(arrconditionlist, function (i, objctrl) {
                                $.each(StateList, function(i,objState){
                                    CheckStateFound = SchemaData.find(objctrl,objState)
                                   if(CheckStateFound.length > 0){
                                       return false;
                                   }
                               })
                               if(CheckStateFound.length > 0){
                                   OriginalText = CheckStateFound.toString();
                                $(".ulParsedCase").append(`
                                <li>${OriginalText}</li>
                                `)
                               }
                               else{
                                OriginalText = "";
                                $(".ulParsedCase").append(`
                                <li>${OriginalText}</li>
                                `)
                               }
                            })
            
                        }
                    })
                    
              //  }
              
            })
           
       

    
       var objF =  FinalJSON
        
        return FinalJSON;
    },
    GetHarvestedStatusIDOnRUn: function(ExecutionID,type){
        var obj = new Object();
        obj.intFlag = "18";
        obj.intExecutionID = ExecutionID
        var StatusFinal = ""
        $.ajax({
          type: "POST",
          url: HostingPath + "/api/SaveIntermediateSchemaFinal",
          dataType: 'json',
          async: false,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (data) {
              if(type == "Refresh"){
                ExecutionStatus = data.response[0][0].StatusID
                Comments = data.response[0][0].Comments
                StatusFinal = ExecutionStatus + "||" + Comments;
              }
              else{
                ExecutionStatus = data.response[0][0].StatusID
                StatusFinal = ExecutionStatus;
              }
           // console.log(data.response[0][0].StatusID)
         
          }
        })
      return StatusFinal
    },
    OldValues: function () {
        var Ctrl = $("#tblRule > tbody > tr")
        $.each(Ctrl, function (i, objtd) {
            $(objtd).attr("data-save", "old")
        })
    },
    RuleExistsValidation: function () {
        var bool = true;
        var CtrlData = $("#tblRule > tbody > tr");
        var Condition = $("#drpDataParsing option:selected").val();
        if (Condition == "Index") {
            var ConditionValue = $("#drpSelectIndex option:selected").val();
        }
        else {
            var ConditionValue = $("#txtareaSplit").val() == " " ? "space" : $("#txtareaSplit").val();
        }
        $.each(CtrlData, function (i, objData) {
            var Ctr = $("#tblRule > tbody > tr:last")

            if ($(Ctr).find("td > label.drpconditionvalue").text() == "Index") {
                SchemaData.ShowPanel("error", "Already Index Found")
                bool = false;
                return false
            }
            else if ($(objData).find("td > label.drpconditionvalue").text() == "Replace" && $(objData).find("td > label.condition").text().split("|RW|")[0] == ConditionValue && $(objData).find("td > label.condition").text().split("|RW|")[1] == $("#txtareaReplaceTo").val()) {
                SchemaData.ShowPanel("error", "Already rule exists")
                bool = false;
                return false
            }
            else if ($(objData).find("td > label.drpconditionvalue").text() == Condition && $(objData).find("td > label.condition").text() == ConditionValue) {
                SchemaData.ShowPanel("error", "Already rule exists")
                bool = false;
                return false

            }

            else {
                bool = true;
            }
        })
        return bool;
    },
    ApplyRule: function (AuditID,AgentName) {
        var valuedata = "";
        // $.ajax({
        //     type: "POST",
        //     url: HostingPath +"/api/readcsvfileforparsing",
        //     dataType: 'json',
        //     async: false,
        //     contentType: "application/json; charset=utf-8",
        //     data: "{}",
        //     success: function (data) {
        //         debugger;
        //         valuedata = data.response;
        //     }

        // })

        var DecryptDataOPSchemaresult = "";
        var obj = new Object();
        obj.AuditID = AuditID;

        $.ajax({
            type: "POST",
            url: HostingPath + "/api/MongoEncryptedOutputResult",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                DecryptDataOPSchemaresult = data.response;
                DecryptDataOPSchemaresult = DecryptDataOPSchemaresult[0].Final_schema_output
             valuedata  = SchemaData.GetOutputDecryptDownload(DecryptDataOPSchemaresult,AgentName,"1")
              //  SchemaData.GetRules();
                //  DecryptDataOPSchemaresult = DecryptDataOPSchemaresult[0].Final_schema_output
                //console.log(DecryptDataOPSchemaresult)
            }
        })
        return valuedata;
    },

    ApplyRuleJSON1: function (valuedata,AuditID,AgentName,Type) {
        debugger;
        var HeaderData = [];
        var HeaderListData = [];
        var AppliedRuleData = [];
        var FinalData = [];
        var RuleList;
        var resHeader;
        var obj = new Object();
        obj.AuditID =AuditID
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/GetRules",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
                if(data.response.length > 0){
                    var RulesData =   JSON.parse(data.response[0].jsonresult)
                    valuedata = JSON.parse(valuedata);
                      var resF = "";
                    //  var FinalData = [];
                      var NewData = '';
                      //  console.log(valuedata);
                      $.each(RulesData, function (iHeader, objRuleAffect) {
                          if(iHeader == "0"){
                            resHeader = Object.keys(objRuleAffect);
      
                            RuleList = objRuleAffect;
        
                            //  $.each(objRuleAffect, function (ik, objh) {
        
                            $.each(valuedata, function (i, objAddedData) {
                                
                                //  objAddedData[resHeader]
        
                                DataFinal = SchemaData.segregationNew1(objAddedData, RuleList, resHeader);
                                var arr1 = Object.keys(objAddedData);
                                var arr2 = resHeader;
                                
                                 
        var array3 = arr1.filter(function(obj) { 
            return arr2.indexOf(obj) == -1; 
        });
        
        var BalanceHeader = "";
        var resfinal = {};
        $.each(array3, function(i,objBalanceLIst){
            
            if(BalanceHeader == ""){
                BalanceHeader = {
                    [objBalanceLIst]: objAddedData[objBalanceLIst]
                }
                resfinal = BalanceHeader;
            }
            else{
                BalanceHeader = {
                    [objBalanceLIst]: objAddedData[objBalanceLIst]
                }
                resfinal =   Object.assign(resfinal,BalanceHeader)
            }
        
        })
                                
                                 resF = Object.assign(resfinal,DataFinal)
                                 FinalData.push(resF)
                                 NewData = FinalData;
                            })
                          }
                          else{
                            NewData = FinalData;
                            FinalData = [];
                            resHeader = Object.keys(objRuleAffect);
      
                            RuleList = objRuleAffect;
        
                            //  $.each(objRuleAffect, function (ik, objh) {
        
                            $.each(NewData, function (i, objAddedData) {
                                
                                //  objAddedData[resHeader]
                                debugger;
                                DataFinal = SchemaData.segregationNew1(objAddedData, RuleList, resHeader);
                                var arr1 = Object.keys(objAddedData);
                                var arr2 = resHeader;
                                
                                 
        var array3 = arr1.filter(function(obj) { 
            return arr2.indexOf(obj) == -1; 
        });
        
        var BalanceHeader = "";
        var resfinal = {};
        $.each(array3, function(i,objBalanceLIst){
            
            if(BalanceHeader == ""){
                BalanceHeader = {
                    [objBalanceLIst]: objAddedData[objBalanceLIst]
                }
                resfinal = BalanceHeader;
            }
            else{
                BalanceHeader = {
                    [objBalanceLIst]: objAddedData[objBalanceLIst]
                }
                resfinal =   Object.assign(resfinal,BalanceHeader)
            }
        
        })
                                
                                 resF = Object.assign(resfinal,DataFinal)
                                 FinalData.push(resF)
                               
                            })
                          }
                         
                          // })
      
      
      
                      })
                      console.log(FinalData)
                      if(Type != "ShowOnly"){
                        var arr = [];
                    
                        $.each($("#drpSchemaAssign > option"), function(i,obj){
                            arr.push($(obj).text())
                        })
                       
                        arr.push("Source_Url")
                        arr.push("Target_Url")
                        arr.push("ExecutionID")
                        SchemaHeader = arr.toString()
                        var CSVData = SchemaData.ConvertToCSVDownload(FinalData,AgentName,arr)
                      }
                     
                }
                else{
                    AppliedRuleData = [];
                    SchemaData.ShowPanel("error", "Kindly apply rule ")
                }

             

            }

        })
        return FinalData;
    },







    ApplyRuleJSON: function (valuedata) {
        var HeaderData = [];
        var HeaderListData = [];
        var AppliedRuleData = [];
        $.ajax({
            type: "POST",
            url: "json/rule.json",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: "{}",
            success: function (data) {
                debugger;

                //console.log(HeaderData);
                var ApplyRule = valuedata;
                $.each(ApplyRule, function (i, objData) {
                    HeaderData = Object.keys(objData);
                    $.each(HeaderData, function (i, objHeader) {
                        $.each(data[0], function (Headername, objRule) {
                            if (objHeader == Headername) {
                                var FinalRule = {
                                    "SchemaName": Headername,
                                    "SchemaRule": JSON.stringify(objRule),
                                    "SchemaDataList": objData[Headername]
                                }
                                AppliedRuleData.push(FinalRule)
                            }


                        })
                    })

                })
                // Store SchemaList
                $.each(data[0], function (i, HeaderList) {
                    HeaderListData = Object.keys(data[0]);
                })
                $("#inpHeaderList").val(JSON.stringify(HeaderListData))
                console.log(AppliedRuleData)
            }

        })
        return AppliedRuleData;
    },



    ApplyLogic: function (DataSegeration) {
        var DataFinal;
        var HeaderData = []
        $.each(DataSegeration, function (i, objRule) {
            debugger;
            DataFinal = SchemaData.segregationNew(objRule);
            console.log(DataFinal)
        })

    },
    

        ReadCSVFile: function(){

$.ajax({
    type: "POST",
    url: HostingPath +"/api/readcsvfileforparsing",
    dataType: 'json',
    async: false,
    contentType: "application/json; charset=utf-8",
    data: "{}",
    success: function (data) {
        debugger;
    }
})
        },

    GetAuditIDandSchemaID: function(){
        var obj = new Object();
        var URLSchemaListID = "";
        obj.intFlag = "13";
        obj.strAgentURL = $("#spnhrefdetailsURL").text().trim()
        obj.intUserID = $("#SpnUserID").text();
        $.ajax({
            type: "POST",
            url: HostingPath + "/api/SaveIntermediateSchemaFinal",
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            success: function (data) {
               
                    $(".loadersection").css("display","none")
                   
                    if(data.response[0][0] == undefined){
                    }
                    else{
                       
                        var AuditID = data.response[0][0].ExecutionID;
                        var URLSchemaID = data.response[0][0].URLSchemaID;
                        $("#hdnUserAuditID").val(AuditID)
                        $("#hdnURLSchemaID").val(URLSchemaID)
                        URLSchemaListID = URLSchemaID;
                    }
                   
               
            }
        })
        return URLSchemaListID
    },
AuditIDList: function(type,CtrlField){
    var obj = new Object();
   
    obj.intFlag = "16";
  
    obj.intUserID = $("#SpnUserID").text();
    $(".loadersection").css('display','block')

    $.ajax({
        type: "POST",
        url: HostingPath + "/api/SaveIntermediateSchemaFinal",
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: function (data) {
            if(type == "SimilarType"){
                $("#similarurlssteps").empty();
                var AuditIDDataList = data.response[0];
              $.each(AuditIDDataList, function(i,objData){
                  $("#similarurlssteps").append(`
                  <option data-auditid=${objData.ExecutionID} >${objData.AgentName}</option>
                  `)
              })
              $(".loadersection").css('display','none')
            }
            else if(type == "CopyAgents"){
                $("#ddlAgentnamelist").empty();
                var AuditIDDataList = data.response[0];
              $.each(AuditIDDataList, function(i,objData){
                  $("#ddlAgentnamelist").append(`
                  <option data-MainURLSchemaID=${objData.MainURLSchemaID} data-URLSchemaID=${objData.URLSchemaID} data-auditid=${objData.ExecutionID}>${objData.AgentName}</option>
                  `)
              })
              $(".loadersection").css('display','none')
            }
            else if(type == "Segmentation"){
                var id = $(CtrlField).find("datalist").attr("id")
              $("#"+id).empty();
                var AuditIDDataList = data.response[0];
              $.each(AuditIDDataList, function(i,objData){
                $("#"+id).append(`
                  <option data-MainURLSchemaID=${objData.MainURLSchemaID} data-URLSchemaID=${objData.URLSchemaID} data-auditid=${objData.ExecutionID} >${objData.AgentName}</option>
                  `)
              })
              $(".loadersection").css('display','none')
            }
            else{
                $("#similarurls").empty();
                var AuditIDDataList = data.response[0];
              $.each(AuditIDDataList, function(i,objData){
                  $("#similarurls").append(`
                  <option data-auditid=${objData.ExecutionID} >${objData.AgentName}</option>
                  `)
              })
              $(".loadersection").css('display','none')
            }
            
            
        }
    })
},
   
     findEmailAddresses:function (StrObj,regexpattern) {
        var separateEmailsBy = " ";
        var email = ""; // if no match, use this
        var emailsArray = StrObj.match(regexpattern);
        if (emailsArray) {
        email = "";
        for (var i = 0; i < emailsArray.length; i++) {
        if (i != 0) email += separateEmailsBy;
        email += emailsArray[i];
        }
        }
        return email;
        },
        ResetParsingTab: function () {
            debugger;
            $('.rdoCollList').attr('checked', false);
            $('#drpDataParsing').val('0');
            $("#txtareaSplit,#txtareaReplaceTo,.drpSelectIndex").css('display','none');
            $('#tabelCollectionList > tbody').empty();
            $('#tblRule > tbody').empty();
            $(".ulParsedCase > li").remove();
            $("#tblParsedData > thead > tr").remove()
            $("#tblParsedData > tbody > tr").remove()
            $(".collapseHeader").addClass("collapsed"); 
            $(".collapse").removeClass("in");
            },

            AutomaticLoopStepAdded: function(CtrlField){
                debugger;
                ConfigAction = "Loop";
                var Attr = "";
               
                if(CtrlField == "" || CtrlField == undefined ){
                    steps = parseInt($("#tblStepsCreations > tbody > tr").length) + parseInt(1);
                    $("#divLoop").css("display", "block")
                    // $("#inpCheckboxLoopEnd").attr("disabled", false)
                    // $("#inpCheckboxLoopEnd").prop("checked", false)
                }
                else{
                    steps = parseInt($(CtrlField).find(".tblStepsCreations > tbody > tr").length) + parseInt(1);  
                    $(CtrlField).find(".divLoop").css("display", "block")
                    // $(CtrlField).find(".inpCheckboxLoopEnd").attr("disabled", false)
                    // $(CtrlField).find(".inpCheckboxLoopEnd").prop("checked", false)
                }
                
                if ($("#hdnSourceStep").val() != "") {
                    var StepIndex = parseInt($("#hdnSourceStep").val()) + 1;
                }
                else {
                    var StepIndex = "";
                }
                
               
                if(CtrlField == "" || CtrlField == undefined ){
                    var DataPointLabel = $("#tblStepsCreations > tbody > tr:last > td")[10]
                    if ($("#tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Oncollection") {
                        DataPointLabel = $(DataPointLabel).text()
                        $("#inpValueinput").val(DataPointLabel).prop('disabled', true)
                        $("#ddlSchemaAssign").val("eachrow").prop('disabled', true)
                        $("#drpSubfield").val("source").prop('disabled', true);
                    }
                   
                }
                else{
                    var DataPointLabel = $(CtrlField).find(".tblStepsCreations > tbody > tr:last > td")[10]
                    if ($(CtrlField).find(".tblStepsCreations > tbody > tr:last > td.configaction > span").text() == "Oncollection") {
                        DataPointLabel = $(DataPointLabel).text()
                        $("#inpValueinput").val(DataPointLabel).prop('disabled', true)
                        $("#ddlSchemaAssign").val("eachrow").prop('disabled', true)
                        $("#drpSubfield").val("source").prop('disabled', true);
                    }
                }
                
                
                var SubField = $("#drpSubfield").val()
                var InputValue = $("#inpValueinput").val()
                var drpTagValue = $("#inpTargetAttr").val().toLowerCase()
                var drpSchemaAssign = $("#ddlSchemaAssign").val() == "None" ? "" : $("#ddlSchemaAssign").val();
                var ConfigActionShow = ConfigAction;
                if(CtrlField == "" || CtrlField == undefined ){
                    $("#tblStepsCreations > tbody").append(`
                    <tr attr="data-customrentry">
                    <td><input type="checkbox" name="chkdata" /> </td>
                    <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                     <td style="display:none">1</td>
                    <td style="display:none">1</td>
                     <td class ='stepscountAgent'><span>${steps}</span></td>
                    <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                    <td class ="Dn"><span>${SubField}</span></td>
                    <td><span class ="inputVal">${InputValue}</span></td>
                     <td style="display:none">${Attr}</td>
                    <td><span>${drpTagValue}</span></td>
                    <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
                    <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
                    <td style="display:none">0</td>
                    <td style="display:none"></td>
                    <td style="display:none">0</td>
                    <td style="display:none"></td>
                    <td style="display:none"></td>
                   
                    </tr>
                    `)
                  //  $("#tblStepsCreations").find('input:checkbox').attr("disabled", true);

                }
                else{
                    $(CtrlField).find(".tblStepsCreations > tbody").append(`
                    <tr attr="data-customrentry">
                    <td><input type="checkbox" name="chkdata" /> </td>
                    <td style="display:none" class ='stepscount'><span>${steps}</span></td>
                     <td style="display:none">1</td>
                    <td style="display:none">1</td>
                     <td class ='stepscountAgent'><span>${steps}</span></td>
                    <td class ='configaction'><span>${ConfigAction}</span><label class="configactionShow">${ConfigActionShow}</label></td>
                    <td class ="Dn"><span>${SubField}</span></td>
                    <td><span class ="inputVal">${InputValue}</span></td>
                     <td style="display:none">${Attr}</td>
                    <td><span>${drpTagValue}</span></td>
                    <td><span class ="dataPoint">${drpSchemaAssign}</span></td>
                    <td style="display:none" class ='sourcestep' data-loopindex=${StepIndex}>${LoopStepText != "" ? LoopStepText : ""}</td>
                    <td style="display:none">0</td>
                    <td style="display:none"></td>
                    <td style="display:none">0</td>
                    <td style="display:none"></td>
                    <td style="display:none"></td>
                   
                    </tr>
                    `)
                }
               
            },

        CheckForHarvestedStatus: function(){
            var URLSchemaID =  SchemaData.GetAuditIDandSchemaID()
            var obj = new Object();
            obj.intFlag = "15";
            obj.intURLSchemaID = URLSchemaID
            obj.intUserID = $("#SpnUserID").text();
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/SaveIntermediateSchemaFinal",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger;
                    $("#tblHarvestedData > tbody").empty();
                    if(data.response[0].length > 0){
                        var HarvestList = data.response[0]
                        
                        $.each(HarvestList, function(i,objHarvestList){
                            $("#tblHarvestedData > tbody").append(`
                            <tr data-userauditid = ${objHarvestList.ExecutionID}> <td><input type="checkbox" class="RdoHarvest" name="RdoHarvest"></td> 
                            <td class="SchemaName"> <span> ${objHarvestList.AgentName} </span>  <span class='badge' id='spnCountData'></span>  <i class="fa fa-spinner fa-spin ProgressRule"></i></td>
                            </tr>
                            `)
                        })
                     
                    }
                    else{
                        $("#tblHarvestedData > tbody").append(`
                        <tr> <td colspan=2> No Records Found </td> </tr>
                        `) 
                    }
                }
            })
        },
        FindAttributeinXpath: function(InnerHTMLData){
            var AttributesList = [
                "href",
                "src",
                "text",
                "title",
                "alt"
            ]
            var test = InnerHTMLData[0].InnerHTML
            var GetAttrList = $(test)[0];
           var NewAttrList = GetAttrList.getAttributeNames()
            const values = AttributesList.filter(value => NewAttrList.includes(value))
            console.log(values)
        },

        


         constructTable: function(selector,list) {
              
            // Getting the all column names
            var cols = SchemaData.HeadersSteps(list, selector);  
          
              var tbodyrow = $("<tbody/>")
              $(selector).append(tbodyrow)
            // Traversing the JSON data
            for (var i = 0; i < list.length; i++) {
                var row = $('<tr/>');  
                row.append('<td> <input type="checkbox" name="inpedit" /> </td>') 
                for (var colIndex = 0; colIndex < cols.length; colIndex++)
                {
                    var val = list[i][cols[colIndex]];
                    //   if(cols[colIndex] == "Actions" || cols[colIndex] == "ValueInput" || cols[colIndex] == "Datapointlabel" ){
                    //     if (val == null) val = "";  
                    //     row.append($('<td style="display:table-cell"/>').html( "<span class='hdncls'>"+val+"</span>" ));
                    //   }
                    if(cols[colIndex] == "ValueInput" || cols[colIndex] == "Datapointlabel" ){
                        if (val == null) val = "";  
                        row.append($('<td style="display:table-cell"/>').html( "<span class='hdncls'>"+val+"</span>" ));
                      }
                      else if(cols[colIndex] == "Actions" ){
                        if (val == null) val = "";{
                         
                            var valShow = val ;
                            if (val == "Oncollection"){
                                var valShow = "Similar Data"
                        }
                        else if (val == "Get"){
                            var valShow= "This Data"
                        }
                     else if (val == "Initialize") {
                            var valShow= "Set Default Value";
                        }
                            row.append($('<td style="display:table-cell"/>').html( "<span class='hdncls ActionsVal'>"+val+"</span><span class='hdncls ActionsValShow'>"+valShow+"</span>" ));
                        }  
                       
                      }
                      else{
                        if (val == null) val = "";  
                        row.append($('<td style="display:none"/>').html(val));
                      }
                    // If there is any key, which is matching
                    // with the column name
                    // if (val == null) val = "";  
                    //     row.append($('<td/>').html(val));
                }
                  
                // Adding each row to the table
                $(selector).append(row);
            }
            $("input[name='inpedit']").change(function(){
                debugger;
                $("input[name='inpedit']").prop("checked",false)
                $(this).prop("checked",true)
            })
        },
        HeadersSteps:function(list, selector) {
            var columns = [];
            
            var header = $('<thead />');
            var trhead = $('<tr/>');
           var Finalheader =  $(header).append(trhead)
           trhead.append(`<th></th>`)
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                  
                for (var k in row) {
                    if ($.inArray(k, columns) == -1) {
                        columns.push(k);
                          if(k == "Actions" || k == "ValueInput" || k == "Datapointlabel"){
                              if(k == "ValueInput" || k == "Datapointlabel"){
                                trhead.append($('<th style="display:table-cell" Actionattr='+k+' class="col-md-2"/>').html(k == "ValueInput" ? "Value":"Schema Field" ));
                              }
                              else{
                                trhead.append($('<th style="display:table-cell" class="col-md-2"/>').html(k));
                              }
                            
                          }
                          else{
                            trhead.append($('<th style="display:none"/>').html(k));
                          }
                        // Creating the header
                     //   header.append($('<th/>').html(k));
                    }
                }
            }
            // Appending the header to the table
            $(selector).append(Finalheader);
                return columns;
            },

            GetListDetailsofAgentURLAgentDetails: function(URLSchemaID,type){
                var  ExtractionField;
                var obj = new Object();
                var PageLevelEnd = "";
                var PageLevelEdit = "";
                obj.intURLSchemaID = URLSchemaID;
                obj.flag = "8";
                $.ajax({
                    type: "POST",
                    url: HostingPath + "/api/GetSchemaDetails",
                    dataType: 'json',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    success: function (data) {
                        debugger;
                        var ListDetails = data.response[0];
                        $.each(ListDetails, function(i,obj){
                            if(type == "Load"){
                                if(obj.AgentURL != $("#spnhrefdetailsURL").text().trim() && PageLevelEnd == undefined ){
                                    SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID,obj.URLSchemaID)
                                    PageLevelEnd = obj.PageLevel;
                                    ExtractionField = obj.ExtractionURLField;
                                }
                                else if(obj.AgentURL != $("#spnhrefdetailsURL").text().trim()){
                                    SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID,obj.URLSchemaID)
                                    PageLevelEnd = obj.PageLevel;
                                    ExtractionField = obj.ExtractionURLField;
                                }
                                else if(obj.AgentURL == $("#spnhrefdetailsURL").text().trim()){
                                    PageLevelEnd = obj.PageLevel
                                }
                                
                            }
                            else if(type == "Edit"){
                                if(obj.AgentURL == $("#spnhrefdetailsURL").text().trim()){
                                 //   SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID,obj.URLSchemaID)     
                                    PageLevelEdit = obj.PageLevel
                                }
                                else{
                                    ExtractionField = obj.ExtractionURLField;
                                }
                                
 SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID,obj.URLSchemaID)
                            }
                            else{
                                SchemaData.EditDetailsLevel(obj.ExecutionID,obj.PageLevel,obj.AgentURL,obj.PrimaryURLSchemaID,obj.MainURLSchemaID,obj.URLSchemaID)
                            }
                           
                        })

                        var PageLevelEnd = "";
                        obj.intURLSchemaID = URLSchemaID;
                        obj.flag = "9";
                        $.ajax({
                            type: "POST",
                            url: HostingPath + "/api/GetSchemaDetails",
                            dataType: 'json',
                            async: false,
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(obj),
                            success: function (data) {
                                debugger;
                                PageLevelEnd = data.response[0][0].PageLevel;
                              //  ExtractionField = data.response[0][0].ExtractionURLField;
                              $("#spnExtractionURL").text(ExtractionField)
                                var CtrlField = $("#tab1primary").find(".sumdiv").find("input[name=inpPageLevel]").parent().parent();
                                var CtrlSHownFiled = $("#tab1primary").find(".segmentdiv[style*=block]")
                                // $(CtrlSHownFiled).css({
                                //     "opacity":"0.7"
                                // })
                                $(CtrlSHownFiled).find("input[name=inpPageLevel]").css("pointer-events","none")
                                $.each(CtrlField, function(j,objLevel){
                                    if($("#inpEditType").val() == ""){
                                        if($(objLevel).find("summary").attr("page-level") == PageLevelEnd){
                                            if($("#spnhrefdetailsURL").text().trim() == data.response[0][0].AgentURL){
                                                $(objLevel).parent().find("input[name=inpPageLevel]").prop("checked",true)
                                           
                                                $(objLevel).parent().find("summary").find("input[name=inpPageLevel]").change()
                                                $(objLevel).parent().css("display","inline-block")
                                                $(objLevel).parent().find(".drpExtractionURL").val(ExtractionField).change()
                                            }
                                            else{
                                                $(objLevel).parent().next().find("input[name=inpPageLevel]").prop("checked",true)
                                           
                                                $(objLevel).parent().next().find("summary").find("input[name=inpPageLevel]").change()
                                                $(objLevel).parent().next().css("display","inline-block")
                                                $(objLevel).parent().next().find(".drpExtractionURL").val(ExtractionField).change()
                                            }
                                            
                                          
                                          //  return false
                                        }
                                    }
                                   else if($("#inpEditType").val() == "1"){
                                  
                                        if($(objLevel).find("summary").attr("page-level") == PageLevelEdit){
                                            debugger;
                                            $(objLevel).parent().find("input[name=inpPageLevel]").prop("checked",true)
                                            $(objLevel).find("input[name=inpPageLevel]").css("pointer-events","auto")
                                            $(objLevel).parent().find("summary").find("input[name=inpPageLevel]").change()
                                            $(objLevel).parent().css("display","inline-block")
                                       //     $(objLevel).parent().find(".drpExtractionURL").val(ExtractionField).change()
                                            $(objLevel).parent().css(
                                                "opacity","1")
                                                $(objLevel).parent().css(
                                                    "pointer-events","auto")
                                                
                                          //  return false
                                        }
                                    }
                                  
                                })
                            }
                        })


                       
                    }
                })
                return PageLevelEnd;
            },
           GetURLSchemaIDandAgentID: function(ExecutionID){
              var obj = new Object();
              obj.intExecutionID = ExecutionID;
              obj.intFlag = "18";
              $.ajax({
                type: "POST",
                url: HostingPath + "/api/SaveIntermediateSchemaFinal",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger;
                    var AgentURLLIst = data.response[0][0].AgentURL;
                    $("#inpMainURL").val(AgentURLLIst)
                    SchemaData.LoadURLAgentSteps(ExecutionID)
                }
            })


              
           },


           LoadURLAgentSteps: function(ExecutionID){
            var obj = new Object();
            obj.AuditID = ExecutionID;
           $.ajax({
               type: "POST",
               url: HostingPath + "/api/MongoEncryptedTrainedResult",
               dataType: 'json',
               async: false,
               contentType: "application/json; charset=utf-8",
               data: JSON.stringify(obj),
               success: function (data) {
                var   DecryptDataOPSchemaresult = data.response;
                var EditSteps = JSON.parse(DecryptDataOPSchemaresult[0].jsonresult);
                SchemaData.constructTable("#tblSavedSteps",EditSteps)
                $("#tblStepsCreations").css("display","none")
                $("#divshowtable").css("display","block")
                $("#tblSavedSteps > tbody > tr").each(function () {
                    debugger;
                    if($(this).find(".ActionsVal").text() == "Onload" || $(this).find(".ActionsVal").text() == "Timer" || $(this).find(".ActionsVal").text() == "MongoDB_write" || $(this).find(".ActionsVal").text() == "MongoDB_commit" || $(this).find(".ActionsVal").text() == "Exit" || $(this).find(".ActionsVal").text() == "MongoDB_read" || $(this).find(".ActionsVal").text() == "Url_Request" ){
                        $(this).addClass("DN");
                    }
                })
               }
            })
           },

         EditSchemaSteps: function(ExecutionID){
             var obj = new Object();
             obj.AuditID = ExecutionID;
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/MongoEncryptedTrainedResult",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger
                 var   DecryptDataOPSchemaresult = data.response;
                    var EditSteps = JSON.parse(DecryptDataOPSchemaresult[0].jsonresult);
                    SchemaData.constructTable("#tblSavedSteps",EditSteps)
                    $("#divshowtable").css("display","block")
                    $("#tblSavedSteps > tbody > tr").each(function () {
                       
                        if($(this).find(".ActionsVal").text() == "Onload" || $(this).find(".ActionsVal").text() == "Timer" || $(this).find(".ActionsVal").text() == "MongoDB_write" || $(this).find(".ActionsVal").text() == "MongoDB_commit" || $(this).find(".ActionsVal").text() == "Exit" || $(this).find(".ActionsVal").text() == "MongoDB_read" || $(this).find(".ActionsVal").text() == "Url_Request" ){
                            $(this).addClass("DN");
                        }
                    })
                }
            })
         },

         EditDetailsLevel: function(ExecutionID,PageLevel,AgentURL,PrimaryURLSchemaID,MainURLSchemaID,URLSchemaID){
            var obj = new Object();
            obj.AuditID = ExecutionID;
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/MongoEncryptedTrainedResult",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger
                 var   DecryptDataOPSchemaresult = data.response;
                    var EditSteps = JSON.parse(DecryptDataOPSchemaresult[0].jsonresult);
                    var CtrlFieldList = $("#tab1primary").find(".sumdiv");
                    
                    $.each(CtrlFieldList, function(i,objList){
                        $(objList).css("display","inline-block")
                        if($(objList).find("summary").attr("page-level") == PageLevel){
                            if(PageLevel == "1"){
                                $("#inpMainURL").val(AgentURL)
                                $("#tblSavedSteps").empty()
                            SchemaData.constructTable("#tblSavedSteps",EditSteps)
                   $("#divshowtable").css("display","block")
                   
                    $("#tblSavedSteps > tbody > tr").each(function () {
                       
                        if($(this).find(".ActionsVal").text() == "Onload" || $(this).find(".ActionsVal").text() == "Timer" || $(this).find(".ActionsVal").text() == "MongoDB_write" || $(this).find(".ActionsVal").text() == "MongoDB_commit" || $(this).find(".ActionsVal").text() == "Exit" || $(this).find(".ActionsVal").text() == "MongoDB_read" || $(this).find(".ActionsVal").text() == "Url_Request" ){
                            $(this).addClass("DN");
                        }
                    })
                    $("#tblSavedSteps").attr("data-primaryURLSchemaID",PrimaryURLSchemaID)
                   $("#tblSavedSteps").attr("data-mainURLSchemaID",MainURLSchemaID)
                   $("#tblSavedSteps").attr("data-ExecutionID",ExecutionID)
                   $("#tblSavedSteps").attr("data-URLSchemaID",URLSchemaID)
                   
                   if($("#inpEditType").val() != "1"){
                    $(objList).find("input[name='inpPageLevel']").css("pointer-events","none")
                    $(objList).find("summary").click();
                    $(objList).css({
                        "opacity":"0.8"
                      
                    })
                   }
                   else if($("#inpEditType").val() == "1"){
                    $("input[name='inpPageLevel']").prop("checked",false)
                    $(objList).find("input[name='inpPageLevel']").prop("checked",true)
                   }

                   
                    return false
                            }
                            else if(PageLevel != "1"){
                                
                                $(objList).find(".inpSegementaionURLDetailedURL").val(AgentURL)
                                $(objList).find(".tblSavedSteps").empty()
                                SchemaData.constructTable($(objList).find(".tblSavedSteps"),EditSteps)
                               $(objList).find(".tblSavedSteps > tbody > tr").each(function () {
                                    
                                     if($(this).find(".ActionsVal").text() == "Onload" || $(this).find(".ActionsVal").text() == "Timer" || $(this).find(".ActionsVal").text() == "MongoDB_write" || $(this).find(".ActionsVal").text() == "MongoDB_commit" || $(this).find(".ActionsVal").text() == "Exit" || $(this).find(".ActionsVal").text() == "MongoDB_read" || $(this).find(".ActionsVal").text() == "Url_Request" ){
                                         $(this).addClass("DN");
                                     }
                                 })
                                 $(objList).find(".tblSavedSteps").attr("data-primaryURLSchemaID",PrimaryURLSchemaID)
                                $(objList).find(".tblSavedSteps").attr("data-mainURLSchemaID",MainURLSchemaID)
                                $(objList).find(".tblSavedSteps").attr("data-ExecutionID",ExecutionID)
                                $(objList).find(".tblSavedSteps").attr("data-URLSchemaID",URLSchemaID)
                                if($("#inpEditType").val() != "1"){
                                    $(objList).find("input[name='inpPageLevel']").css("pointer-events","none")
                                    $(objList).find("summary").click();
                                    $(objList).css({
                                        "opacity":"0.8"
                                      
                                    })
                                   }
                                   else if($("#inpEditType").val() == "1"){
                                    $("input[name='inpPageLevel']").prop("checked",false)
                                    $(objList).find("input[name='inpPageLevel']").prop("checked",true)
                                   }
                                 return false
                            }
                        }
                    })
                 
                }
            })
         },

         CheckForPIPE: function (UrlValue) {
            var LengthURL = UrlValue.split("|");
            var Urlsarr;
    
    
            Urls = UrlValue;
            Urls = Urls.replace(/(\r\n|\n|\r)/gm, "");
    
            if (Urls.trim().endsWith("|")) {
                Urls = Urls.substring(0, Urls.length - 1);
                Urlsarr = Urls.trim().split("|");
            }
            else {
                Urlsarr = Urls.trim().split("|");
            }
            Urlsarr = Urlsarr.filter(onlyUnique);
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }
    
            return Urlsarr;
    
        },
        ValidateURL: function (URLList) {
    
            var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            var arr = [];
            $.each(URLList, function (i, objURL) {
                if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(objURL.trim())) {
    
                } else {
                    arr.push("1");
    
                }
            })
            return arr;
        },
        NameParsingAPI: function(NameParsingData,DrpSlection,Condition,RemovingParsingCase){
            var OutputParsedData = "";
            var ParsingSchemaFields = ""
            var obj = new Object();
            if(DrpSlection == "1"){
                obj.DrpSelection = DrpSlection
            }
            else{
                obj.DrpSelection = "";
            }
            obj.NameParsingData = NameParsingData == "" ? "" : JSON.stringify(NameParsingData);
            obj.Condition = Condition == undefined ? "" : Condition;
            obj.RemovingParsingCase = RemovingParsingCase == undefined ? "" : JSON.stringify(RemovingParsingCase);
           $.ajax({
               type: "POST",
               url: HostingPath + "/api/NameParsing",
               dataType: 'json',
               async: false,
               contentType: "application/json; charset=utf-8",
               data: JSON.stringify(obj),
               success: function (data) {
                   debugger;
                   OutputParsedData = data.response;
                   ParsingSchemaFields = data.SchemaList;
               }
            })
            if(DrpSlection == "1"){
                return ParsingSchemaFields ;
            }
            else{
                return OutputParsedData ;
            }
           
        },

         parseFullName:function(nameToParse, partToReturn, fixCase, stopOnError, useLongLists,ParsedNameCase) {
             debugger;
         var  parsedName =  ParsedNameCase;
            var originalFullname = nameToParse;
            var i, j, k, l, m, n, part, comma, titleList, suffixList, prefixList, regex,
              partToCheck, partFound, partsFoundCount, firstComma, remainingCommas,
              nameParts = [], nameCommas = [null], partsFound = [],
              conjunctionList = ['&', 'and', 'et', 'e', 'of', 'the', 'und', 'y'],
    
    
            // Validate inputs, or set to defaults
            partToReturn = partToReturn && ['title', 'first', 'middle', 'last', 'nick',
              'suffix', 'error'].indexOf(partToReturn.toLowerCase()) > -1 ?
              partToReturn.toLowerCase() : 'all';
            // 'all' = return object with all parts, others return single part
            if (fixCase === false) fixCase = 0;
            if (fixCase === true) fixCase = 1;
            fixCase = fixCase !== 'undefined' && (fixCase === 0 || fixCase === 1) ?
                fixCase : -1; // -1 = fix case only if input is all upper or lowercase
            if (stopOnError === true) stopOnError = 1;
            stopOnError = stopOnError && stopOnError === 1 ? 1 : 0;
            // false = output warnings on parse error, but don't stop
            if (useLongLists === true) useLongLists = 1;
            useLongLists = useLongLists && useLongLists === 1 ? 1 : 0; // 0 = short lists
    
            // If stopOnError = 1, throw error, otherwise return error messages in array
            function handleError(errorMessage) {
                if (stopOnError) {
                    throw 'Error: ' + errorMessage;
                } else {
                    // parsedName.error.push('Error: ' + errorMessage);
                }
            }
    
            // If fixCase = 1, fix case of parsedName parts before returning
            function fixParsedNameCase(fixedCaseName, fixCaseNow) {
                var forceCaseList = ['e', 'y', 'av', 'af', 'da', 'dal', 'de', 'del', 'der', 'di',
                  'la', 'le', 'van', 'der', 'den', 'vel', 'von', 'II', 'III', 'IV', 'J.D.', 'LL.M.',
                  'M.D.', 'D.O.', 'D.C.', 'Ph.D.', ];
    
    
                var forceCaseListIndex;
                var namePartLabels = [];
                var namePartWords;
                if (fixCaseNow) {
                    namePartLabels = Object.keys(parsedName)
                      .filter(function (v) { return v !== 'error'; });
                    for (i = 0, l = namePartLabels.length; i < l; i++) {
                        if (fixedCaseName[namePartLabels[i]]) {
                            namePartWords = (fixedCaseName[namePartLabels[i]] + '').split(' ');
                            for (j = 0, m = namePartWords.length; j < m; j++) {
                                forceCaseListIndex = forceCaseList
                                  .map(function (v) { return v.toLowerCase(); })
                                  .indexOf(namePartWords[j].toLowerCase());
                                if (forceCaseListIndex > -1) { // Set case of words in forceCaseList
                                    namePartWords[j] = forceCaseList[forceCaseListIndex];
                                } else if (namePartWords[j].length === 1) { // Uppercase initials
                                    namePartWords[j] = namePartWords[j].toUpperCase();
                                } else if (
                                    namePartWords[j].length > 2 &&
                                    namePartWords[j].slice(0, 1) ===
                                      namePartWords[j].slice(0, 1).toUpperCase() &&
                                    namePartWords[j].slice(1, 2) ===
                                      namePartWords[j].slice(1, 2).toLowerCase() &&
                                    namePartWords[j].slice(2) ===
                                      namePartWords[j].slice(2).toUpperCase()
                                  ) { // Detect McCASE and convert to McCase
                                    namePartWords[j] = namePartWords[j].slice(0, 3) +
                                      namePartWords[j].slice(3).toLowerCase();
                                } else if (
                                    namePartLabels[j] === 'suffix' &&
                                    namePartWords[j].slice(-1) !== '.' &&
                                    !suffixList.indexOf(namePartWords[j].toLowerCase())
                                  ) { // Convert suffix abbreviations to UPPER CASE
                                    if (namePartWords[j] === namePartWords[j].toLowerCase()) {
                                        namePartWords[j] = namePartWords[j].toUpperCase();
                                    }
                                } else { // Convert to Title Case
                                    namePartWords[j] = namePartWords[j].slice(0, 1).toUpperCase() +
                                      namePartWords[j].slice(1).toLowerCase();
                                }
                            }
                            fixedCaseName[namePartLabels[i]] = namePartWords.join(' ');
                        }
                    }
                }
                return fixedCaseName;
            }
    
            // If no input name, or input name is not a string, abort
            if (!nameToParse || typeof nameToParse !== 'string') {
                handleError('No input');
                parsedName = fixParsedNameCase(parsedName, fixCase);
                return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
            }
    
            // Auto-detect fixCase: fix if nameToParse is all upper or all lowercase
            if (fixCase === -1) {
                fixCase = (
                  nameToParse === nameToParse.toUpperCase() ||
                  nameToParse === nameToParse.toLowerCase() ? 1 : 0
                );
            }
    
            // Initilize lists of prefixs, suffixs, and titles to detect
            // Note: These list entries must be all lowercase
            if (useLongLists) {
    
                // Bulk
                suffixList = ['esq', 'esquire', 'jr', 'jnr', 'sr', 'snr', '2', 'ii', 'iii', 'iv',
                  'v', 'clu', 'chfc', 'cfp', 'md', 'phd', 'j.d.', 'll.m.', 'm.d.', 'd.o.', 'd.c.',
                  'p.c.', 'ph.d.', 'vice chair', 'chair'];
    
    
                prefixList = ['a', 'ab', 'antune', 'ap', 'abu', 'al', 'alm', 'alt', 'bab', 'bäck',
                  'bar', 'bath', 'bat', 'beau', 'beck', 'ben', 'berg', 'bet', 'bin', 'bint', 'birch',
                  'björk', 'björn', 'bjur', 'da', 'dahl', 'dal', 'de', 'degli', 'dele', 'del',
                  'della', 'der', 'di', 'dos', 'du', 'e', 'ek', 'el', 'escob', 'esch', 'fleisch',
                  'fitz', 'fors', 'gott', 'griff', 'haj', 'haug', 'holm', 'ibn', 'kauf', 'kil',
                  'koop', 'kvarn', 'la', 'le', 'lind', 'lönn', 'lund', 'mac', 'mhic', 'mic', 'mir',
                  'na', 'naka', 'neder', 'nic', 'ni', 'nin', 'nord', 'norr', 'ny', 'o', 'ua', 'ui\'',
                  'öfver', 'ost', 'över', 'öz', 'papa', 'pour', 'quarn', 'skog', 'skoog', 'sten',
                  'stor', 'ström', 'söder', 'ter', 'ter', 'tre', 'türk', 'van', 'väst', 'väster',
                  'vest', 'von'];
    
                titleList = ['mr', 'mrs', 'ms', 'miss', 'dr', 'herr', 'monsieur', 'hr', 'frau',
                  'a v m', 'admiraal', 'admiral', 'air cdre', 'air commodore', 'air marshal',
                  'air vice marshal', 'alderman', 'alhaji', 'ambassador', 'baron', 'barones',
                  'brig', 'brig gen', 'brig general', 'brigadier', 'brigadier general',
                  'brother', 'canon', 'capt', 'captain', 'cardinal', 'cdr', 'chief', 'cik', 'cmdr',
                  'coach', 'col', 'col dr', 'colonel', 'commandant', 'commander', 'commissioner',
                  'commodore', 'comte', 'comtessa', 'congressman', 'conseiller', 'consul',
                  'conte', 'contessa', 'corporal', 'councillor', 'count', 'countess',
                  'crown prince', 'crown princess', 'dame', 'datin', 'dato', 'datuk',
                  'datuk seri', 'deacon', 'deaconess', 'dean', 'dhr', 'dipl ing', 'doctor',
                  'dott', 'dott sa', 'dr', 'dr ing', 'dra', 'drs', 'embajador', 'embajadora', 'en',
                  'encik', 'eng', 'eur ing', 'exma sra', 'exmo sr', 'f o', 'father',
                  'first lieutient', 'first officer', 'flt lieut', 'flying officer', 'fr',
                  'frau', 'fraulein', 'fru', 'gen', 'generaal', 'general', 'governor', 'graaf',
                  'gravin', 'group captain', 'grp capt', 'h e dr', 'h h', 'h m', 'h r h', 'hajah',
                  'haji', 'hajim', 'her highness', 'her majesty', 'herr', 'high chief',
                  'his highness', 'his holiness', 'his majesty', 'hon', 'hr', 'hra', 'ing', 'ir',
                  'jonkheer', 'judge', 'justice', 'khun ying', 'kolonel', 'lady', 'lcda', 'lic',
                  'lieut', 'lieut cdr', 'lieut col', 'lieut gen', 'lord', 'm', 'm l', 'm r',
                  'madame', 'mademoiselle', 'maj gen', 'major', 'master', 'mevrouw', 'miss',
                  'mlle', 'mme', 'monsieur', 'monsignor', 'mr', 'mrs', 'ms', 'mstr', 'nti', 'pastor',
                  'president', 'prince', 'princess', 'princesse', 'prinses', 'prof', 'prof dr',
                  'prof sir', 'professor', 'puan', 'puan sri', 'rabbi', 'rear admiral', 'rev',
                  'rev canon', 'rev dr', 'rev mother', 'reverend', 'rva', 'senator', 'sergeant',
                  'sheikh', 'sheikha', 'sig', 'sig na', 'sig ra', 'sir', 'sister', 'sqn ldr', 'sr',
                  'sr d', 'sra', 'srta', 'sultan', 'tan sri', 'tan sri dato', 'tengku', 'teuku',
                  'than puying', 'the hon dr', 'the hon justice', 'the hon miss', 'the hon mr',
                  'the hon mrs', 'the hon ms', 'the hon sir', 'the very rev', 'toh puan', 'tun',
                  'vice admiral', 'viscount', 'viscountess', 'wg cdr', 'ind', 'misc', 'mx','assistant','Adjunct Associate Professor of Statistics'];
                //   ,'of', 'instruction'
            } else {
    
    
                // Specific
                suffixList = ['esq', 'esquire', 'jr', 'jnr', 'sr', 'snr', '2', 'ii', 'iii', 'iv',
                  'md', 'phd', 'j.d.', 'll.m.', 'm.d.', 'd.o.', 'd.c.', 'p.c.', 'ph.d.', 'vice chair', 'chair'];
    
                prefixList = ['ab', 'bar', 'bin', 'da', 'dal', 'de', 'de la', 'del', 'della', 'der',
                  'di', 'du', 'ibn', 'l\'', 'la', 'le', 'san', 'st', 'st.', 'ste', 'ter', 'van',
                  'van de', 'van der', 'van den', 'vel', 'ver', 'vere', 'von'];
    
    
                titleList = ['dr', 'miss', 'mr', 'mrs', 'ms', 'prof', 'sir', 'frau', 'herr', 'hr',
                  'monsieur', 'captain', 'doctor', 'judge', 'officer', 'professor','Assistant Professor of Instruction' , 'ind', 'misc',
                  'mx','Assistant Professor','Adjunct Associate Professor of Statistics'];
            }
    
            // Nickname: remove and store parts with surrounding punctuation as nicknames
            regex = /\s(?:[‘’']([^‘’']+)[‘’']|[“”"]([^“”"]+)[“”"]|\[([^\]]+)\]|\(([^\)]+)\)),?\s/g;
            partFound = (' ' + nameToParse + ' ').match(regex);
            if (partFound) partsFound = partsFound.concat(partFound);
            partsFoundCount = partsFound.length;
            if (partsFoundCount === 1) {
                parsedName.nick = partsFound[0].slice(2).slice(0, -2);
                if (parsedName.nick.slice(-1) === ',') {
                    parsedName.nick = parsedName.nick.slice(0, -1);
                }
                nameToParse = (' ' + nameToParse + ' ').replace(partsFound[0], ' ').trim();
                partsFound = [];
            } else if (partsFoundCount > 1) {
                handleError(partsFoundCount + ' nicknames found');
                for (i = 0; i < partsFoundCount; i++) {
                    nameToParse = (' ' + nameToParse + ' ')
                      .replace(partsFound[i], ' ').trim();
                    partsFound[i] = partsFound[i].slice(2).slice(0, -2);
                    if (partsFound[i].slice(-1) === ',') {
                        partsFound[i] = partsFound[i].slice(0, -1);
                    }
                }
                parsedName.nick = partsFound.join(', ');
                partsFound = [];
            }
            if (!nameToParse.trim().length) {
                parsedName = fixParsedNameCase(parsedName, fixCase);
                return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
            }
    
            // Split remaining nameToParse into parts, remove and store preceding commas
            for (i = 0, n = nameToParse.split(' '), l = n.length; i < l; i++) {
                part = n[i];
                comma = null;
                if (part.slice(-1) === ',') {
                    comma = ',';
                    part = part.slice(0, -1);
                }
                nameParts.push(part);
                nameCommas.push(comma);
            }
           
    
            // Suffix: remove and store matching parts as suffixes
            for (l = nameParts.length, i = l - 1; i > 0; i--) {
                partToCheck = (nameParts[i].slice(-1) === '.' ?
                  nameParts[i].slice(0, -1).toLowerCase() : nameParts[i].toLowerCase());
                if (
                    suffixList.indexOf(partToCheck) > -1 ||
                    suffixList.indexOf(partToCheck + '.') > -1
                  ) {
                    partsFound = nameParts.splice(i, 1).concat(partsFound);
                    if (nameCommas[i] === ',') { // Keep comma, either before or after
                        nameCommas.splice(i + 1, 1);
                    } else {
                        nameCommas.splice(i, 1);
                    }
                }
            }
            partsFoundCount = partsFound.length;
            if (partsFoundCount === 1) {
                parsedName.suffix = partsFound[0];
                partsFound = [];
            } else if (partsFoundCount > 1) {
                handleError(partsFoundCount + ' suffixes found');
                parsedName.suffix = partsFound.join(', ');
                partsFound = [];
            }
            if (!nameParts.length) {
                parsedName = fixParsedNameCase(parsedName, fixCase);
                return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
            }
    
            // Title: remove and store matching parts as titles
            // for (l = nameParts.length, i = l - 1; i >= 0; i--) {
            //     debugger;
            //     nameParts[i] = nameParts[i].trim().replace(/(\r\n|\n|\r|\t)/gm," ");
            //     partToCheck = (nameParts[i].slice(-1) === '.' ?
            //       nameParts[i].slice(0, -1).toLowerCase() : nameParts[i].toLowerCase());
                 
            //     if (titleList.indexOf(partToCheck) > -1 || titleList.indexOf(partToCheck + '.') > -1) {
            //         partsFound = nameParts.splice(i, 1).concat(partsFound);
            //         if (nameCommas[i] === ',') { // Keep comma, either before or after
            //             nameCommas.splice(i + 1, 1);
            //         } else {
            //             nameCommas.splice(i, 1);
            //         }
            //     }
            // }
            for(i=0;i<=titleList.length;i++){
                var TitleName = titleList[i];
                var r = new RegExp(`^${TitleName}$`)
var bool = r.test(nameToParse.toLowerCase().trim());

if(bool == true){
    partsFound.push(TitleName)
}
                // if(nameToParse.toLowerCase().trim().indexOf(titleList[i]) > -1){
                //     partsFound.push(titleList[i])
                // }

            }
            partsFoundCount = partsFound.length;
            if (partsFoundCount === 1) {
                parsedName.title = partsFound[0];
                partsFound = [];
            } else if (partsFoundCount > 1) {
                handleError(partsFoundCount + ' titles found');
                parsedName.title = partsFound.join(' ');
                partsFound = [];
            }
            if (!nameParts.length) {
                parsedName = fixParsedNameCase(parsedName, fixCase);
                return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
            }
    
            // Join name prefixes to following names
            if (nameParts.length > 1) {
                for (i = nameParts.length - 2; i >= 0; i--) {
                    if (prefixList.indexOf(nameParts[i].toLowerCase()) > -1) {
                        nameParts[i] = nameParts[i] + ' ' + nameParts[i + 1];
                        nameParts.splice(i + 1, 1);
                        nameCommas.splice(i + 1, 1);
                    }
                }
            }
    
            // Join conjunctions to surrounding names
            if (nameParts.length > 2) {
                for (i = nameParts.length - 3; i >= 0; i--) {
                    if (conjunctionList.indexOf(nameParts[i + 1].toLowerCase()) > -1) {
                        nameParts[i] = nameParts[i] + ' ' + nameParts[i + 1] + ' ' + nameParts[i + 2];
                        nameParts.splice(i + 1, 2);
                        nameCommas.splice(i + 1, 2);
                        i--;
                    }
                }
            }
    
            // Suffix: remove and store items after extra commas as suffixes
            nameCommas.pop();
            firstComma = nameCommas.indexOf(',');
            remainingCommas = nameCommas.filter(function (v) { return v !== null; }).length;
            if (firstComma > 1 || remainingCommas > 1) {
                for (i = nameParts.length - 1; i >= 2; i--) {
                    if (nameCommas[i] === ',') {
                        partsFound = nameParts.splice(i, 1).concat(partsFound);
                        nameCommas.splice(i, 1);
                        remainingCommas--;
                    } else {
                        break;
                    }
                }
            }
            if (partsFound.length) {
                if (parsedName.suffix) {
                    partsFound = [parsedName.suffix].concat(partsFound);
                }
                parsedName.suffix = partsFound.join(', ');
                partsFound = [];
            }
    
            // Last name: remove and store last name
            if (remainingCommas > 0) {
                if (remainingCommas > 1) {
                    handleError((remainingCommas - 1) + ' extra commas found');
                }
                // Remove and store all parts before first comma as last name
                if (nameCommas.indexOf(',')) {
                    parsedName.last = nameParts.splice(0, nameCommas.indexOf(',')).join(' ');
                    nameCommas.splice(0, nameCommas.indexOf(','));
                }
            } else {
                // Remove and store last part as last name
                parsedName.last = nameParts.pop();
            }
            if (!nameParts.length) {
                parsedName = fixParsedNameCase(parsedName, fixCase);
    
                parsedName.fullname = originalFullname.toString();
                return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
            }
    
            // First name: remove and store first part as first name
            parsedName.first = nameParts.shift();
            if (!nameParts.length) {
                parsedName = fixParsedNameCase(parsedName, fixCase);
    
                parsedName.fullname = originalFullname.toString();
    
                return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
            }
    
            // Middle name: store all remaining parts as middle name
            if (nameParts.length > 2) {
                handleError(nameParts.length + ' middle names');
            }
            parsedName.middle = nameParts.join(' ');
    
    
            debugger;
            parsedName = fixParsedNameCase(parsedName, fixCase);
            parsedName.fullname = originalFullname.toString();
            return partToReturn === 'all' ? parsedName : parsedName[partToReturn];
        },
      
        PararllelRUN: function(){
            var obj = new Object();
            obj.intFlag = "1";
            obj.intResURLTrackingID = "0";
            $.ajax({
                type: "POST",
                url: HostingPath + "/api/GetURLsForProcessing",
                dataType: 'json',
                async: false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(obj),
                success: function (data) {
                    debugger
                    console.log(data)
                          if(data.response[0][0].ExecutionURL == undefined){
                              SchemaData.ShowPanel("error",data.response[0][0].ErrorInfo)
                          }
                          else{
                            var ExecutionURL = data.response[0][0].ExecutionURL;
                            var obj1 = new Object();
                            obj1.ExecutionURL = ExecutionURL;
                            $.ajax({
                                type: "POST",
                                url: HostingPath + "/api/URLHit",
                                dataType: 'json',
                                async: false,
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify(obj1),
                                success: function (data) {
                                    debugger
                                }
                            })
                          }
                   
                }
            })
        },
      

    ShowPanel: function (type, message) {
        try {
            toastr.options =
    {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "30000",
        "hideDuration": "5000",
        "timeOut": "10000",
        "extendedTimeOut": "300",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
            toastr.remove();
            toastr[type](message);
        }
        catch (e) {
            //  alert(e.toString());
        }
    },
}