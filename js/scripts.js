//Business Logic
var noteArray = [];
function Note (noteTitle, noteText, noteType) {
  this.noteTitle = noteTitle;
  this.noteText = noteText;
  this.type= noteType;
  this.doneStatus = false;
  this.id = "";
  this.noteColor;
  noteArray.push(this);
}
 Note.prototype.changeStatus = function() {
   this.doneStatus = true;
 }
//UI Logic
$(function(){
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("closenotemodal")[0];
  var btn = document.getElementById("newNoteButton");

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
    $(".wrapper").append('<div class="panel panel ' + note.id + '">' +
    '<div class="panel-heading">' +
      '<h3>' + note.noteTitle + '</h3>' +
    '</div>' +
    '<div class="panel-body">' +
        '<h4>Note Details: </h4>' +
          '<p>' + note.noteText + '</p>' +
           '<input id="' + note.id + '" class="btn done-button" type="button"  value="Archive">' +
        '</div>' +
      '</div>');
  }
  function appendCheckList(checklist) {
    $(".wrapper").append('<div class="panel panel ' + checklist.id + '">' +
      '<div class="panel-heading">' +
      '<h3>' + checklist.noteTitle + '</h3>' +
          '</div>' +
      '<div class="panel-body">'
         );
    for (index=0; index < checklist.noteText.length; index += 1) {
       $(".panel-body").last().append('<input type="checkbox" name="" value="' + checklist.noteText[index] + '"> ' + checklist.noteText[index] + ' <br>');
    }
    $(".panel-body").last().append('<input id="' + checklist.id + '" class="btn done-button" type="button"  value="Archive">' +
        '</div>' +
      '</div>');
  }
  $("form#newNote").submit(function(event){

    var newNoteTitle = $("input#newNoteTitle").val();
    var newNoteText = $("textarea#newNoteDescription").val();
    var newType = "note";
    var notePriority = $("input:radio[name=priority]:checked").val();
    var noteColor;
    if (notePriority === "low") {
      noteColor = '#FEF65B';
    } else if (notePriority === "high") {
      noteColor = '#f56560';
    }
    else {
      noteColor = '#91beae';
    }

    var newNote = new Note(newNoteTitle, newNoteText, newType);
    newNote.id = noteArray.length;

    appendNotes(newNote);

    document.getElementById(newNote.id).parentNode.style.background = noteColor;


    $("input#newNoteTitle").val('');
    $("textarea#newNoteDescription").val('');
    event.preventDefault();

   $(document).on("click", "input.done-button", function() {
    var currentNoteId = $(this)[0].id;
    noteArray.forEach(function(note) {
      if (note.id == currentNoteId) {
        note.changeStatus();
        var noteClass = "." + currentNoteId;
        $(noteClass).hide();
      }
    });
    event.preventDefault();
  });
  modal.style.display = "none";
});
$("form#newChecklist").submit(function(event) {
  event.preventDefault();
  var newCheckListTitle = $("input#newChecklistTitle").val();
  var newCheckListText = $("input#newChecklistDescription").val().split(',');
  var newCheckType = "checklist";
  var newChecklist = new Note(newCheckListTitle, newCheckListText, newCheckType);
  newChecklist.id = noteArray.length;
  appendCheckList(newChecklist);
  noteArray.push(newChecklist);

  $("input#newChecklistTitle").val('');
  $("input#newChecklistDescription").val('');
  checklistModal.style.display = "none";
 });
});
