var add = adder => (
  addee => (
    adder + addee
  )
);

var addOne = add(1); // (num) => 1 + num
addOne(2); // => 3

var createPostRequest = url => (
  data => request.post(url).send(data)
)

var endpoint = createPostRequest(url);
expect(
  endpoint({ some: 'data' })
).to.become({ the: 'result' });

function hi(name) {
  return console.log(`Hello ${name}`);
};

var hi = function(name) {
  return console.log(`Hello ${name}`);
};

var hi = name => console.log(`Hello ${name}`);

// Interchangeable!

function greeting(name) {
  return hi(name);
}

function hi(name) {
  return console.log(`Hello ${name}`);
};

var greeting = hi;

hi('Gal'); // => "Hello Gal"
greeting('Gal'); // => "Hello Gal"
hi('Gal'); // => "Hello Gal"
greeting('Gal'); // => "Hello Gal"

var x = `hello`;

add(a, b);



let arr = [1,2,3];

// Mutates the data
for (var i = 0; i < arr.length; i++) {
  arr[i] = arr[i] * 2;
}

// Mutates the data too...
arr.forEach((n, i) => {
  arr[i] = arr[i] * 2;
});

// Immutable
let doubled = arr.map(n => n * 2);


var objArr =



var arr = [1, 2, 3];
neverChangesData(arr);
// yay! i know that `arr` is still itself!

maybeChangesData(arr);
// what happened? whyyyy
//
//


// Weird
let important = text => text.toUpperCase() + "!";

let exclam = text => text + "!";
let upper = text => text.toUpperCase();

let important = text => exclam(upper(text));
// Unbearable



var func = compose(a, b, c, d);
// is the same as
var func = value => a(b(c(d(value))));


let compose = (f, g) => x => f(g(x));

