
// @flow

import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { pure } from 'recompose';

import * as tagActions from '../../actions/tagActions';

type tagObjectType = {id:string, value:string, label:string};

@connect(store => store.tags, {
  addTag: tagActions.addTag,
  removeTag: tagActions.removeTag,
  getTags: tagActions.getTags,
})
export default class Tagger extends Component<any, any> {
  static defaultProps = {
    tags: [],
  };

  static propTypes = {
    tags: PropTypes.array,
    addTag: PropTypes.func,
    removeTag: PropTypes.func,
    getTags: PropTypes.func,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.loadTags();
    this.state = { newTag: '', selectedTag: null };

    this.handleRemoveTagFactory = memoize(this.handleRemoveTag);
  }

  handleRemoveTag = (tag: String) => () => {
    this.props.removeTag(tag);
  }

  handleInput = (event:{name: string, value: string | number}) => {
    this.setState({ [event.name]: event.value });
  };

  handleAddTag = () => {

  };

  loadTags = () => this.props.getTags();

  logChange = (val: tagObjectType) => {
    console.log('Selected: ', val);
    this.setState({ selectedTag: val });
  };

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
      <li class="list-group-item" key={`tag${tag.id}`}>
        <span class="float-left" style={{ color: '#000' }}>{tag.value}</span>
        <span class=" float-right">
          <TagComponent tag={tag} onClick={this.handleRemoveTagFactory(tag)} />
        </span>
      </li>
    ));

    return (
      <Row>
        <Col>
          <Row>
            <h3>{title}</h3>
          </Row>
          <Row>
            <Col class="col-sm-6">
              <div>
                <input name="newTag" type="text" onChange={this.handleInput} value={newTag} />
              </div>
              <Button color="primary" onClick={this.handleAddTag}>ADD TAG</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Select
                name="form-field-name"
                value={selectedTag}
                multi
                options={tags.map(tag => ({ value: tag.value, label: tag.label, id: tag.id }))}
                onChange={this.logChange}
                optionRenderer={this.renderOption}
              />
            </Col>
          </Row>
          <Row>
            <Col class="col-sm-6">
              {tagNodes && tagNodes.length > 0 && <ul class="list-group">{tagNodes}</ul>}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}


const Tag = ({ tag, onClick }: { tag:{value:string, id:string}, onClick: Function }) => {
  console.log('rendering Tag', tag);
  return (
    <span
      tabIndex={tag.id}
      role="menuItem"
      class="fa fa-remove"
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