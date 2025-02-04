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
//babel transpiles is
const phrase = React.createElement("p", null, "Hello world");
//the browser then renders it as
<p>Hello World</p>
```


