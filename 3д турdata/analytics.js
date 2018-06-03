var timer;
function getAdditionalPontsCathedral(panoramId,points){
  timer = undefined;
  $.get( "http://localhost:3000/getAdditionalPontsCathedral?panoramId="+panoramId+"&points="+points+"")
  .done(function( data ) {
    alert( "Data Loaded: " + data );
  });

}
function getPointsPerPanoram(panoramId,points){
  if(timer){
    clearTimeout(timer);
  }
    $.get( "http://localhost:3000/UpdateBusinessValue?panoramId="+panoramId+"&points="+points+"")
    .done(function( data ) {
      alert("SHit");
     timer= setTimeout(getAdditionalPontsCathedral(panoramId,10),20000);
    });
}


function getPointsPerPanoramandDialog(panoramId,points){
    
}