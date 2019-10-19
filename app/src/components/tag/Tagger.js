
// @flow

import React, { PureComponent } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';
import shortid from 'shortid';
import { Creatable, Async } from 'react-select';
import 'react-select/dist/react-select.css';
import Raven from 'raven-js'
import { pure } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';

import AsyncLoader from '../ui/AsyncLoader';
import * as tagActions from '../../actions/tagActions';

// selectors'
const rootSelector = state => state.tags;
const rootSelector2 = state => state.tags;

const tagsSelector = createSelector(
  [rootSelector, rootSelector2],
  root => root.tags,
);

const tagsAselector: Function = createSelector(
  [tagsSelector, rootSelector],
  tags => tags.filter(({ value }) => value.substr(0, 1).toLowerCase() === 'a')
);

const tagsLoadingSelector = createSelector(
  [rootSelector],
  root => root.tagsLoading
);

type tagObjectType = {id: string, value: string, label: string};

type Props = {
  tags: Array<{ id: string, value: string }>,
  tagsA: Array<string>,
  addTag: Function,
  removeTag: Function,
  getTags: Function,
  isLoading: boolean,
}
const mapStsateToProps = createStructuredSelector({
  tags: tagsSelector, tagsA: tagsAselector, isLoading: tagsLoadingSelector
});
@connect(mapStsateToProps, {
  addTag: tagActions.addTag,
  removeTag: tagActions.removeTag,
  getTags: tagActions.getTags,
})
@AsyncLoader
export default class Tagger extends PureComponent<Props, any> {
  static defaultProps = {
    tags: [],
  };

  /*static propTypes = {
    tags: PropTypes.array,
    addTag: PropTypes.func,
    removeTag: PropTypes.func,
    getTags: PropTypes.func,
    isLoading: PropTypes.bool,
  };*/

  constructor(props: any, context: any) {
    super(props, context);
    this.loadTags()
    this.state = { newTag: '', selectedTag: null };

    this.handleRemoveTagFactory = memoize(this.handleRemoveTag);
  }
  state = {
    select1Loading: false,
    select2Loading: false,
    selectedTag: null,
    newTag: null,
  }

  props: Props

  handleRemoveTag = (tag: String) => () => {
    this.props.removeTag(tag);

    Raven.captureMessage('ReactCore, Tagger, Some info')
  }

  handleInput = (event: {name: string, value: string | number}) => {
    this.setState({ [event.name]: event.value });
  };

  handleAddTag = () => {

  };

  loadTags = () => this.props.getTags();

  searchTags = async (value: string) => {
    this.setState((prevState) => ({ ...prevState, select2Loading: true }))
    const tagsResponse = await this.props.getTags();
    this.setState((prevState) => ({ ...prevState, select2Loading: false }))
    return { options: tagsResponse.data.result.map(
      tag => ({ value: `${tag} ${value}`, label: `${tag} ${value}`, id: shortid.generate() })) }
  }

  changeHandler = (val: tagObjectType) => {
    console.log('Selected: ', val);
    this.setState({ selectedTag: val });
    return val;
  };

  newOptionHandler = ({ label, labelKey, valueKey }: any) => {
    console.log('newOptionHandler: ', label);
    console.log('newOptionHandler: ', labelKey);
    console.log('newOptionHandler: ', valueKey);
    return { label, value: label, id: Date.now() };
  }

  newOptionClickHandler = (options: any) => {
    console.log('newOptionClickHandler: ', options);
    this.props.addTag(options.label);
  }

  handleRemoveTagFactory: Function;

  renderOption = (option: tagObjectType) => (
    <div>
      <span style={{ color: '#000' }}>{option.label}</span>
      <br />
      <span style={{ color: '#666' }}>{option.value}</span>
      <br />
      <span style={{ color: '#999', fontSize: '0.8rem' }}>{Date.now()}</span>
    </div>
  );

  render() {
    const title = 'Tags';
    const { tags } = this.props;
    const { selectedTag, newTag } = this.state;
    const tagNodes = tags.map(tag => (
      <li class='list-group-item' key={`tag${tag.id}`}>
        <span class='float-left' style={{ color: '#000' }}>{tag.value}</span>
        <span class=' float-right'>
          <TagComponent tag={tag} onClick={this.handleRemoveTagFactory(tag)} />
        </span>
      </li>
    ));
    console.log('TAGGER props', this.props);
    return (
      <Row>
        <Col>
          <Row>
            <h3>{title}</h3>
          </Row>
          <Row>
            <Col class='col-sm-6'>
              <div>
                <input name='newTag' type='text' onChange={this.handleInput} value={newTag} />
              </div>
              <Button color='primary' onClick={this.handleAddTag}>ADD TAG</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Creatable
                name='form-field-name'
                value={selectedTag}
                multi
                options={tags}
                onChange={this.changeHandler}
                optionRenderer={this.renderOption}
                newOptionCreator={this.newOptionHandler}
                onNewOptionClick={this.newOptionClickHandler}
              />
            </Col>
            <Col>
              <Async
                name='form-field-name'
                value={selectedTag}
                loadOptions={this.searchTags}
                onChange={this.changeHandler}
                optionRenderer={this.renderOption}
                XnewOptionCreator={this.newOptionHandler}
                XonNewOptionClick={this.newOptionClickHandler}
              />
            </Col>
          </Row>
          <Row>
            <Col class='col-sm-6'>
              {tagNodes && tagNodes.length > 0 && <ul class='list-group'>{tagNodes}</ul>}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}


const Tag = ({ tag, onClick }: { tag: {value: string, id: string}, onClick: Function }) => {
  // console.log('rendering Tag', tag);
  return (
    <span
      tabIndex={tag.id}
      role='menuItem'
      class='fa fa-remove'
      onClick={onClick}
      style={{ color: '#666', fontSize: '120%', cursor: 'pointer' }}
    />
  );
};
Tag.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const TagComponent = pure(Tag);
