$(document).ready (function () {
    var curDay = moment().format('dddd, MMMM Do');
    $('#currentDay').text(curDay);
})
