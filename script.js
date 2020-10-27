$('.datepicker').datepicker()

function submit() {

    var date = document.getElementById('dateInput').value;
    var description = document.getElementById('descriptionInput').value;
    var case_type = document.getElementById('caseType').value;

    alert(date + ", " + description + ", " + case_type) 

}