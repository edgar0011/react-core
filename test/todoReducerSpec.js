import todoReducer from '../app/src/reducers/todoReducer';
import { ADD_TODO, REMOVE_TODO } from '../app/src/config/CONSTANTS';

import { expect, assert } from 'chai';

describe('reducer', () => {
	describe('ADD_TODO', () => {
		it('should add a new Todo item', () => {
			const initialState = {todos:[]};
			const action = {
				type: ADD_TODO,
				payload: {text:"New TODO"}
			};
			const nextState = todoReducer(initialState, action);
      const id = Date.now();
			expect(nextState).to.deep.equal({todos:[{id:id, todo:"New TODO"}]});
		});
	});

	describe('REMOVE_TODO', () => {
		it('should delete a given Todo item', () => {
      const id = Date.now();
      const id2 = Date.now() + 11;
			const initialState = {todos:[{id:id, todo:"New TODO to be removed"}, {id: id2, todo:"Other TODO not to be removed"}]};
			const action = {
				type: REMOVE_TODO,
        payload: id
			};
			const nextState = todoReducer(initialState, action);

			expect(nextState).to.deep.equal({todos:[{id:id2, todo:"Other TODO not to be removed"}]});
		});

		it('should do nothing if the Todo item to delete is not present', () => {
      const id = Date.now();
      const id2 = Date.now() + 11;
			const initialState = {todos:[{id:id, todo:"New TODO to be removed"}, {id: id2, todo:"Other TODO not to be removed"}]};
			const action = {
				type: REMOVE_TODO,
				data: Date.now() + 200
			};
			const nextState = todoReducer(initialState, action);

			expect(nextState).to.deep.equal({todos:[{id:id, todo:"New TODO to be removed"}, {id: id2, todo:"Other TODO not to be removed"}]});
		});
	});
});
