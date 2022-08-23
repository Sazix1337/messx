# Messx

**Easy HTML library, thats allows you use variables in .msx file and use html syntax too. If you have any questions, my discord is: > sazix#6510**

# Example
`index.msx`
```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    {{ %(var) = "Hello World" }} <!-- setting variable -->
    <p>{{ var$ }}</p> <!-- calling variable -->
  </body>
</html>
```

`build/public.html`
```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>
