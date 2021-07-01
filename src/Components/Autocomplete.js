import React from 'react';
import { Component, Fragment } from "react";
import './Autocomplete.css';
import data from './data.json'


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      showuser: ''
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;


    const filteredSuggestions = suggestions.filter(item => {
        return Object.keys(item).some(key =>    
          item[key].toString().toLowerCase().includes(userInput.toLowerCase())
        );
      });
  
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
      showuser: ''
    });
  };

    displayuser = () => {
        // console.log('Display was called')

            //if no match then return nothing
            if(this.state.showuser===null || this.state.showuser.length===0 || this.state.userInput === null) return null
            

            //when valid showuser is clicked
            else{

                const it = data.find((item)=> item.name===this.state.showuser);
                    // console.log(it);
                return(
                            <div className="content user">
                                <h4>{it.name}</h4>
                                <h6>{ it.items.join(", ")} </h6>
                                <h7> {it.address}, {it.pincode}</h7>            
                            </div>
                    )
            }       
        }           

  onClick = (e, suggestedname) => {
        // e.preventdefault();
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
            showuser: suggestedname,
          })

        //   console.log(this.state.showuser);

    };


    //handle arrow key up and down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
  
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
};


   //not working 
//     handleKeypress = e => {
//     //it triggers by pressing the enter key
//     if (e.key === 'Enter') {
//       console.log("pressed enter");
//     //   this.onClick();
//     };

// };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        showuser
      }
    } = this;

    //when enter key pressed on list item
   
     
  
    let suggestionsListComponent;
    
    // only if userinput i not null and also the lenght of filetered solution is not null then display the list
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent= (

              <div className="content">
                <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
      
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                return (
                    <div>
                                                                                                                    {/* onKeyPress not working */}
                        <li className={className} key={suggestion.id} onClick={(e) => {onClick(e, suggestion.name);}} onKeyPress={this.handleKeypress}>
                        {suggestion.name}- {suggestion.address} - {suggestion.pincode} - {suggestion.items.join(" ")}
                    </li>
                    </div>
                    );
                })}
                </ul>
                </div> 
          );
        } else {
            // when no suggestion are available
            suggestionsListComponent = (
                    <div className="no-suggestions"  >
                    <em>No suggestions available.</em>
                    </div>
          );
        }
      }

      return (
        <Fragment>
            <div className="content">
                <h1>Auto-suggestion SearchBar</h1>
                <h2> Search for a set of user</h2>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder="search something..."  
                />
                {suggestionsListComponent}

                {/* below component will display the clicked user from suggested list, DOESN'T WORK ON ENTER KEY */}
                {this.displayuser()}
            </div>
        </Fragment>
      );
    }
}

export default Autocomplete;