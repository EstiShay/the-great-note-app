//Business Logic
function Note (noteTitle, noteText) {
  this.noteTitle = noteTitle;
  this.noteText = noteText;
  this.doneStatus = false;
}
function arrayofNotes() {
  this.allNotes = [];
}
 Note.prototype.changeStatus = function() {
   this.doneStatus = true;
 }
//UI Logic
$(function(){
  var modal = document.getElementById("myModal");
  var allModals = document.getElementsByClassName("modal");
  var btn = document.getElementById("newNoteButton");
  var span = document.getElementsByClassName("closenotemodal")[0];
  var button = document.getElementById("closebutton");
  var allContent = new arrayofNotes();

  btn.onclick = function() {
    modal.style.display = "block";
  }
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target === modal || event.target === checklistModal) {
      modal.style.display = "none";
      checklistModal.style.display = "none";
    }
  }

  var checklistModal = document.getElementById("checklistModal");
  var checklistButton = document.getElementById("newChecklistButton");
  var checklistSpan = document.getElementsByClassName("closechecklist")[0];
  var checklistClose = document.getElementById("closechecklist");

  checklistButton.onclick = function() {
    checklistModal.style.display = "block";
  }
  checklistSpan.onclick = function() {
    checklistModal.style.display = "none";
  }

  function appendNotes(note) {
    $(".wrapper").append('<div class="panel panel">' +
    '<div class="panel-heading">' +
      '<h4>' + note.noteTitle + '</h4>' +
    '</div>' +
    '<div class="panel-body">' +
        '<h4>Note Details: </h4>' +
          '<p>' + note.noteText + '</p>' +
           '<input id="' + note.noteTitle + '" class="btn done-button" type="button"  value="Archive">' +
        '</div>' +
      '</div>');
  }
  $("form#newNote").submit(function(event){
    var newNoteTitle = $("input#newNoteTitle").val();
    var newNoteText = $("textarea#newNoteDescription").val();


    var newNote = new Note(newNoteTitle, newNoteText);
    appendNotes(newNote);
    allContent.allNotes.push(newNote);

    $("input#newNoteTitle").val('');
    $("textarea#newNoteDescription").val('');
   event.preventDefault();

   $(".done-button").click(function() {
     var currentNoteId = $(this)[0].id;
     allContent.allNotes.forEach(function(note) {
       if (note.noteTitle === currentNoteId) {
         note.changeStatus();
       }
     });
   });
   modal.style.display = "none";
 });
 $("form#newChecklist").submit(function(event) {
   event.preventDefault();
   var newCheckListTitle = $("input#newChecklistTitle").val();
   var newCheckListText = $("input#newChecklistDescription").val();
   console.log(newCheckListTitle,newCheckListText);
 });
  checklistModal.style.display = "none";
});
