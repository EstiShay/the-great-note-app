//Business Logic
function Note (noteTitle, noteText) {
  this.noteTitle = noteTitle;
  this.noteText = noteText;
}
function AllContent() {
  this.allNotes = [];
}
//UI Logic
$(function(){
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("newNoteButton");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
  function appendNotes(note) {
    $(".wrapper").append('<div class="panel panel">' +
    '<div class="panel-heading">' +
      '<h4>' + note.noteTitle + '</h4>' +
    '</div>' +
    '<div class="panel-body">' +
  //    '<div class="detail-reveal">' +
        '<h4>Note Details: </h4>' +
  //      '<div class="details">' +
          '<p>' + note.noteText + '</p>' +
           '<input id="' + note.noteTitle + '" class="done-button" type="button"  value="Archive">' +
        '</div>' +
      '</div>');
  }
  $("form#newNote").submit(function(event){
    var newNoteTitle = $("input#newNoteTitle").val();
    var newNoteText = $("textarea#newNoteDescription").val();
    var button = document.getElementById("closebutton");

    var newNote = new Note(newNoteTitle, newNoteText);
    appendNotes(newNote);
    button.onclick = function() {
        modal.style.display = "none";
    }
    $("input#newNoteTitle").val('');
    $("textarea#newNoteDescription").val('');
   event.preventDefault();

   $(".done-button").click(function(){
     console.log("hi");
 });

 });









});
