// jQuery fix for working with Promises
const getJSON = (arg) => new Promise((resolve, reject) => {
  jQuery.getJSON(arg).then(resolve).fail(reject);
});

/**
 * CURRY
 **/

const compose = (...args) => (
  (x) => (
    args.reduceRight((a, b) => {
      if (a && typeof a.then === 'function') return a.then(b);
      return b(a);
    }, x)
  )
);

/**
 * CURRY
 **/
const curry = fn => (
  (...data) => (
    (...args) => fn(...data, ...args)
  )
);

/**
 * Debugging
 **/
const trace = (tag) => (
  (x) => {
    console.log(tag, x);
    return x;
  }
);

/**
 * Memoization
 **/
let memoizationTable = {};
const memoize = (func) => {
  let funcString = func.toString();
  memoizationTable[funcString] = {};
  return function(...args) {
    let argsString = JSON.stringify(args);
    if (!memoizationTable[funcString][argsString]) {
      memoizationTable[funcString][argsString] = func.apply(this, args);
    }
    return memoizationTable[funcString][argsString];
  };
}

// For creating dom elements with syntatic sugar:
// $("<a />").attr('href', 'http://').text('yay') becomes
// dom('a', { href: 'http://' }, 'yay'), or even better:
// a({ href: 'http://' }, 'yay') just by binding it.
const dom = (type, attr, children) => {
  if (!children && (
    (Array.isArray(attr)) ||
    (attr instanceof $) ||
    (typeof attr !== 'object')
  )) {
    children = attr;
    attr = undefined;
  }
  let $el = $("<" + type + " />");
  if (attr) {
    $el.attr(attr);
  }
  if (children !== null && children !== undefined) {
    $el.val(children).append(children);
  }
  return $el;
};

const createDOM = (...args) => {
  return args.reduce(function (obj, type) {
    obj[type] = dom.bind(null, type);
    return obj;
  }, {});
}

// creates a shorthand dom functions
const DOM = createDOM(
  'td', 'tr', 'input', 'a', 'span', 'div', 'tbody', 'table',
);

$.fn.outerHTML = function() {
  return this[0].outerHTML;
}

const map = fn => container => container.map(fn);

// Simple Container
class Container {
  constructor(value) {
    this.value = value;
  }
  map(fn) {
    return fn(this.value);
  }
}

var container = (mapFn = Container.prototype.map, init = () => {}) => {
  return class X extends Container {
    static of(value) {
      return new X(value);
    }
    constructor(value) {
      super();
      init(value);
    }
    map(fn) {
      return mapFn(fn, this.value);
    }
  }
};

var Maybe = container((fn, value) => (
  value ? Maybe.of(fn(value)) : Maybe.of(null)
));


// FUNCTIONS!

var exclaim = text => text + "!";
var upper = text => text.toUpperCase();
var head = arr => arr[0];
var take = prop => obj => obj[prop];
var shout = compose(exclaim, upper);
















var listeners = [];
var state = [];
var reducer = (action, state = []) => {
  switch (action.type) {
    case 'toggleSelected':
      return state.map(e => ({ ...e, selected: action.id === e.id }))
    case 'dataFetched':
      return action.data;
    default:
      return state;
  }
};

const addListener = fn => {
  listeners.push(fn);
  return () => {
    let index = listeners.indexOf(a);
    return listeners = [
      ...listeners.slice(0, index),
      ...listeners.slice(index + 1)
    ];
  };
};

const dispatch = (action) => {
  state = reducer(action, state);
  listeners.forEach(listener => listener(action));
};
const getState = () => [...state];


// Actions
var dataFetched = (data) => ({
  type: 'dataFetched',
  data,
});

var toggleSelected = (id) => ({
  type: 'toggleSelected',
  id,
});


// LOG!
addListener(
  compose(
    trace('state change'),
    getState,
  )
);

// getJSON onload
$(() => compose(dispatch, dataFetched, getJSON)("/data.json"));

var clickable = (fn, el) => {
  el.click(fn);
  return el;
};

var clickableUserRow = user => clickable(
  () => dispatch(toggleSelected(user.id)),
  userRow(user),
);











var userRow = user => (
  DOM.tr({ "class" : user.selected ? "active" : undefined }, [
    DOM.td(user.id),
    DOM.td(user.name)
  ])
);

var changeDivContents = contents => (
  $("#main")
    .children()
    .remove()
    .end()
    .append(contents)
);

var rerender = compose(
  changeDivContents,
  DOM.table,
  map(clickableUserRow),
);

// TESTING!
var testDOM = (dom, html) => dom.outerHTML === html;
// userRow({ id: 1, name: "gal" }).outerHTML() === "<tr><td>1</td><td>gal</td></tr>"
// userRow({ id: 1, name: "gal", selected: true }).outerHTML() === "<tr class=\"active\"><td>1</td><td>gal</td></tr>"













var renderFromState = compose(
  rerender,
  getState
);

addListener(
  renderFromState
);

// Maybe record user interaction?
var whatHappened = [];;
addListener(
  action => whatHappened.push(action)
);
var rerun = actions => {
  actions.forEach((action, i) => {
    setTimeout(() => {
      dispatch(action);
      console.log(`${i + 1}: ${action.type}`);
    }, i * 500);
  });
}


