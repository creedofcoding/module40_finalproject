import React from 'react'
import SearchForm from "./SearchForm/SearchForm";
import SearchPageMediaImage from "./SearchPageMediaImage/SearchPageMediaImage";
import SearchPageHeader from "./SearchPageHeader/SearchPageHeader";
import SearchPageText from "./SearchPageText/SearchPageText";
import "./SearchPage.css"

function SearchPage() {
	return (
		<div className='search-page'>
			<div className='search-form-left'>
				<div className='search-page-header fsz-header'><SearchPageHeader /></div>
				<div className='search-page-text'><SearchPageText /></div>
				<div className='search-form'><SearchForm /></div>
			</div>
			<div className='search-form-right'>
				<div ><SearchPageMediaImage /></div>
			</div>
		</div >
	)
}

export default SearchPage;
