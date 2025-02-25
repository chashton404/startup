# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## HTML Notes

How to start an HTML File:
```
<!DOCTYPE html>
<html>
    <!-- put your code here -->
</html>

```

Major thanks to Professor Jensen for providing the following code snippet of an example document in HTML

```
<!DOCTYPE html>
<html lang="en">
  <body>
    <main>
      <h1>Hello world</h1>
      <p class="introduction">
        HTML welcomes you to the amazing world of
        <span class="topic">web programming</span>.
      </p>
      <p class="question">What will this mean to you?</p>
      <p class="assignment">Learn more <a href="instruction.html">here</a>.</p>
    </main>
  </body>
</html>
```

note a couple things here, you are going to essentially be starting an element with the <> symbols and putting the name of the element between the two angle brackets. Then you end the element by using the angle brackets again and adding a forward slash before the beginning of the element.

**Adding an Image**
Here is an example of adding an image to your html page

```
<img alt="beach" src="https://images.pexels.com/photos/21787/pexels-photo.jpg?w=600&h=300" />

```

**User Input**
| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

## CSS Notes
CSS is SO COOL you can really improve the look of your designs and take them from zero to hero.

**BOOTSTRAP**
Bootstrap is a popular CSS framework that can be used for styling and responsive design.

How to import Bootstrap:
```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
```
Put the above code in the the head element of your HTML. 

Using Bootstrap for layout:
```
<div class="container">
  <div class="row">
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
  </div>
</div>
```
The code above creates a container that has one row with three columns.
getbootstrap.com/docs/ has amazing documentation for their resources.

## Javascript Notes
Some basics - let vs. const:
When you declare a variable with let, it lets you change the value for the variable. However, when you add const that then makes it so it is a constant so it won't change

```
let msgx = 'wow'
msgx = 'fish'

const msgc = 'wow!'
```
You can test these things out by opening the console on any page.
right click -> inspect -> console

**Functions**
The following is an example function in javascript
```
function join(a, b) {
 return a + ' ' + b;
}
```
This code can then be executed by entering 
```
console.log(join('Hello', 'world'));

```

## React Notes
**JSX** is a mix between Javascript and HTML. Babel can be used to 'transpile' the code into javascript. 

Example:
```
//this code is jsx
const phrase = <p>Hello World</p>;
//babel transpiles as
const phrase = React.createElement("p", null, "Hello world");
//the browser then renders it as
<p>Hello World</p>
```

**Porting to React**
Porting to react is an important process. Here are the steps we take:
1. Install and configure Vite - do this by setting up NPM for our project and we install Vite as a dependency by running these commands in the terminal:
```
npm init -y
npm install vite@latest -D
```
We then add commands for vite in the scripts by editing the package.json and we add the following script
```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
```
We also delete only keep the Main, version, descripion, main, scripts, keywords, author, license, dev dependencies, and dependencies the rest can be deleted.

2. Reorganize the code - The code then needs to be organized into the files that vite organizes. This is done by putting most files in either the public or src directory.
3. Convert to React Bootstrap
4. Enable React
5. Create app component
6. Create view components
7. Create the router
8. Convert HTML to React components
9. Replace deployment script

## Javascript
**promises** 
Promises essentially allow us to run another function at the same time as other code.
We have for an example this block of code:
```
function callback(resolve) {
  setTimeout(() => {
    resolve('done');
  }, 5000);
}

const p = new Promise(callback);

p.then((result) => console.log(result));
console.log('end')
```
This code demonstrates what a promise can do. We created a function using the promise constructor because the parameter is resolve. Inside this function we set a times for 5 seconds to then print 'done'. The actual code itself begins running the promise. It then prints 'end'. 5 seconds later it prints 'done'.
Promises have three states:
Pending - Currently running Asynchronously
Fulfilled - Completed Successfully
Rejected - Failed to complete

IN REALITY the promise function should use a resolve and reject function. Consider the following function:
```
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 3000);
});

coinToss
  .then((result) => console.log(`Toss result: ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
 .finally(() => console.log('Toss completed'));
 ```

