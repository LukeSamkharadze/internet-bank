# **USAGE GUIDE**

## 1. **Link STYLE**
  #### **from HTML**
``` html
<link rel="stylesheet" href="pathto/core/style/build/index.css"> <!-- for building custom dropdown -->
<link rel="stylesheet" href="pathto/select/style/build/index.css"> <!-- for prebuilt general dropdown-->
<link rel="stylesheet" href="pathto/field/style/build/index.css"> <!-- for prebuilt general dropdown with symbol-->
<link rel="stylesheet" href="pathto/disabled/style/build/index.css"> <!-- for disabled dropdown style-->
```
#### **from SASS/SCSS**
``` css
@use "pathto/core/style/index.scss" as *; // for building custom dropdown
@use "pathto/select/style/index.scss" as *; // for prebuilt general dropdown
@use "pathto/field/style/index.scss" as *; // for prebuilt general dropdown with symbol
@use "pathto/disabled/style/index.scss" as *; // for disabled dropdown style
```

## 2. **Link JS**
``` html
<script type="text/javascript" src="pathto/logic/build/index.js"></script>
```
**See demo & dropdowns folder for examples**


## **Specifying custom symbols**
*(Not using them will only apply custom option symbols first by indexing and then by order)*

1. *Use* **arrow-symbol** *(This element will be used as arrow symbol)*
2. *Use* **option-default-symbols** *(This element will be used as default option symbol)*
3. *Rest will be used for each option symbol* (*use* **INDEX** *attribute to be precise)*


## **Specifying custom options**
*(Not using them will automatically generate options from **select** element provided)* \
1. *First custom option will be used as placeholder*
1. *Use* **option** *class* *(This element will be used as custom option)* *(use* **INDEX** *attribute to be precise)*

*(If you want to style your custom options create new element inside* **option** *and use your classes)*

## **Symbol priority**
1. Symbol specified from *HTML*
2. Custom symbol specified from **dropdown** mixin  
3. Default *(heart)* symbol for **dropdown-general-symbol**

## **Building project after any change**
`npm run build-dropdown`

#