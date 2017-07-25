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
  console.log(modal.style.display);

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
});
