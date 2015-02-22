var helpers = function helpers(){
  /*
   * shorten the way to get an element by model, id, binding, etc
   */
  this.model = function getElementByModelName(modelName){
    return element(by.model(modelName));
  };

  this.id = function getElementById(id){
    return element(by.id(id));
  };

  this.binding = function getElementByBinding(binding){
    return element(by.binding(binding));
  };


  /*
   * breaks tests if any severe errors are present in the console
   */
  this.detectSevere = function detectSevere(){
    browser.manage().logs().get('browser').then(function(browserLog) {
      var i = 0;
      var severeWarnings = false;

      for(i; i<=browserLog.length-1; i++){
        //if there are any SEVERE errors (such as AngularJS exceptions) the test should fail and the error message should be displayed
        if(browserLog[i].level.name === 'SEVERE'){
          console.log('\n' + browserLog[i].level.name + '(Possibly exception) \n' + browserLog[i].message);
          severeWarnings = true;
        }
      }
      //Uncomment for full log ->
      //console.log('\n log: ' + require('util').inspect(browserLog));
      expect(severeWarnings).toBe(false);
    });
  };
};

module.exports = new helpers();

describe("e2e common tests", function(){
  it("should find error in log", function(){
    //makes sure that we detect severe errors
    browser.executeScript(function() {console.error('error from test');});

    browser.manage().logs().get('browser').then(function(browserLog) {
      var i = 0;
      var severeWarnings = false;

      for(i; i<=browserLog.length-1; i++){
        //if there are any SEVERE errors (such as AngularJS exceptions) the test should fail and the error message should be displayed
        if(browserLog[i].level.name === 'SEVERE'){
            severeWarnings = true;
        }
      }
      //Uncomment for full log ->
      //console.log('\n log: ' + require('util').inspect(browserLog));
      expect(severeWarnings).toBe(true);
    });
  });
});
