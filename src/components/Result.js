import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
	wordCount: PropTypes.number,
	text: PropTypes.string,
	commaCount: PropTypes.number,
	fullstop: PropTypes.number
}

/**
 * Groups the wordArray by the first character of a word
 * and return the grouped list
 *
 * 
 */
function group(list) {  
  return list.reduce(function(element, item) {
      var key = item.charAt(0);
      element[key] = element[key] || [];
      element[key].push(item);
      return element;
  }, {});
}


/**
 * Render the word list in a table
 *
 * 
 */
function renderWordOutput(text) {
	let output = text.toLowerCase().split(" ").sort(); // sorts output alphabetically and converts words to lowercase
	let newWordArray = Array.from(new Set(output)) // remove duplicates from the array  
	let groupWordOutput = group(newWordArray); // grouped object output

	let columnListWord = Object.values(groupWordOutput); // gets all the value of the object
	let rowListHeader = Object.getOwnPropertyNames(groupWordOutput) // get the all property names of object

	return (
		<div>
			<table className="grid-output table-view">
				<tbody>
				<tr>
				{ rowListHeader.map((groupName, id) => {
					return (
						<th key={id}>{groupName}</th>
					);
	            })} 
				</tr>
				<tr>
				{columnListWord.map((groupItem,index) => {
					return (
						<td key={index}>
							{groupItem.map((item, id) =>{
	                    		return (
	                        		<p key={id}>
	                        			{item}
	                        		</p>
	                        	);
	                		})} 
	                	</td>
                	)
				})}
				</tr>
				</tbody>
			</table>
		</div>

	)
}


function Result({text, wordCount, commaCount, fullstopCount}) {

	return(
		<div className="result">
			<h1 className="title">Example test output</h1>
			<div className="input-section">
				<h2 className="section-title">Input</h2>
				<p>{text}</p>
			</div>
			<div className="output-section">
				<h2 className="section-title">Output</h2>
				{renderWordOutput(text)}
				<p>Words = {wordCount}</p>
				<p>, = {commaCount}</p>
				<p>. = {fullstopCount}</p>
			</div>
		</div>
	);
}

Result.propTypes = propTypes;

export default Result