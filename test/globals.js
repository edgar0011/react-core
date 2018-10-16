import 'raf/polyfill'
import React from 'react'
import { JSDOM } from 'jsdom'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import 'whatwg-fetch'

Enzyme.configure({ adapter: new Adapter() })

// JSDOM
const doc = new JSDOM('<html><head></head><body></body></html>')
const jsdomWin = doc.window

// Set our data
jsdomWin.process = { env: process.env }

global.document = doc
global.window = jsdomWin
global.React = React
window.location.hash = '#/'

// Jest, Enzyme, Snapshots

global.shallow = shallow

global.render = render

global.mount = mount

global.shallowSnapshot = (tree) => global.matchSnapshot(global.shallow(tree))

global.renderSnapshot = (tree) => global.matchSnapshot(global.render(tree))

global.mountSnapshot = (node) => global.matchSnapshot(global.mount(node))

global.matchSnapshot = (renderedComponent) => expect(renderedComponent).toMatchSnapshot()

// // Skip createElement warnings but fail tests on any other warning
/* eslint no-console: 0 */
console.error = message => {
  if (/(Failed propType: )/.test(message)) {
    throw new Error(message)
  }
}

process.on('unhandledRejection', (reason) => {
  throw reason // you should handle all exceptions in tests explixitly
})
