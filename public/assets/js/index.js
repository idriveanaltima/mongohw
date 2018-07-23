
$(".saveArticle").on("click", function() {
  var id = $(this).attr("data-id");
  $.ajax({
      method: "PUT",
      url: "/save/" + id
  }).done(function() {
    window.location = "/"
});
});

$(".clear").on("click", function() {
  $.ajax({
      method: "DELETE",
      url: "/clear"
  }).done(function() {
      window.location = "/"
  })
});

$(".remove").on("click", function() {
  var id = $(this).attr("data-id");
  $.ajax({
      method: "PUT",
      url: "/remove/" + id
  }).done(function() {
      window.location = "/saved"
  })
});

//Handle Save Note button
$(".saveNote").on("click", function() {
  var id = $(this).attr("data-id");
  if (!$("#noteBody").val()) {
      alert("please enter a note")
  }else {
    $.ajax({
          method: "POST",
          url: "/notes/save/" + id,
          data: {
            text: $("#noteBody").val()
          }
        }).done(function() {
            $("#noteBody" + id).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
  }
});

//Handle Delete Note button
$(".deleteNote").on("click", function() {
  var noteId = $(this).attr("data-note-id");
  var articleId = $(this).attr("data-article-id");
  $.ajax({
      method: "DELETE",
      url: "/notes/" + noteId + "/" + articleId
  }).done(function() {
      $(".modalNote").modal("hide");
      window.location = "/saved"
  })
});
