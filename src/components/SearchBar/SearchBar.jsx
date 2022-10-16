import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchBarStyled,
  SearchForm,
  SearchInput,
  SearchButton,
} from './SearchBar.styled';

export class Searchbar extends Component {
  static propTypes = {
    handleQuery: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleQuery(e.currentTarget.elements.query.value);
    // e.target.reset();
  };

  render() {
    const { query } = this.state;

    return (
      <SearchBarStyled>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit"></SearchButton>

          <SearchInput
            name="query"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBarStyled>
    );
  }
}
