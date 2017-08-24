import React from 'react';
import UserInput from './UserInput';
import Result from './Result';

class App extends React.Component {

  constructor(props) {
    super(props);

        this.state = {
          showSubmitErrors : false, // set showing validation error text to false
          textEntered: null, // user entererd text
          wordCountTotal: null, // word count
          fullstopCountTotal: null, // fullstop count
          commasCountTotal: null, // comma count
          errorMessage: null, // error message
          showResults: false // show results section
        }
  }

  /**
   *  Gets and sets the text entered from the user
   *
   */
  handleChange = (e) => {

    this.setState({
      textEntered: e.target.value,
    })
  }


  /**
   * handleSubmit:
   * Checks if the form is invalid and sets the showSubmitError to true
   * and set the showResult to true and set the values of the wordcount, fullstopcount and 
   * commacount if the for is valid. 
   *
   */
  handleSubmit = (e) => {
    e.preventDefault();

      // checks if the form is valid and set
      if (this.validate(this.state.textEntered)) {
        
        this.setState({
            showSubmitErrors: true,
        })

      } else {

        this.setState({
            showSubmitErrors: false,
            showResults: true,
            wordCountTotal: this.state.textEntered.match(/\S+/g).length, 
            fullstopCountTotal: this.state.textEntered.match(/\./g).length,
            commasCountTotal: this.state.textEntered.match(/\,/g).length, 
        })
      }
   }

  /**
  * validate:
  * Get ths user input and return hasError true 
  * if input is invalid
  *
  * @param      {string}
  * @return     {boolean}
  */
  validate(fieldValue) {

        const maximumWord = 500;
        const minimumWord = 5;
        let isLessThanMinimumWord = false;
        let isMoreThanMaximumWord = false;

        const isEmpty = fieldValue === null ? true : false; // checks if the field value is empty
        
        const isNumericValue = !isEmpty && fieldValue.match(/^([^0-9]*)$/) === null ? true : false // checks if the enter value is character only
        
        const wordCount = !isEmpty ? fieldValue.match(/\S+/g).length : null; // Get the a word length 
        
        const hasErrors = isEmpty || isNumericValue || isLessThanMinimumWord || isMoreThanMaximumWord ? true : false; // checks whether there is any errors returned
        
        
        if(isEmpty) {
          this.setState({
              errorMessage: 'Please enter a value',
          });
        }

        if(isNumericValue) {
          this.setState({
              errorMessage: 'Please enter characters only',
          })
        }

        if(wordCount < minimumWord && !isNumericValue && wordCount > 0) {
          this.setState({
              errorMessage: 'The minimum amount to be entered is 5',
          })

          return isLessThanMinimumWord = true
        }

        if(wordCount > maximumWord ) {
          this.setState({
              errorMessage: 'The maximum amount to be entered is 500',
          })
          return isMoreThanMaximumWord = true
        }

    return hasErrors;
  }

  render() {

    return (
      <div className="App">
      {this.state.showResults ? <Result 
                                  text={this.state.textEntered} 
                                  wordCount={this.state.wordCountTotal} 
                                  commaCount={this.state.commasCountTotal} 
                                  fullstopCount={this.state.fullstopCountTotal} />
            :
            <UserInput validationText={this.state.errorMessage}
                      isInvalid={this.state.showSubmitErrors} 
                      handleSubmit={this.handleSubmit}
                      handleChange={this.handleChange}
            />      
      }
      </div>
    );
  }
}

export default App;
