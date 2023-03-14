import React, { Component } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import SVGComponent from 'svg/svgviewer-react-output (1)';
import PropTypes from 'prop-types';

export class Sesrchbar extends Component {
  state = {
    searchString: '',
  };

  handleChangeInput = e => {
    this.setState({ searchString: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.searchString) {
      toast('Please fill in your input!');
      return;
    }
    this.props.onSubmit(this.state.searchString);
    this.setState({ searchString: '' });
  };

  render() {
    const { searchString } = this.state;
    return (
      <Searchbar>
        <Header onSubmit={this.handleSubmit}>
          <ButtonSearch type="submit">
            <SVGComponent />
          </ButtonSearch>
          <SearchInput
            onChange={this.handleChangeInput}
            value={searchString}
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
          />
        </Header>
      </Searchbar>
    );
  }
}

Sesrchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const Searchbar = styled.div`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const Header = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
`;
const ButtonSearch = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;
