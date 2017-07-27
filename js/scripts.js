//Business Logic
var noteArray = [];
function Note (noteTitle, noteText, noteType, noteColor) {
  this.noteTitle = noteTitle;
  this.noteText = noteText;
  this.type= noteType;
  this.doneStatus = false;
  this.id = "";
  this.noteColor = noteColor;
  noteArray.push(this);
}
 Note.prototype.changeStatus = function() {
   this.doneStatus = true;
 }
// Sort notes with dropdown menu
  function sortNotes(val) {
    if (val === "done") {
      $(".wrapper").empty()
      noteArray.forEach(function(note) {
        if ((note.doneStatus === true) && (note.type === "note")) {
          appendNotes(note);
        } else if ((note.doneStatus === true) && (note.type === "checklist")) {
          appendCheckList(note);
        }
      });
    } else if (val === "current"){
      $(".wrapper").empty();
      noteArray.forEach(function(note) {
        if ((note.doneStatus === false) && (note.type === "note")) {
          appendNotes(note);
        } else if ((note.doneStatus === false) && (note.type === "checklist")) {
          appendCheckList(note);
        }
      });
    }
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
   $(".wrapper").last().append('<div class="panel panel ' + checklist.id + '">' +
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
  // function appendNotes(note) {
  //   $(".wrapper").append('<div class="panel panel ' + note.id + '">' +
  //   '<div class="panel-heading">' +
  //     '<h3>' + note.noteTitle + '</h3>' +
  //   '</div>' +
  //   '<div class="panel-body">' +
  //       '<h4>Note Details: </h4>' +
  //         '<p>' + note.noteText + '</p>' +
  //          '<input id="' + note.id + '" class="btn done-button" type="button"  value="Archive">' +
  //       '</div>' +
  //     '</div>');
  // }
  // function appendCheckList(checklist) {
  //   $(".wrapper").append('<div class="panel panel ' + checklist.id + '">' +
  //     '<div class="panel-heading">' +
  //     '<h3>' + checklist.noteTitle + '</h3>' +
  //         '</div>' +
  //     '<div class="panel-body">'
  //        );
  //   for (index=0; index < checklist.noteText.length; index += 1) {
  //      $(".panel-body").last().append('<input type="checkbox" name="" value="' + checklist.noteText[index] + '"> ' + checklist.noteText[index] + ' <br>');
  //   }
  //   $(".panel-body").last().append('<input id="' + checklist.id + '" class="btn done-button" type="button"  value="Archive">' +
  //       '</div>' +
  //     '</div>');
  // }
  $("form#newNote").submit(function(event){

    var newNoteTitle = $("input#newNoteTitle").val();
    var newNoteText = $("textarea#newNoteDescription").val();
    var newType = "note";
    var notePriority = $("input:radio[name=priority]:checked").val();
    var noteColor;
    if (notePriority === "medium") {
      noteColor = '#c9dfe8';
    } else if (notePriority === "high") {
      noteColor = '#f2bfcc';
    } else {
      noteColor = '#e2e1e0';
    }
    var newNote = new Note(newNoteTitle, newNoteText, newType, noteColor);
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

  var sortInput = $("select#sort-selection").val();
});
$("form#newChecklist").submit(function(event) {
  event.preventDefault();
  var newCheckListTitle = $("input#newChecklistTitle").val();
  var newCheckListText = $("input#newChecklistDescription").val().split(',');
  var newCheckType = "checklist";
  var newChecklist = new Note(newCheckListTitle, newCheckListText, newCheckType);
  newChecklist.id = noteArray.length;
  appendCheckList(newChecklist);

  $("input#newChecklistTitle").val('');
  $("input#newChecklistDescription").val('');
  checklistModal.style.display = "none";

    $(document).on("click", "input.done-button", function() {
     var currentNoteId = $(this)[0].id;
     noteArray.forEach(function(note) {
       if (note.id == currentNoteId) {
         note.changeStatus();
         var noteClass = "." + currentNoteId;
         $(noteClass).hide();
       }
     });
   });
  });
});
