# **USAGE**

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

#

## **Flags for specifying custom symbols**
*(Not using them will only apply custom option symbols first by indexing and then by order)*

1. **arrow-symbol** *(This element will be used as arrow symbol)*
2. **option-default-symbols** *(This element will be used as default option symbol)*
3. *Rest will be used for each option symbol* (*use **INDEX** attribute to be precise*)

#

## **Symbol priority**
1. Symbol specified using *HTML*
2. Custom symbol specified using **dropdown** mixin  
3. Default *(heart)* symbol for **dropdown-general-symbol**

#

## **Building project after any change**
`npm run build-dropdown`

#