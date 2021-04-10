function copyhref(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).prop('href')).select();
  document.execCommand("copy");
  $temp.remove();
}
function copy(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
function copylink() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(location).attr("href")).select();
  document.execCommand("copy");
  $temp.remove();
}