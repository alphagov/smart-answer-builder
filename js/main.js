var questionNumber = 1;
var outcomeNumber = 1;

var questions = {};
var outcomes = {};

var addOption = function() {
  var template = Handlebars.compile($("#option_template").html());
  var qs = []
  for(var key in questions) {
    qs.push({
      key: key,
      title: questions[key] || "Question " + key.split("-")[1]
    });
  }
  return template({
    questions: qs
  });
};

var addQuestion = function(opts) {
  var html = Handlebars.compile($("#question_template").html());
  var compiled = html({
    number: opts.number,
    notFirstQuestion: opts.number > 1,
    options: addOption()
  });
  $("#question-placeholder").before(compiled);
  questions["question-" + questionNumber] = "";
  questionNumber++;
};

var addOutcome = function(opts) {
  var html = Handlebars.compile($("#outcome_template").html());
  var compiled = html({ number: opts.number });
  $("#question-placeholder").before(compiled);
  outcomeNumber++;
};

$(function() {
  // insert Question1 
  addQuestion({ number: questionNumber });

  $(".add-question").on("click", function(e) {
    e.preventDefault();
    addQuestion({ number: questionNumber });
  });

  $(".add-outcome").on("click", function(e) {
    e.preventDefault();
    addOutcome({ number: outcomeNumber });
  });

  $("body").on("click", ".remove-node", function(e) {
    var wrap = $(this).parents(".row").first().remove();
    if(wrap[0].id.indexOf("outcome") > -1) {
      outcomeNumber--;
    } else {
      questionNumber--;
    }
  });

  $("body").on("click", ".outcome-wrap", function() {
    var elem = $(this);
    if(elem.data("added")) return;
    elem.find(".span4").on("change", function() {
      elem.after(addOption()); 
      elem.data("added", true);
    });
  });

  $("body").on("click", ".row", function() {
    var elem = $(this);
    if(elem[0].id.indexOf("question") > -1) {
      elem.find("input[name='title']").on("change", function() {
        questions[elem[0].id] = this.value;
      });
    }
  });
});
